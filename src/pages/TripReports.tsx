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
  mild: { label: 'Low Intensity', className: 'bg-slate-100 text-slate-700 border-slate-200' },
  moderate: { label: 'Moderate Intensity', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  strong: { label: 'High Intensity', className: 'bg-orange-100 text-orange-800 border-orange-200' },
  extreme: { label: 'Severe Intensity', className: 'bg-red-100 text-red-800 border-red-200' },
};

const sentimentConfig: Record<string, { label: string; icon: typeof Heart }> = {
  positive: { label: 'Favorable Outcome Reported', icon: Eye },
  mixed: { label: 'Variable Outcomes', icon: Gauge },
  negative: { label: 'Adverse Outcomes Reported', icon: MessageCircleWarning },
  neutral: { label: 'Neutral Account', icon: Eye },
};

function ReportCard({ report }: { report: TripReport }) {
  const [expanded, setExpanded] = useState(false);
  const intensity = intensityConfig[report.intensity];
  const sentiment = sentimentConfig[report.sentiment];
  const SentimentIcon = sentiment.icon;
  const isFentanylRelated = report.substance.toLowerCase().includes('fentanyl');
  const isMisidentifiedSubstance = /nbome|sold as|wasn't|contamina/i.test(report.title + report.substance + report.summary);

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
                Educational Observations
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

          {/* Reagent testing resource banner for misidentified substance reports */}
          {isMisidentifiedSubstance && !isFentanylRelated && (
            <div className="bg-accent/10 border-2 border-accent/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-accent-foreground mt-0.5 shrink-0" />
                <div className="space-y-2">
                   <h4 className="text-sm font-bold text-foreground">
                     Substance Verification Resources
                   </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Reagent test kits (Marquis, Mecke, Ehrlich) can help identify unknown substances and detect dangerous substitutions like NBOMe sold as LSD. Ehrlich reagent reacts with LSD/indoles but not NBOMe compounds. Testing takes minutes and can be life-saving.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://dancesafe.org/testing-kit-instructions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Get Reagent Test Kits — DanceSafe.org
                    </a>
                    <a
                      href="https://dancesafe.org/drug-checking/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Drug Checking Services
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
  const { t } = useLanguage();

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
        title={t('reports.title')}
        description={t('reports.subtitle')}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {t('reports.badge')}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t('reports.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            {t('reports.subtitle')}
            <a href="https://erowid.org/experiences/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Erowid's Experience Vault
            </a>
            . All content is <strong>anecdotal and community-sourced</strong> — not peer-reviewed science. No dosage, preparation, or route of administration information is provided.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            Educational summary of publicly documented reports. Not clinical evidence. Not an endorsement.
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
            {t('reports.tab_directory')}
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
            {t('reports.tab_reports')}
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
                  placeholder={t('reports.search_placeholder')}
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
                {t('reports.showing')} {filtered.length} {t('reports.of')} {tripReports.length} {t('reports.reports')}
              </p>
            </div>

            {/* Report grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="font-body">{t('reports.no_match')}</p>
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
                    <strong className="text-foreground">{t('reports.source_title')}</strong>{' '}
                    <a href="https://erowid.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Erowid.org</a>{' '}
                    Experience Vault — a community-maintained harm reduction resource.
                    All report content is <strong>anecdotal</strong> and represents individual experiences that may not be representative. Outcomes are highly variable and unpredictable.
                  </p>
                  <p>
                    {t('reports.source_desc')}
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

        {/* Harm Reduction Resources */}
        <div className="mt-10 border border-border/60 rounded-2xl overflow-hidden">
          <div className="bg-primary/5 px-5 py-4 border-b border-border/40">
            <h2 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              {t('reports.resources_title')}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {t('reports.resources_subtitle')}
            </p>
            <p className="text-[10px] text-muted-foreground/70 mt-1 italic">
              External organizations listed for informational purposes only. GoSafe.lat does not endorse or guarantee the services of any third party.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {[
              {
                name: 'DanceSafe',
                url: 'https://dancesafe.org',
                description: 'Reagent test kits, drug checking services, and harm reduction education at events.',
                cta: 'Get Test Kits',
                ctaUrl: 'https://dancesafe.org/testing-kit-instructions/',
              },
              {
                name: 'NextDistro',
                url: 'https://nextdistro.org',
                description: 'Free mail-based naloxone (Narcan) distribution and fentanyl test strips across the US.',
                cta: 'Get Free Naloxone',
                ctaUrl: 'https://nextdistro.org/get-naloxone',
              },
              {
                name: 'TripSit',
                url: 'https://tripsit.me',
                description: 'Real-time peer support chat, combination risk awareness charts, and factsheets for hundreds of substances.',
                cta: 'Chat Now',
                ctaUrl: 'https://chat.tripsit.me',
              },
              {
                name: 'Erowid',
                url: 'https://erowid.org',
                description: 'Comprehensive experience vault, substance information, and community-sourced educational data since 1995.',
                cta: 'Experience Vault',
                ctaUrl: 'https://erowid.org/experiences/',
              },
            ].map((org) => (
              <div key={org.name} className="bg-card p-4 flex flex-col gap-2">
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-foreground hover:text-primary transition-colors text-sm"
                >
                  {org.name}
                </a>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {org.description}
                </p>
                <a
                  href={org.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline mt-auto"
                >
                  <ExternalLink className="w-3 h-3" />
                  {org.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TripReports;
