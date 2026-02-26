import { useState } from 'react';
import { substanceDirectory, getPsychonautWikiUrl, totalDirectorySubstances } from '@/data/substance-directory';
import { ExternalLink, ChevronDown, ChevronRight, Search, BookOpen } from 'lucide-react';

export function SubstanceDirectory() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
        {search ? `${matchCount} matches` : `${totalDirectorySubstances} substances`} — links to PsychonautWiki (CC BY-SA 4.0)
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
                        {sc.substances.map(sub => (
                          <a
                            key={sub.name}
                            href={getPsychonautWikiUrl(sub.urlSlug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-muted/60 text-foreground border border-border/40 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors"
                          >
                            {sub.name}
                            <ExternalLink className="w-3 h-3 opacity-40" />
                          </a>
                        ))}
                      </div>
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
          Substance information sourced from{' '}
          <a href="https://psychonautwiki.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            PsychonautWiki
          </a>{' '}
          under{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            CC BY-SA 4.0
          </a>
          . Links open external pages. Content is community-maintained and may not be peer-reviewed.
        </p>
      </div>
    </div>
  );
}
