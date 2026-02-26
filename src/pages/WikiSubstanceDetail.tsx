import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Disclaimer } from '@/components/Disclaimer';
import { supabase } from '@/integrations/supabase/client';
import { type TripSitCombo } from '@/hooks/use-tripsit-api';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MATRIX_SUBSTANCES } from '@/data/combo-matrix';
import {
  ArrowLeft, Brain, ExternalLink, Loader2, Timer, Shield, ShieldAlert, ShieldCheck,
  AlertTriangle, BookOpen, Beaker, Pill, Clock, X, Grid3X3, GitCompareArrows, ChevronRight,
} from 'lucide-react';
import {
  substanceDirectory,
  getPsychonautWikiUrl,
  type DirectorySubstance,
} from '@/data/substance-directory';

// ── Types ──────────────────────────────────────────────────────────────────
interface DurationData {
  route: string;
  onset: string | null;
  comeup: string | null;
  peak: string | null;
  offset: string | null;
  total: string | null;
  afterglow: string | null;
}

interface WikiSubstanceData {
  name: string;
  url: string | null;
  chemicalClass: string[];
  psychoactiveClass: string[];
  effects: string[];
  addictionPotential: string | null;
  toxicity: string[];
  tolerance: { full: string | null; half: string | null; zero: string | null } | null;
  crossTolerances: string[];
  durations: DurationData[];
}

// ── Caches ─────────────────────────────────────────────────────────────────
const wikiCache = new Map<string, WikiSubstanceData | null>();
const comboCache = new Map<string, Record<string, TripSitCombo> | null>();

// ── Combo helpers ──────────────────────────────────────────────────────────
const comboStatusConfig: Record<string, { label: string; className: string; icon: typeof Shield }> = {
  dangerous: { label: 'Dangerous', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: ShieldAlert },
  unsafe: { label: 'Unsafe', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: ShieldAlert },
  caution: { label: 'Caution', className: 'bg-amber-100 text-amber-800 border-amber-200', icon: AlertTriangle },
  'low risk & synergy': { label: 'Low Risk ↑', className: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: ShieldCheck },
  'low risk & no synergy': { label: 'Low Risk', className: 'bg-muted text-muted-foreground border-border/40', icon: Shield },
  'low risk & decrease': { label: 'Low Risk ↓', className: 'bg-blue-100 text-blue-800 border-blue-200', icon: Shield },
};

function getComboConfig(status: string) {
  const s = status.toLowerCase();
  for (const [key, config] of Object.entries(comboStatusConfig)) {
    if (s.includes(key)) return config;
  }
  return { label: status, className: 'bg-muted text-muted-foreground border-border/40', icon: Shield };
}

// ── Duration bar helpers ───────────────────────────────────────────────────
const barPhases = [
  { key: 'onset', label: 'Onset', color: 'bg-blue-400' },
  { key: 'comeup', label: 'Come up', color: 'bg-sky-400' },
  { key: 'peak', label: 'Peak', color: 'bg-primary' },
  { key: 'offset', label: 'Offset', color: 'bg-amber-400' },
  { key: 'afterglow', label: 'Afterglow', color: 'bg-muted-foreground/30' },
] as const;

function parseDurationToMinutes(val: string | null): number | null {
  if (!val) return null;
  const s = val.toLowerCase();
  let multiplier = 1;
  if (s.includes('hour')) multiplier = 60;
  else if (s.includes('day')) multiplier = 1440;
  const nums = s.match(/[\d.]+/g);
  if (!nums?.length) return null;
  return (nums.map(Number).reduce((a, b) => a + b, 0) / nums.length) * multiplier;
}

function DurationBar({ roa }: { roa: DurationData }) {
  const segments = barPhases
    .map(p => ({ ...p, raw: (roa as any)[p.key] as string | null, minutes: parseDurationToMinutes((roa as any)[p.key]) }))
    .filter(p => p.minutes != null && p.minutes > 0) as Array<{ key: string; label: string; color: string; raw: string; minutes: number }>;
  if (!segments.length) return null;
  const totalMin = segments.reduce((s, p) => s + p.minutes, 0);
  return (
    <div>
      <div className="flex h-6 rounded-lg overflow-hidden border border-border/40">
        {segments.map(seg => {
          const pct = Math.max((seg.minutes / totalMin) * 100, 4);
          return (
            <Tooltip key={seg.key}>
              <TooltipTrigger asChild>
                <div className={`${seg.color} flex items-center justify-center text-[9px] font-semibold text-white/90 cursor-default transition-all hover:brightness-110`} style={{ width: `${pct}%` }}>
                  {pct > 12 ? seg.label : ''}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                <p className="font-semibold">{seg.label}</p>
                <p className="text-popover-foreground/80">{seg.raw}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
        {segments.map(seg => (
          <div key={seg.key} className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className={`w-2 h-2 rounded-full ${seg.color} shrink-0`} />
            <span>{seg.label}: {seg.raw}</span>
          </div>
        ))}
      </div>
      {roa.total && <p className="text-[10px] text-muted-foreground mt-1">Total: <span className="font-medium text-foreground">{roa.total}</span></p>}
    </div>
  );
}

// ── Resolve slug to DirectorySubstance ─────────────────────────────────────
function findSubstanceBySlug(slug: string): DirectorySubstance | null {
  for (const cat of substanceDirectory) {
    for (const sc of cat.subcategories) {
      const found = sc.substances.find(s => s.urlSlug === slug || s.name === slug);
      if (found) return found;
    }
  }
  return null;
}

function findCategoryForSubstance(name: string): string | null {
  for (const cat of substanceDirectory) {
    for (const sc of cat.subcategories) {
      if (sc.substances.some(s => s.name === name)) return cat.name;
    }
  }
  return null;
}

// ── Page Component ─────────────────────────────────────────────────────────
export default function WikiSubstanceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const substance = slug ? findSubstanceBySlug(decodeURIComponent(slug)) : null;

  const [data, setData] = useState<WikiSubstanceData | null>(null);
  const [combos, setCombos] = useState<Record<string, TripSitCombo> | null>(null);
  const [loading, setLoading] = useState(true);
  const [combosLoading, setCombosLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  const substanceName = substance?.name || '';
  const category = substanceName ? findCategoryForSubstance(substanceName) : null;

  useEffect(() => {
    if (!substanceName || fetchedRef.current) return;
    fetchedRef.current = true;

    // Fetch wiki data
    const cached = wikiCache.get(substanceName);
    if (cached !== undefined) {
      setData(cached);
      setLoading(false);
    } else {
      (async () => {
        try {
          const { data: result, error: fnError } = await supabase.functions.invoke('psychonautwiki-substance', {
            body: { substance: substanceName },
          });
          if (fnError) throw fnError;
          const d = result?.data || null;
          setData(d);
          wikiCache.set(substanceName, d);
          if (!d) setError('No data found on PsychonautWiki for this substance.');
        } catch {
          setError('Could not load substance data.');
          wikiCache.set(substanceName, null);
        } finally {
          setLoading(false);
        }
      })();
    }

    // Fetch combos
    const cachedCombos = comboCache.get(substanceName);
    if (cachedCombos !== undefined) {
      setCombos(cachedCombos);
      setCombosLoading(false);
    } else {
      (async () => {
        try {
          const { data: result, error: fnError } = await supabase.functions.invoke('tripsit-api', {
            body: { action: 'drug', name: substanceName.toLowerCase() },
          });
          if (fnError) throw fnError;
          const entry = result?.data?.[0];
          const comboData = entry?.combos || null;
          setCombos(comboData);
          comboCache.set(substanceName, comboData);
        } catch {
          comboCache.set(substanceName, null);
        } finally {
          setCombosLoading(false);
        }
      })();
    }
  }, [substanceName]);

  if (!substance) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">Substance not found</h1>
          <p className="text-muted-foreground font-body mb-6">This substance is not in the directory.</p>
          <Link to="/substances" className="text-primary hover:underline font-body">← Back to Library</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`${substanceName} — Substance Education`}
        description={`Educational information on ${substanceName} from PsychonautWiki — effects, risk profile, and duration timeline.`}
        path={`/substances/wiki/${substance.urlSlug}`}
      />

      {/* Header */}
      <section className="section-hero text-primary-foreground py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/substances" className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground text-sm font-body mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </Link>
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <h1 className="font-display text-3xl md:text-4xl font-bold">{substanceName}</h1>
            {category && (
              <span className="text-sm font-medium px-3 py-1 rounded-full border border-primary-foreground/30 text-primary-foreground/90 mt-1">
                {category}
              </span>
            )}
          </div>
          <p className="text-primary-foreground/75 text-sm font-body">
            Community-sourced educational data from PsychonautWiki (CC BY-SA 4.0)
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Disclaimer />

        {loading && (
          <div className="card-elevated p-8 flex items-center justify-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground font-body">Loading from PsychonautWiki…</span>
          </div>
        )}

        {error && !data && (
          <div className="card-elevated p-6 text-center">
            <p className="text-muted-foreground font-body text-sm">{error}</p>
            <a href={getPsychonautWikiUrl(substance.urlSlug)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-body mt-2 inline-block">
              View on PsychonautWiki →
            </a>
          </div>
        )}

        {data && (
          <>
            {/* Classification */}
            {(data.chemicalClass.length > 0 || data.psychoactiveClass.length > 0) && (
              <div className="card-elevated p-6 space-y-3">
                <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" /> Classification
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {data.chemicalClass.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">Chemical Class</p>
                      <div className="flex flex-wrap gap-1.5">
                        {data.chemicalClass.map(c => (
                          <span key={c} className="px-2.5 py-1 text-xs border border-border rounded-full text-foreground font-body bg-muted/50">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.psychoactiveClass.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">Psychoactive Class</p>
                      <div className="flex flex-wrap gap-1.5">
                        {data.psychoactiveClass.map(c => (
                          <span key={c} className="px-2.5 py-1 text-xs border border-border rounded-full text-foreground font-body bg-muted/50">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Effects */}
            {data.effects.length > 0 && (
              <div className="card-elevated p-6 space-y-3">
                <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" /> Reported Effects
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.effects.map(effect => (
                    <span key={effect} className="px-2.5 py-1 text-xs border border-border rounded-full text-muted-foreground font-body bg-muted/50">
                      {effect}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground font-body italic">
                  Community-reported effects. Individual experiences vary significantly.
                </p>
              </div>
            )}

            {/* Duration Timeline */}
            {data.durations.length > 0 && (
              <div className="card-elevated p-6 space-y-4">
                <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                  <Timer className="w-5 h-5 text-primary" /> Duration Timeline
                </h2>
                <TooltipProvider delayDuration={150}>
                  <div className="space-y-4">
                    {data.durations.map(roa => (
                      <div key={roa.route}>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{roa.route}</p>
                        <DurationBar roa={roa} />
                      </div>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
            )}

            {/* Addiction & Toxicity */}
            {(data.addictionPotential || data.toxicity.length > 0) && (
              <div className="card-elevated p-6 space-y-3">
                <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                  <Pill className="w-5 h-5 text-primary" /> Risk Profile
                </h2>
                {data.addictionPotential && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 font-body">Addiction Potential</p>
                    <p className="text-sm text-foreground font-body">{data.addictionPotential}</p>
                  </div>
                )}
                {data.toxicity.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 font-body">Toxicity</p>
                    <ul className="space-y-1">
                      {data.toxicity.map((t, i) => (
                        <li key={i} className="text-sm text-foreground/80 font-body flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tolerance */}
            {data.tolerance && (data.tolerance.full || data.tolerance.half || data.tolerance.zero) && (
              <div className="card-elevated p-6 space-y-3">
                <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Tolerance
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {data.tolerance.full && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 font-body">Full</p>
                      <p className="text-sm text-foreground font-body">{data.tolerance.full}</p>
                    </div>
                  )}
                  {data.tolerance.half && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 font-body">Half</p>
                      <p className="text-sm text-foreground font-body">{data.tolerance.half}</p>
                    </div>
                  )}
                  {data.tolerance.zero && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 font-body">Baseline</p>
                      <p className="text-sm text-foreground font-body">{data.tolerance.zero}</p>
                    </div>
                  )}
                </div>
                {data.crossTolerances.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 font-body">Cross-Tolerances</p>
                    <div className="flex flex-wrap gap-1.5">
                      {data.crossTolerances.map(ct => (
                        <span key={ct} className="px-2.5 py-1 text-xs border border-border rounded-full text-muted-foreground font-body bg-muted/50">{ct}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* TripSit Interactions */}
        {combosLoading && (
          <div className="card-elevated p-6 flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground font-body">Loading TripSit interaction data…</span>
          </div>
        )}

        {!combosLoading && combos && Object.keys(combos).length > 0 && (
          <div className="card-elevated p-6 space-y-4">
            <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary" /> Known Interactions (TripSit)
            </h2>
            <p className="text-xs text-muted-foreground font-body italic">
              Community-sourced interaction data. Not peer-reviewed medical information.
            </p>
            <TooltipProvider delayDuration={200}>
              <div className="flex flex-wrap gap-2">
                {Object.entries(combos)
                  .sort(([, a], [, b]) => {
                    const order: Record<string, number> = { dangerous: 0, unsafe: 1, caution: 2 };
                    const aO = Object.keys(order).find(k => (a.status || '').toLowerCase().includes(k));
                    const bO = Object.keys(order).find(k => (b.status || '').toLowerCase().includes(k));
                    return (order[aO || ''] ?? 9) - (order[bO || ''] ?? 9);
                  })
                  .map(([name, combo]) => {
                    const config = getComboConfig(combo.status || '');
                    const Icon = config.icon;
                    const note = combo.note || config.label;
                    return (
                      <Tooltip key={name}>
                        <TooltipTrigger asChild>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border cursor-default ${config.className}`}>
                            <Icon className="w-3 h-3" />
                            {name}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-xs">
                          <p className="font-semibold mb-0.5">{config.label}: {name}</p>
                          <p className="text-popover-foreground/80">{note}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
              </div>
            </TooltipProvider>
          </div>
        )}

        {/* Harm Reduction Tips */}
        <div className="card-elevated p-6 space-y-4 border-l-4 border-l-primary">
          <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> Harm Reduction Awareness
          </h2>
          <p className="text-xs text-muted-foreground font-body italic">
            General safety principles from public health organizations. This is not guidance for use.
          </p>
          <ul className="space-y-2.5">
            {[
              { tip: 'Never use alone', detail: 'Having a sober, trusted person present can be life-saving in an emergency.' },
              { tip: 'Test substances when possible', detail: 'Reagent testing kits and drug checking services can identify dangerous adulterants.' },
              { tip: 'Start low, go slow', detail: 'Individual responses vary widely. Lower amounts reduce the risk of adverse reactions.' },
              { tip: 'Know the signs of emergency', detail: 'Difficulty breathing, chest pain, seizures, loss of consciousness, or extreme confusion require immediate emergency services (911).' },
              { tip: 'Avoid mixing substances', detail: 'Polydrug combinations increase risk unpredictably. Check interaction data before combining anything.' },
              { tip: 'Stay hydrated, but don\'t overhydrate', detail: 'Drink water in moderation — both dehydration and overhydration can be dangerous.' },
              { tip: 'Plan your environment', detail: 'Physical safety, temperature, and emotional setting all influence outcomes and risk.' },
              { tip: 'Carry naloxone if opioids are involved', detail: 'Naloxone can reverse opioid overdose. It is available without prescription in many areas.' },
            ].map(({ tip, detail }) => (
              <li key={tip} className="flex items-start gap-2.5 text-sm font-body">
                <ShieldCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">{tip}.</span>{' '}
                  <span className="text-muted-foreground">{detail}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-border/40 flex flex-wrap gap-3">
            <Link to="/emergency" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline font-body">
              <AlertTriangle className="w-4 h-4" /> Emergency Resources
            </Link>
            <a href="https://nextdistro.org/locator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline font-body">
              <ExternalLink className="w-4 h-4" /> Find Naloxone Near You
            </a>
          </div>
        </div>

        {/* Cross-reference tools */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to={`/combinations`}
            className="card-elevated card-hover p-5 flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <GitCompareArrows className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors">Combination Checker</p>
              <p className="text-xs text-muted-foreground font-body">Check interactions between {substanceName} and other substances</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link
            to="/matrix"
            className="card-elevated card-hover p-5 flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Grid3X3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors">Interaction Matrix</p>
              <p className="text-xs text-muted-foreground font-body">View the full 18×18 polydrug interaction grid</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* Source Attribution */}
        <div className="bg-muted/40 border border-border/60 rounded-xl p-5 flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground font-body">Sources</p>
            <p className="text-xs text-muted-foreground font-body">
              Substance data from{' '}
              <a href={data?.url || getPsychonautWikiUrl(substance.urlSlug)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PsychonautWiki</a>{' '}
              (CC BY-SA 4.0). Interaction data from{' '}
              <a href="https://tripsit.me" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TripSit</a>{' '}
              (community-maintained). Content is community-sourced and may not be peer-reviewed. No dosage information is displayed.
            </p>
          </div>
        </div>

        <Disclaimer />
      </div>
    </Layout>
  );
}
