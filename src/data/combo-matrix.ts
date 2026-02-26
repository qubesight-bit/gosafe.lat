// Pre-computed interaction matrix data based on TripSit combo chart
// Source: https://combo.tripsit.me/ (TripSit Community Database)
// This static dataset avoids rate limiting issues with the live API

export type ComboStatus =
  | 'Dangerous'
  | 'Unsafe'
  | 'Caution'
  | 'Low Risk & Synergy'
  | 'Low Risk & No Synergy'
  | 'Low Risk & Decrease'
  | 'Serotonin Syndrome';

export interface ComboEntry {
  status: ComboStatus;
  note?: string;
}

export const MATRIX_SUBSTANCES = [
  'Alcohol',
  'Amphetamines',
  'Benzodiazepines',
  'Caffeine',
  'Cannabis',
  'Cocaine',
  'DMT',
  'GHB/GBL',
  'Ketamine',
  'LSD',
  'MDMA',
  'MAOIs',
  'Mescaline',
  'Mushrooms',
  'Nitrous',
  'Opioids',
  'SSRIs',
  'Tramadol',
] as const;

export type MatrixSubstance = typeof MATRIX_SUBSTANCES[number];

// Matrix data: [row][col] = ComboEntry
// Data transcribed from TripSit combo chart (https://combo.tripsit.me/)
const rawMatrix: Record<string, Record<string, ComboEntry>> = {
  Alcohol: {
    Amphetamines: { status: 'Caution', note: 'Stimulants mask sedative effects of alcohol, leading to excessive drinking and dehydration.' },
    Benzodiazepines: { status: 'Dangerous', note: 'Both CNS depressants. Potentiate each other strongly — risk of respiratory depression, unconsciousness, and death.' },
    Caffeine: { status: 'Low Risk & No Synergy' },
    Cannabis: { status: 'Low Risk & Synergy', note: 'In excess, this combination can cause nausea.' },
    Cocaine: { status: 'Unsafe', note: 'Forms cocaethylene in the liver — more cardiotoxic than either alone.' },
    DMT: { status: 'Low Risk & Decrease' },
    'GHB/GBL': { status: 'Dangerous', note: 'Combined CNS depression. Very high risk of respiratory failure, unconsciousness, and death.' },
    Ketamine: { status: 'Unsafe', note: 'Both CNS depressants. Risk of vomiting while unconscious.' },
    LSD: { status: 'Low Risk & Decrease' },
    MDMA: { status: 'Unsafe', note: 'Increased dehydration, neurotoxicity risk, and impaired judgment.' },
    MAOIs: { status: 'Caution', note: 'Tyramine in some alcoholic beverages can cause hypertensive crisis with MAOIs.' },
    Mescaline: { status: 'Low Risk & Decrease' },
    Mushrooms: { status: 'Low Risk & Decrease' },
    Nitrous: { status: 'Caution', note: 'Risk of unconsciousness and vomiting.' },
    Opioids: { status: 'Dangerous', note: 'Severe CNS depression. Life-threatening respiratory depression risk.' },
    SSRIs: { status: 'Caution', note: 'Increased CNS depression and impairment.' },
    Tramadol: { status: 'Dangerous', note: 'CNS depression, seizure risk, and respiratory depression.' },
  },
  Amphetamines: {
    Benzodiazepines: { status: 'Low Risk & Decrease' },
    Caffeine: { status: 'Caution', note: 'Combined cardiovascular strain. Risk of tachycardia and anxiety.' },
    Cannabis: { status: 'Caution', note: 'Stimulants increase anxiety and thought loops.' },
    Cocaine: { status: 'Caution', note: 'Extreme cardiovascular strain.' },
    DMT: { status: 'Caution', note: 'Stimulants increase thought loops and anxiety risk.' },
    'GHB/GBL': { status: 'Caution', note: 'Stimulant may mask GHB sedation, leading to accidental overdose.' },
    Ketamine: { status: 'Low Risk & No Synergy' },
    LSD: { status: 'Caution', note: 'Stimulants increase thought loops and anxiety risk.' },
    MDMA: { status: 'Unsafe', note: 'Compounded neurotoxicity and cardiovascular strain.' },
    MAOIs: { status: 'Dangerous', note: 'Risk of hypertensive crisis.' },
    Mescaline: { status: 'Caution', note: 'Stimulants increase thought loops.' },
    Mushrooms: { status: 'Caution', note: 'Stimulants increase thought loops.' },
    Nitrous: { status: 'Low Risk & No Synergy' },
    Opioids: { status: 'Caution', note: 'Stimulant masks opioid sedation; overdose risk when stimulant wears off.' },
    SSRIs: { status: 'Low Risk & No Synergy' },
    Tramadol: { status: 'Caution', note: 'Increased seizure risk.' },
  },
  Benzodiazepines: {
    Caffeine: { status: 'Low Risk & Decrease' },
    Cannabis: { status: 'Low Risk & Decrease' },
    Cocaine: { status: 'Low Risk & Decrease' },
    DMT: { status: 'Low Risk & Decrease' },
    'GHB/GBL': { status: 'Dangerous', note: 'Severe CNS depression. Life-threatening respiratory depression.' },
    Ketamine: { status: 'Unsafe', note: 'Both CNS depressants. Risk of respiratory depression.' },
    LSD: { status: 'Low Risk & Decrease' },
    MDMA: { status: 'Low Risk & Decrease' },
    MAOIs: { status: 'Low Risk & Decrease' },
    Mescaline: { status: 'Low Risk & Decrease' },
    Mushrooms: { status: 'Low Risk & Decrease' },
    Nitrous: { status: 'Caution', note: 'Both CNS depressants. Risk of loss of consciousness.' },
    Opioids: { status: 'Dangerous', note: 'Extreme CNS depression. Leading cause of polysubstance overdose death.' },
    SSRIs: { status: 'Low Risk & No Synergy' },
    Tramadol: { status: 'Dangerous', note: 'Severe CNS depression, seizure risk.' },
  },
  Caffeine: {
    Cannabis: { status: 'Low Risk & No Synergy' },
    Cocaine: { status: 'Caution', note: 'Both stimulants. Risk of tachycardia and hypertension.' },
    DMT: { status: 'Low Risk & No Synergy' },
    'GHB/GBL': { status: 'Low Risk & Decrease' },
    Ketamine: { status: 'Low Risk & No Synergy' },
    LSD: { status: 'Low Risk & No Synergy' },
    MDMA: { status: 'Low Risk & No Synergy' },
    MAOIs: { status: 'Caution' },
    Mescaline: { status: 'Low Risk & No Synergy' },
    Mushrooms: { status: 'Low Risk & No Synergy' },
    Nitrous: { status: 'Low Risk & No Synergy' },
    Opioids: { status: 'Low Risk & No Synergy' },
    SSRIs: { status: 'Low Risk & No Synergy' },
    Tramadol: { status: 'Caution' },
  },
  Cannabis: {
    Cocaine: { status: 'Caution', note: 'Stimulants increase anxiety and thought loops.' },
    DMT: { status: 'Caution', note: 'Cannabis has unpredictable synergy with psychedelics.' },
    'GHB/GBL': { status: 'Low Risk & Synergy' },
    Ketamine: { status: 'Low Risk & Synergy' },
    LSD: { status: 'Caution', note: 'Cannabis has unpredictable synergy with psychedelics.' },
    MDMA: { status: 'Low Risk & Synergy', note: 'Large amounts of cannabis may cause unpredictable experiences.' },
    MAOIs: { status: 'Low Risk & Synergy' },
    Mescaline: { status: 'Caution', note: 'Cannabis has unpredictable synergy with psychedelics.' },
    Mushrooms: { status: 'Caution', note: 'Cannabis has unpredictable synergy with psychedelics.' },
    Nitrous: { status: 'Low Risk & Synergy' },
    Opioids: { status: 'Low Risk & Synergy' },
    SSRIs: { status: 'Low Risk & No Synergy' },
    Tramadol: { status: 'Low Risk & Decrease' },
  },
  Cocaine: {
    DMT: { status: 'Caution', note: 'Stimulants increase thought loops.' },
    'GHB/GBL': { status: 'Caution', note: 'Stimulant may mask GHB sedation.' },
    Ketamine: { status: 'Caution', note: 'Cardiovascular strain.' },
    LSD: { status: 'Caution', note: 'Stimulants increase thought loops.' },
    MDMA: { status: 'Unsafe', note: 'Compounded cardiovascular strain and neurotoxicity risk.' },
    MAOIs: { status: 'Dangerous', note: 'Risk of hypertensive crisis.' },
    Mescaline: { status: 'Caution' },
    Mushrooms: { status: 'Caution' },
    Nitrous: { status: 'Low Risk & Decrease' },
    Opioids: { status: 'Dangerous', note: 'Speedball. Severe cardiac and respiratory risk. Historically associated with fatalities.' },
    SSRIs: { status: 'Low Risk & No Synergy' },
    Tramadol: { status: 'Unsafe', note: 'Seizure risk and cardiovascular strain.' },
  },
  DMT: {
    'GHB/GBL': { status: 'Caution' },
    Ketamine: { status: 'Low Risk & Synergy' },
    LSD: { status: 'Low Risk & Synergy' },
    MDMA: { status: 'Low Risk & Synergy' },
    MAOIs: { status: 'Caution', note: 'MAOIs potentiate DMT dramatically. This is the basis of ayahuasca but can be dangerous without experience.' },
    Mescaline: { status: 'Low Risk & Synergy' },
    Mushrooms: { status: 'Low Risk & Synergy' },
    Nitrous: { status: 'Low Risk & Synergy' },
    Opioids: { status: 'Low Risk & No Synergy' },
    SSRIs: { status: 'Low Risk & Decrease' },
    Tramadol: { status: 'Caution' },
  },
  'GHB/GBL': {
    Ketamine: { status: 'Dangerous', note: 'Both CNS depressants. Extreme risk of respiratory depression.' },
    LSD: { status: 'Caution' },
    MDMA: { status: 'Caution', note: 'Stimulant may mask GHB sedation.' },
    MAOIs: { status: 'Caution' },
    Mescaline: { status: 'Caution' },
    Mushrooms: { status: 'Caution' },
    Nitrous: { status: 'Unsafe', note: 'Both CNS depressants. Risk of unconsciousness.' },
    Opioids: { status: 'Dangerous', note: 'Extreme risk of respiratory depression and death.' },
    SSRIs: { status: 'Low Risk & No Synergy' },
    Tramadol: { status: 'Dangerous', note: 'CNS depression and seizure risk.' },
  },
  Ketamine: {
    LSD: { status: 'Low Risk & Synergy' },
    MDMA: { status: 'Low Risk & Synergy' },
    MAOIs: { status: 'Low Risk & No Synergy' },
    Mescaline: { status: 'Low Risk & Synergy' },
    Mushrooms: { status: 'Low Risk & Synergy' },
    Nitrous: { status: 'Caution', note: 'Both dissociatives. Risk of loss of consciousness.' },
    Opioids: { status: 'Unsafe', note: 'CNS depression risk.' },
    SSRIs: { status: 'Low Risk & No Synergy' },
    Tramadol: { status: 'Unsafe' },
  },
  LSD: {
    MDMA: { status: 'Low Risk & Synergy', note: 'Known as "candyflipping." Generally considered low risk but intense.' },
    MAOIs: { status: 'Caution' },
    Mescaline: { status: 'Low Risk & Synergy' },
    Mushrooms: { status: 'Low Risk & Synergy' },
    Nitrous: { status: 'Low Risk & Synergy' },
    Opioids: { status: 'Low Risk & No Synergy' },
    SSRIs: { status: 'Low Risk & Decrease' },
    Tramadol: { status: 'Caution' },
  },
  MDMA: {
    MAOIs: { status: 'Dangerous', note: 'Risk of serotonin syndrome — potentially fatal.' },
    Mescaline: { status: 'Low Risk & Synergy' },
    Mushrooms: { status: 'Low Risk & Synergy' },
    Nitrous: { status: 'Low Risk & Synergy' },
    Opioids: { status: 'Low Risk & Decrease' },
    SSRIs: { status: 'Serotonin Syndrome', note: 'Risk of serotonin syndrome. SSRIs typically block MDMA effects but combination can be dangerous.' },
    Tramadol: { status: 'Dangerous', note: 'Serotonin syndrome risk and seizure risk.' },
  },
  MAOIs: {
    Mescaline: { status: 'Caution' },
    Mushrooms: { status: 'Caution' },
    Nitrous: { status: 'Low Risk & No Synergy' },
    Opioids: { status: 'Dangerous', note: 'Risk of serotonin syndrome with some opioids. Severe respiratory depression.' },
    SSRIs: { status: 'Serotonin Syndrome', note: 'Severe risk of serotonin syndrome — potentially fatal.' },
    Tramadol: { status: 'Dangerous', note: 'Severe serotonin syndrome risk.' },
  },
  Mescaline: {
    Mushrooms: { status: 'Low Risk & Synergy' },
    Nitrous: { status: 'Low Risk & Synergy' },
    Opioids: { status: 'Low Risk & No Synergy' },
    SSRIs: { status: 'Low Risk & Decrease' },
    Tramadol: { status: 'Caution' },
  },
  Mushrooms: {
    Nitrous: { status: 'Low Risk & Synergy' },
    Opioids: { status: 'Low Risk & No Synergy' },
    SSRIs: { status: 'Low Risk & Decrease' },
    Tramadol: { status: 'Caution' },
  },
  Nitrous: {
    Opioids: { status: 'Caution', note: 'CNS depression risk.' },
    SSRIs: { status: 'Low Risk & No Synergy' },
    Tramadol: { status: 'Caution' },
  },
  Opioids: {
    SSRIs: { status: 'Low Risk & No Synergy' },
    Tramadol: { status: 'Unsafe', note: 'Respiratory depression and seizure risk.' },
  },
  SSRIs: {
    Tramadol: { status: 'Serotonin Syndrome', note: 'Risk of serotonin syndrome.' },
  },
};

/** Get combo entry between two substances (checks both directions) */
export function getCombo(a: MatrixSubstance, b: MatrixSubstance): ComboEntry | null {
  return rawMatrix[a]?.[b] || rawMatrix[b]?.[a] || null;
}
