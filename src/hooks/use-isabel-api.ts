import { supabase } from "@/integrations/supabase/client";

export interface AgeGroup {
  agegroup_id: string;
  name: string;
  branch: string;
  can_conceive: string;
  yr_from: string;
  yr_to: string;
}

export interface Region {
  region_id: string;
  region_name: string;
}

export interface Country {
  country_id: string;
  country_name: string;
  abbreviation: string;
  region_id: string;
}

export interface Pregnancy {
  pregnancy_id: string;
  pregnancy_name: string;
}

export interface Diagnosis {
  diagnosis_id: number;
  diagnosis_name: string;
  specialty: string;
  red_flag: string;
  common_diagnosis: string;
  knowledge_window_api_url: string;
  snomed_diagnosis_id?: string;
  icd10_diagnosis_id?: string;
}

export interface DiagnosisResult {
  diagnoses_checklist: {
    query_result_details: {
      age_group: string;
      gender: string;
      pregnancy: string;
      region: string;
      query_entered: string;
      sorting: string;
      total_results_returned: string;
    };
    triage_api_url?: string;
    please_note?: string;
    diagnoses?: Diagnosis[];
    no_result?: { information: string };
  };
}

export interface KnowledgeLink {
  name: string;
  link: string;
  popup: boolean;
  image_url?: string;
}

export interface KnowledgeGroup {
  heading: string;
  links: KnowledgeLink[];
}

export interface TriageResult {
  triage: {
    triage_score?: string;
    triage_advice?: string;
    questions?: Array<{
      question_id: string;
      question_text: string;
      answers: Array<{ answer_id: string; answer_text: string }>;
    }>;
  };
}

async function callIsabel(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("isabel-api", { body });
  if (error) throw new Error(error.message || "Isabel API error");
  return data;
}

export function useIsabelApi() {
  return {
    ping: () => callIsabel({ action: "ping" }),

    getAgeGroups: async (): Promise<AgeGroup[]> => {
      const data = await callIsabel({ action: "age_groups" });
      return data?.age_groups?.age_group || [];
    },

    getRegions: async (): Promise<Region[]> => {
      const data = await callIsabel({ action: "regions" });
      return data?.travel_history?.region || [];
    },

    getCountries: async (): Promise<Country[]> => {
      const data = await callIsabel({ action: "countries" });
      return data?.countries?.country || [];
    },

    getPregnancies: async (): Promise<Pregnancy[]> => {
      const data = await callIsabel({ action: "pregnancies" });
      return data?.pregnancies?.pregnancy || [];
    },

    getPredictiveText: async (): Promise<string[]> => {
      const data = await callIsabel({ action: "predictive_text", language: "en" });
      return data?.predictive_text || [];
    },

    getDiagnosis: async (params: {
      querytext: string;
      dob: string;
      sex: string;
      pregnant?: string;
      region?: string;
      country_id?: string;
      flag?: string;
    }): Promise<DiagnosisResult> => {
      return callIsabel({ action: "diagnosis", ...params });
    },

    getTriage: async (triageUrl: string, answers?: Record<string, string>): Promise<unknown> => {
      return callIsabel({ action: "triage", triage_url: triageUrl, answers });
    },

    getKnowledge: async (knowledgeUrl: string): Promise<KnowledgeGroup[]> => {
      const data = await callIsabel({ action: "knowledge", knowledge_url: knowledgeUrl });
      return data?.knowledge_urls || [];
    },
  };
}
