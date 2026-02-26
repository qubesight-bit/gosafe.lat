import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Disclaimer } from '@/components/Disclaimer';
import { substances, categoryColors, dependencyColors } from '@/data/substances';
import { BookOpen, Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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

export default function SubstanceEducation() {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = substances.filter((s) => {
    const matchesQuery =
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.commonNames.some((n) => n.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(substances.map((s) => s.category)))];

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
              placeholder="Search substances by name..."
              className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors font-body border ${
                  categoryFilter === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {cat === 'all' ? 'All' : categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground font-body">
          Showing {filtered.length} substance{filtered.length !== 1 ? 's' : ''} — educational data only
        </p>

        {/* Substance Cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((substance) => (
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

              {/* Source count */}
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground font-body">
                  {substance.sources.length} cited source{substance.sources.length !== 1 ? 's' : ''} ·{' '}
                  {substance.sources.some(s => s.type === 'anecdotal') && (
                    <span className="text-amber-600">includes anecdotal (labeled)</span>
                  )}
                  {!substance.sources.some(s => s.type === 'anecdotal') && (
                    <span>governmental / educational</span>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground font-body">No substances match your search.</p>
          </div>
        )}

        {/* Bottom disclaimer */}
        <div className="disclaimer-box p-5">
          <p className="text-amber-800 text-sm font-body leading-relaxed">
            <strong className="font-semibold">Scope of this library:</strong> This educational database contains a curated selection of substances for public health awareness purposes. 
            Content is based on sources from WHO, NIH, NIDA, and clearly-labeled educational platforms. 
            Information describes general risk profiles and is not personalized. 
            No dosage, route of administration, or preparation information is provided or implied.
          </p>
        </div>
      </div>
    </Layout>
  );
}
