/**
 * NIH NLM RxNav Drug Interaction API
 * Source: https://rxnav.nlm.nih.gov/InteractionAPIs.html
 * Free public API — no API key required
 * Institution: U.S. National Library of Medicine (NLM / NIH)
 */

const RXNAV_BASE = 'https://rxnav.nlm.nih.gov/REST';

export interface RxNavInteraction {
  minConceptItem: { rxcui: string; name: string; tty: string };
  interactionPair: Array<{
    interactionConcept: Array<{
      minConceptItem: { rxcui: string; name: string; tty: string };
      sourceConceptItem: { id: string; name: string; url: string; umlscui?: string };
    }>;
    severity: string;
    description: string;
  }>;
}

export interface NormalizedInteraction {
  drug1: string;
  drug2: string;
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  mechanism: string;
  clinicalNote: string;
  source: 'rxnav' | 'static';
  sources: Array<{
    name: string;
    institution: string;
    type: 'governmental';
    title: string;
    url: string;
  }>;
}

/** Map RxNav severity strings to our severity levels */
function mapSeverity(rxSeverity: string): 'mild' | 'moderate' | 'severe' {
  const s = rxSeverity.toLowerCase();
  if (s.includes('high') || s.includes('contraindicated') || s.includes('major')) return 'severe';
  if (s.includes('moderate')) return 'moderate';
  return 'mild';
}

/** Fetch the RxCUI for a drug name */
async function getRxCui(name: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${RXNAV_BASE}/rxcui.json?name=${encodeURIComponent(name)}&search=1`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const cuis = data?.idGroup?.rxnormId;
    return cuis?.[0] ?? null;
  } catch {
    return null;
  }
}

/** Fetch interactions for a list of RxCUIs */
async function getInteractions(rxcuis: string[]): Promise<RxNavInteraction[]> {
  try {
    const res = await fetch(
      `${RXNAV_BASE}/interaction/list.json?rxcuis=${rxcuis.join('+')}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data?.fullInteractionTypeGroup?.[0]?.fullInteractionType ?? [];
  } catch {
    return [];
  }
}

/**
 * Look up a drug-drug interaction via NIH RxNav.
 * Returns null if either drug is not found in RxNorm (e.g. illicit substances).
 */
export async function lookupRxNavInteraction(
  drug1: string,
  drug2: string
): Promise<NormalizedInteraction | null | 'not-in-rxnorm'> {
  const [cui1, cui2] = await Promise.all([getRxCui(drug1), getRxCui(drug2)]);

  // If neither drug is in RxNorm (e.g. cocaine, nutmeg), fall back to static DB
  if (!cui1 && !cui2) return 'not-in-rxnorm';

  // If only one is found, we still can't check the interaction pair
  if (!cui1 || !cui2) return 'not-in-rxnorm';

  const interactions = await getInteractions([cui1, cui2]);

  if (!interactions.length) {
    // Both found in RxNorm but no interaction documented
    return {
      drug1,
      drug2,
      severity: 'none',
      mechanism:
        'No specific drug-drug interaction between these medications has been documented in the NIH/NLM RxNorm interaction database. This does not guarantee the combination is without risk — individual patient factors, doses, and conditions affect safety.',
      clinicalNote:
        'Always consult a licensed pharmacist or healthcare professional for personalized medication review.',
      source: 'rxnav',
      sources: [
        {
          name: 'NLM RxNav',
          institution: 'U.S. National Library of Medicine (NIH)',
          type: 'governmental',
          title: 'Drug Interaction API — RxNav',
          url: 'https://rxnav.nlm.nih.gov/InteractionAPIs.html',
        },
      ],
    };
  }

  // Pick the most severe interaction
  let worst = interactions[0].interactionPair[0];
  for (const group of interactions) {
    for (const pair of group.interactionPair) {
      const current = mapSeverity(pair.severity);
      const existing = mapSeverity(worst.severity);
      if (
        (current === 'severe' && existing !== 'severe') ||
        (current === 'moderate' && existing === 'mild')
      ) {
        worst = pair;
      }
    }
  }

  const severity = mapSeverity(worst.severity);
  const sourceUrl = worst.interactionConcept?.[0]?.sourceConceptItem?.url ?? 'https://rxnav.nlm.nih.gov';
  const sourceName = worst.interactionConcept?.[0]?.sourceConceptItem?.name ?? 'NLM Drug Interaction Database';

  return {
    drug1,
    drug2,
    severity,
    mechanism: worst.description,
    clinicalNote:
      'This information is sourced from the NIH/NLM drug interaction database for educational awareness. Consult a licensed healthcare professional or pharmacist before making any medication decisions.',
    source: 'rxnav',
    sources: [
      {
        name: sourceName,
        institution: 'U.S. National Library of Medicine (NIH)',
        type: 'governmental',
        title: `${drug1} + ${drug2} Interaction — NIH RxNav`,
        url: sourceUrl,
      },
      {
        name: 'NLM RxNav API',
        institution: 'U.S. National Library of Medicine',
        type: 'governmental',
        title: 'Drug Interaction API Reference',
        url: 'https://rxnav.nlm.nih.gov/InteractionAPIs.html',
      },
    ],
  };
}
