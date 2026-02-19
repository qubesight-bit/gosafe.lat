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

/**
 * Static fallback database for substances not found in RxNorm
 * (illicit drugs, supplements, psychoactive plants, etc.)
 * Sources: NIDA, WHO, CDC, PsychonautWiki (educational), Erowid (anecdotal, labeled)
 */
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
  {
    drug1: 'cocaine',
    drug2: 'nutmeg',
    severity: 'moderate',
    mechanism:
      'Nutmeg contains myristicin and elemicin, compounds with weak MAO-inhibiting and serotonergic/adrenergic properties. Cocaine is a potent CNS stimulant. Combined, these may amplify cardiovascular stimulation and CNS excitation. Myristicin may also weakly inhibit monoamine oxidase, potentially altering the metabolism of cocaine-related neurotransmitter activity.',
    clinicalNote:
      'Both substances produce CNS and cardiovascular stimulation. Nutmeg in high amounts is itself toxic (nutmeg intoxication). Combining with stimulants like cocaine may compound cardiovascular and neurological stress.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Cocaine DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'NLM / MedlinePlus', institution: 'U.S. National Library of Medicine', type: 'governmental', title: 'Nutmeg Toxicity Overview', url: 'https://medlineplus.gov' },
      { name: 'Erowid', institution: 'Erowid Center', type: 'anecdotal', title: 'Nutmeg Combination Reports (Anecdotal)', url: 'https://erowid.org' },
    ],
  },
  {
    drug1: 'cocaine',
    drug2: 'alcohol',
    severity: 'severe',
    mechanism:
      'When cocaine and alcohol are used together, the liver produces cocaethylene — a unique metabolite that is more cardiotoxic than either cocaine or alcohol alone. Cocaethylene has a longer half-life than cocaine and significantly increases the risk of sudden cardiac death and liver toxicity.',
    clinicalNote:
      'This is one of the most documented dangerous substance combinations. Seek immediate emergency care if any cardiovascular symptoms occur.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Cocaine + Alcohol: Cocaethylene Toxicity', url: 'https://nida.nih.gov' },
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', title: 'Polysubstance Use: Cocaine and Alcohol', url: 'https://www.cdc.gov' },
    ],
  },
  {
    drug1: 'cocaine',
    drug2: 'mdma',
    severity: 'severe',
    mechanism:
      'Both cocaine and MDMA are CNS stimulants that exert major cardiovascular strain. Combined, they massively increase heart rate and blood pressure. Both impair thermoregulation; hyperthermia is a life-threatening risk. Additionally, dopaminergic and serotonergic systems are both overloaded.',
    clinicalNote:
      'This combination carries extreme cardiovascular and neurotoxicity risk. Seek emergency care immediately if symptoms arise.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Stimulant Combinations: Cocaine and MDMA', url: 'https://nida.nih.gov' },
      { name: 'PsychonautWiki', institution: 'PsychonautWiki Community', type: 'educational', title: 'Cocaine + MDMA Interaction (Educational)', url: 'https://psychonautwiki.org/wiki/Drug_combinations' },
    ],
  },
  {
    drug1: 'cocaine',
    drug2: 'opioids',
    severity: 'severe',
    mechanism:
      'The "speedball" combination (stimulant + opioid) creates paradoxical cardiovascular and respiratory effects. Opioids suppress respiration and CNS activity while cocaine stimulates the cardiovascular system. As cocaine wears off, the full opioid effect can precipitate fatal respiratory depression.',
    clinicalNote:
      'This combination has been associated with high-profile overdose fatalities. Emergency services should be contacted immediately if respiratory symptoms occur.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Polysubstance Use: Opioids and Stimulants', url: 'https://nida.nih.gov' },
    ],
  },
  {
    drug1: 'mdma',
    drug2: 'maoi',
    severity: 'severe',
    mechanism:
      'MAOIs prevent the breakdown of serotonin. MDMA causes massive serotonin release. Together, they can cause life-threatening serotonin syndrome — characterized by hyperthermia, seizures, and cardiovascular collapse.',
    clinicalNote:
      'This combination is potentially fatal. Serotonin syndrome is a medical emergency. Call emergency services immediately if suspected.',
    sources: [
      { name: 'NIH', institution: 'National Institutes of Health', type: 'governmental', title: 'Serotonin Syndrome — Clinical Review', url: 'https://www.ncbi.nlm.nih.gov' },
      { name: 'FDA', institution: 'U.S. Food and Drug Administration', type: 'governmental', title: 'Drug Safety Communication: Serotonin Syndrome', url: 'https://www.fda.gov' },
    ],
  },
  {
    drug1: 'mdma',
    drug2: 'alcohol',
    severity: 'moderate',
    mechanism:
      'Alcohol increases dehydration while MDMA raises body temperature and promotes fluid loss through activity and sweating. Combined, they increase the risk of severe dehydration, electrolyte imbalance, and hyperthermia. Alcohol also impairs judgment, compounding risky decision-making.',
    clinicalNote:
      'This combination is very commonly encountered. The risks are amplified in warm environments with physical activity. Consult a healthcare professional.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'MDMA (Ecstasy/Molly) DrugFacts', url: 'https://nida.nih.gov' },
    ],
  },
  {
    drug1: 'psilocybin',
    drug2: 'lithium',
    severity: 'severe',
    mechanism:
      'Multiple case reports associate the combination of psilocybin-containing mushrooms and lithium (used for bipolar disorder) with seizures and cardiac arrhythmias. The mechanism is not fully understood but is considered clinically significant.',
    clinicalNote:
      'People prescribed lithium should be specifically aware of this documented risk. Consult a licensed psychiatrist or physician.',
    sources: [
      { name: 'NLM PubMed', institution: 'U.S. National Library of Medicine', type: 'governmental', title: 'Case Reports: Psilocybin + Lithium Seizures', url: 'https://pubmed.ncbi.nlm.nih.gov' },
      { name: 'PsychonautWiki', institution: 'PsychonautWiki Community', type: 'educational', title: 'Psilocybin Combination Risks (Educational)', url: 'https://psychonautwiki.org/wiki/Drug_combinations' },
    ],
  },
  {
    drug1: 'cannabis',
    drug2: 'alcohol',
    severity: 'moderate',
    mechanism:
      'Alcohol significantly increases absorption of THC when consumed together ("greening out" risk). The CNS depressant effects of alcohol combine with cannabis sedation and altered perception. Anxiety, nausea, vomiting, and severe disorientation are commonly reported.',
    clinicalNote:
      'This is one of the most common polydrug combinations. Effects can be significantly more intense than either substance used alone.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Cannabis DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', title: 'Cannabis and Alcohol Co-use', url: 'https://www.cdc.gov' },
    ],
  },
  {
    drug1: 'nutmeg',
    drug2: 'ssri',
    severity: 'moderate',
    mechanism:
      'Myristicin and safrole in nutmeg may have weak serotonergic effects and possible mild MAOI-like activity. Combined with SSRIs, which prevent serotonin reuptake, there is a theoretical risk of serotonin excess. Clinical evidence is limited but the pharmacological overlap is a concern.',
    clinicalNote:
      'People prescribed SSRIs should be aware that high-dose nutmeg (often used recreationally) may carry interaction risks. Consult a pharmacist or physician.',
    sources: [
      { name: 'MedlinePlus', institution: 'U.S. National Library of Medicine', type: 'governmental', title: 'Nutmeg: Drug Interactions Overview', url: 'https://medlineplus.gov' },
      { name: 'Erowid', institution: 'Erowid Center', type: 'anecdotal', title: 'Nutmeg Experience Reports (Anecdotal)', url: 'https://erowid.org' },
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
