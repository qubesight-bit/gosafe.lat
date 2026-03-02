import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Disclaimer } from '@/components/Disclaimer';
import { SourceSection } from '@/components/SourceCard';
import { substances, categoryColors, dependencyColors } from '@/data/substances';
import { useTripSitApi, mapTripSitStatus } from '@/hooks/use-tripsit-api';
import type { TripSitDrug } from '@/hooks/use-tripsit-api';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  AlertTriangle, AlertCircle, ArrowLeft, Brain, Heart, Clock, Zap, Scale, Shield, ExternalLink, Loader2
} from 'lucide-react';

const dependencyLabels: Record<string, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  'very high': 'Very High',
};

const combinationColors: Record<string, string> = {
  caution: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  dangerous: 'bg-orange-50 text-orange-700 border-orange-200',
  severe: 'bg-red-50 text-red-700 border-red-200',
};

export default function SubstanceDetail() {
  const { id } = useParams<{ id: string }>();
  const substance = substances.find((s) => s.id === id);
  const tripSitApi = useTripSitApi();
  const [tripSitData, setTripSitData] = useState<TripSitDrug | null>(null);
  const [tripSitLoading, setTripSitLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!substance) return;
    setTripSitLoading(true);
    tripSitApi.getDrug(substance.name)
      .then(data => setTripSitData(data))
      .catch(() => setTripSitData(null))
      .finally(() => setTripSitLoading(false));
  }, [substance?.name]);

  if (!substance) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">{t('detail.not_found')}</h1>
          <p className="text-muted-foreground font-body mb-6">{t('detail.not_found_desc')}</p>
          <Link to="/substances" className="text-primary hover:underline font-body">{t('detail.back')}</Link>
        </div>
      </Layout>
    );
  }

  const tripSitCombos = tripSitData?.combos
    ? Object.entries(tripSitData.combos).map(([name, combo]) => ({
        name,
        ...mapTripSitStatus(combo.status),
        note: combo.note,
      }))
    : [];

  const tripSitEffects = tripSitData?.formatted_effects ?? [];

  return (
    <Layout>
      <SEO
        title={substance.name}
        description={`Educational information on ${substance.name} — classification, risk profile, dependency potential, and cited sources.`}
        path={`/substances/${substance.id}`}
      />
      {/* Header */}
      <section className="section-hero text-primary-foreground py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/substances"
            className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground text-sm font-body mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t('detail.back')}
          </Link>
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <h1 className="font-display text-3xl md:text-4xl font-bold">{substance.name}</h1>
            <span className={`text-sm font-medium px-3 py-1 rounded-full border mt-1 ${categoryColors[substance.category]}`}>
              {substance.classification}
            </span>
          </div>
          <p className="text-primary-foreground/75 text-sm font-body">
            {t('detail.also_known')} {substance.commonNames.join(', ')}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Disclaimer />

        {/* General Effects */}
        <div className="card-elevated p-6 space-y-3">
          <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> {t('detail.general_effects')}
          </h2>
          <p className="text-foreground/80 text-sm font-body leading-relaxed">{substance.generalEffects}</p>
          <p className="text-xs text-muted-foreground font-body italic">
            {t('detail.effects_note')}
          </p>
        </div>

        {/* Risk Profiles */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Physical Risks */}
          <div className="card-elevated p-5 space-y-3">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" /> Physical Health Risks
            </h3>
            <ul className="space-y-2">
              {substance.physicalRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Mental Risks */}
          <div className="card-elevated p-5 space-y-3">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" /> Mental Health Risks
            </h3>
            <ul className="space-y-2">
              {substance.mentalRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Short-term */}
          <div className="card-elevated p-5 space-y-3">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Short-Term Risks
            </h3>
            <ul className="space-y-2">
              {substance.shortTermRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Long-term */}
          <div className="card-elevated p-5 space-y-3">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" /> Long-Term Risks
            </h3>
            <ul className="space-y-2">
              {substance.longTermRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dependency Potential */}
        <div className="card-elevated p-6 space-y-3">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary" /> Dependency Potential
          </h3>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${dependencyColors[substance.dependencyPotential]}`}>
              {dependencyLabels[substance.dependencyPotential]}
            </span>
            <span className="text-muted-foreground text-sm font-body">{substance.dependencyNote}</span>
          </div>
        </div>

        {/* Combination Risks */}
        <div className="card-elevated p-6 space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> High-Level Combination Risk Overview
          </h3>
          <p className="text-xs text-muted-foreground font-body italic">
            This is educational awareness only. No operational or procedural guidance is provided or implied.
          </p>
          <div className="grid gap-3">
            {substance.combinationRisks.map((risk, i) => (
              <div key={i} className={`p-3 rounded-lg border text-sm font-body ${combinationColors[risk.riskLevel]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <strong>{substance.name} + {risk.substance}</strong>
                  <span className="text-xs uppercase font-medium px-1.5 py-0.5 rounded bg-current/10 border border-current/20">
                    {risk.riskLevel}
                  </span>
                </div>
                <p className="opacity-90 text-xs">{risk.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Warnings */}
        <div className="emergency-box p-6 space-y-4">
          <h3 className="font-display font-semibold text-red-800 flex items-center gap-2 text-lg">
            <AlertCircle className="w-5 h-5 text-red-600" /> Emergency Warning Signs
          </h3>
          <p className="text-red-700 text-sm font-body">
            If any of the following occur, call emergency services immediately (Costa Rica: 911):
          </p>
          <ul className="space-y-2">
            {substance.emergencyWarnings.map((warning, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-800 font-body">
                <AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                {warning}
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-red-200">
            <Link
              to="/emergency"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-900 font-body"
            >
              View full emergency resources →
            </Link>
          </div>
        </div>

        {/* Legal Status */}
        <div className="card-elevated p-6 space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Legal Status Overview
          </h3>
          <p className="text-xs text-muted-foreground font-body italic mb-3">
            Legal status varies by jurisdiction and is subject to national and international regulation. This information is for educational awareness only and does not constitute legal advice. Verify current laws with local authorities.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">Costa Rica</p>
              <p className="text-sm text-foreground/80 font-body leading-relaxed">{substance.legalStatusCR}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">Global Overview</p>
              <p className="text-sm text-foreground/80 font-body leading-relaxed">{substance.legalStatusGlobal}</p>
            </div>
          </div>
        </div>

        {/* Sources */}
        <SourceSection sources={substance.sources} />

        {/* TripSit Enrichment */}
        {tripSitLoading && (
          <div className="card-elevated p-6 flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground font-body">Loading TripSit community data…</span>
          </div>
        )}

        {tripSitData && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-display font-semibold text-foreground">TripSit Community Data</h3>
              <span className="text-xs text-amber-600 font-body font-medium px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50">Anecdotal</span>
            </div>

            {/* Community-reported effects */}
            {tripSitEffects.length > 0 && (
              <div className="card-elevated p-5 space-y-3">
                <h4 className="font-display font-semibold text-foreground text-sm">Community-Reported Effects</h4>
                <div className="flex flex-wrap gap-2">
                  {tripSitEffects.map((effect, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs border border-border rounded-full text-muted-foreground font-body bg-muted/50">
                      {effect}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground font-body italic">
                  These effects are community-reported and anecdotal. Individual experiences vary significantly.
                </p>
              </div>
            )}

            {/* TripSit Combination Grid */}
            {tripSitCombos.length > 0 && (
              <div className="card-elevated p-5 space-y-3">
                <h4 className="font-display font-semibold text-foreground text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  TripSit Combination Chart ({tripSitCombos.length} substances)
                </h4>
                <p className="text-xs text-muted-foreground font-body italic">
                  Community-sourced interaction statuses. Not peer-reviewed medical data.
                </p>
                <div className="grid sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                  {tripSitCombos
                    .sort((a, b) => {
                      const order = { severe: 0, moderate: 1, mild: 2, none: 3 };
                      return order[a.severity] - order[b.severity];
                    })
                    .map((combo, i) => {
                       const styles: Record<string, string> = {
                        none: 'bg-slate-50 border-slate-200 text-slate-700',
                        mild: 'bg-slate-100 border-slate-300 text-slate-800',
                        moderate: 'bg-amber-50 border-amber-200 text-amber-800',
                        severe: 'bg-red-50 border-red-200 text-red-800',
                      };
                      return (
                        <div key={i} className={`p-2.5 rounded-lg border text-xs font-body ${styles[combo.severity]}`}>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium capitalize">{combo.name}</span>
                            <span className="font-semibold text-[10px] uppercase">{combo.label}</span>
                          </div>
                          {combo.note && <p className="mt-1 opacity-80 text-[11px] leading-snug">{combo.note}</p>}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* TripSit source attribution */}
            <div className="bg-muted/30 border border-border rounded-lg p-4 flex items-start gap-3">
              <ExternalLink className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
              <p className="text-xs font-medium text-foreground font-body">Source: TripSit.me</p>
                <p className="text-xs text-muted-foreground font-body">Community-maintained risk awareness database · Type: <span className="text-amber-600 font-medium">Anecdotal</span></p>
                <a href="https://tripsit.me" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-body">
                  tripsit.me →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Final disclaimer */}
        <Disclaimer />
      </div>
    </Layout>
  );
}
