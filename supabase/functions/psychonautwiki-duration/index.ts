const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const PSYCHONAUTWIKI_API = 'https://api.psychonautwiki.org/';

// GraphQL query that ONLY fetches duration data — no dosage fields
const DURATION_QUERY = `
query SubstanceDuration($name: String!) {
  substances(query: $name) {
    name
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

interface RoaDuration {
  onset: DurationRange | null;
  comeup: DurationRange | null;
  peak: DurationRange | null;
  offset: DurationRange | null;
  total: DurationRange | null;
  afterglow: DurationRange | null;
}

interface SubstanceResult {
  name: string;
  roas: {
    name: string;
    duration: RoaDuration | null;
  }[];
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

    console.log('Fetching duration for:', substance);

    const response = await fetch(PSYCHONAUTWIKI_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: DURATION_QUERY,
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
    const substances: SubstanceResult[] = data?.data?.substances || [];

    if (substances.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: null }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Take the first matching substance, format duration per ROA
    const sub = substances[0];
    const durations = sub.roas
      .filter((roa) => roa.duration)
      .map((roa) => ({
        route: roa.name,
        onset: formatRange(roa.duration!.onset),
        comeup: formatRange(roa.duration!.comeup),
        peak: formatRange(roa.duration!.peak),
        offset: formatRange(roa.duration!.offset),
        total: formatRange(roa.duration!.total),
        afterglow: formatRange(roa.duration!.afterglow),
      }));

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          name: sub.name,
          durations,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching duration:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
