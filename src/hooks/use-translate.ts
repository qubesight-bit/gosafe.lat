import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

// Global in-memory cache shared across all hook instances
const translationCache = new Map<string, string>();

function cacheKey(text: string, lang: string) {
  return `${lang}:${text}`;
}

/**
 * Hook that provides batch translation of API-returned English text
 * into the user's current language using AI.
 */
export function useTranslate() {
  const { lang } = useLanguage();
  const [translatedMap, setTranslatedMap] = useState<Map<string, string>>(new Map());
  const pendingRef = useRef<Set<string>>(new Set());

  const translateBatch = useCallback(
    async (texts: string[]) => {
      if (lang === "en" || texts.length === 0) return;

      const needed: string[] = [];
      for (const t of texts) {
        const key = cacheKey(t, lang);
        if (!translationCache.has(key) && !pendingRef.current.has(key)) {
          needed.push(t);
          pendingRef.current.add(key);
        }
      }

      if (needed.length === 0) {
        setTranslatedMap(prev => {
          const next = new Map(prev);
          for (const t of texts) {
            const cached = translationCache.get(cacheKey(t, lang));
            if (cached) next.set(t, cached);
          }
          return next;
        });
        return;
      }

      const CHUNK_SIZE = 30;
      for (let i = 0; i < needed.length; i += CHUNK_SIZE) {
        const chunk = needed.slice(i, i + CHUNK_SIZE);
        try {
          const { data, error } = await supabase.functions.invoke("translate", {
            body: { texts: chunk, targetLang: lang },
          });

          if (error) {
            console.error("Translation error:", error);
            chunk.forEach(t => pendingRef.current.delete(cacheKey(t, lang)));
            continue;
          }

          const translations: string[] = data?.translations || [];
          setTranslatedMap(prev => {
            const next = new Map(prev);
            chunk.forEach((original, idx) => {
              const translated = translations[idx] || original;
              const key = cacheKey(original, lang);
              translationCache.set(key, translated);
              next.set(original, translated);
            });
            return next;
          });
        } catch (e) {
          console.error("Translation fetch error:", e);
          chunk.forEach(t => pendingRef.current.delete(cacheKey(t, lang)));
        }
      }
    },
    [lang]
  );

  /** Get translated text (returns original if not yet translated or lang is EN) */
  const tt = useCallback(
    (text: string): string => {
      if (lang === "en" || !text) return text;
      const cached = translationCache.get(cacheKey(text, lang));
      if (cached) return cached;
      return translatedMap.get(text) || text;
    },
    [lang, translatedMap]
  );

  return { translateBatch, tt, lang };
}
