import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

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

    const { action, base_url, ...params } = await req.json();

    // Allow overriding base URL for testing, default to known Isabel API endpoint
    const ISABEL_BASE = base_url || "https://apiws.isabelhealthcare.com/v3";

    if (action === "ping") {
      return new Response(JSON.stringify({ 
        status: "ok", 
        hasKey: true, 
        keyPreview: apiKey.substring(0, 8) + "...",
        defaultBase: ISABEL_BASE 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "test_connectivity") {
      // Try to reach the Isabel API and report what happens
      const testUrls = [
        "https://apiws.isabelhealthcare.com/v3/suggest?query=headache&language=english",
        "https://symptomchecker.isabelhealthcare.com/api/v3/suggest?query=headache&language=english",
      ];
      
      const results = [];
      for (const url of testUrls) {
        try {
          const resp = await fetch(url, {
            headers: { "Authorization": apiKey },
          });
          const body = await resp.text();
          results.push({ 
            url, 
            status: resp.status, 
            bodyPreview: body.substring(0, 200),
            contentType: resp.headers.get("content-type")
          });
        } catch (err) {
          results.push({ url, error: err.message });
        }
      }
      
      return new Response(JSON.stringify({ results }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "suggest") {
      const { query } = params;
      const url = `${ISABEL_BASE}/suggest?query=${encodeURIComponent(query)}&language=english`;
      const resp = await fetch(url, {
        headers: { "Authorization": apiKey },
      });
      const data = await resp.text();
      return new Response(data, {
        status: resp.status,
        headers: { ...corsHeaders, "Content-Type": resp.headers.get("content-type") || "application/json" },
      });
    }

    if (action === "diagnosis") {
      const { querytext, dob, sex, region, flag } = params;
      const searchParams = new URLSearchParams({
        querytext: querytext || "",
        dob: dob || "",
        sex: sex || "male",
        region: region || "10",
        language: "english",
        web_service: "json",
      });
      if (flag) searchParams.set("flag", flag);

      const url = `${ISABEL_BASE}/diagnosis_checklist?${searchParams.toString()}`;
      const resp = await fetch(url, {
        headers: { "Authorization": apiKey },
      });
      const data = await resp.text();
      return new Response(data, {
        status: resp.status,
        headers: { ...corsHeaders, "Content-Type": resp.headers.get("content-type") || "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action. Use: ping, test_connectivity, suggest, diagnosis" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
