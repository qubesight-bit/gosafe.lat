import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const ISABEL_BASE = "https://apiscsandbox.isabelhealthcare.com/v3";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("ISABEL_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "ISABEL_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, ...params } = await req.json();

    const authHeaders = { "Authorization": apiKey };
    const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

    if (action === "ping") {
      return new Response(JSON.stringify({ status: "ok", hasKey: true }), { headers: jsonHeaders });
    }

    if (action === "age_groups") {
      const url = `${ISABEL_BASE}/age_groups?language=en&web_service=json`;
      const resp = await fetch(url, { headers: authHeaders });
      const data = await resp.text();
      return new Response(data, { status: resp.status, headers: jsonHeaders });
    }

    if (action === "regions") {
      const url = `${ISABEL_BASE}/regions?language=en&web_service=json`;
      const resp = await fetch(url, { headers: authHeaders });
      const data = await resp.text();
      return new Response(data, { status: resp.status, headers: jsonHeaders });
    }

    if (action === "countries") {
      const url = `${ISABEL_BASE}/countries?language=en&web_service=json`;
      const resp = await fetch(url, { headers: authHeaders });
      const data = await resp.text();
      return new Response(data, { status: resp.status, headers: jsonHeaders });
    }

    if (action === "pregnancies") {
      const url = `${ISABEL_BASE}/pregnancies?language=en&web_service=json`;
      const resp = await fetch(url, { headers: authHeaders });
      const data = await resp.text();
      return new Response(data, { status: resp.status, headers: jsonHeaders });
    }

    if (action === "predictive_text") {
      const { language } = params;
      const url = `${ISABEL_BASE}/predictive-text?language=${language || "en"}`;
      const resp = await fetch(url, { headers: authHeaders });
      const data = await resp.text();
      return new Response(data, { status: resp.status, headers: jsonHeaders });
    }

    if (action === "diagnosis") {
      const { querytext, dob, sex, pregnant, region, country_id, flag, language } = params;
      const searchParams = new URLSearchParams({
        language: language || "en",
        specialties: "28",
        dob: dob || "",
        sex: sex || "m",
        pregnant: pregnant || "",
        querytext: querytext || "",
        suggest: "Suggest+Differential+Diagnosis",
        flag: flag || "sortbyRW_advanced",
        searchType: "0",
        web_service: "json",
      });
      if (region) searchParams.set("region", region);
      if (country_id) searchParams.set("country_id", country_id);

      const url = `${ISABEL_BASE}/ranked_differential_diagnoses?${searchParams.toString()}`;
      const resp = await fetch(url, { headers: authHeaders });
      const data = await resp.text();
      return new Response(data, { status: resp.status, headers: jsonHeaders });
    }

    if (action === "triage") {
      const { triage_url, answers } = params;
      let url = triage_url;
      if (answers) {
        // Replace Q1= through Q7= values in the URL
        for (let i = 1; i <= 7; i++) {
          const key = `Q${i}`;
          const val = answers[key] || "";
          // Match Q1= followed by nothing (before & or end of string)
          url = url.replace(new RegExp(`${key}=([^&]*)`, 'g'), `${key}=${encodeURIComponent(val)}`);
        }
      }
      const resp = await fetch(url, { headers: authHeaders });
      const data = await resp.text();
      return new Response(data, { status: resp.status, headers: jsonHeaders });
    }

    if (action === "knowledge") {
      const { knowledge_url } = params;
      const resp = await fetch(knowledge_url, { headers: authHeaders });
      const data = await resp.text();
      return new Response(data, { status: resp.status, headers: jsonHeaders });
    }

    return new Response(JSON.stringify({ error: "Unknown action. Use: ping, age_groups, regions, countries, pregnancies, predictive_text, diagnosis, triage, knowledge" }), {
      status: 400, headers: jsonHeaders,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
