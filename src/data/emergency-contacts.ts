export interface EmergencyContact {
  country: string;
  emoji: string;
  number: string;
  capital?: string;
}

export const globalEmergencyContacts: EmergencyContact[] = [
  // Americas
  { country: 'Costa Rica', emoji: '🇨🇷', number: '911', capital: 'San José' },
  { country: 'United States', emoji: '🇺🇸', number: '911', capital: 'Washington D.C.' },
  { country: 'Canada', emoji: '🇨🇦', number: '911', capital: 'Ottawa' },
  { country: 'Mexico', emoji: '🇲🇽', number: '911', capital: 'Mexico City' },
  { country: 'Brazil', emoji: '🇧🇷', number: '192 (SAMU) / 190', capital: 'Brasília' },
  { country: 'Argentina', emoji: '🇦🇷', number: '107 (Medical) / 911', capital: 'Buenos Aires' },
  { country: 'Colombia', emoji: '🇨🇴', number: '123', capital: 'Bogotá' },
  { country: 'Chile', emoji: '🇨🇱', number: '131 (Medical) / 133', capital: 'Santiago' },
  { country: 'Peru', emoji: '🇵🇪', number: '106 / 116', capital: 'Lima' },
  { country: 'Panama', emoji: '🇵🇦', number: '911', capital: 'Panama City' },

  // Europe
  { country: 'European Union (General)', emoji: '🇪🇺', number: '112' },
  { country: 'United Kingdom', emoji: '🇬🇧', number: '999 / 112', capital: 'London' },
  { country: 'Spain', emoji: '🇪🇸', number: '112', capital: 'Madrid' },
  { country: 'France', emoji: '🇫🇷', number: '15 (SAMU) / 112', capital: 'Paris' },
  { country: 'Germany', emoji: '🇩🇪', number: '112', capital: 'Berlin' },
  { country: 'Italy', emoji: '🇮🇹', number: '118 / 112', capital: 'Rome' },
  { country: 'Portugal', emoji: '🇵🇹', number: '112', capital: 'Lisbon' },
  { country: 'Netherlands', emoji: '🇳🇱', number: '112', capital: 'Amsterdam' },
  { country: 'Switzerland', emoji: '🇨🇭', number: '144 / 112', capital: 'Bern' },

  // Asia & Oceania
  { country: 'Japan', emoji: '🇯🇵', number: '119', capital: 'Tokyo' },
  { country: 'South Korea', emoji: '🇰🇷', number: '119', capital: 'Seoul' },
  { country: 'China', emoji: '🇨🇳', number: '120', capital: 'Beijing' },
  { country: 'India', emoji: '🇮🇳', number: '112 / 102', capital: 'New Delhi' },
  { country: 'Australia', emoji: '🇦🇺', number: '000', capital: 'Canberra' },
  { country: 'New Zealand', emoji: '🇳🇿', number: '111', capital: 'Wellington' },

  // Middle East & Africa
  { country: 'Israel', emoji: '🇮🇱', number: '101', capital: 'Jerusalem' },
  { country: 'South Africa', emoji: '🇿🇦', number: '10177 / 112', capital: 'Pretoria' },
  { country: 'UAE', emoji: '🇦🇪', number: '998 / 999', capital: 'Abu Dhabi' },
  { country: 'Turkey', emoji: '🇹🇷', number: '112', capital: 'Ankara' },
];
