import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const TRIPSIT_BASE = "https://tripbot.tripsit.me/api/tripsit";

// Fields to STRIP from drug data per content-safety policy
const DISALLOWED_FIELDS = [
  'dose', 'formatted_dose', 'formatted_duration', 'formatted_onset',
  'formatted_aftereffects', 'duration', 'onset', 'after-effects',
  'detection', 'dose_note',
];

function sanitizeDrugData(drug: Record<string, unknown>): Record<string, unknown> {
  const cleaned = { ...drug };

  // Remove top-level disallowed fields
  for (const field of DISALLOWED_FIELDS) {
    delete cleaned[field];
  }

  // Clean nested properties object
  if (cleaned.properties && typeof cleaned.properties === 'object') {
    const props = { ...(cleaned.properties as Record<string, unknown>) };
    for (const field of DISALLOWED_FIELDS) {
      delete props[field];
    }
    cleaned.properties = props;
  }

  return cleaned;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();
    const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

    if (action === "interaction") {
      const { drugA, drugB } = params;
      if (!drugA || !drugB) {
        return new Response(JSON.stringify({ error: "drugA and drugB are required" }), {
          status: 400, headers: jsonHeaders,
        });
      }
      const url = `${TRIPSIT_BASE}/getInteraction/${encodeURIComponent(drugA)}/${encodeURIComponent(drugB)}`;
      const resp = await fetch(url);
      const data = await resp.json();
      return new Response(JSON.stringify(data), { headers: jsonHeaders });
    }

    if (action === "drug") {
      const { name } = params;
      if (!name) {
        return new Response(JSON.stringify({ error: "name is required" }), {
          status: 400, headers: jsonHeaders,
        });
      }
      const url = `${TRIPSIT_BASE}/getDrug/${encodeURIComponent(name)}`;
      const resp = await fetch(url);
      const data = await resp.json();

      // Sanitize: remove dosage, timing, preparation info
      if (data?.data && Array.isArray(data.data)) {
        data.data = data.data.map((d: Record<string, unknown>) => sanitizeDrugData(d));
      }

      return new Response(JSON.stringify(data), { headers: jsonHeaders });
    }

    if (action === "all_drug_names") {
      const url = `${TRIPSIT_BASE}/getAllDrugNames`;
      const resp = await fetch(url);
      const data = await resp.text();
      return new Response(data, { headers: jsonHeaders });
    }

    if (action === "all_categories") {
      const url = `${TRIPSIT_BASE}/getAllCategories`;
      const resp = await fetch(url);
      const data = await resp.text();
      return new Response(data, { headers: jsonHeaders });
    }

    if (action === "combo_matrix") {
      const { drugs } = params as { drugs: string[] };
      if (!drugs || !Array.isArray(drugs) || drugs.length === 0) {
        return new Response(JSON.stringify({ error: "drugs array is required" }), {
          status: 400, headers: jsonHeaders,
        });
      }

      // Fetch drugs sequentially with small delay to avoid rate limiting
      const fetched: Array<{ name: string; key: string; combos: Record<string, { status: string; note?: string }> }> = [];
      
      for (const name of drugs) {
        try {
          const url = `${TRIPSIT_BASE}/getDrug/${encodeURIComponent(name)}`;
          const resp = await fetch(url);
          const data = await resp.json();
          const entry = data?.data?.[0];
          if (entry && !entry.err && entry.combos) {
            fetched.push({
              name: entry.pretty_name || entry.name || name,
              key: (entry.name || name).toLowerCase(),
              combos: entry.combos,
            });
          }
        } catch {
          // Skip failed fetches
        }
      }

      const matrix: Record<string, Record<string, { status: string; note?: string }>> = {};
      const drugNames: Array<{ key: string; name: string }> = [];

      for (const drug of fetched) {
        drugNames.push({ key: drug.key, name: drug.name });
        matrix[drug.key] = {};
        for (const [comboKey, combo] of Object.entries(drug.combos)) {
          matrix[drug.key][comboKey.toLowerCase()] = {
            status: combo.status || '',
            note: combo.note || undefined,
          };
        }
      }

      return new Response(JSON.stringify({ drugNames, matrix }), { headers: jsonHeaders });
    }

    return new Response(JSON.stringify({ error: "Unknown action. Use: interaction, drug, all_drug_names, all_categories, combo_matrix" }), {
      status: 400, headers: jsonHeaders,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
