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

  // ── Ketamine (additional) ──
  {
    id: 'ketamine-therapeutic-reflection',
    title: 'A Window of Clarity Amid Depression',
    substance: 'Ketamine',
    substanceCategory: 'dissociative',
    intensity: 'moderate',
    sentiment: 'positive',
    year: 2022,
    gender: 'Female',
    ageRange: '26-35',
    setting: 'Home with a sober partner present',
    summary: 'The author, who describes a long history of treatment-resistant depression, reports a sub-dissociative ketamine experience that produced a notable shift in perspective. They describe a sense of emotional distance from habitual negative thought patterns, mild visual distortions, and a feeling of calm detachment. In the days following, the author reports improved mood and renewed motivation. They emphasize this was not a substitute for professional mental health treatment.',
    keyTakeaways: [
      'Ketamine\'s antidepressant-like effects are an active area of clinical research',
      'Sub-dissociative experiences differ significantly from full dissociation',
      'Subjective improvements do not replace professional mental health care',
      'Having a sober companion present is consistently recommended'
    ],
    warningSignsObserved: [],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=116234',
    erowidExpId: 116234,
  },
  {
    id: 'ketamine-bladder-warning',
    title: 'Chronic Use and Urinary Consequences',
    substance: 'Ketamine',
    substanceCategory: 'dissociative',
    intensity: 'moderate',
    sentiment: 'negative',
    year: 2020,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'Regular use over months',
    summary: 'The author describes months of escalating ketamine use that led to severe urinary tract symptoms including frequent urination, bladder pain, and blood in urine. A medical evaluation revealed ketamine-associated bladder damage (interstitial cystitis). The author reports that cessation and medical treatment led to partial recovery but persistent symptoms. They write as a cautionary account about a lesser-known but well-documented physical risk of chronic ketamine use.',
    keyTakeaways: [
      'Ketamine-induced bladder damage (cystitis) is a documented medical condition',
      'Chronic use significantly increases the risk of urinary tract injury',
      'Symptoms may persist even after cessation',
      'This physical risk is often under-recognized compared to psychological effects'
    ],
    warningSignsObserved: ['Frequent urination', 'Bladder pain', 'Blood in urine', 'Tolerance escalation'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=113456',
    erowidExpId: 113456,
  },

  // ── DXM ──
  {
    id: 'dxm-plateau-escalation',
    title: 'Exploring the Plateaus — Too Far Too Fast',
    substance: 'DXM',
    substanceCategory: 'dissociative',
    intensity: 'strong',
    sentiment: 'negative',
    year: 2019,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Alone in bedroom at parents\' home',
    summary: 'The author describes experimenting with escalating amounts of DXM (dextromethorphan) from OTC cough medicine over several occasions. On this occasion they reached what they describe as a "third plateau" experience involving profound dissociation, inability to walk, slurred speech, and intense nausea. They were unable to hide their state from family, resulting in an emergency room visit. The author reflects on the risks of self-experimentation and the unpredictable response curve of DXM.',
    keyTakeaways: [
      'DXM has a steep and unpredictable dose-response curve across "plateaus"',
      'OTC availability does not indicate safety at higher amounts',
      'Additional ingredients in cough medicines (acetaminophen, guaifenesin) pose serious toxicity risks',
      'Loss of motor control and inability to seek help are significant safety hazards'
    ],
    warningSignsObserved: ['Inability to walk', 'Severe nausea', 'Slurred speech', 'Required emergency medical care'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=105432',
    erowidExpId: 105432,
  },
  {
    id: 'dxm-serotonin-syndrome-risk',
    title: 'A Dangerous Interaction with Antidepressants',
    substance: 'DXM',
    substanceCategory: 'dissociative',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2021,
    gender: 'Female',
    ageRange: '18-25',
    setting: 'Home, while on prescribed SSRIs',
    summary: 'The author describes using DXM while taking a prescribed SSRI antidepressant, unaware of the interaction risk. They report rapid onset of agitation, muscle rigidity, profuse sweating, elevated heart rate, and confusion — symptoms consistent with serotonin syndrome. A roommate called emergency services. The author was hospitalized and recovered after treatment. They emphasize the critical importance of researching drug interactions, especially with prescription medications.',
    keyTakeaways: [
      'DXM combined with SSRIs/SNRIs can trigger life-threatening serotonin syndrome',
      'Serotonin syndrome symptoms include muscle rigidity, hyperthermia, and agitation',
      'OTC medications can have severe interactions with prescription drugs',
      'Always research interactions with any current medications before using any substance'
    ],
    warningSignsObserved: ['Muscle rigidity', 'Profuse sweating', 'Tachycardia', 'Confusion', 'Hospitalization required'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=110987',
    erowidExpId: 110987,
  },

  // ── Salvia divinorum ──
  {
    id: 'salvia-intense-breakthrough',
    title: 'Reality Shattered in 30 Seconds',
    substance: 'Salvia divinorum',
    substanceCategory: 'dissociative',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2017,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Friend\'s living room, partially supervised',
    summary: 'The author describes an extremely rapid onset of overwhelming effects within seconds of smoking salvia extract. They report a complete break from consensus reality, the sensation of being "pulled" into another dimension, loss of awareness of their own identity, and intense fear. They physically moved around the room unaware of their surroundings, nearly injuring themselves. The experience lasted approximately 5 minutes but felt like an eternity. The author describes lingering unease for days afterward.',
    keyTakeaways: [
      'Salvia effects can be overwhelmingly intense with near-instant onset',
      'Complete loss of awareness of surroundings creates serious injury risk',
      'Physical restraint or a dedicated sitter is considered essential by experienced users',
      'The experience is frequently described as dysphoric rather than euphoric'
    ],
    warningSignsObserved: ['Complete reality dissociation', 'Uncontrolled movement', 'Near-injury', 'Lingering psychological distress'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=91234',
    erowidExpId: 91234,
  },
  {
    id: 'salvia-mild-contemplative',
    title: 'A Gentle Introduction with Leaf',
    substance: 'Salvia divinorum',
    substanceCategory: 'dissociative',
    intensity: 'mild',
    sentiment: 'positive',
    year: 2020,
    gender: 'Non-binary',
    ageRange: '26-35',
    setting: 'Quiet room with dim lighting and a sitter',
    summary: 'The author describes a mild experience using unextracted salvia leaf rather than concentrated extract. They report subtle shifts in spatial perception, a contemplative mood, mild visual wavering, and a sense of gravity shifting. The experience lasted approximately 10 minutes with a gentle return to baseline. The author contrasts this with accounts of extract use and emphasizes that concentration level dramatically affects intensity. They found the experience interesting but not overwhelming.',
    keyTakeaways: [
      'Concentration/extract strength dramatically affects salvia intensity',
      'Plain leaf produces far milder effects than concentrated extracts',
      'Having a sitter present is recommended regardless of expected intensity',
      'Short duration (5-15 minutes) is characteristic of salvia experiences'
    ],
    warningSignsObserved: [],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=98765',
    erowidExpId: 98765,
  },

  // ── Nitrous Oxide ──
  {
    id: 'nitrous-b12-depletion',
    title: 'Tingling Hands: A Warning Ignored Too Long',
    substance: 'Nitrous Oxide',
    substanceCategory: 'dissociative',
    intensity: 'moderate',
    sentiment: 'negative',
    year: 2021,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Regular use at home over weeks',
    summary: 'The author describes weeks of frequent nitrous oxide use that progressed from occasional to daily. They began experiencing persistent tingling and numbness in their hands and feet, which they initially dismissed. After difficulty walking and dropping objects, a medical evaluation revealed vitamin B12 depletion and early peripheral neuropathy. The author reports that symptoms partially resolved after cessation and B12 supplementation but some numbness persisted months later.',
    keyTakeaways: [
      'Nitrous oxide inactivates vitamin B12, which is essential for nerve function',
      'Peripheral neuropathy from chronic use can be irreversible if not caught early',
      'Tingling or numbness in extremities is a critical warning sign to stop immediately',
      'Even intermittent heavy use sessions carry cumulative neurological risk'
    ],
    warningSignsObserved: ['Persistent tingling/numbness', 'Difficulty with fine motor tasks', 'Gait problems', 'B12 depletion'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=114567',
    erowidExpId: 114567,
  },

  // ── GHB ──
  {
    id: 'ghb-narrow-margin',
    title: 'The Razor-Thin Line Between Effects and Unconsciousness',
    substance: 'GHB',
    substanceCategory: 'depressant',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2018,
    gender: 'Female',
    ageRange: '26-35',
    setting: 'Social event',
    summary: 'The author describes a social event where they used GHB. After an initial period of euphoria and sociability, they rapidly lost consciousness without warning. Friends found them unresponsive and called emergency services. The author was monitored for respiratory depression. They emphasize the extremely narrow margin between desired effects and dangerous unconsciousness that characterizes GHB, and the impossibility of precisely controlling this without laboratory measurement.',
    keyTakeaways: [
      'GHB has one of the narrowest margins between active and dangerous amounts among recreational substances',
      'Loss of consciousness can occur rapidly and without warning signs',
      'Respiratory depression during GHB-induced unconsciousness is life-threatening',
      'Combining GHB with any other depressant dramatically increases risk of death'
    ],
    warningSignsObserved: ['Sudden unconsciousness', 'Required emergency services', 'Respiratory depression risk'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=104321',
    erowidExpId: 104321,
  },

  // ── DMT ──
  {
    id: 'dmt-breakthrough-awe',
    title: 'Five Minutes That Felt Like a Lifetime',
    substance: 'DMT',
    substanceCategory: 'psychedelic',
    intensity: 'extreme',
    sentiment: 'mixed',
    year: 2020,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'Home with an experienced sitter',
    summary: 'The author describes a "breakthrough" DMT experience with near-instant onset. They report complete visual replacement of their environment with vivid geometric patterns and a perceived encounter with autonomous entities. The experience involved profound awe, moments of terror, and a sense of receiving meaningful information they struggled to articulate afterward. Total duration was approximately 10 minutes. The author describes weeks of integration and reflection following the experience.',
    keyTakeaways: [
      'DMT produces near-instant, extremely intense effects lasting 5-15 minutes when smoked',
      'Entity contact experiences are commonly reported and not well understood',
      'The intensity can be overwhelming regardless of psychological preparation',
      'Integration — processing the experience afterward — is widely considered important'
    ],
    warningSignsObserved: ['Overwhelming intensity', 'Temporary inability to distinguish experience from reality'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=112345',
    erowidExpId: 112345,
  },

  // ── Methamphetamine ──
  {
    id: 'meth-spiral-account',
    title: 'Three Days Awake: A Descent',
    substance: 'Methamphetamine',
    substanceCategory: 'stimulant',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2019,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'Various locations over multiple days',
    summary: 'The author describes a multi-day methamphetamine binge involving sustained wakefulness exceeding 72 hours. They report initial euphoria giving way to paranoia, visual and auditory hallucinations, compulsive repetitive behaviors, and profound physical deterioration including dehydration and weight loss. The author describes being unable to stop despite recognizing the harm. They eventually collapsed from exhaustion and sought medical help. This report serves as documentation of the severe risks of stimulant binges.',
    keyTakeaways: [
      'Sleep deprivation beyond 48 hours produces psychotic-like symptoms regardless of substance',
      'Stimulant-induced psychosis (paranoia, hallucinations) is a well-documented phenomenon',
      'Compulsive redosing during binges is characteristic of methamphetamine use',
      'Physical deterioration (dehydration, malnutrition) compounds psychological effects'
    ],
    warningSignsObserved: ['72+ hours without sleep', 'Hallucinations', 'Paranoia', 'Compulsive behavior', 'Physical collapse'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=108234',
    erowidExpId: 108234,
  },

  // ── 2C-B ──
  {
    id: '2cb-sensory-enhancement',
    title: 'Colors and Connection at a Gathering',
    substance: '2C-B',
    substanceCategory: 'psychedelic',
    intensity: 'moderate',
    sentiment: 'positive',
    year: 2021,
    gender: 'Female',
    ageRange: '26-35',
    setting: 'Small gathering at a friend\'s home',
    summary: 'The author describes a 2C-B experience characterized by enhanced color perception, heightened tactile sensitivity, mild visual patterning, and increased sociability. They report a manageable experience lasting approximately 4-5 hours with a gentle comedown. The author notes that nausea during the onset was uncomfortable but brief. They describe it as distinct from both MDMA and classic psychedelics, with elements of both. The author credits the small, trusted group setting for the positive outcome.',
    keyTakeaways: [
      '2C-B produces a blend of empathogenic and psychedelic effects',
      'Onset nausea is commonly reported and usually temporary',
      'Duration of 4-6 hours is shorter than many classic psychedelics',
      'The substance belongs to the phenethylamine class with variable effects at different amounts'
    ],
    warningSignsObserved: ['Onset nausea'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=115678',
    erowidExpId: 115678,
  },

  // ── Kratom ──
  {
    id: 'kratom-dependency-account',
    title: 'The "Natural" Trap: Kratom Dependency',
    substance: 'Kratom',
    substanceCategory: 'opioid',
    intensity: 'moderate',
    sentiment: 'negative',
    year: 2022,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'Daily use at home and work',
    summary: 'The author describes beginning kratom use as a perceived safer alternative to other opioids. Over months, use escalated from occasional to multiple times daily. They report developing significant physical dependency with withdrawal symptoms including muscle aches, restless legs, insomnia, irritability, and intense cravings. The author notes that the "natural" and legal status led them to underestimate dependency potential. Cessation required a gradual taper over several weeks.',
    keyTakeaways: [
      'Kratom activates opioid receptors and can produce opioid-type physical dependency',
      '"Natural" or legal status does not indicate absence of dependency risk',
      'Withdrawal symptoms closely mirror those of traditional opioids',
      'Gradual tapering is recommended over abrupt cessation for established dependency'
    ],
    warningSignsObserved: ['Escalating use frequency', 'Withdrawal symptoms upon cessation', 'Cravings', 'Daily use across settings'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=116789',
    erowidExpId: 116789,
  },

  // ── Ayahuasca / DMT (oral) ──
  {
    id: 'ayahuasca-ceremony-account',
    title: 'Ceremony, Purging, and Confrontation',
    substance: 'Ayahuasca',
    substanceCategory: 'psychedelic',
    intensity: 'strong',
    sentiment: 'mixed',
    year: 2020,
    gender: 'Female',
    ageRange: '36-45',
    setting: 'Organized ceremonial setting with facilitators',
    summary: 'The author describes participating in an ayahuasca ceremony with experienced facilitators. They report intense nausea and vomiting ("purging") during onset, followed by vivid closed-eye visions and emotionally confrontational psychological content. The experience lasted approximately 4 hours. The author describes being forced to confront painful memories and behavioral patterns. While describing the experience as ultimately valuable, they emphasize it was physically and psychologically grueling. Professional integration support afterward was cited as important.',
    keyTakeaways: [
      'Nausea and vomiting are expected and common with ayahuasca',
      'Psychological content can be intensely confrontational rather than pleasant',
      'Ceremonial settings with experienced facilitators are strongly recommended',
      'MAOIs in ayahuasca create dangerous interactions with many foods and medications'
    ],
    warningSignsObserved: ['Severe nausea/vomiting', 'Intense psychological distress', 'Physical exhaustion'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=113567',
    erowidExpId: 113567,
  },

  // ── Mescaline / San Pedro ──
  {
    id: 'mescaline-desert-reflection',
    title: 'An Unhurried Journey Through Inner Landscapes',
    substance: 'Mescaline (San Pedro)',
    substanceCategory: 'psychedelic',
    intensity: 'strong',
    sentiment: 'positive',
    year: 2019,
    gender: 'Male',
    ageRange: '36-45',
    setting: 'Outdoor desert setting with two companions',
    summary: 'The author describes a long-duration mescaline experience lasting approximately 12 hours. They report a gradual onset with initial nausea, followed by a slowly building sense of clarity, vivid color enhancement, and deep introspective thoughts. The author emphasizes the gentleness of the onset compared to other psychedelics and the very long duration. They describe feeling deeply connected to the landscape and processing personal questions with unusual clarity. The two companions provided mutual support throughout.',
    keyTakeaways: [
      'Mescaline experiences typically last 10-14 hours — among the longest of classic psychedelics',
      'Onset nausea is very common and expected',
      'The gradual onset curve differs markedly from faster-acting psychedelics',
      'The extended duration requires significant planning for safety and comfort'
    ],
    warningSignsObserved: ['Prolonged nausea during onset'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=109234',
    erowidExpId: 109234,
  },

  // ── MDMA Neurotoxicity ──
  {
    id: 'mdma-neurotoxicity-repeated',
    title: 'The Cumulative Cost: Repeated MDMA Use',
    substance: 'MDMA',
    substanceCategory: 'entactogen',
    intensity: 'moderate',
    sentiment: 'negative',
    year: 2021,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'Reflecting on 2+ years of frequent festival/event use',
    summary: 'The author reflects on a period of using MDMA roughly every 2-3 weeks over two years at festivals and events. Over time they report diminishing euphoric effects, worsening multi-day comedowns with severe depression, persistent difficulty with word recall and short-term memory even between uses, emotional blunting, and chronic sleep disruption. A neuropsychological evaluation suggested cognitive deficits consistent with serotonergic neurotoxicity. The author describes a slow, incomplete recovery after complete cessation lasting over a year.',
    keyTakeaways: [
      'MDMA neurotoxicity to serotonin neurons is dose- and frequency-dependent',
      'The commonly cited minimum interval of 1-3 months between uses exists for neurological reasons',
      'Cognitive deficits (memory, verbal fluency) may persist long after cessation',
      'Diminishing positive effects with maintained negative effects ("losing the magic") signals neurological harm'
    ],
    warningSignsObserved: ['Progressive memory impairment', 'Worsening comedowns', 'Emotional blunting', 'Diminishing effects despite same use', 'Chronic sleep disruption'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=115123',
    erowidExpId: 115123,
  },
  {
    id: 'mdma-serotonin-crash',
    title: 'Tuesday Blues: The Serotonin Aftermath',
    substance: 'MDMA',
    substanceCategory: 'entactogen',
    intensity: 'strong',
    sentiment: 'negative',
    year: 2022,
    gender: 'Female',
    ageRange: '18-25',
    setting: 'Music festival, followed by days at home',
    summary: 'The author describes using MDMA at a weekend music festival and the severe mood crash that followed. Starting approximately 48 hours after use ("Suicide Tuesday" as the author references the colloquial term), they experienced profound depression, uncontrollable crying, irritability, inability to concentrate at work, and intrusive dark thoughts lasting nearly a week. The author, who had no prior history of depression, was alarmed by the severity. They emphasize that the acute experience felt entirely positive, making the aftermath feel disproportionate and disorienting.',
    keyTakeaways: [
      'Post-MDMA depressive episodes typically peak 2-4 days after use',
      'Serotonin depletion can produce depressive symptoms indistinguishable from clinical depression',
      'Individuals with no depression history can experience severe mood crashes',
      'The severity of the crash does not always correlate with the perceived intensity of the experience'
    ],
    warningSignsObserved: ['Severe depressive episode', 'Intrusive dark thoughts', 'Uncontrollable crying', 'Functional impairment lasting days'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=117456',
    erowidExpId: 117456,
  },

  // ── Fentanyl Contamination ──
  {
    id: 'fentanyl-contamination-unexpected',
    title: 'It Wasn\'t What I Thought It Was',
    substance: 'Fentanyl (unexpected contamination)',
    substanceCategory: 'opioid',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2022,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Home, using what was believed to be a different substance',
    summary: 'The author describes using what they believed to be a pressed pill obtained from a non-pharmaceutical source. Within minutes they experienced unexpected and overwhelming sedation, difficulty breathing, and near-unconsciousness. A roommate recognized the symptoms as opioid-related and administered naloxone (Narcan) obtained from a local harm reduction organization. Emergency services were called and the author was hospitalized. Subsequent testing confirmed fentanyl contamination. The author had no history of opioid use and no tolerance. They credit naloxone access and bystander awareness with saving their life.',
    keyTakeaways: [
      'Fentanyl contamination has been found in pills and powders sold as many different substances',
      'Having naloxone (Narcan) available is a potentially life-saving harm reduction measure',
      'Fentanyl test strips can detect contamination before use — available from harm reduction organizations',
      'Any substance obtained from non-pharmaceutical sources may contain undisclosed fentanyl',
      'Bystander education on recognizing opioid overdose symptoms saves lives'
    ],
    warningSignsObserved: ['Unexpected extreme sedation', 'Respiratory depression', 'Near-unconsciousness', 'Required naloxone and hospitalization'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=118234',
    erowidExpId: 118234,
  },
  {
    id: 'fentanyl-contamination-cocaine',
    title: 'A Stimulant That Stopped My Breathing',
    substance: 'Fentanyl (in contaminated cocaine)',
    substanceCategory: 'opioid',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2023,
    gender: 'Female',
    ageRange: '26-35',
    setting: 'Social gathering',
    summary: 'The author describes using cocaine at a social gathering and rapidly experiencing symptoms entirely inconsistent with stimulant effects: extreme drowsiness, pinpoint pupils, and slowed breathing. Friends who expected stimulant effects were confused by the sedation. One friend had training in overdose response and recognized possible opioid contamination, administering naloxone and calling emergency services. The author was revived and hospitalized. Lab results confirmed fentanyl in the cocaine supply. The author now advocates for fentanyl test strip use and carrying naloxone regardless of substance of choice.',
    keyTakeaways: [
      'Fentanyl has been documented in cocaine, methamphetamine, and counterfeit pills — not only opioid supplies',
      'Symptoms opposite to the expected drug class (sedation from a "stimulant") indicate contamination',
      'Naloxone should be available anywhere substances are used, regardless of the intended substance',
      'Fentanyl test strips are an accessible, inexpensive harm reduction tool'
    ],
    warningSignsObserved: ['Unexpected sedation from stimulant', 'Respiratory depression', 'Pinpoint pupils', 'Required naloxone and emergency services'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=119567',
    erowidExpId: 119567,
  },

  // ── Phenibut Withdrawal ──
  {
    id: 'phenibut-withdrawal-severe',
    title: 'The "Supplement" That Demanded Medical Detox',
    substance: 'Phenibut',
    substanceCategory: 'depressant',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2021,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'Home, then hospital',
    summary: 'The author describes daily phenibut use over several months, initially for social anxiety. After running out and being unable to obtain more, they experienced rapidly escalating withdrawal symptoms: severe insomnia (no sleep for 3 days), extreme anxiety far exceeding baseline, auditory hallucinations, tremors, and what they believe was a seizure. They were hospitalized and treated with a benzodiazepine taper under medical supervision. The author emphasizes that phenibut\'s availability as a "supplement" in some countries led them to underestimate its dependency potential and withdrawal severity.',
    keyTakeaways: [
      'Phenibut acts on GABA-B receptors similarly to baclofen and produces physical dependency',
      'Withdrawal can include seizures and psychosis — potentially life-threatening without medical supervision',
      'Being sold as a "supplement" does not indicate safety or low dependency risk',
      'Abrupt cessation after regular use requires medical supervision, similar to benzodiazepine withdrawal'
    ],
    warningSignsObserved: ['Seizure', 'Auditory hallucinations', '72+ hours insomnia', 'Severe tremors', 'Required hospitalization'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=116890',
    erowidExpId: 116890,
  },
  {
    id: 'phenibut-rebound-anxiety',
    title: 'Rebound Anxiety Worse Than What I Started With',
    substance: 'Phenibut',
    substanceCategory: 'depressant',
    intensity: 'strong',
    sentiment: 'negative',
    year: 2022,
    gender: 'Female',
    ageRange: '18-25',
    setting: 'Used for social situations over several weeks',
    summary: 'The author describes using phenibut 2-3 times per week for social anxiety over approximately two months. Upon attempting to stop, they experienced rebound anxiety significantly exceeding their original symptoms: panic attacks, racing heart, inability to leave home, and insomnia. Even after the acute withdrawal subsided over about 10 days, the author reports months of elevated baseline anxiety compared to pre-use levels. They describe feeling "worse than before I started" and regret using a substance to manage anxiety rather than pursuing therapy.',
    keyTakeaways: [
      'Rebound anxiety after phenibut cessation commonly exceeds original anxiety levels',
      'Even 2-3 times weekly use can produce dependency within weeks',
      'GABAergic substances may worsen anxiety conditions long-term through neuroadaptation',
      'Professional treatment for anxiety is more sustainable than substance-based self-medication'
    ],
    warningSignsObserved: ['Panic attacks', 'Agoraphobia', 'Rebound anxiety exceeding baseline', 'Months of elevated anxiety post-cessation'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=117890',
    erowidExpId: 117890,
  },

  // ── 25I-NBOMe ──
  {
    id: 'nbome-sold-as-lsd',
    title: 'The Tab That Wasn\'t LSD',
    substance: '25I-NBOMe',
    substanceCategory: 'psychedelic',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2018,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Home with friends',
    summary: 'The author describes taking what was sold as LSD on blotter paper. A strong bitter, numbing taste — inconsistent with LSD — was the first warning sign. Within 30 minutes, they experienced intense vasoconstriction (cold, blue-tinged extremities), severe headache, rapid heart rate, and overwhelming visual distortions far more chaotic than expected. One friend experienced a seizure and was hospitalized. The author later confirmed the substance was 25I-NBOMe through reagent testing of remaining material. They emphasize that NBOMe compounds have caused multiple documented fatalities at amounts that fit on a single blotter tab.',
    keyTakeaways: [
      'NBOMe compounds are frequently sold as LSD on blotter paper — reagent testing can distinguish them',
      'A bitter, numbing taste on blotter is a strong indicator of NBOMe, not LSD (LSD is tasteless)',
      '25I-NBOMe has a much narrower safety margin than LSD and has caused documented fatalities',
      'Vasoconstriction and seizures are characteristic dangerous effects not typical of LSD'
    ],
    warningSignsObserved: ['Bitter/numbing taste', 'Severe vasoconstriction', 'Seizure (friend)', 'Tachycardia', 'Hospitalization required'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=100234',
    erowidExpId: 100234,
  },
  {
    id: 'nbome-cardiovascular-emergency',
    title: 'My Heart Felt Like It Would Explode',
    substance: '25I-NBOMe',
    substanceCategory: 'psychedelic',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2017,
    gender: 'Female',
    ageRange: '18-25',
    setting: 'Music festival',
    summary: 'The author describes taking a substance sold as a psychedelic at a music festival. They rapidly developed severe cardiovascular symptoms: pounding heart rate, chest pain, extreme hypertension (confirmed at medical tent), and difficulty breathing. Simultaneously they experienced intense psychedelic effects including paranoia and confusion. Festival medical staff treated the cardiovascular emergency and the author was transferred to a hospital. The substance was later identified as an NBOMe compound. The author describes the terror of a medical emergency while simultaneously unable to think clearly due to psychoactive effects.',
    keyTakeaways: [
      'NBOMe compounds carry significant cardiovascular risks including hypertensive crisis',
      'Cardiovascular emergencies while cognitively impaired are especially dangerous',
      'Festival medical services may be life-saving — always know their location',
      'Reagent test kits (Marquis, Mecke, Ehrlich) are portable and can be used at events'
    ],
    warningSignsObserved: ['Severe tachycardia', 'Chest pain', 'Hypertensive crisis', 'Respiratory difficulty', 'Required hospitalization'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=99876',
    erowidExpId: 99876,
  },

  // ── Clonazolam ──
  {
    id: 'clonazolam-blackout-days',
    title: 'Three Days I\'ll Never Remember',
    substance: 'Clonazolam',
    substanceCategory: 'depressant',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2021,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Home, then unknown locations',
    summary: 'The author describes taking clonazolam, a novel designer benzodiazepine, and losing approximately three days to complete amnesia. They reconstructed events from messages, photos, and accounts from others: they had driven a car, made purchases, sent incoherent messages, and engaged in behavior entirely out of character — with zero memory of any of it. The author emphasizes that clonazolam is active at microgram-level amounts, making precise measurement nearly impossible without specialized equipment. They describe the experience as the most frightening of their life due to the total loss of agency.',
    keyTakeaways: [
      'Clonazolam is active at extremely small amounts (sub-milligram), making unintentional overdose very easy',
      'Designer benzodiazepines are not regulated or quality-controlled in most jurisdictions',
      'Complete anterograde amnesia lasting days is commonly reported with novel benzodiazepines',
      'Actions taken during blackout states (driving, communication) pose extreme danger to self and others'
    ],
    warningSignsObserved: ['Multi-day blackout', 'Driving while impaired', 'Complete amnesia', 'Dangerous out-of-character behavior'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=115678',
    erowidExpId: 115678,
  },
  {
    id: 'clonazolam-rapid-dependence',
    title: 'Dependent in Two Weeks',
    substance: 'Clonazolam',
    substanceCategory: 'depressant',
    intensity: 'strong',
    sentiment: 'negative',
    year: 2022,
    gender: 'Female',
    ageRange: '26-35',
    setting: 'Daily use at home for anxiety self-medication',
    summary: 'The author describes obtaining clonazolam online to self-medicate anxiety. Within two weeks of daily use, they noticed rapidly escalating tolerance and withdrawal symptoms between uses: tremors, severe rebound anxiety, insomnia, and muscle twitching. Attempting to stop on day 14 produced withdrawal symptoms severe enough to prompt an ER visit, where they were informed that novel benzodiazepine withdrawal can cause seizures. A medically supervised taper using diazepam was initiated. The author emphasizes the extraordinarily rapid development of physical dependence compared to their prior experience with prescribed benzodiazepines.',
    keyTakeaways: [
      'Clonazolam can produce physical dependence in as little as 1-2 weeks of daily use',
      'Novel benzodiazepines may have unpredictable potency and pharmacokinetics',
      'Withdrawal from any benzodiazepine-type substance can cause life-threatening seizures',
      'Self-medication with unregulated substances bypasses the medical safeguards of prescribed alternatives'
    ],
    warningSignsObserved: ['Rapid tolerance development', 'Withdrawal symptoms after 2 weeks', 'Tremors', 'ER visit required', 'Seizure risk'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=118345',
    erowidExpId: 118345,
  },

  // ── Flubromazolam ──
  {
    id: 'flubromazolam-potency-surprise',
    title: 'Microgram Miscalculation, Major Consequences',
    substance: 'Flubromazolam',
    substanceCategory: 'depressant',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2020,
    gender: 'Male',
    ageRange: '26-35',
    setting: 'Home alone',
    summary: 'The author describes attempting to measure flubromazolam, a designer benzodiazepine active at sub-milligram amounts, using a standard milligram scale. A measurement error resulted in taking significantly more than intended. The author\'s next memory is waking up 30+ hours later with their apartment in disarray, missed calls from work, and no memory of the intervening time. They discovered they had eaten all food in the apartment and sent rambling messages to contacts. The author warns that substances active at microgram levels cannot be safely measured with consumer-grade equipment.',
    keyTakeaways: [
      'Substances active at sub-milligram levels require laboratory-grade precision to measure',
      'Consumer milligram scales are insufficiently precise for microgram-active substances',
      'Designer benzodiazepines vary enormously in potency — treating them as interchangeable is dangerous',
      'Compulsive redosing during amnestic states is a characteristic risk of potent benzodiazepines'
    ],
    warningSignsObserved: ['30+ hour blackout', 'Compulsive redosing during amnesia', 'Measurement error', 'Complete functional impairment'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=112890',
    erowidExpId: 112890,
  },

  // ── Synthetic Cannabinoids ──
  {
    id: 'synthetic-cannabinoid-seizure',
    title: 'Nothing Like Cannabis: A Synthetic Nightmare',
    substance: 'Synthetic Cannabinoids (JWH-018)',
    substanceCategory: 'cannabinoid',
    intensity: 'extreme',
    sentiment: 'negative',
    year: 2019,
    gender: 'Male',
    ageRange: '18-25',
    setting: 'Outdoor social setting',
    summary: 'The author describes using a synthetic cannabinoid product expecting effects similar to cannabis. Instead, they experienced rapid onset of severe tachycardia, intense panic, visual hallucinations, and a seizure witnessed by friends who called emergency services. In the hospital, the author was monitored for cardiac arrhythmia. They emphasize that synthetic cannabinoids bear little resemblance to cannabis in their risk profile despite the misleading name, and that batches vary wildly in potency due to uneven chemical application to plant material ("hot spots").',
    keyTakeaways: [
      'Synthetic cannabinoids are full agonists at cannabinoid receptors — far more potent than THC (a partial agonist)',
      '"Hot spots" in sprayed products mean potency varies wildly within a single batch',
      'Seizures, cardiac events, and psychosis are documented risks not associated with cannabis',
      'The label "synthetic cannabis" is dangerously misleading — these are pharmacologically distinct substances'
    ],
    warningSignsObserved: ['Seizure', 'Severe tachycardia', 'Visual hallucinations', 'Cardiac monitoring required', 'Hospitalization'],
    erowidUrl: 'https://erowid.org/experiences/exp.php?ID=106789',
    erowidExpId: 106789,
  },
];

export const reportSubstances = [...new Set(tripReports.map(r => r.substance))].sort();
export const reportCategories = [...new Set(tripReports.map(r => r.substanceCategory))].sort();
