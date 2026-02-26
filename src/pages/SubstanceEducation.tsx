import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Disclaimer } from '@/components/Disclaimer';
import { substances, categoryColors, dependencyColors } from '@/data/substances';
import { substanceDirectory, type DirectorySubstance, type SubstanceCategory } from '@/data/substance-directory';
import { BookOpen, Search, ChevronRight, ChevronDown, ExternalLink, Beaker } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';

const categoryLabels: Record<string, string> = {
  stimulant: 'Stimulant',
  depressant: 'Depressant',
  psychedelic: 'Psychedelic',
  dissociative: 'Dissociative',
  opioid: 'Opioid',
  cannabinoid: 'Cannabinoid',
  entactogen: 'Entactogen',
  other: 'Other',
};

const dependencyLabels: Record<string, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  'very high': 'Very High',
};

// Curated substance IDs (these have full detail pages)
const curatedIds = new Set(substances.map(s => s.id));

// Build a flat list of all directory substances for search
interface DirectoryEntry {
  substance: DirectorySubstance;
  categoryName: string;
  subcategoryName: string;
}

const allDirectoryEntries: DirectoryEntry[] = substanceDirectory.flatMap(cat =>
  cat.subcategories.flatMap(sc =>
    sc.substances.map(sub => ({
      substance: sub,
      categoryName: cat.name,
      subcategoryName: sc.name,
    }))
  )
);

export default function SubstanceEducation() {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedDirCategories, setExpandedDirCategories] = useState<Set<string>>(new Set());

  // Curated substances filtering
  const filteredCurated = substances.filter((s) => {
    const matchesQuery =
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.commonNames.some((n) => n.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || categoryFilter === 'curated' || s.category === categoryFilter;
    return matchesQuery && (categoryFilter === 'all' || categoryFilter === 'curated' || matchesCategory);
  });

  // Directory substances filtering
  const filteredDirectory = useMemo(() => {
    if (categoryFilter === 'curated') return [];
    const q = query.toLowerCase();
    return substanceDirectory
      .map(cat => {
        // Map directory category IDs to filter values
        const filterMatch = categoryFilter === 'all' || cat.id === categoryFilter;
        if (!filterMatch) return null;
        const filteredSubs = cat.subcategories
          .map(sc => ({
            ...sc,
            substances: sc.substances.filter(s =>
              !q || s.name.toLowerCase().includes(q)
            ),
          }))
          .filter(sc => sc.substances.length > 0);
        if (filteredSubs.length === 0) return null;
        return { ...cat, subcategories: filteredSubs };
      })
      .filter(Boolean) as SubstanceCategory[];
  }, [query, categoryFilter]);

  const dirSubstanceCount = filteredDirectory.reduce(
    (t, c) => t + c.subcategories.reduce((s, sc) => s + sc.substances.length, 0), 0
  );

  const curatedCategories = ['all', 'curated', ...Array.from(new Set(substances.map((s) => s.category)))];
  const dirCategoryIds = substanceDirectory.map(c => c.id);
  const allFilterOptions = [...curatedCategories, ...dirCategoryIds];

  const toggleDirCategory = useCallback((id: string) => {
    setExpandedDirCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const getFilterLabel = (f: string) => {
    if (f === 'all') return 'All';
    if (f === 'curated') return 'Curated';
    if (categoryLabels[f]) return categoryLabels[f];
    const dirCat = substanceDirectory.find(c => c.id === f);
    return dirCat?.name || f;
  };

  return (
    <Layout>
      <SEO
        title="Substance Education Library"
        description="Source-cited public health education on psychoactive substances — classifications, risk profiles, and harm prevention awareness."
        path="/substances"
      />
      {/* Header */}
      <section className="section-hero text-primary-foreground py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-primary-foreground/80 text-sm font-body uppercase tracking-wide font-medium">Public Health Education</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Substance Education Library
          </h1>
          <p className="text-primary-foreground/85 font-body text-lg max-w-2xl leading-relaxed">
            Source-cited public health information on psychoactive substances — classifications, risk profiles, and harm prevention awareness. Not guidance for use.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <Disclaimer />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all substances by name..."
              className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {allFilterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setCategoryFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors font-body border ${
                  categoryFilter === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {getFilterLabel(f)}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground font-body">
          {categoryFilter !== 'curated' && filteredCurated.length > 0 && `${filteredCurated.length} curated`}
          {categoryFilter !== 'curated' && filteredCurated.length > 0 && dirSubstanceCount > 0 && ' + '}
          {dirSubstanceCount > 0 && `${dirSubstanceCount} from PsychonautWiki`}
          {filteredCurated.length === 0 && dirSubstanceCount === 0 && 'No matches'}
          {' — educational data only'}
        </p>

        {/* Curated Substance Cards */}
        {filteredCurated.length > 0 && (categoryFilter === 'all' || categoryFilter === 'curated' || curatedCategories.includes(categoryFilter)) && (
          <div>
            {categoryFilter === 'all' && (
              <h2 className="font-display font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Curated Substance Profiles
              </h2>
            )}
            <div className="grid sm:grid-cols-2 gap-5">
              {filteredCurated.map((substance) => (
                <Link
                  key={substance.id}
                  to={`/substances/${substance.id}`}
                  className="card-elevated card-hover p-6 flex flex-col group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display font-semibold text-foreground text-xl group-hover:text-primary transition-colors">
                        {substance.name}
                      </h3>
                      <p className="text-muted-foreground text-xs font-body mt-0.5">
                        {substance.commonNames.slice(0, 3).join(' · ')}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${categoryColors[substance.category]}`}>
                      {substance.classification.split('/')[0].trim()}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground font-body leading-relaxed flex-1 mb-4 line-clamp-3">
                    {substance.generalEffects}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-body">Dependency potential:</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${dependencyColors[substance.dependencyPotential]}`}>
                        {dependencyLabels[substance.dependencyPotential]}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground font-body">
                      {substance.sources.length} cited source{substance.sources.length !== 1 ? 's' : ''} ·{' '}
                      {substance.sources.some(s => s.type === 'anecdotal') ? (
                        <span className="text-amber-600">includes anecdotal (labeled)</span>
                      ) : (
                        <span>governmental / educational</span>
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Directory Substances (PsychonautWiki) */}
        {filteredDirectory.length > 0 && (
          <div>
            <h2 className="font-display font-semibold text-foreground text-lg mb-1 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-primary" />
              PsychonautWiki Directory
            </h2>
            <p className="text-xs text-muted-foreground font-body mb-4">
              Community-sourced data under CC BY-SA 4.0. Click any substance for effects, duration timeline, and interaction data.
            </p>

            <div className="space-y-2">
              {filteredDirectory.map(cat => {
                const isExpanded = expandedDirCategories.has(cat.id) || !!query;
                const count = cat.subcategories.reduce((t, sc) => t + sc.substances.length, 0);
                return (
                  <div key={cat.id} className="border border-border/60 rounded-xl overflow-hidden bg-card">
                    <button
                      onClick={() => toggleDirCategory(cat.id)}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                      <span className="font-display font-semibold text-foreground text-sm">{cat.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{count}</span>
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
                                <Link
                                  key={sub.name}
                                  to={`/substances/wiki/${encodeURIComponent(sub.urlSlug)}`}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border bg-muted/60 text-foreground border-border/40 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3 opacity-50" />
                                  {sub.name}
                                </Link>
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
          </div>
        )}

        {filteredCurated.length === 0 && dirSubstanceCount === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground font-body">No substances match your search.</p>
          </div>
        )}

        {/* Bottom disclaimer */}
        <div className="disclaimer-box p-5">
          <p className="text-amber-800 text-sm font-body leading-relaxed">
            <strong className="font-semibold">Scope of this library:</strong> This educational database contains curated substance profiles with governmental/academic sources, plus community-sourced data from PsychonautWiki (CC BY-SA 4.0) and TripSit.
            Information describes general risk profiles and is not personalized.
            No dosage, route of administration, or preparation information is provided or implied.
          </p>
        </div>
      </div>
    </Layout>
  );
}
