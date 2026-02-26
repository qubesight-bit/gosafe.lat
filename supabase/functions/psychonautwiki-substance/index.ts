const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const PSYCHONAUTWIKI_API = 'https://api.psychonautwiki.org/';

// GraphQL query that fetches substance info — NO dosage fields
const SUBSTANCE_QUERY = `
query SubstanceInfo($name: String!) {
  substances(query: $name) {
    name
    url
    class {
      chemical
      psychoactive
    }
    tolerance {
      full
      half
      zero
    }
    addictionPotential
    toxicity
    crossTolerances
    effects {
      name
      url
    }
    roas {
      name
      duration {
        onset { min max units }
        comeup { min max units }
        peak { min max units }
        offset { min max units }
        total { min max units }
        afterglow { min max units }
      }
    }
  }
}
`;

interface DurationRange {
  min: number | null;
  max: number | null;
  units: string | null;
}

function formatRange(range: DurationRange | null): string | null {
  if (!range || (range.min === null && range.max === null)) return null;
  const units = range.units || '';
  if (range.min !== null && range.max !== null) {
    if (range.min === range.max) return `${range.min} ${units}`;
    return `${range.min}–${range.max} ${units}`;
  }
  if (range.min !== null) return `${range.min}+ ${units}`;
  if (range.max !== null) return `up to ${range.max} ${units}`;
  return null;
}

// Fields we NEVER return to the client (content safety)
const BLOCKED_FIELDS = ['dose', 'dosage', 'preparation', 'experiences'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { substance } = await req.json();

    if (!substance || typeof substance !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Substance name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching substance info for:', substance);

    const response = await fetch(PSYCHONAUTWIKI_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: SUBSTANCE_QUERY,
        variables: { name: substance },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('PsychonautWiki API error:', response.status, text);
      return new Response(
        JSON.stringify({ success: false, error: `API returned ${response.status}` }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const substances = data?.data?.substances || [];

    if (substances.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: null }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sub = substances[0];

    // Strip any blocked fields that might leak through
    for (const field of BLOCKED_FIELDS) {
      delete sub[field];
    }

    // Format duration data
    const durations = (sub.roas || [])
      .filter((roa: any) => roa.duration)
      .map((roa: any) => ({
        route: roa.name,
        onset: formatRange(roa.duration?.onset),
        comeup: formatRange(roa.duration?.comeup),
        peak: formatRange(roa.duration?.peak),
        offset: formatRange(roa.duration?.offset),
        total: formatRange(roa.duration?.total),
        afterglow: formatRange(roa.duration?.afterglow),
      }));

    const result = {
      name: sub.name,
      url: sub.url || null,
      chemicalClass: sub.class?.chemical || [],
      psychoactiveClass: sub.class?.psychoactive || [],
      effects: (sub.effects || []).map((e: any) => e.name),
      addictionPotential: sub.addictionPotential || null,
      toxicity: sub.toxicity || [],
      tolerance: sub.tolerance || null,
      crossTolerances: sub.crossTolerances || [],
      durations,
    };

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching substance:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
