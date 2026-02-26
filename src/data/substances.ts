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
  {
    id: 'alcohol',
    name: 'Alcohol',
    commonNames: ['Ethanol', 'Booze', 'Liquor', 'Beer', 'Wine'],
    classification: 'CNS Depressant / Sedative-Hypnotic',
    category: 'depressant',
    legalStatusCR: 'Legal for adults 18+ in Costa Rica. Sale and consumption regulated by Law 9047 (Ley de Regulación y Comercialización de Bebidas con Contenido Alcohólico).',
    legalStatusGlobal: 'Legal in most countries with age restrictions. Some jurisdictions impose partial or total prohibition.',
    generalEffects: 'Alcohol (ethanol) is a central nervous system depressant that enhances GABA activity and inhibits glutamate signaling. It produces dose-dependent effects ranging from mild relaxation and social disinhibition to severe motor impairment, cognitive dysfunction, and loss of consciousness.',
    physicalRisks: [
      'Liver damage including fatty liver, hepatitis, cirrhosis, and liver failure',
      'Cardiovascular effects: cardiomyopathy, arrhythmias, hypertension',
      'Increased risk of multiple cancers (mouth, throat, esophagus, liver, breast)',
      'Gastrointestinal damage: gastritis, pancreatitis, ulcers',
      'Immune system suppression increasing susceptibility to infections',
      'Fetal Alcohol Spectrum Disorders from prenatal exposure',
    ],
    mentalRisks: [
      'High association with depression and anxiety disorders',
      'Impaired judgment leading to risky behavior',
      'Alcohol-induced psychosis in severe cases',
      'Cognitive decline and memory impairment with chronic heavy use',
      'Strong association with suicidal ideation and attempts',
    ],
    shortTermRisks: [
      'Alcohol poisoning — potentially fatal',
      'Severe motor impairment and risk of accidents',
      'Blackouts (anterograde amnesia)',
      'Aspiration of vomit during unconsciousness',
      'Dangerous interactions with numerous medications',
    ],
    longTermRisks: [
      'Alcohol Use Disorder — one of the most common substance use disorders globally',
      'Wernicke-Korsakoff syndrome from thiamine deficiency',
      'Peripheral neuropathy',
      'Life-threatening withdrawal syndrome (delirium tremens) in dependent individuals',
    ],
    dependencyPotential: 'high',
    dependencyNote: 'WHO reports alcohol as one of the leading risk factors for disease burden globally. NIAAA estimates approximately 29.5 million people in the U.S. had Alcohol Use Disorder in 2022. Physical dependence develops with chronic heavy use and withdrawal can be medically dangerous.',
    combinationRisks: [
      { substance: 'Opioids', riskLevel: 'severe', note: 'Combined respiratory depression — leading cause of polysubstance overdose deaths.' },
      { substance: 'Benzodiazepines', riskLevel: 'severe', note: 'Synergistic CNS depression; high risk of respiratory failure and death.' },
      { substance: 'Stimulants', riskLevel: 'dangerous', note: 'Stimulants mask intoxication, leading to dangerous overconsumption of alcohol.' },
      { substance: 'Cannabis', riskLevel: 'dangerous', note: 'Intensified impairment; increased risk of nausea and adverse reactions.' },
    ],
    emergencyWarnings: [
      'Unconsciousness or inability to be awakened',
      'Slow, irregular, or stopped breathing (fewer than 8 breaths per minute)',
      'Seizures',
      'Blue-tinged or pale skin (hypoxia)',
      'Vomiting while unconscious',
      'Hypothermia (abnormally low body temperature)',
    ],
    sources: [
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', title: 'Global Status Report on Alcohol and Health 2024', url: 'https://www.who.int' },
      { name: 'NIAAA', institution: 'National Institute on Alcohol Abuse and Alcoholism', type: 'governmental', title: 'Alcohol Use Disorder: Understanding Alcohol', url: 'https://www.niaaa.nih.gov' },
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Alcohol Research', url: 'https://nida.nih.gov' },
      { name: 'IAFA', institution: 'Instituto sobre Alcoholismo y Farmacodependencia (Costa Rica)', type: 'governmental', title: 'Información sobre Alcohol', url: 'https://www.iafa.go.cr' },
    ],
  },
  {
    id: 'benzodiazepines',
    name: 'Benzodiazepines',
    commonNames: ['Benzos', 'Diazepam', 'Valium', 'Alprazolam', 'Xanax', 'Clonazepam', 'Lorazepam'],
    classification: 'CNS Depressant / Anxiolytic / Sedative-Hypnotic',
    category: 'depressant',
    legalStatusCR: 'Prescription-controlled under Costa Rican pharmaceutical regulations. Non-prescribed possession may result in legal consequences under Law 8204.',
    legalStatusGlobal: 'Controlled under the UN Convention on Psychotropic Substances (Schedule IV). Available by prescription in most countries; non-medical use is illegal.',
    generalEffects: 'Benzodiazepines enhance the effect of GABA at the GABA-A receptor, producing anxiolytic, sedative, hypnotic, muscle relaxant, and anticonvulsant effects. They have a wide range of half-lives depending on the specific compound.',
    physicalRisks: [
      'Respiratory depression, especially in combination with other depressants',
      'Excessive sedation and impaired coordination',
      'Anterograde amnesia (inability to form new memories during effects)',
      'Paradoxical reactions (agitation, aggression) in some individuals',
      'Falls and fractures, particularly in elderly populations',
    ],
    mentalRisks: [
      'Cognitive impairment with chronic use',
      'Rebound anxiety and insomnia upon discontinuation',
      'Depression and emotional blunting with long-term use',
      'Psychological dependence can develop rapidly',
    ],
    shortTermRisks: [
      'Severe sedation and respiratory depression when combined with opioids or alcohol',
      'Disinhibition leading to risky behaviors',
      'Memory blackouts',
      'Impaired driving and operating machinery',
    ],
    longTermRisks: [
      'Physical dependence — can develop within weeks of daily use',
      'Life-threatening withdrawal syndrome (seizures, delirium) with abrupt discontinuation',
      'Association with increased dementia risk in some epidemiological studies',
      'Tolerance requiring escalating doses',
    ],
    dependencyPotential: 'high',
    dependencyNote: 'NIDA and WHO classify benzodiazepines as having significant dependence potential. Physical dependence can develop in as little as 2–4 weeks of daily use. Withdrawal must be medically supervised due to seizure risk.',
    combinationRisks: [
      { substance: 'Opioids', riskLevel: 'severe', note: 'Leading cause of polysubstance overdose deaths. Combined respiratory depression is frequently fatal.' },
      { substance: 'Alcohol', riskLevel: 'severe', note: 'Synergistic CNS depression with high risk of respiratory failure.' },
      { substance: 'Other Sedatives', riskLevel: 'severe', note: 'Compounded sedation and respiratory risk.' },
      { substance: 'Stimulants', riskLevel: 'caution', note: 'Stimulants may mask sedation, leading to overconsumption.' },
    ],
    emergencyWarnings: [
      'Extreme drowsiness or inability to be awakened',
      'Slowed or stopped breathing',
      'Blue lips or fingertips',
      'Seizures (especially during withdrawal)',
      'Confusion or delirium',
      'Loss of consciousness',
    ],
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Prescription CNS Depressants DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', title: 'Benzodiazepines: WHO Expert Committee on Drug Dependence', url: 'https://www.who.int' },
      { name: 'FDA', institution: 'U.S. Food and Drug Administration', type: 'governmental', title: 'FDA Boxed Warning: Benzodiazepines and Opioids', url: 'https://www.fda.gov' },
    ],
  },
  {
    id: 'opioids',
    name: 'Opioids',
    commonNames: ['Heroin', 'Fentanyl', 'Morphine', 'Oxycodone', 'Codeine', 'Tramadol', 'Methadone'],
    classification: 'Opioid Analgesic / CNS Depressant',
    category: 'opioid',
    legalStatusCR: 'Opioids are strictly controlled under Costa Rica\'s Law 8204. Prescription opioids require medical authorization; illicit opioids carry severe criminal penalties.',
    legalStatusGlobal: 'Controlled under the UN Single Convention on Narcotic Drugs. Medical use is permitted under prescription; non-medical use is illegal in virtually all jurisdictions.',
    generalEffects: 'Opioids bind to mu, delta, and kappa opioid receptors in the brain and body, producing analgesia, euphoria, sedation, and respiratory depression. They are among the most effective analgesics known but carry extremely high risks of dependence and fatal overdose.',
    physicalRisks: [
      'Respiratory depression — the primary mechanism of opioid overdose death',
      'Severe constipation and gastrointestinal dysfunction',
      'Hormonal disruption (hypogonadism) with chronic use',
      'Increased risk from illicit supply contaminated with fentanyl or analogues',
      'Neonatal Abstinence Syndrome from prenatal exposure',
      'Injection-related risks: HIV, hepatitis, endocarditis, abscesses',
    ],
    mentalRisks: [
      'Rapid development of psychological dependence',
      'Opioid-induced hyperalgesia (paradoxical increase in pain sensitivity)',
      'Depression and emotional dysregulation',
      'Social isolation and functional decline',
    ],
    shortTermRisks: [
      'Fatal overdose — particularly with fentanyl contamination',
      'Respiratory arrest',
      'Loss of consciousness',
      'Aspiration',
      'Severe nausea and vomiting',
    ],
    longTermRisks: [
      'Opioid Use Disorder — among the highest dependency rates of any substance class',
      'Tolerance requiring dose escalation',
      'Severe withdrawal syndrome (not typically fatal but extremely distressing)',
      'Long-term cognitive effects',
    ],
    dependencyPotential: 'very high',
    dependencyNote: 'WHO and NIDA identify opioids as having the highest addiction potential among commonly used substances. The global opioid crisis has resulted in over 80,000 overdose deaths annually in the U.S. alone. Naloxone is a life-saving reversal agent.',
    combinationRisks: [
      { substance: 'Benzodiazepines', riskLevel: 'severe', note: 'FDA boxed warning. Combined respiratory depression is the leading cause of polysubstance overdose deaths.' },
      { substance: 'Alcohol', riskLevel: 'severe', note: 'Synergistic CNS and respiratory depression; frequently fatal.' },
      { substance: 'Stimulants', riskLevel: 'dangerous', note: '"Speedball" combinations mask overdose warning signs.' },
      { substance: 'Other Opioids', riskLevel: 'severe', note: 'Additive respiratory depression; especially dangerous with fentanyl.' },
    ],
    emergencyWarnings: [
      'Slow, shallow, or stopped breathing',
      'Blue or gray lips, fingernails, or skin',
      'Pinpoint pupils',
      'Unresponsiveness — cannot be awakened',
      'Gurgling or choking sounds',
      'Administer naloxone (Narcan) if available and call emergency services immediately',
    ],
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Opioid Overdose Crisis', url: 'https://nida.nih.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', title: 'Opioid Overdose: WHO Fact Sheet', url: 'https://www.who.int' },
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', title: 'Understanding the Opioid Overdose Epidemic', url: 'https://www.cdc.gov' },
      { name: 'IAFA', institution: 'Instituto sobre Alcoholismo y Farmacodependencia (Costa Rica)', type: 'governmental', title: 'Opioides: Información y Prevención', url: 'https://www.iafa.go.cr' },
    ],
  },
  {
    id: 'nicotine',
    name: 'Nicotine',
    commonNames: ['Tobacco', 'Cigarettes', 'Vaping', 'E-cigarettes', 'Cigarro', 'Tabaco'],
    classification: 'Stimulant / Cholinergic Agonist',
    category: 'stimulant',
    legalStatusCR: 'Legal for adults 18+ in Costa Rica. Regulated under Law 9028 (Ley General de Control del Tabaco). Advertising restrictions and public smoking bans apply.',
    legalStatusGlobal: 'Legal in virtually all jurisdictions with age restrictions. Subject to the WHO Framework Convention on Tobacco Control (FCTC).',
    generalEffects: 'Nicotine acts as an agonist at nicotinic acetylcholine receptors (nAChRs), producing rapid stimulation of the CNS. It triggers dopamine release in the nucleus accumbens, creating reinforcing effects. Subjective effects include alertness, reduced anxiety, and appetite suppression.',
    physicalRisks: [
      'Tobacco smoking is the leading cause of preventable death worldwide',
      'Lung cancer, COPD, and chronic bronchitis from combustion products',
      'Cardiovascular disease: heart attack, stroke, peripheral artery disease',
      'Oral, throat, bladder, and pancreatic cancers',
      'Nicotine itself elevates heart rate and blood pressure',
      'Vaping-related lung injury (EVALI) reported with certain products',
    ],
    mentalRisks: [
      'Extremely rapid development of dependence',
      'Anxiety and irritability during withdrawal',
      'Difficulty concentrating without nicotine in dependent users',
      'Mood dysregulation during cessation attempts',
    ],
    shortTermRisks: [
      'Nicotine poisoning from excessive intake (especially in children or liquid nicotine exposure)',
      'Dizziness, nausea, and vomiting in naive users',
      'Elevated heart rate and blood pressure',
      'Vasoconstriction',
    ],
    longTermRisks: [
      'Nicotine dependence — among the most addictive substances known',
      'Tobacco-related cancers and respiratory disease',
      'Cardiovascular disease',
      'Premature aging and wound healing impairment',
    ],
    dependencyPotential: 'very high',
    dependencyNote: 'WHO identifies tobacco use as the leading preventable cause of death globally (over 8 million deaths/year). NIDA reports that nicotine is one of the most addictive substances, with most users becoming dependent. Cessation support (behavioral and pharmacological) significantly improves quit rates.',
    combinationRisks: [
      { substance: 'Stimulants', riskLevel: 'caution', note: 'Compounded cardiovascular stress.' },
      { substance: 'Oral Contraceptives', riskLevel: 'dangerous', note: 'Significantly increases risk of blood clots, stroke, and heart attack in women over 35.' },
      { substance: 'MAOIs', riskLevel: 'caution', note: 'Tobacco smoke contains MAO inhibitors; interaction complexity with MAOI medications.' },
    ],
    emergencyWarnings: [
      'Seizures (nicotine poisoning, especially in children)',
      'Severe vomiting and inability to retain fluids',
      'Rapid or irregular heartbeat',
      'Difficulty breathing',
      'Collapse or loss of consciousness',
    ],
    sources: [
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', title: 'Tobacco: WHO Fact Sheet', url: 'https://www.who.int' },
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Tobacco, Nicotine, and E-Cigarettes DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', title: 'Health Effects of Cigarette Smoking', url: 'https://www.cdc.gov' },
      { name: 'IAFA', institution: 'Instituto sobre Alcoholismo y Farmacodependencia (Costa Rica)', type: 'governmental', title: 'Tabaquismo: Prevención y Tratamiento', url: 'https://www.iafa.go.cr' },
    ],
  },
  {
    id: 'ketamine',
    name: 'Ketamine',
    commonNames: ['Keta', 'Special K', 'K', 'Vitamin K'],
    classification: 'Dissociative Anesthetic / NMDA Antagonist',
    category: 'dissociative',
    legalStatusCR: 'Ketamine is a controlled pharmaceutical in Costa Rica. Medical use requires authorization; non-medical possession and distribution are subject to penalties under Law 8204.',
    legalStatusGlobal: 'Listed on the WHO Model List of Essential Medicines for anesthesia. Controlled under national drug laws in most countries; Schedule III in the United States.',
    generalEffects: 'Ketamine primarily blocks NMDA glutamate receptors, producing dose-dependent dissociative anesthesia. At sub-anesthetic doses it causes altered perception, detachment from surroundings, and analgesic effects. It has rapid-acting antidepressant properties being studied for treatment-resistant depression.',
    physicalRisks: [
      'Urological damage (ketamine bladder syndrome) with chronic use — potentially irreversible',
      'Elevated blood pressure and heart rate',
      'Nausea and vomiting',
      'Impaired motor function and risk of injury',
      'Respiratory depression at high doses',
    ],
    mentalRisks: [
      'Dissociative episodes and derealization',
      'Cognitive impairment with chronic use',
      'Psychological dependence',
      'Exacerbation of psychotic symptoms in vulnerable individuals',
      'Distressing "K-hole" experiences at high doses',
    ],
    shortTermRisks: [
      'Complete dissociation ("K-hole") with inability to move or communicate',
      'Risk of aspiration if vomiting while dissociated',
      'Accidental injury due to numbness and disorientation',
      'Dangerous in unsupervised settings',
    ],
    longTermRisks: [
      'Ketamine bladder syndrome: painful urination, incontinence, bladder shrinkage',
      'Liver and biliary tract damage',
      'Cognitive decline with heavy chronic use',
      'Psychological dependence',
    ],
    dependencyPotential: 'moderate',
    dependencyNote: 'WHO reports increasing non-medical use globally. Physical dependence is less severe than with opioids or alcohol, but psychological dependence can develop with regular use. Tolerance develops rapidly.',
    combinationRisks: [
      { substance: 'Alcohol', riskLevel: 'dangerous', note: 'Combined CNS depression; high risk of respiratory compromise and aspiration.' },
      { substance: 'Opioids', riskLevel: 'severe', note: 'Synergistic respiratory depression.' },
      { substance: 'Benzodiazepines', riskLevel: 'dangerous', note: 'Compounded sedation and respiratory risk.' },
      { substance: 'Stimulants', riskLevel: 'caution', note: 'Cardiovascular strain; may mask level of intoxication.' },
    ],
    emergencyWarnings: [
      'Respiratory distress or stopped breathing',
      'Unresponsiveness beyond expected duration',
      'Severe vomiting while unconscious',
      'Chest pain or cardiac symptoms',
      'Extreme agitation or psychotic symptoms',
      'Inability to urinate or blood in urine (chronic use)',
    ],
    sources: [
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', title: 'Ketamine: WHO Expert Committee on Drug Dependence', url: 'https://www.who.int' },
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Hallucinogens and Dissociative Drugs DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'NIH', institution: 'National Institutes of Health', type: 'governmental', title: 'Ketamine for Treatment-Resistant Depression', url: 'https://www.nih.gov' },
      { name: 'PsychonautWiki', institution: 'PsychonautWiki Community', type: 'educational', title: 'Ketamine — Pharmacology & Effects (Education)', url: 'https://psychonautwiki.org' },
    ],
  },
  {
    id: 'amphetamines',
    name: 'Amphetamines',
    commonNames: ['Speed', 'Adderall', 'Dexedrine', 'Methamphetamine', 'Crystal Meth', 'Anfetaminas'],
    classification: 'Stimulant / Sympathomimetic Amine',
    category: 'stimulant',
    legalStatusCR: 'Amphetamines are controlled substances under Costa Rica\'s Law 8204. Prescription use (e.g., for ADHD) requires medical authorization; illicit amphetamines carry significant criminal penalties.',
    legalStatusGlobal: 'Controlled under the UN Convention on Psychotropic Substances (Schedule II). Prescription amphetamines are available for ADHD and narcolepsy; methamphetamine is more strictly controlled.',
    generalEffects: 'Amphetamines increase the release and block the reuptake of dopamine, norepinephrine, and serotonin. They produce increased alertness, energy, confidence, and euphoria. Effects and risks vary significantly between pharmaceutical-grade and illicit preparations, with methamphetamine being notably more potent and neurotoxic.',
    physicalRisks: [
      'Cardiovascular stress: tachycardia, hypertension, arrhythmias',
      'Hyperthermia, especially with physical exertion',
      'Weight loss and malnutrition with chronic use',
      'Dental damage ("meth mouth") particularly with methamphetamine',
      'Stroke and cardiovascular events',
      'Skin picking and sores in chronic methamphetamine users',
    ],
    mentalRisks: [
      'Amphetamine-induced psychosis (paranoia, hallucinations) with heavy use',
      'Severe anxiety and panic attacks',
      'Aggressive or violent behavior',
      'Depression and anhedonia during withdrawal and chronic use',
      'Cognitive deficits with chronic methamphetamine use',
    ],
    shortTermRisks: [
      'Cardiovascular emergencies: heart attack, stroke',
      'Hyperthermia',
      'Seizures at high doses',
      'Psychotic episodes',
      'Extreme agitation and dangerous behavior',
    ],
    longTermRisks: [
      'Amphetamine Use Disorder',
      'Neurotoxic effects on dopaminergic neurons (especially methamphetamine)',
      'Lasting cognitive and emotional dysregulation',
      'Cardiovascular damage',
      'Severe dental and dermatological damage (methamphetamine)',
    ],
    dependencyPotential: 'high',
    dependencyNote: 'NIDA reports high addiction potential, particularly for methamphetamine. Dependence involves intense cravings, tolerance, and a severe withdrawal syndrome characterized by depression, fatigue, and increased appetite. Prescription amphetamines carry lower but still significant risk when misused.',
    combinationRisks: [
      { substance: 'MAOIs', riskLevel: 'severe', note: 'Risk of hypertensive crisis — potentially fatal.' },
      { substance: 'Other Stimulants', riskLevel: 'severe', note: 'Extreme cardiovascular stress and risk of cardiac events.' },
      { substance: 'MDMA', riskLevel: 'dangerous', note: 'Compounded neurotoxicity and cardiovascular strain.' },
      { substance: 'Alcohol', riskLevel: 'dangerous', note: 'Masks intoxication leading to dangerous overconsumption.' },
    ],
    emergencyWarnings: [
      'Chest pain or pressure (possible cardiac event)',
      'Severe headache with confusion (possible stroke)',
      'Body temperature feeling extremely elevated',
      'Seizures',
      'Psychotic symptoms: paranoia, hallucinations, severe agitation',
      'Loss of consciousness',
    ],
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', title: 'Methamphetamine DrugFacts', url: 'https://nida.nih.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', title: 'Amphetamine-Type Stimulants: WHO Technical Report', url: 'https://www.who.int' },
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', title: 'Stimulant Guide for Healthcare Providers', url: 'https://www.cdc.gov' },
      { name: 'PsychonautWiki', institution: 'PsychonautWiki Community', type: 'educational', title: 'Amphetamine — Pharmacology & Effects (Education)', url: 'https://psychonautwiki.org' },
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
