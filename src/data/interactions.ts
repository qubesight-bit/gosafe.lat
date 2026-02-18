export type SeverityLevel = 'none' | 'mild' | 'moderate' | 'severe';

export interface InteractionResult {
  drug1: string;
  drug2: string;
  severity: SeverityLevel;
  mechanism: string;
  clinicalNote: string;
  sources: Source[];
}

export interface Source {
  name: string;
  institution: string;
  type: 'governmental' | 'academic' | 'educational' | 'anecdotal';
  title: string;
  url?: string;
}

export const knownInteractions: InteractionResult[] = [
  {
    drug1: 'warfarin',
    drug2: 'aspirin',
    severity: 'severe',
    mechanism:
      'Both agents affect coagulation through different pathways. Aspirin inhibits platelet aggregation via COX-1 inhibition, while warfarin inhibits vitamin K–dependent clotting factors. Combined use significantly increases bleeding risk.',
    clinicalNote:
      'This combination is generally avoided unless specifically indicated by a licensed healthcare professional under careful monitoring.',
    sources: [
      {
        name: 'NIH National Library of Medicine',
        institution: 'U.S. National Institutes of Health',
        type: 'governmental',
        title: 'Warfarin and Aspirin Drug Interactions',
        url: 'https://www.nlm.nih.gov',
      },
    ],
  },
  {
    drug1: 'ssri',
    drug2: 'maoi',
    severity: 'severe',
    mechanism:
      'SSRIs increase synaptic serotonin by blocking reuptake; MAOIs prevent serotonin breakdown. Concurrent use can lead to excessive serotonin accumulation in the central nervous system.',
    clinicalNote:
      'A washout period is typically required between these medication classes. Consult a licensed healthcare professional.',
    sources: [
      {
        name: 'FDA Drug Safety',
        institution: 'U.S. Food and Drug Administration',
        type: 'governmental',
        title: 'Serotonin Syndrome and Drug Interactions',
        url: 'https://www.fda.gov',
      },
    ],
  },
  {
    drug1: 'metformin',
    drug2: 'ibuprofen',
    severity: 'moderate',
    mechanism:
      'NSAIDs such as ibuprofen may reduce renal blood flow, potentially affecting metformin clearance and increasing the risk of lactic acidosis in susceptible individuals with renal impairment.',
    clinicalNote:
      'Occasional use may be acceptable in those with normal renal function, but frequency and duration should be discussed with a healthcare provider.',
    sources: [
      {
        name: 'MedlinePlus',
        institution: 'U.S. National Library of Medicine',
        type: 'governmental',
        title: 'Metformin Drug Interactions Overview',
        url: 'https://medlineplus.gov',
      },
    ],
  },
  {
    drug1: 'atorvastatin',
    drug2: 'clarithromycin',
    severity: 'moderate',
    mechanism:
      'Clarithromycin inhibits the CYP3A4 enzyme, which is responsible for metabolizing atorvastatin. This inhibition can increase atorvastatin plasma concentrations, raising the risk of muscle-related adverse effects.',
    clinicalNote:
      'Healthcare providers may temporarily suspend statin therapy or adjust dosing during antibiotic courses. Do not modify medication regimens without professional guidance.',
    sources: [
      {
        name: 'European Medicines Agency',
        institution: 'European Medicines Agency (EMA)',
        type: 'governmental',
        title: 'Atorvastatin Product Information — Drug Interactions',
        url: 'https://www.ema.europa.eu',
      },
    ],
  },
  {
    drug1: 'lisinopril',
    drug2: 'potassium',
    severity: 'mild',
    mechanism:
      'ACE inhibitors like lisinopril reduce aldosterone secretion, which normally promotes potassium excretion. High dietary potassium intake combined with this medication class may mildly elevate serum potassium levels.',
    clinicalNote:
      'Routine monitoring of electrolytes is standard practice. Dietary potassium adjustments should be discussed with a healthcare professional.',
    sources: [
      {
        name: 'NIH MedlinePlus',
        institution: 'U.S. National Library of Medicine',
        type: 'governmental',
        title: 'Lisinopril: MedlinePlus Drug Information',
        url: 'https://medlineplus.gov',
      },
    ],
  },
  {
    drug1: 'acetaminophen',
    drug2: 'alcohol',
    severity: 'moderate',
    mechanism:
      'Chronic alcohol use induces CYP2E1 enzyme activity, which converts acetaminophen into a hepatotoxic metabolite (NAPQI) at higher rates. This increases the risk of liver damage, particularly with higher acetaminophen doses.',
    clinicalNote:
      'Occasional, moderate alcohol consumption combined with standard acetaminophen doses is generally considered lower risk for most adults, but chronic alcohol use significantly changes this risk profile.',
    sources: [
      {
        name: 'CDC',
        institution: 'Centers for Disease Control and Prevention',
        type: 'governmental',
        title: 'Acetaminophen and Alcohol: Public Health Guidance',
        url: 'https://www.cdc.gov',
      },
    ],
  },
];

export function searchInteraction(term1: string, term2: string): InteractionResult | null {
  const t1 = term1.toLowerCase().trim();
  const t2 = term2.toLowerCase().trim();

  return (
    knownInteractions.find(
      (i) =>
        (i.drug1.includes(t1) || t1.includes(i.drug1)) &&
        (i.drug2.includes(t2) || t2.includes(i.drug2))
    ) ||
    knownInteractions.find(
      (i) =>
        (i.drug1.includes(t2) || t2.includes(i.drug1)) &&
        (i.drug2.includes(t1) || t1.includes(i.drug2))
    ) ||
    null
  );
}

export const severityConfig = {
  none: {
    label: 'No known interaction reported',
    className: 'severity-none',
    icon: '✓',
    description:
      'Based on available educational data, no significant interaction between these substances has been widely reported in the reviewed sources.',
  },
  mild: {
    label: 'Mild interaction reported',
    className: 'severity-mild',
    icon: '⚠',
    description:
      'Some sources report a mild interaction. Clinical significance may be limited, but professional guidance is recommended.',
  },
  moderate: {
    label: 'Moderate interaction reported',
    className: 'severity-moderate',
    icon: '⚠',
    description:
      'A moderate interaction has been reported. A licensed healthcare professional should be consulted before combining these medications.',
  },
  severe: {
    label: 'Severe interaction reported',
    className: 'severity-severe',
    icon: '✕',
    description:
      'A potentially serious interaction has been documented. Seek professional medical guidance immediately if you are taking or considering these medications together.',
  },
};
