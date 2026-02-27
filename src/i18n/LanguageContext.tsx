import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type Lang = 'en' | 'es' | 'pt' | 'fr' | 'de';

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import { fr } from './fr';
import { de } from './de';

const dictionaries: Record<Lang, Record<string, string>> = { en, es, pt, fr, de };

const VALID_LANGS = new Set<string>(LANGUAGES.map(l => l.code));

// Map country codes to our supported languages
const COUNTRY_TO_LANG: Record<string, Lang> = {
  // Spanish-speaking
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es',
  EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es',
  SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es', PR: 'es', GQ: 'es',
  // Portuguese-speaking
  BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt', CV: 'pt',
  // French-speaking
  FR: 'fr', BE: 'fr', CH: 'fr', CA: 'fr', SN: 'fr', CI: 'fr', ML: 'fr',
  CM: 'fr', MG: 'fr', NE: 'fr', BF: 'fr', TD: 'fr', GN: 'fr', RW: 'fr',
  HT: 'fr', TG: 'fr', CG: 'fr', CD: 'fr', GA: 'fr', DJ: 'fr', KM: 'fr',
  LU: 'fr', MC: 'fr',
  // German-speaking
  DE: 'de', AT: 'de', LI: 'de',
  // English-speaking (explicit)
  US: 'en', GB: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en',
};

const GEO_DETECTED_KEY = 'gosafe-geo-detected';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('gosafe-lang');
    if (stored && VALID_LANGS.has(stored)) return stored as Lang;
    const browserLang = navigator.language.slice(0, 2);
    if (VALID_LANGS.has(browserLang)) return browserLang as Lang;
    return 'en';
  });

  // IP-based geolocation detection on first visit
  useEffect(() => {
    const alreadyStored = localStorage.getItem('gosafe-lang');
    const alreadyDetected = sessionStorage.getItem(GEO_DETECTED_KEY);
    if (alreadyStored || alreadyDetected) return;

    sessionStorage.setItem(GEO_DETECTED_KEY, '1');

    fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) })
      .then(r => r.json())
      .then(data => {
        const country = data?.country_code?.toUpperCase();
        if (country && COUNTRY_TO_LANG[country]) {
          const detectedLang = COUNTRY_TO_LANG[country];
          setLangState(detectedLang);
          localStorage.setItem('gosafe-lang', detectedLang);
          document.documentElement.lang = detectedLang;
        }
      })
      .catch(() => { /* silent fail — keep browser/default lang */ });
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('gosafe-lang', newLang);
    document.documentElement.lang = newLang;
  }, []);

  const t = useCallback((key: string): string => {
    return dictionaries[lang][key] ?? dictionaries['en'][key] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
