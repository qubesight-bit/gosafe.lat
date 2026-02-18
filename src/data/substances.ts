export interface SubstanceSource {
  name: string;
  institution: string;
  type: 'governmental' | 'academic' | 'educational' | 'anecdotal';
  title: string;
  url?: string;
}

export interface Substance {
  id: string;
  name: string;
  commonNames: string[];
  classification: string;
  category: 'stimulant' | 'depressant' | 'psychedelic' | 'dissociative' | 'opioid' | 'cannabinoid' | 'entactogen' | 'other';
  legalStatusCR: string;
  legalStatusGlobal: string;
  generalEffects: string;
  physicalRisks: string[];
  mentalRisks: string[];
  shortTermRisks: string[];
  longTermRisks: string[];
  dependencyPotential: 'low' | 'moderate' | 'high' | 'very high';
  dependencyNote: string;
  combinationRisks: { substance: string; riskLevel: 'caution' | 'dangerous' | 'severe'; note: string }[];
  emergencyWarnings: string[];
  sources: SubstanceSource[];
}

export const substances: Substance[] = [
  {
    id: 'cannabis',
    name: 'Cannabis',
    commonNames: ['Marijuana', 'Marihuana', 'THC', 'CBD'],
    classification: 'Cannabinoid',
    category: 'cannabinoid',
    legalStatusCR:
      'Possession and use are subject to Law 8204 in Costa Rica. Cannabis for personal use may result in administrative sanctions; medicinal cannabis is regulated under specific legislation.',
    legalStatusGlobal:
      'Legal status varies widely by jurisdiction — from fully legal in some states/countries to strictly prohibited in others. Consult local regulations.',
    generalEffects:
      'Cannabis contains over 100 cannabinoids, primarily THC (tetrahydrocannabinol) and CBD (cannabidiol). Effects vary significantly by strain, preparation, individual biology, and context. THC interacts with the endocannabinoid system, producing altered sensory perception, mood changes, and cognitive effects. CBD has distinct pharmacological properties with different effect profiles.',
    physicalRisks: [
      'Respiratory effects associated with combustion-based use methods',
      'Cardiovascular effects including temporary increase in heart rate',
      'Impaired motor coordination affecting ability to operate vehicles or machinery',
      'Potential interaction with certain medications',
      'Effects on developing brains in adolescent use',
    ],
    mentalRisks: [
      'Possible anxiety or paranoia, particularly with high-THC preparations',
      'Association with psychosis risk in vulnerable individuals, particularly with heavy use',
      'Cognitive effects on memory and attention with chronic use',
      'Potential exacerbation of existing mental health conditions',
    ],
    shortTermRisks: [
      'Impaired judgment and coordination',
      'Altered time perception',
      'Short-term memory impairment during acute effects',
      'Anxiety or panic episodes in some individuals',
    ],
    longTermRisks: [
      'Cannabis Use Disorder in heavy, frequent users',
      'Potential respiratory effects with combustion-based use',
      'Cognitive changes with chronic heavy use, particularly in adolescents',
      'Amotivational syndrome reported in some chronic heavy users',
    ],
    dependencyPotential: 'moderate',
    dependencyNote:
      'Approximately 9% of people who use cannabis develop Cannabis Use Disorder, according to NIDA. Risk increases with early initiation age and frequency of use.',
    combinationRisks: [
      { substance: 'Alcohol', riskLevel: 'dangerous', note: 'Combined use can significantly intensify impairment and increase risk of adverse reactions.' },
      { substance: 'Other CNS Depressants', riskLevel: 'caution', note: 'Combined sedative effects may be amplified.' },
      { substance: 'Stimulants', riskLevel: 'caution', note: 'Cardiovascular stress may be increased.' },
    ],
    emergencyWarnings: [
      'Severe chest pain or palpitations',
      'Loss of consciousness',
      'Extreme confusion or inability to recognize surroundings',
      'Symptoms of psychosis (hallucinations, severe paranoia, disorganized thinking)',
      'Breathing difficulties',
    ],
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Cannabis (Marijuana) DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', title: 'Cannabis: WHO Expert Review', url: 'https://www.who.int' },
      { name: 'PsychonautWiki', institution: 'PsychonautWiki Community', type: 'educational', title: 'Cannabis — Pharmacology & Effects (Education)', url: 'https://psychonautwiki.org' },
    ],
  },
  {
    id: 'mdma',
    name: 'MDMA',
    commonNames: ['Ecstasy', 'Molly', '3,4-methylenedioxymethamphetamine'],
    classification: 'Entactogen / Empathogen',
    category: 'entactogen',
    legalStatusCR:
      'MDMA is classified as a controlled substance under Costa Rican law (Law 8204). Possession, sale, and manufacture are subject to criminal penalties.',
    legalStatusGlobal:
      'Internationally controlled under the UN Convention on Psychotropic Substances (Schedule I). Some jurisdictions have authorized limited clinical research use.',
    generalEffects:
      'MDMA primarily acts by causing massive release of serotonin, dopamine, and norepinephrine from presynaptic neurons, while simultaneously inhibiting their reuptake. This produces pronounced increases in mood, emotional closeness, and energy. Effects typically last 3–5 hours.',
    physicalRisks: [
      'Significant elevation of body temperature (hyperthermia) — a leading cause of MDMA-related emergencies',
      'Hyponatremia (dangerous drop in sodium) if excessive water is consumed',
      'Cardiovascular stress: elevated heart rate and blood pressure',
      'Jaw tension (bruxism) and muscle cramping',
      'Potential for adulterants in unregulated products (extremely high risk factor)',
    ],
    mentalRisks: [
      '"Comedown" period with low mood, fatigue, and cognitive impairment lasting days after use',
      'Potential for serotonin-related mood dysregulation with repeated use',
      'Exacerbation of underlying anxiety or depressive disorders',
      'Risk of psychological dependence in frequent users',
    ],
    shortTermRisks: [
      'Life-threatening hyperthermia in environments with high physical activity and heat',
      'Serotonin syndrome if combined with serotonergic medications',
      'Cardiovascular events in individuals with underlying heart conditions',
      'Severe dehydration or dangerous overhydration',
    ],
    longTermRisks: [
      'Neurotoxic effects on serotonergic neurons documented in animal studies; human relevance debated',
      'Persistent changes in mood, cognition, and sleep patterns in heavy users',
      'Risk of developing depressive or anxiety disorders',
    ],
    dependencyPotential: 'moderate',
    dependencyNote:
      'Physical dependence is considered lower than with opioids or alcohol, but psychological dependence can develop. NIDA notes that some people do develop compulsive use patterns.',
    combinationRisks: [
      { substance: 'MAOIs', riskLevel: 'severe', note: 'Risk of potentially fatal serotonin syndrome — a medical emergency.' },
      { substance: 'SSRIs / SNRIs', riskLevel: 'severe', note: 'Risk of serotonin syndrome; SSRIs may also block or alter MDMA effects.' },
      { substance: 'Stimulants', riskLevel: 'dangerous', note: 'Compounded cardiovascular strain.' },
      { substance: 'Alcohol', riskLevel: 'caution', note: 'Increased dehydration risk and impairment of judgment.' },
    ],
    emergencyWarnings: [
      'Body temperature feeling extremely elevated, hot skin, confusion (hyperthermia — call emergency services immediately)',
      'Seizures',
      'Loss of consciousness',
      'Chest pain or irregular heartbeat',
      'Severe confusion, agitation, or psychotic symptoms',
      'Muscle rigidity combined with fever and confusion (possible serotonin syndrome)',
    ],
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'MDMA (Ecstasy/Molly) DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'NIMH', institution: 'National Institute of Mental Health', type: 'governmental', title: 'Mental Health & MDMA Research Overview', url: 'https://nimh.nih.gov' },
      { name: 'PsychonautWiki', institution: 'PsychonautWiki Community', type: 'educational', title: 'MDMA — Pharmacology & Toxicity (Education)', url: 'https://psychonautwiki.org' },
    ],
  },
  {
    id: 'psilocybin',
    name: 'Psilocybin',
    commonNames: ['Magic Mushrooms', 'Hongos', 'Shrooms', 'Psilocybe'],
    classification: 'Classical Psychedelic / Serotonergic Hallucinogen',
    category: 'psychedelic',
    legalStatusCR:
      'Psilocybin-containing mushrooms and psilocybin itself are controlled substances under Costa Rican law. Possession and distribution are subject to criminal penalties.',
    legalStatusGlobal:
      'Internationally listed as a Schedule I substance under the UN Convention on Psychotropic Substances. Some jurisdictions have decriminalized or authorized research use.',
    generalEffects:
      'Psilocybin is a prodrug converted to psilocin in the body, which acts as a partial agonist at serotonin receptors (primarily 5-HT2A). This produces altered perception, cognition, and emotion. Subjective effects are highly variable and context-dependent.',
    physicalRisks: [
      'Nausea and gastrointestinal discomfort',
      'Elevated heart rate and blood pressure',
      'Pupil dilation',
      'Temperature dysregulation',
      'Potential for accidental injury due to altered perception and coordination',
    ],
    mentalRisks: [
      'Acute psychological distress ("difficult experience") particularly in unsupportive environments',
      'Potential for precipitating or exacerbating latent psychotic disorders',
      'Hallucinogen Persisting Perception Disorder (HPPD) reported in some individuals',
      'Intense emotional experiences that may be destabilizing for vulnerable individuals',
    ],
    shortTermRisks: [
      'Severe anxiety or panic',
      'Paranoia and confusion',
      'Risk of accidental injury due to impaired perception',
      'Psychological crisis in individuals with predispositions to psychotic conditions',
    ],
    longTermRisks: [
      'HPPD — persistent perceptual disturbances reported in a minority of users',
      'Potential for lasting psychological effects from intense experiences',
      'Extremely low physiological dependence potential (NIDA data)',
    ],
    dependencyPotential: 'low',
    dependencyNote:
      'Psilocybin does not produce physical dependence and rapid tolerance development typically discourages frequent use. NIDA classifies it as having low addiction potential.',
    combinationRisks: [
      { substance: 'Lithium', riskLevel: 'severe', note: 'Multiple reports of seizures associated with this combination.' },
      { substance: 'Stimulants', riskLevel: 'dangerous', note: 'Significant cardiovascular strain and potential for psychological overwhelm.' },
      { substance: 'Cannabis', riskLevel: 'caution', note: 'Can intensify and unpredictably alter the psychedelic experience.' },
    ],
    emergencyWarnings: [
      'Severe psychological crisis, extreme paranoia, or break from reality',
      'Seizures',
      'Cardiovascular distress',
      'Accidental injury from disorientation',
      'Unresponsiveness or loss of consciousness',
    ],
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Psilocybin and Hallucinogens DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'NIH', institution: 'National Institutes of Health', type: 'governmental', title: 'Research on Psilocybin — National Cancer Institute', url: 'https://www.nih.gov' },
      { name: 'PsychonautWiki', institution: 'PsychonautWiki Community', type: 'educational', title: 'Psilocybin — Pharmacology (Education)', url: 'https://psychonautwiki.org' },
      { name: 'Erowid', institution: 'Erowid Center', type: 'anecdotal', title: 'Psilocybin Mushrooms Vault — Experience Reports (Anecdotal)', url: 'https://erowid.org' },
    ],
  },
  {
    id: 'cocaine',
    name: 'Cocaine',
    commonNames: ['Coke', 'Coca', 'Polvo', 'Crack (freebase form)'],
    classification: 'Stimulant / Local Anesthetic',
    category: 'stimulant',
    legalStatusCR:
      'Cocaine is a Schedule I controlled substance under Costa Rica\'s Law 8204. Possession, trafficking, and manufacturing carry significant criminal penalties.',
    legalStatusGlobal:
      'Controlled under Schedule I of the UN Single Convention on Narcotic Drugs. Illegal for non-medical use in virtually all jurisdictions.',
    generalEffects:
      'Cocaine is a potent central nervous system stimulant that blocks the reuptake of dopamine, norepinephrine, and serotonin. This results in rapid accumulation of these neurotransmitters. Effects are short-lived relative to other stimulants, creating strong motivation for repeated use.',
    physicalRisks: [
      'Severe cardiovascular effects: rapid heart rate, elevated blood pressure, risk of heart attack',
      'Risk of stroke, even in young adults without prior cardiovascular conditions',
      'Damage to nasal tissues with inhalation-based use',
      'Pulmonary complications',
      'Weight loss and nutritional deficiency with chronic use',
      'Increased risk with contaminants in unregulated supply',
    ],
    mentalRisks: [
      'High potential for psychological dependence',
      'Cocaine-induced psychosis (paranoia, hallucinations) with heavy use',
      'Severe depression and anhedonia during withdrawal and chronic use',
      'Anxiety disorders and panic attacks',
    ],
    shortTermRisks: [
      'Cardiac events including myocardial infarction, even with first use',
      'Stroke',
      'Seizures',
      'Extreme agitation or violent behavior',
    ],
    longTermRisks: [
      'Cocaine Use Disorder — high dependency risk',
      'Lasting cardiovascular damage',
      'Neurological changes affecting cognition and emotional regulation',
      'Severe psychiatric disorders',
    ],
    dependencyPotential: 'very high',
    dependencyNote:
      'Cocaine has one of the highest addiction potentials of all stimulants. NIDA reports that approximately 15–20% of people who try cocaine will develop addiction.',
    combinationRisks: [
      { substance: 'Alcohol', riskLevel: 'dangerous', note: 'Forms cocaethylene in the liver — more toxic to the heart than either substance alone.' },
      { substance: 'Opioids', riskLevel: 'severe', note: '"Speedball" — historically associated with high-profile fatalities. Severe respiratory and cardiac risk.' },
      { substance: 'Other Stimulants', riskLevel: 'severe', note: 'Extreme cardiovascular stress.' },
    ],
    emergencyWarnings: [
      'Chest pain, pressure, or tightening (possible cardiac event — call emergency services immediately)',
      'Sudden severe headache (possible stroke)',
      'Seizures',
      'Extreme confusion or unresponsiveness',
      'Breathing difficulties',
      'Irregular or racing heartbeat',
    ],
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Cocaine DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', title: 'Stimulant Overdose: Clinical Guidance', url: 'https://www.cdc.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', title: 'Cocaine: WHO Expert Committee on Drug Dependence', url: 'https://www.who.int' },
    ],
  },
];

export const categoryColors: Record<string, string> = {
  stimulant: 'bg-orange-50 text-orange-700 border-orange-200',
  depressant: 'bg-blue-50 text-blue-700 border-blue-200',
  psychedelic: 'bg-purple-50 text-purple-700 border-purple-200',
  dissociative: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  opioid: 'bg-red-50 text-red-700 border-red-200',
  cannabinoid: 'bg-green-50 text-green-700 border-green-200',
  entactogen: 'bg-pink-50 text-pink-700 border-pink-200',
  other: 'bg-gray-50 text-gray-700 border-gray-200',
};

export const dependencyColors: Record<string, string> = {
  low: 'severity-none',
  moderate: 'severity-mild',
  high: 'severity-moderate',
  'very high': 'severity-severe',
};
