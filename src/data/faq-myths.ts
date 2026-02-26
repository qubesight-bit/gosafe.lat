export interface FAQSource {
  name: string;
  institution: string;
  type: 'governmental' | 'academic' | 'educational';
  url: string;
}

export interface MythEntry {
  id: string;
  category: 'general' | 'alcohol' | 'cannabis' | 'opioids' | 'stimulants' | 'psychedelics' | 'combinations';
  myth: string;
  reality: string;
  details: string;
  sources: FAQSource[];
}

export const categoryLabels: Record<string, string> = {
  general: 'General',
  alcohol: 'Alcohol',
  cannabis: 'Cannabis',
  opioids: 'Opioids',
  stimulants: 'Stimulants',
  psychedelics: 'Psychedelics',
  combinations: 'Combinations',
};

export const myths: MythEntry[] = [
  {
    id: 'coffee-sobers-you',
    category: 'alcohol',
    myth: '"Coffee sobers you up after drinking."',
    reality: 'Coffee does not reduce blood alcohol concentration or reverse impairment.',
    details:
      'Caffeine is a stimulant that may make an intoxicated person feel more alert, but it does not accelerate alcohol metabolism or improve motor coordination, reaction time, or judgment. This false sense of sobriety can lead to dangerous decisions such as driving. The liver metabolizes alcohol at a fixed rate of approximately one standard drink per hour regardless of caffeine intake.',
    sources: [
      { name: 'NIAAA', institution: 'National Institute on Alcohol Abuse and Alcoholism', type: 'governmental', url: 'https://www.niaaa.nih.gov' },
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', url: 'https://www.cdc.gov' },
    ],
  },
  {
    id: 'alcohol-warms-you',
    category: 'alcohol',
    myth: '"Alcohol warms you up in cold weather."',
    reality: 'Alcohol causes vasodilation, which actually accelerates heat loss and increases hypothermia risk.',
    details:
      'While alcohol produces a sensation of warmth by dilating blood vessels near the skin surface, this process actually draws heat away from vital organs and increases the rate of heat loss. In cold environments, this can dangerously accelerate hypothermia. Multiple studies confirm that alcohol impairs thermoregulation and is a significant risk factor for cold-weather deaths.',
    sources: [
      { name: 'NIH', institution: 'National Institutes of Health', type: 'governmental', url: 'https://www.nih.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', url: 'https://www.who.int' },
    ],
  },
  {
    id: 'cannabis-not-addictive',
    category: 'cannabis',
    myth: '"Cannabis is not addictive."',
    reality: 'Approximately 9% of cannabis users develop Cannabis Use Disorder, rising to 17% among those who start in adolescence.',
    details:
      'While cannabis has a lower dependency rate than substances like nicotine or opioids, it can produce clinically significant dependence. Cannabis Use Disorder is a recognized diagnosis in the DSM-5. Withdrawal symptoms include irritability, sleep difficulties, decreased appetite, cravings, and anxiety. Risk factors include early age of initiation, frequency of use, and use of high-potency products.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', url: 'https://www.who.int' },
    ],
  },
  {
    id: 'cannabis-harmless-natural',
    category: 'cannabis',
    myth: '"Cannabis is harmless because it\'s natural."',
    reality: 'Being natural does not equal being safe. Cannabis carries documented risks, particularly for adolescents and heavy users.',
    details:
      'Many naturally occurring substances are toxic or harmful (e.g., tobacco, poison hemlock, amanita mushrooms). Cannabis use is associated with respiratory risks from combustion, cognitive effects during brain development, cardiovascular effects, and mental health risks including increased psychosis risk in genetically predisposed individuals. The naturalistic fallacy should not guide health decisions.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
      { name: 'NIH', institution: 'National Institutes of Health', type: 'governmental', url: 'https://www.nih.gov' },
    ],
  },
  {
    id: 'opioid-prescription-safe',
    category: 'opioids',
    myth: '"Prescription opioids are safe because a doctor prescribed them."',
    reality: 'Prescription opioids carry the same fundamental risks as illicit opioids, including dependence and fatal overdose.',
    details:
      'Prescription opioids (oxycodone, hydrocodone, etc.) act on the same receptors as heroin and fentanyl. The opioid crisis was largely driven by overprescription of pharmaceutical opioids. The CDC reports that roughly 21–29% of patients prescribed opioids for chronic pain misuse them, and 8–12% develop an opioid use disorder. Medical supervision reduces but does not eliminate risks.',
    sources: [
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', url: 'https://www.cdc.gov' },
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
    ],
  },
  {
    id: 'naloxone-encourages-use',
    category: 'opioids',
    myth: '"Providing naloxone encourages drug use."',
    reality: 'Research consistently shows naloxone availability does not increase opioid use and saves thousands of lives annually.',
    details:
      'Multiple peer-reviewed studies and public health data demonstrate that naloxone distribution programs reduce overdose deaths without increasing drug use rates. The WHO, CDC, and Surgeon General all recommend expanding naloxone access. Naloxone is on the WHO Model List of Essential Medicines. Withholding a life-saving medication based on this myth costs lives.',
    sources: [
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', url: 'https://www.who.int' },
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', url: 'https://www.cdc.gov' },
      { name: 'NIH', institution: 'National Institutes of Health', type: 'governmental', url: 'https://www.nih.gov' },
    ],
  },
  {
    id: 'stimulants-enhance-performance',
    category: 'stimulants',
    myth: '"Stimulants like Adderall make everyone smarter."',
    reality: 'In individuals without ADHD, stimulants primarily increase wakefulness and confidence, not actual cognitive performance.',
    details:
      'Research shows that while stimulants can increase subjective feelings of focus and performance, objective measures of cognitive enhancement in neurotypical individuals are modest at best. Studies find minimal improvement in complex cognitive tasks and potential impairment in creative thinking. Additionally, non-medical stimulant use carries cardiovascular risks, dependence potential, and can worsen anxiety.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
      { name: 'NIH', institution: 'National Institutes of Health', type: 'governmental', url: 'https://www.nih.gov' },
    ],
  },
  {
    id: 'cocaine-not-addictive-occasional',
    category: 'stimulants',
    myth: '"Occasional cocaine use isn\'t addictive."',
    reality: 'Cocaine has one of the highest addiction potentials of any substance. 15–20% of people who try it develop addiction.',
    details:
      'Cocaine produces rapid, intense dopamine surges that strongly reinforce use. The transition from occasional to compulsive use can occur more quickly than expected. NIDA research shows that even intermittent cocaine use produces lasting changes in brain reward circuitry. There is no established "safe" pattern of recreational cocaine use.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', url: 'https://www.who.int' },
    ],
  },
  {
    id: 'psychedelics-cause-brain-damage',
    category: 'psychedelics',
    myth: '"Psychedelics cause permanent brain damage."',
    reality: 'Classical psychedelics (psilocybin, LSD) show low neurotoxicity. Emerging research suggests potential therapeutic applications.',
    details:
      'Unlike substances such as methamphetamine or alcohol, classical serotonergic psychedelics have not been shown to be neurotoxic at typical levels of exposure in human or animal studies. FDA has granted "breakthrough therapy" designation to psilocybin for treatment-resistant depression. However, psychedelics carry real psychological risks including precipitating psychosis in vulnerable individuals, HPPD, and acute distress.',
    sources: [
      { name: 'NIH', institution: 'National Institutes of Health', type: 'governmental', url: 'https://www.nih.gov' },
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
    ],
  },
  {
    id: 'psychedelics-completely-safe',
    category: 'psychedelics',
    myth: '"Psychedelics are completely safe and have no risks."',
    reality: 'While physiological toxicity is low, psychedelics carry significant psychological risks and dangerous interaction profiles.',
    details:
      'Psychedelics can precipitate lasting psychological distress, psychotic episodes in predisposed individuals, dangerous behavior during altered states, and HPPD. Combinations with lithium have been linked to seizures, and combinations with serotonergic medications can cause serotonin syndrome. Set, setting, and individual vulnerability all significantly influence outcomes.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
      { name: 'PsychonautWiki', institution: 'PsychonautWiki Community', type: 'educational', url: 'https://psychonautwiki.org' },
    ],
  },
  {
    id: 'mixing-only-dangerous-large-amounts',
    category: 'combinations',
    myth: '"Mixing substances is only dangerous in large amounts."',
    reality: 'Many substance combinations are dangerous at any dose due to synergistic pharmacological interactions.',
    details:
      'Polysubstance interactions are not simply additive — they can be synergistic, meaning the combined effect exceeds the sum of individual effects. Opioids + benzodiazepines produce synergistic respiratory depression that is the leading cause of polysubstance overdose deaths. Alcohol + cocaine forms cocaethylene, a uniquely cardiotoxic metabolite. Even "small" amounts of interacting substances can produce life-threatening effects.',
    sources: [
      { name: 'FDA', institution: 'U.S. Food and Drug Administration', type: 'governmental', url: 'https://www.fda.gov' },
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', url: 'https://www.cdc.gov' },
    ],
  },
  {
    id: 'addiction-moral-failing',
    category: 'general',
    myth: '"Addiction is a moral failing or a choice."',
    reality: 'Addiction (Substance Use Disorder) is a chronic brain disorder with genetic, environmental, and developmental components.',
    details:
      'Decades of neuroscience research demonstrate that substance use disorders involve lasting changes to brain circuits governing reward, stress, self-control, and decision-making. NIDA, WHO, and the American Medical Association all classify addiction as a medical condition, not a character flaw. Genetic factors account for 40–60% of vulnerability. Effective, evidence-based treatments exist, including medication-assisted treatment and behavioral therapies.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', url: 'https://www.who.int' },
      { name: 'AMA', institution: 'American Medical Association', type: 'academic', url: 'https://www.ama-assn.org' },
    ],
  },
  {
    id: 'willpower-enough-to-quit',
    category: 'general',
    myth: '"Willpower alone is enough to overcome addiction."',
    reality: 'Substance Use Disorders alter brain chemistry in ways that make unaided recovery extremely difficult. Professional treatment significantly improves outcomes.',
    details:
      'Chronic substance use produces neuroadaptations in the brain\'s reward and stress systems that persist long after cessation. These changes drive cravings and relapse even in highly motivated individuals. Evidence-based treatments — including medications (methadone, buprenorphine, naltrexone for opioids; disulfiram, naltrexone for alcohol), behavioral therapies (CBT, contingency management), and support programs — substantially improve recovery rates compared to willpower alone.',
    sources: [
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
      { name: 'SAMHSA', institution: 'Substance Abuse and Mental Health Services Administration', type: 'governmental', url: 'https://www.samhsa.gov' },
    ],
  },
  {
    id: 'vaping-harmless',
    category: 'general',
    myth: '"Vaping is completely harmless."',
    reality: 'While likely less harmful than combustible cigarettes, vaping carries its own documented health risks and is not risk-free.',
    details:
      'E-cigarettes expose users to nicotine (highly addictive), ultrafine particles, volatile organic compounds, and heavy metals. EVALI (E-cigarette or Vaping product Use-Associated Lung Injury) caused over 2,800 hospitalizations in the U.S. Vaping among youth is associated with subsequent combustible cigarette use. Long-term effects remain under active study. "Less harmful than smoking" does not mean "safe."',
    sources: [
      { name: 'CDC', institution: 'Centers for Disease Control and Prevention', type: 'governmental', url: 'https://www.cdc.gov' },
      { name: 'WHO', institution: 'World Health Organization', type: 'governmental', url: 'https://www.who.int' },
      { name: 'NIDA', institution: 'National Institute on Drug Abuse', type: 'governmental', url: 'https://nida.nih.gov' },
    ],
  },
];
