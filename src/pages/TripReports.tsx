import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Disclaimer } from '@/components/Disclaimer';
import { SubstanceDirectory } from '@/components/SubstanceDirectory';
import { tripReports, reportSubstances, type TripReport } from '@/data/trip-reports';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  BookOpen, Search, AlertTriangle, ExternalLink, ChevronDown, ChevronUp,
  Gauge, Heart, MessageCircleWarning, Eye, Shield, Library, FileText
} from 'lucide-react';

const intensityConfig: Record<string, { label: string; className: string }> = {
  mild: { label: 'Mild', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  moderate: { label: 'Moderate', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  strong: { label: 'Strong', className: 'bg-orange-100 text-orange-800 border-orange-200' },
  extreme: { label: 'Extreme', className: 'bg-red-100 text-red-800 border-red-200' },
};

const sentimentConfig: Record<string, { label: string; icon: typeof Heart }> = {
  positive: { label: 'Positive', icon: Heart },
  mixed: { label: 'Mixed', icon: Gauge },
  negative: { label: 'Negative', icon: MessageCircleWarning },
  neutral: { label: 'Neutral', icon: Eye },
};

function ReportCard({ report }: { report: TripReport }) {
  const [expanded, setExpanded] = useState(false);
  const intensity = intensityConfig[report.intensity];
  const sentiment = sentimentConfig[report.sentiment];
  const SentimentIcon = sentiment.icon;
  const isFentanylRelated = report.substance.toLowerCase().includes('fentanyl');

  return (
    <article className="bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${intensity.className}`}>
            <Gauge className="w-3 h-3" />
            {intensity.label}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border/40">
            <SentimentIcon className="w-3 h-3" />
            {sentiment.label}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">{report.year}</span>
        </div>

        <h3 className="font-display font-semibold text-foreground text-lg leading-tight mb-1">
          {report.title}
        </h3>
        <p className="text-sm text-primary font-medium mb-2">{report.substance}</p>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
          <span>{report.gender} · {report.ageRange}</span>
          <span>Setting: {report.setting}</span>
        </div>

        <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-3">
          {report.summary}
        </p>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 animate-fade-in">
          <div className="border-t border-border/40 pt-4">
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              {report.summary}
            </p>
          </div>

          {report.keyTakeaways.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary" />
                Key Educational Takeaways
              </h4>
              <ul className="space-y-1.5">
                {report.keyTakeaways.map((t, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {report.warningSignsObserved.length > 0 && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3">
              <h4 className="text-sm font-semibold text-destructive mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Warning Signs Observed
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {report.warningSignsObserved.map((w, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-destructive/10 text-destructive border border-destructive/20">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Naloxone resource banner for fentanyl-related reports */}
          {isFentanylRelated && (
            <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-foreground">
                    Naloxone (Narcan) Saves Lives
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Naloxone is a medication that can rapidly reverse an opioid overdose. It's available without a prescription in many areas and should be carried by anyone who may encounter opioid exposure — even unintentionally.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://nextdistro.org/get-naloxone"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Get Free Naloxone — NextDistro.org
                    </a>
                    <a
                      href="https://nextdistro.org/get-fentanyl-test-strips"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Get Fentanyl Test Strips
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <a
            href={report.erowidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Read full report on Erowid.org
          </a>
        </div>
      )}

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-3 border-t border-border/40 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-1.5"
      >
        {expanded ? (
          <><ChevronUp className="w-4 h-4" /> Hide details</>
        ) : (
          <><ChevronDown className="w-4 h-4" /> View takeaways & details</>
        )}
      </button>
    </article>
  );
}

const TripReports = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'directory'>('directory');
  const [search, setSearch] = useState('');
  const [substanceFilter, setSubstanceFilter] = useState('all');
  const [intensityFilter, setIntensityFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');

  const filtered = useMemo(() => {
    return tripReports.filter(r => {
      if (substanceFilter !== 'all' && r.substance !== substanceFilter) return false;
      if (intensityFilter !== 'all' && r.intensity !== intensityFilter) return false;
      if (sentimentFilter !== 'all' && r.sentiment !== sentimentFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.substance.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          r.keyTakeaways.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, substanceFilter, intensityFilter, sentimentFilter]);

  return (
    <Layout>
      <SEO
        title="Trip Reports — Educational Experience Summaries | GoSafe.lat"
        description="Browse curated educational summaries of substance experience reports from Erowid's Experience Vault. Anecdotal community data for harm reduction awareness."
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Anecdotal · Community-Sourced
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Experience Report Summaries
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Educational summaries of experience reports from{' '}
            <a href="https://erowid.org/experiences/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Erowid's Experience Vault
            </a>
            . All content is <strong>anecdotal and community-sourced</strong> — not peer-reviewed science. No dosage, preparation, or route of administration information is provided.
          </p>
        </div>

        <Disclaimer variant="compact" />

        {/* Tabs */}
        <div className="mt-6 mb-6 flex gap-2 border-b border-border/60">
          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'directory'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Library className="w-4 h-4" />
            Substance Directory
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'reports'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="w-4 h-4" />
            Curated Summaries
          </button>
        </div>

        {activeTab === 'directory' ? (
          <SubstanceDirectory />
        ) : (
          <>
            {/* Filters */}
            <div className="mb-8 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search reports by keyword..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  value={substanceFilter}
                  onChange={(e) => setSubstanceFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-border bg-background text-sm font-body text-foreground"
                >
                  <option value="all">All Substances</option>
                  {reportSubstances.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={intensityFilter}
                  onChange={(e) => setIntensityFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-border bg-background text-sm font-body text-foreground"
                >
                  <option value="all">All Intensities</option>
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="strong">Strong</option>
                  <option value="extreme">Extreme</option>
                </select>

                <select
                  value={sentimentFilter}
                  onChange={(e) => setSentimentFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-border bg-background text-sm font-body text-foreground"
                >
                  <option value="all">All Sentiments</option>
                  <option value="positive">Positive</option>
                  <option value="mixed">Mixed</option>
                  <option value="negative">Negative</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              <p className="text-xs text-muted-foreground">
                Showing {filtered.length} of {tripReports.length} reports — educational summaries only
              </p>
            </div>

            {/* Report grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="font-body">No reports match your filters. Try adjusting your search.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {filtered.map(report => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            )}

            {/* Source disclaimer */}
            <div className="mt-10 bg-muted/40 border border-border/60 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-sm text-muted-foreground font-body space-y-2">
                  <p>
                    <strong className="text-foreground">Data source:</strong>{' '}
                    <a href="https://erowid.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Erowid.org</a>{' '}
                    Experience Vault — a community-maintained harm reduction resource.
                    All report content is <strong>anecdotal</strong> and represents individual experiences that may not be representative.
                  </p>
                  <p>
                    These summaries are provided for <strong>educational harm reduction awareness only</strong>.
                    They do not include dosage, preparation, or route of administration information.
                    Individual reactions vary enormously based on health, genetics, environment, and other factors.
                    <strong> Always consult a healthcare professional.</strong>
                  </p>
                  <p className="text-xs">
                    Erowid citation: "Experience Reports." Erowid Experience Vault. erowid.org. Accessed 2024.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default TripReports;
