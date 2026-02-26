import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Disclaimer } from '@/components/Disclaimer';
import { myths, categoryLabels, type MythEntry } from '@/data/faq-myths';
import { Search, XCircle, CheckCircle2, ExternalLink, Filter, MessageCircleQuestion } from 'lucide-react';

const categoryOrder = ['general', 'alcohol', 'cannabis', 'opioids', 'stimulants', 'psychedelics', 'combinations'];

export default function FAQ() {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    let items = myths;
    if (categoryFilter !== 'all') {
      items = items.filter(m => m.category === categoryFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        m =>
          m.myth.toLowerCase().includes(q) ||
          m.reality.toLowerCase().includes(q) ||
          m.details.toLowerCase().includes(q)
      );
    }
    return items;
  }, [query, categoryFilter]);

  return (
    <Layout>
      <SEO
        title="FAQ & Myth-Busting — GoSafe.lat"
        description="Evidence-based answers to common misconceptions about substances. Every claim is backed by WHO, NIH, CDC, and peer-reviewed sources."
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent-muted text-accent-foreground px-4 py-1.5 rounded-full text-sm font-body font-medium mb-4">
            <MessageCircleQuestion className="w-4 h-4" />
            Evidence-Based Answers
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            FAQ & Myth-Busting
          </h1>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Common misconceptions about substances, debunked with cited scientific evidence from WHO, NIH, CDC, and other authoritative sources.
          </p>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search myths..."
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium font-body whitespace-nowrap transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {categoryOrder.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium font-body whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground font-body mb-6">
          Showing {filtered.length} of {myths.length} entries
        </p>

        {/* Myth cards */}
        <div className="space-y-6">
          {filtered.map(entry => (
            <MythCard key={entry.id} entry={entry} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <MessageCircleQuestion className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-muted-foreground font-body">No matching entries found. Try a different search term.</p>
          </div>
        )}

        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </Layout>
  );
}

function MythCard({ entry }: { entry: MythEntry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 md:p-6"
      >
        {/* Category badge */}
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium font-body bg-muted text-muted-foreground mb-3 uppercase tracking-wide">
          {categoryLabels[entry.category]}
        </span>

        {/* Myth */}
        <div className="flex items-start gap-3 mb-3">
          <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <p className="font-display font-semibold text-foreground text-base md:text-lg leading-snug">
            {entry.myth}
          </p>
        </div>

        {/* Reality */}
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'hsl(var(--severity-none))' }} />
          <p className="font-body text-sm md:text-base text-foreground/90 leading-relaxed">
            {entry.reality}
          </p>
        </div>

        <span className="block mt-3 text-xs text-primary font-body font-medium">
          {expanded ? '▲ Hide details' : '▼ Read more & sources'}
        </span>
      </button>

      {expanded && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-border pt-4 animate-fade-in">
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
            {entry.details}
          </p>

          <div className="flex flex-wrap gap-2">
            {entry.sources.map(src => (
              <a
                key={src.url}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity"
              >
                <ExternalLink className="w-3 h-3" />
                {src.name} — {src.institution}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
