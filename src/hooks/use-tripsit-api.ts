import { supabase } from "@/integrations/supabase/client";

export interface TripSitInteraction {
  status: string;
  interactionCategoryA: string;
  interactionCategoryB: string;
  note?: string;
}

export interface TripSitCombo {
  status: string;
  note?: string;
}

export interface TripSitDrug {
  name: string;
  pretty_name: string;
  aliases: string[];
  categories: string[];
  combos?: Record<string, TripSitCombo>;
  formatted_effects?: string[];
  properties?: {
    summary?: string;
    effects?: string;
    aliases?: string[];
    categories?: string[];
    wiki?: string;
  };
  sources?: {
    _general?: string[];
  };
  links?: Record<string, string>;
  pweffects?: Record<string, string>;
}

async function callTripSit(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("tripsit-api", { body });
  if (error) throw new Error(error.message || "TripSit API call failed");
  return data;
}

export function useTripSitApi() {
  return {
    getInteraction: async (drugA: string, drugB: string): Promise<TripSitInteraction | null> => {
      const res = await callTripSit({ action: "interaction", drugA: drugA.toLowerCase(), drugB: drugB.toLowerCase() });
      if (res?.err !== null || !res?.data) return null;
      // The API returns an array; first entry may have err=true
      const entry = res.data?.[0];
      if (!entry || entry.err) return null;
      return entry as TripSitInteraction;
    },

    getDrug: async (name: string): Promise<TripSitDrug | null> => {
      const res = await callTripSit({ action: "drug", name: name.toLowerCase() });
      if (res?.err !== null || !res?.data) return null;
      const entry = res.data?.[0];
      if (!entry || entry.err) return null;
      return entry as TripSitDrug;
    },

    getAllDrugNames: async (): Promise<string[]> => {
      const res = await callTripSit({ action: "all_drug_names" });
      if (res?.err !== null || !res?.data) return [];
      return res.data as string[];
    },

    getAllCategories: async (): Promise<Array<{ name: string; description: string; wiki?: string }>> => {
      const res = await callTripSit({ action: "all_categories" });
      if (res?.err !== null || !res?.data) return [];
      return res.data as Array<{ name: string; description: string; wiki?: string }>;
    },
  };
}

/** Map TripSit status strings to our severity levels */
export function mapTripSitStatus(status: string): {
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  label: string;
  description: string;
} {
  const s = status.toLowerCase();
  if (s.includes('dangerous')) return {
    severity: 'severe',
    label: 'Dangerous',
    description: 'This combination is considered dangerous and poses serious health risks.',
  };
  if (s.includes('unsafe')) return {
    severity: 'severe',
    label: 'Unsafe',
    description: 'This combination is considered unsafe and may cause significant harm.',
  };
  if (s.includes('caution')) return {
    severity: 'moderate',
    label: 'Caution',
    description: 'This combination requires caution. Effects may be unpredictable or amplified.',
  };
  if (s.includes('low risk') && s.includes('decrease')) return {
    severity: 'mild',
    label: 'Low Risk & Decrease',
    description: 'Low risk but one substance may reduce the effects of the other.',
  };
  if (s.includes('low risk') && s.includes('no synergy')) return {
    severity: 'none',
    label: 'Low Risk & No Synergy',
    description: 'Low documented risk with no notable synergistic interaction.',
  };
  if (s.includes('low risk') && s.includes('synergy')) return {
    severity: 'mild',
    label: 'Low Risk & Synergy',
    description: 'Low documented risk with synergistic effects reported.',
  };
  return {
    severity: 'moderate',
    label: status || 'Unknown',
    description: 'Interaction status is not well characterized. Exercise caution.',
  };
}
