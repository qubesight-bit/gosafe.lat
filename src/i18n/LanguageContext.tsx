import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('gosafe-lang');
    if (stored && VALID_LANGS.has(stored)) return stored as Lang;
    const browserLang = navigator.language.slice(0, 2);
    if (VALID_LANGS.has(browserLang)) return browserLang as Lang;
    return 'en';
  });

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
