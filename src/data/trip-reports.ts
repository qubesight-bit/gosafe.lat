export interface TripReport {
  id: string;
  title: string;
  substance: string;
  substanceCategory: 'stimulant' | 'depressant' | 'psychedelic' | 'dissociative' | 'opioid' | 'cannabinoid' | 'entactogen' | 'other';
  intensity: 'mild' | 'moderate' | 'strong' | 'extreme';
  sentiment: 'positive' | 'mixed' | 'negative' | 'neutral';
  year: number;
  gender: string;
  ageRange: string;
  setting: string;
  /** Educational summary — NOT the full report. No dosage/preparation info. */
  summary: string;
  keyTakeaways: string[];
  warningSignsObserved: string[];
  /** URL to the full report on Erowid.org */
  erowidUrl: string;
  erowidExpId: number;
}

export const tripReports: TripReport[] = [
  // ── Cannabis ──
  {
    id: 'cannabis-first-time-anxiety',
    title: 'Unexpected Anxiety on First Use',
    substance: 'Cannabis',
    substanceCategory: 'cannabinoid',
    intensity: 'moderate',
    sentiment: 'mixed',
    year: 2018,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Social gathering at a friend\'s home',
    summary: 'The author describes their first experience with cannabis in a social setting. Initial effects included euphoria and laughter, which after approximately 30 minutes shifted to intense anxiety and paranoia. The author reports feeling disconnected from surroundings and experiencing racing thoughts. Effects subsided after approximately 2 hours. The author reflects that set and setting significantly influenced the experience.',
    keyTakeaways: [
      'First experiences can be unpredictable regardless of substance',
      'Social pressure in group settings may increase anxiety',
      'Set and setting are significant factors in subjective experience',
      'Anxiety and paranoia are documented possible effects of cannabis'
    ],
    warningSignsObserved: ['Intense anxiety', 'Paranoia', 'Dissociative feelings'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=112047',
    erowidExpId: 112047,
  },
  {
    id: 'cannabis-chronic-dependence',
    title: 'Years of Daily Use — A Reflection',
    substance: 'Cannabis',
    substanceCategory: 'cannabinoid',
    intensity: 'mild',
    sentiment: 'negative',
    year: 2020,
    gender: 'Female',
    ageRange: '26-35',
    setting: 'Daily home use over several years',
    summary: 'The author reflects on years of daily cannabis use and the gradual development of psychological dependence. They describe difficulty sleeping without use, increased tolerance over time, and social withdrawal. The author notes that cessation produced irritability, vivid dreams, and appetite changes lasting approximately two weeks.',
    keyTakeaways: [
      'Psychological dependence can develop with chronic use',
      'Tolerance increase is a documented phenomenon',
      'Withdrawal symptoms may include sleep disruption and irritability',
      'Long-term daily use may affect social functioning'
    ],
    warningSignsObserved: ['Sleep disruption', 'Appetite changes', 'Social withdrawal'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=114523',
    erowidExpId: 114523,
  },

  // ── MDMA ──
  {
    id: 'mdma-therapeutic-insight',
    title: 'Emotional Breakthrough and Difficult Comedown',
    substance: 'MDMA',
    substanceCategory: 'entactogen',
    intensity: 'strong',
    sentiment: 'mixed',
    year: 2019,
    gender: 'Female',
    ageRange: '26-35',
    setting: 'Home with a close friend',
    summary: 'The author describes an experience characterized by intense emotional openness and connection. They report processing past traumatic experiences with reduced fear. The experience was followed by a multi-day period of low mood, fatigue, and difficulty concentrating, which the author attributes to serotonin depletion. The author emphasizes the contrast between acute positive effects and the subsequent recovery period.',
    keyTakeaways: [
      'MDMA can produce intense empathogenic effects',
      'Post-experience mood disruption is a well-documented phenomenon',
      'Recovery periods of several days are commonly reported',
      'Having a trusted companion is reported as a protective factor'
    ],
    warningSignsObserved: ['Multi-day depressive episode', 'Fatigue', 'Cognitive difficulty'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=113250',
    erowidExpId: 113250,
  },
  {
    id: 'mdma-hyperthermia-scare',
    title: 'Overheating at a Crowded Venue',
    substance: 'MDMA',
    substanceCategory: 'entactogen',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2017,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Crowded indoor music venue',
    summary: 'The author reports experiencing dangerously elevated body temperature, excessive sweating, and confusion while at a crowded indoor event. A friend recognized the hyperthermia symptoms and moved them to a cooler area. The author describes difficulty communicating and a sense of disorientation. Medical attention was sought. The author attributes the severity to environmental heat, dehydration, and physical exertion.',
    keyTakeaways: [
      'Hyperthermia is a documented life-threatening risk with MDMA',
      'Hot, crowded environments significantly increase risk',
      'Dehydration and physical exertion compound thermal risks',
      'Bystander recognition of warning signs may be life-saving'
    ],
    warningSignsObserved: ['Dangerous body temperature elevation', 'Confusion', 'Excessive sweating', 'Disorientation'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=109876',
    erowidExpId: 109876,
  },

  // ── Psilocybin ──
  {
    id: 'psilocybin-nature-experience',
    title: 'Profound Nature Connection',
    substance: 'Psilocybin Mushrooms',
    substanceCategory: 'psychedelic',
    intensity: 'strong',
    sentiment: 'positive',
    year: 2021,
    gender: 'Non-binary',
    ageRange: '26-35',
    setting: 'Outdoor forest setting with a sober companion',
    summary: 'The author describes a deeply meaningful experience in a natural setting with a sober companion present. They report vivid visual alterations, a sense of interconnection with natural surroundings, and emotional processing that they found personally significant. The experience lasted approximately 5 hours. The author emphasizes that having a sober companion and a calm environment were important factors.',
    keyTakeaways: [
      'Natural settings are commonly cited as positive environmental factors',
      'Having a sober companion is widely recommended for safety',
      'Experiences lasting 4-6 hours are typical for psilocybin',
      'Visual and emotional effects are primary reported phenomena'
    ],
    warningSignsObserved: [],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=115432',
    erowidExpId: 115432,
  },
  {
    id: 'psilocybin-bad-trip',
    title: 'Overwhelming Fear and Loss of Control',
    substance: 'Psilocybin Mushrooms',
    substanceCategory: 'psychedelic',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2019,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Alone in an apartment',
    summary: 'The author reports an intensely distressing experience while alone. They describe overwhelming fear, ego dissolution, time distortion, and a persistent sense of losing control. The author was unable to use their phone or communicate. The experience lasted what felt like an eternity but was approximately 4 hours. The author strongly emphasizes the importance of not being alone and the dangers of an unprepared set and setting.',
    keyTakeaways: [
      'Being alone significantly increases risk of psychological distress',
      'Challenging experiences ("bad trips") are well-documented with psychedelics',
      'Loss of ability to communicate or seek help is a serious safety concern',
      'Preparation, set, and setting are consistently cited as critical safety factors'
    ],
    warningSignsObserved: ['Intense panic', 'Inability to communicate', 'Ego dissolution', 'Loss of motor control'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=111234',
    erowidExpId: 111234,
  },

  // ── Alcohol ──
  {
    id: 'alcohol-blackout-reflection',
    title: 'Memory Loss and the Morning After',
    substance: 'Alcohol',
    substanceCategory: 'depressant',
    intensity: 'strong',
    sentiment: 'negative',
    year: 2020,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'University party',
    summary: 'The author describes a night of heavy consumption at a social event, resulting in a complete memory blackout of several hours. Upon waking, they learned from friends about risky behavior they had no recollection of. The author reports severe hangover symptoms including nausea, headache, and shame. This experience prompted a reevaluation of their relationship with alcohol.',
    keyTakeaways: [
      'Alcohol-induced blackouts represent a serious neurological effect',
      'Blackouts do not mean unconsciousness — risky behavior continues',
      'Binge drinking patterns are associated with increased harm',
      'Memory loss events are a recognized warning sign of problematic use'
    ],
    warningSignsObserved: ['Complete memory blackout', 'Risky behavior without awareness', 'Severe hangover'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=88654',
    erowidExpId: 88654,
  },

  // ── LSD ──
  {
    id: 'lsd-first-experience',
    title: 'A Carefully Planned First Experience',
    substance: 'LSD',
    substanceCategory: 'psychedelic',
    intensity: 'moderate',
    sentiment: 'positive',
    year: 2021,
    gender: 'Female',
    ageRange: '26-35',
    setting: 'Home with two experienced friends',
    summary: 'The author describes extensive preparation before their first LSD experience, including researching effects, clearing their schedule, and arranging experienced companions. They report gradual onset of visual effects, heightened sensory perception, philosophical thinking, and periods of laughter. The experience lasted approximately 10 hours. The author credits preparation and social support for the positive outcome.',
    keyTakeaways: [
      'Pre-experience research and preparation are commonly recommended',
      'Having experienced companions is frequently cited as beneficial',
      'LSD effects typically last 8-12 hours — much longer than many substances',
      'Clearing schedule and responsibilities reduces anxiety during the experience'
    ],
    warningSignsObserved: [],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=116543',
    erowidExpId: 116543,
  },

  // ── Ketamine ──
  {
    id: 'ketamine-dissociation',
    title: 'The K-Hole: Complete Dissociation',
    substance: 'Ketamine',
    substanceCategory: 'dissociative',
    intensity: 'extreme',
    sentiment: 'mixed',
    year: 2018,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'At home with a friend',
    summary: 'The author describes unexpectedly entering a state of complete dissociation (commonly called a "k-hole"). They report total disconnection from their body, vivid internal visions, inability to move or speak, and loss of time perception. The experience lasted approximately 45 minutes but felt much longer. The friend present ensured physical safety. The author describes the experience as both fascinating and frightening.',
    keyTakeaways: [
      'Complete dissociation can occur unexpectedly with ketamine',
      'Physical immobility during deep dissociation is a safety concern',
      'Having someone present who can ensure physical safety is critical',
      'The experience of losing body awareness can be intensely disorienting'
    ],
    warningSignsObserved: ['Complete physical immobility', 'Inability to communicate', 'Total dissociation from body'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=107654',
    erowidExpId: 107654,
  },

  // ── Cocaine ──
  {
    id: 'cocaine-compulsive-redosing',
    title: 'The Compulsion to Redose',
    substance: 'Cocaine',
    substanceCategory: 'stimulant',
    intensity: 'strong',
    sentiment: 'negative',
    year: 2019,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'Social gathering, then alone',
    summary: 'The author describes initial use in a social setting that transitioned to solitary compulsive use over several hours. They report an intense but brief euphoria followed by an equally intense urge to use again. The author describes spending far more money than intended and being unable to stop despite wanting to. The experience continued until supply was exhausted. The author reflects on the powerful reinforcing properties of the substance.',
    keyTakeaways: [
      'Compulsive redosing is a hallmark risk of stimulant use',
      'The short duration of effects drives repeated use patterns',
      'Transition from social to solitary use is a documented risk pattern',
      'Financial consequences are commonly reported with stimulant use'
    ],
    warningSignsObserved: ['Compulsive redosing', 'Inability to stop despite desire', 'Social-to-solitary use transition'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=99876',
    erowidExpId: 99876,
  },

  // ── Benzodiazepines ──
  {
    id: 'benzo-withdrawal',
    title: 'The Danger of Abrupt Cessation',
    substance: 'Benzodiazepines',
    substanceCategory: 'depressant',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2020,
    gender: 'Female',
    ageRange: '36-45',
    setting: 'Home, without medical supervision',
    summary: 'The author describes their experience of abruptly stopping benzodiazepine use after months of regular use without medical guidance. They report severe insomnia, tremors, intense anxiety far exceeding their baseline, and what they believe was a seizure. The experience resulted in an emergency room visit. The author emphasizes that benzodiazepine withdrawal can be medically dangerous and should always be done under professional supervision.',
    keyTakeaways: [
      'Abrupt benzodiazepine cessation can cause life-threatening seizures',
      'Withdrawal severity increases with duration and regularity of use',
      'Medical supervision for tapering is strongly recommended by all authorities',
      'Rebound anxiety during withdrawal typically exceeds original symptoms'
    ],
    warningSignsObserved: ['Seizure', 'Severe tremors', 'Extreme rebound anxiety', 'Severe insomnia'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=113876',
    erowidExpId: 113876,
  },

  // ── Opioids ──
  {
    id: 'opioid-prescription-to-dependency',
    title: 'From Prescription to Dependency',
    substance: 'Opioids',
    substanceCategory: 'opioid',
    intensity: 'strong',
    sentiment: 'negative',
    year: 2019,
    gender: 'Male',
    ageRange: '36-45',
    setting: 'Home, following a medical procedure',
    summary: 'The author describes the progression from legitimate post-surgical opioid prescription to physical dependency over several months. They report the development of tolerance, escalating use, and eventually experiencing withdrawal symptoms when attempting to stop. The author details the withdrawal experience: severe body aches, restless legs, insomnia, and intense cravings. They eventually sought medical help for a supervised taper.',
    keyTakeaways: [
      'Physical dependency can develop even with prescribed use',
      'Tolerance development leads to escalating use patterns',
      'Opioid withdrawal, while rarely fatal, is extremely uncomfortable',
      'Medical supervision for cessation is strongly recommended'
    ],
    warningSignsObserved: ['Tolerance development', 'Escalating use', 'Withdrawal symptoms', 'Intense cravings'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=112876',
    erowidExpId: 112876,
  },

  // ── Amphetamines ──
  {
    id: 'amphetamine-study-burnout',
    title: 'Academic Stimulant Use and Crash',
    substance: 'Amphetamines',
    substanceCategory: 'stimulant',
    intensity: 'moderate',
    sentiment: 'negative',
    year: 2021,
    gender: 'Non-binary',
    ageRange: '18-25',
    setting: 'University dormitory during exam period',
    summary: 'The author describes using amphetamines to study for extended periods during final exams. They report initial periods of intense focus and productivity followed by escalating anxiety, jaw clenching, and inability to sleep for over 36 hours. The subsequent crash involved extreme fatigue, depressed mood, and inability to concentrate for several days — ironically impairing the academic performance they were trying to enhance.',
    keyTakeaways: [
      'Stimulant-induced wakefulness is followed by compensatory sleep debt',
      'Extended use leads to diminishing returns and increasing side effects',
      'The post-use crash can impair functioning worse than baseline',
      'Academic performance may ultimately be harmed rather than helped'
    ],
    warningSignsObserved: ['36+ hours without sleep', 'Jaw clenching/bruxism', 'Severe anxiety', 'Multi-day crash'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=115987',
    erowidExpId: 115987,
  },

  // ── Nicotine ──
  {
    id: 'nicotine-vaping-dependency',
    title: 'How Vaping Became a Chain',
    substance: 'Nicotine',
    substanceCategory: 'stimulant',
    intensity: 'mild',
    sentiment: 'negative',
    year: 2022,
    gender: 'Female',
    ageRange: '18-25',
    setting: 'Daily use across all settings',
    summary: 'The author describes beginning nicotine vaping socially and the rapid progression to constant use throughout the day. They report difficulty concentrating without nicotine, irritability when unable to use, and unsuccessful attempts to quit. The author notes that the ease of use and lack of smoke smell made it psychologically easier to justify continuous use, despite recognizing the dependency.',
    keyTakeaways: [
      'Nicotine dependency can develop rapidly, especially with modern delivery systems',
      'Ease of use may accelerate dependency development',
      'Withdrawal symptoms include irritability and concentration difficulty',
      'Multiple quit attempts are common before successful cessation'
    ],
    warningSignsObserved: ['Constant use throughout the day', 'Irritability without substance', 'Failed quit attempts'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=117234',
    erowidExpId: 117234,
  },

  // ── Polydrug ──
  {
    id: 'alcohol-benzo-dangerous-combo',
    title: 'The Dangerous Synergy: Alcohol and Benzodiazepines',
    substance: 'Alcohol + Benzodiazepines',
    substanceCategory: 'depressant',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2018,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'Home alone',
    summary: 'The author describes combining alcohol with benzodiazepines, resulting in extreme sedation, complete memory loss spanning approximately 8 hours, and being found unresponsive by a roommate. Emergency services were called. The author has no memory of the experience and reconstructs it from others\' accounts. Medical professionals informed them they were at risk of respiratory depression. The author describes this as the most dangerous experience of their life.',
    keyTakeaways: [
      'Combining CNS depressants multiplies respiratory depression risk',
      'Complete amnesia is a hallmark of this combination',
      'Being found unresponsive indicates life-threatening sedation',
      'This combination is consistently rated as one of the most dangerous by all sources'
    ],
    warningSignsObserved: ['Unresponsiveness', 'Complete amnesia', 'Required emergency services', 'Respiratory depression risk'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=108765',
    erowidExpId: 108765,
  },
];

export const reportSubstances = [...new Set(tripReports.map(r => r.substance))].sort();
export const reportCategories = [...new Set(tripReports.map(r => r.substanceCategory))].sort();
