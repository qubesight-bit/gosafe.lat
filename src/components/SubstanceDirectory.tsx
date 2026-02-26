import { useState, useCallback, useEffect, useRef } from 'react';
import { substanceDirectory, getPsychonautWikiUrl, totalDirectorySubstances, type DirectorySubstance } from '@/data/substance-directory';
import { ExternalLink, ChevronDown, ChevronRight, Search, BookOpen, Clock, Loader2, Timer, X, AlertTriangle, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { type TripSitCombo } from '@/hooks/use-tripsit-api';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Simple in-memory cache for duration data
const durationCache = new Map<string, { data: SubstanceDurationResult | null; error: string | null }>();

// Cache for TripSit combo data
const comboCache = new Map<string, Record<string, TripSitCombo> | null>();

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

interface DurationData {
  route: string;
  onset: string | null;
  comeup: string | null;
  peak: string | null;
  offset: string | null;
  total: string | null;
  afterglow: string | null;
}

interface SubstanceDurationResult {
  name: string;
  durations: DurationData[];
}

function DurationPanel({ substance, onClose }: { substance: DirectorySubstance; onClose: () => void }) {
  const [data, setData] = useState<SubstanceDurationResult | null>(null);
  const [combos, setCombos] = useState<Record<string, TripSitCombo> | null>(null);
  const [loading, setLoading] = useState(true);
  const [combosLoading, setCombosLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    // Fetch duration (cached)
    const cachedDuration = durationCache.get(substance.name);
    if (cachedDuration) {
      setData(cachedDuration.data);
      setError(cachedDuration.error);
      setLoading(false);
    } else {
      (async () => {
        try {
          const { data: result, error: fnError } = await supabase.functions.invoke('psychonautwiki-duration', {
            body: { substance: substance.name },
          });
          if (fnError) throw fnError;
          if (result?.success && result.data) {
            setData(result.data);
            durationCache.set(substance.name, { data: result.data, error: null });
          } else {
            const msg = 'No duration data available.';
            setError(msg);
            durationCache.set(substance.name, { data: null, error: msg });
          }
        } catch (e) {
          console.error('Duration fetch error:', e);
          const msg = 'Could not load duration data.';
          setError(msg);
          durationCache.set(substance.name, { data: null, error: msg });
        } finally {
          setLoading(false);
        }
      })();
    }

    // Fetch combos (cached)
    const cachedCombos = comboCache.get(substance.name);
    if (cachedCombos !== undefined) {
      setCombos(cachedCombos);
      setCombosLoading(false);
    } else {
      (async () => {
        try {
          const { data: result, error: fnError } = await supabase.functions.invoke('tripsit-api', {
            body: { action: 'drug', name: substance.name.toLowerCase() },
          });
          if (fnError) throw fnError;
          const entry = result?.data?.[0];
          const comboData = entry?.combos || null;
          setCombos(comboData);
          comboCache.set(substance.name, comboData);
        } catch {
          comboCache.set(substance.name, null);
        } finally {
          setCombosLoading(false);
        }
      })();
    }
  }, [substance.name]);

  // Timeline bar phases (excluding total which is shown separately)
  const barPhases = [
    { key: 'onset', label: 'Onset', color: 'bg-blue-400' },
    { key: 'comeup', label: 'Come up', color: 'bg-sky-400' },
    { key: 'peak', label: 'Peak', color: 'bg-primary' },
    { key: 'offset', label: 'Offset', color: 'bg-amber-400' },
    { key: 'afterglow', label: 'Afterglow', color: 'bg-muted-foreground/30' },
  ] as const;

  /** Parse a duration string like "1 - 2 hours" or "30 - 60 minutes" to minutes midpoint */
  function parseDurationToMinutes(val: string | null): number | null {
    if (!val) return null;
    const s = val.toLowerCase();
    let multiplier = 1;
    if (s.includes('hour')) multiplier = 60;
    else if (s.includes('day')) multiplier = 1440;
    const nums = s.match(/[\d.]+/g);
    if (!nums || nums.length === 0) return null;
    const values = nums.map(Number);
    return (values.reduce((a, b) => a + b, 0) / values.length) * multiplier;
  }

  function DurationBar({ roa }: { roa: DurationData }) {
    const segments = barPhases
      .map(p => ({ ...p, raw: roa[p.key], minutes: parseDurationToMinutes(roa[p.key]) }))
      .filter(p => p.minutes != null && p.minutes > 0) as Array<{ key: string; label: string; color: string; raw: string; minutes: number }>;

    if (segments.length === 0) return null;
    const totalMin = segments.reduce((s, p) => s + p.minutes, 0);

    return (
      <div>
        <div className="flex h-6 rounded-lg overflow-hidden border border-border/40">
          {segments.map(seg => {
            const pct = Math.max((seg.minutes / totalMin) * 100, 4);
            return (
              <Tooltip key={seg.key}>
                <TooltipTrigger asChild>
                  <div
                    className={`${seg.color} flex items-center justify-center text-[9px] font-semibold text-white/90 cursor-default transition-all hover:brightness-110`}
                    style={{ width: `${pct}%` }}
                  >
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
        {roa.total && (
          <p className="text-[10px] text-muted-foreground mt-1">
            Total: <span className="font-medium text-foreground">{roa.total}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-2 bg-background border border-border rounded-xl p-4 shadow-lg animate-fade-in max-w-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-primary" />
          <h4 className="font-display font-semibold text-foreground text-sm">{substance.name} — Duration</h4>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-4 justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading from PsychonautWiki…
        </div>
      )}

      {error && (
        <p className="text-xs text-muted-foreground py-2">{error}</p>
      )}

      {data && data.durations.length > 0 && (
        <TooltipProvider delayDuration={150}>
          <div className="space-y-3">
            {data.durations.map((roa) => (
              <div key={roa.route}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  {roa.route}
                </p>
                <DurationBar roa={roa} />
              </div>
            ))}
          </div>
        </TooltipProvider>
      )}

      {data && data.durations.length === 0 && (
        <p className="text-xs text-muted-foreground py-2">No duration data available.</p>
      )}

      {/* Interaction warnings from TripSit */}
      {combosLoading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-2 justify-center border-t border-border/40 mt-3 pt-3">
          <Loader2 className="w-3 h-3 animate-spin" />
          Loading interactions from TripSit…
        </div>
      )}

      {!combosLoading && combos && Object.keys(combos).length > 0 && (
        <div className="border-t border-border/40 mt-3 pt-3">
          <h5 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-primary" />
            Known Interactions
          </h5>
          <TooltipProvider delayDuration={200}>
            <div className="flex flex-wrap gap-1.5">
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
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border cursor-default ${config.className}`}
                        >
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
          <p className="text-[10px] text-muted-foreground mt-1.5">
            Source: TripSit — community-sourced, not peer-reviewed. Hover/tap chips for details.
          </p>
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between">
        <a
          href={getPsychonautWikiUrl(substance.urlSlug)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <ExternalLink className="w-3 h-3" />
          Full info on PsychonautWiki
        </a>
        <span className="text-[10px] text-muted-foreground">CC BY-SA 4.0</span>
      </div>
    </div>
  );
}

export function SubstanceDirectory() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [selectedSubstance, setSelectedSubstance] = useState<DirectorySubstance | null>(null);

  const toggleCategory = useCallback((id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filteredDirectory = search
    ? substanceDirectory.map(cat => ({
        ...cat,
        subcategories: cat.subcategories
          .map(sc => ({
            ...sc,
            substances: sc.substances.filter(s =>
              s.name.toLowerCase().includes(search.toLowerCase())
            ),
          }))
          .filter(sc => sc.substances.length > 0),
      })).filter(cat => cat.subcategories.length > 0)
    : substanceDirectory;

  const matchCount = filteredDirectory.reduce(
    (t, c) => t + c.subcategories.reduce((s, sc) => s + sc.substances.length, 0), 0
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search substances..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        {search ? `${matchCount} matches` : `${totalDirectorySubstances} substances`} — click any substance for duration timeline · links to PsychonautWiki (CC BY-SA 4.0)
      </p>

      {/* Categories */}
      <div className="space-y-2">
        {filteredDirectory.map(cat => {
          const isExpanded = expandedCategories.has(cat.id) || !!search;
          return (
            <div key={cat.id} className="border border-border/60 rounded-xl overflow-hidden bg-card">
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                <span className="font-display font-semibold text-foreground text-sm">
                  {cat.name}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {cat.subcategories.reduce((t, sc) => t + sc.substances.length, 0)}
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 animate-fade-in">
                  {cat.subcategories.map(sc => (
                    <div key={sc.name}>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                        {sc.name}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {sc.substances.map(sub => {
                          const isSelected = selectedSubstance?.name === sub.name;
                          return (
                            <button
                              key={sub.name}
                              onClick={() => setSelectedSubstance(isSelected ? null : sub)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                                isSelected
                                  ? 'bg-primary/15 border-primary/40 text-primary'
                                  : 'bg-muted/60 text-foreground border-border/40 hover:bg-primary/10 hover:border-primary/30 hover:text-primary'
                              }`}
                            >
                              <Clock className="w-3 h-3 opacity-50" />
                              {sub.name}
                            </button>
                          );
                        })}
                      </div>

                      {/* Duration panel for selected substance in this subcategory */}
                      {selectedSubstance && sc.substances.some(s => s.name === selectedSubstance.name) && (
                        <DurationPanel
                          key={selectedSubstance.name}
                          substance={selectedSubstance}
                          onClose={() => setSelectedSubstance(null)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Attribution */}
      <div className="bg-muted/40 border border-border/60 rounded-xl p-4 flex items-start gap-3">
        <BookOpen className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground font-body">
          Duration data sourced from{' '}
          <a href="https://psychonautwiki.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            PsychonautWiki
          </a>{' '}
          via their{' '}
          <a href="https://api.psychonautwiki.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            GraphQL API
          </a>{' '}
          under{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            CC BY-SA 4.0
          </a>
          . Content is community-maintained and may not be peer-reviewed. No dosage information is displayed.
        </p>
      </div>
    </div>
  );
}
