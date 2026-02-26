import { useState, useCallback } from 'react';
import { substanceDirectory, getPsychonautWikiUrl, totalDirectorySubstances, type DirectorySubstance } from '@/data/substance-directory';
import { ExternalLink, ChevronDown, ChevronRight, Search, BookOpen, Clock, Loader2, Timer, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useState(() => {
    (async () => {
      try {
        const { data: result, error: fnError } = await supabase.functions.invoke('psychonautwiki-duration', {
          body: { substance: substance.name },
        });
        if (fnError) throw fnError;
        if (result?.success && result.data) {
          setData(result.data);
        } else {
          setError('No duration data available for this substance.');
        }
      } catch (e) {
        console.error('Duration fetch error:', e);
        setError('Could not load duration data.');
      } finally {
        setLoading(false);
      }
    })();
  });

  const phases = [
    { key: 'onset', label: 'Onset' },
    { key: 'comeup', label: 'Come up' },
    { key: 'peak', label: 'Peak' },
    { key: 'offset', label: 'Offset' },
    { key: 'total', label: 'Total' },
    { key: 'afterglow', label: 'Afterglow' },
  ] as const;

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
        <div className="space-y-3">
          {data.durations.map((roa) => (
            <div key={roa.route}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                {roa.route}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {phases.map(({ key, label }) => {
                  const value = roa[key];
                  if (!value) return null;
                  return (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {data && data.durations.length === 0 && (
        <p className="text-xs text-muted-foreground py-2">No duration data available.</p>
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
