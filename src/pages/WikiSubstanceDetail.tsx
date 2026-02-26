import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Disclaimer } from '@/components/Disclaimer';
import { supabase } from '@/integrations/supabase/client';
import { useTripSitApi, mapTripSitStatus } from '@/hooks/use-tripsit-api';
import type { TripSitDrug } from '@/hooks/use-tripsit-api';
import { getPsychonautWikiUrl } from '@/data/substance-directory';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  ArrowLeft, Beaker, Brain, Loader2, ExternalLink, Shield, AlertTriangle,
  Users, Phone, Heart, Droplets, MapPin, Pill, Clock
} from 'lucide-react';

interface WikiSubstance {
  name: string;
  url: string | null;
  chemicalClass: string[];
  psychoactiveClass: string[];
  effects: string[];
  addictionPotential: string | null;
  toxicity: string[];
  tolerance: { full: string | null; half: string | null; zero: string | null } | null;
  crossTolerances: string[];
  durations: {
    route: string;
    onset: string | null;
    comeup: string | null;
    peak: string | null;
    offset: string | null;
    total: string | null;
    afterglow: string | null;
  }[];
}

export default function WikiSubstanceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const decodedSlug = decodeURIComponent(slug || '');
  const { t } = useLanguage();

  const [substance, setSubstance] = useState<WikiSubstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tripSitApi = useTripSitApi();
  const [tripSitData, setTripSitData] = useState<TripSitDrug | null>(null);
  const [tripSitLoading, setTripSitLoading] = useState(false);

  useEffect(() => {
    if (!decodedSlug) return;
    setLoading(true);
    setError(null);

    supabase.functions.invoke('psychonautwiki-substance', {
      body: { substance: decodedSlug },
    })
      .then(({ data, error: fnError }) => {
        if (fnError) throw fnError;
        if (data?.success && data.data) {
          setSubstance(data.data);
        } else {
          setSubstance(null);
        }
      })
      .catch(() => setError(t('wiki.load_error')))
      .finally(() => setLoading(false));
  }, [decodedSlug]);

  useEffect(() => {
    if (!decodedSlug) return;
    setTripSitLoading(true);
    tripSitApi.getDrug(decodedSlug)
      .then(data => setTripSitData(data))
      .catch(() => setTripSitData(null))
      .finally(() => setTripSitLoading(false));
  }, [decodedSlug]);

  const tripSitCombos = tripSitData?.combos
    ? Object.entries(tripSitData.combos).map(([name, combo]) => ({
        name,
        ...mapTripSitStatus(combo.status),
        note: combo.note,
      }))
    : [];

  const durationPhases = ['onset', 'comeup', 'peak', 'offset', 'total', 'afterglow'] as const;

  const harmReductionTips = [
    { icon: Users, key: 'never_alone' },
    { icon: Beaker, key: 'test' },
    { icon: Clock, key: 'start_low' },
    { icon: AlertTriangle, key: 'emergency' },
    { icon: Shield, key: 'mixing' },
    { icon: Droplets, key: 'hydration' },
    { icon: MapPin, key: 'environment' },
    { icon: Pill, key: 'naloxone' },
  ];

  return (
    <Layout>
      <SEO
        title={decodedSlug}
        description={`${t('wiki.community_source')} — ${decodedSlug}`}
        path={`/substances/wiki/${slug}`}
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
            <h1 className="font-display text-3xl md:text-4xl font-bold">{decodedSlug}</h1>
          </div>
          <p className="text-primary-foreground/75 text-sm font-body">
            {t('wiki.community_source')}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Disclaimer />

        {/* Loading state */}
        {loading && (
          <div className="card-elevated p-6 flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground font-body">{t('wiki.loading_wiki')}</span>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="card-elevated p-6 text-center">
            <p className="text-destructive font-body text-sm">{error}</p>
          </div>
        )}

        {/* No data */}
        {!loading && !error && !substance && (
          <div className="card-elevated p-6 text-center">
            <p className="text-muted-foreground font-body text-sm">{t('wiki.no_data')}</p>
          </div>
        )}

        {/* Substance data */}
        {substance && (
          <>
            {/* Classification */}
            <div className="card-elevated p-6 space-y-3">
              <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                <Beaker className="w-5 h-5 text-primary" /> {t('wiki.classification')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {substance.chemicalClass.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">{t('wiki.chemical_class')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {substance.chemicalClass.map((c, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs border border-border rounded-full text-foreground font-body bg-muted/50">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
                {substance.psychoactiveClass.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">{t('wiki.psychoactive_class')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {substance.psychoactiveClass.map((c, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs border border-border rounded-full text-foreground font-body bg-muted/50">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reported Effects */}
            {substance.effects.length > 0 && (
              <div className="card-elevated p-6 space-y-3">
                <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" /> {t('wiki.reported_effects')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {substance.effects.map((effect, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs border border-border rounded-full text-muted-foreground font-body bg-muted/50">
                      {effect}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground font-body italic">{t('wiki.effects_note')}</p>
              </div>
            )}

            {/* Duration Timeline */}
            {substance.durations.length > 0 && (
              <div className="card-elevated p-6 space-y-4">
                <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> {t('wiki.duration_timeline')}
                </h2>
                {substance.durations.map((dur, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-sm font-semibold text-foreground font-body capitalize">{dur.route}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {durationPhases.map(phase => dur[phase] && (
                        <div key={phase} className="bg-muted/40 rounded-lg p-2.5 border border-border/40">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-body">{phase}</p>
                          <p className="text-sm font-medium text-foreground font-body">{dur[phase]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Risk Profile */}
            <div className="card-elevated p-6 space-y-4">
              <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> {t('wiki.risk_profile')}
              </h2>

              {substance.addictionPotential && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 font-body">{t('wiki.addiction_potential')}</p>
                  <p className="text-sm text-foreground font-body">{substance.addictionPotential}</p>
                </div>
              )}

              {substance.toxicity.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 font-body">{t('wiki.toxicity')}</p>
                  <ul className="space-y-1">
                    {substance.toxicity.map((t_item, i) => (
                      <li key={i} className="text-sm text-foreground font-body flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        {t_item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {substance.tolerance && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">{t('wiki.tolerance')}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {substance.tolerance.full && (
                      <div className="bg-muted/40 rounded-lg p-2.5 border border-border/40">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-body">{t('wiki.tolerance_full')}</p>
                        <p className="text-sm font-medium text-foreground font-body">{substance.tolerance.full}</p>
                      </div>
                    )}
                    {substance.tolerance.half && (
                      <div className="bg-muted/40 rounded-lg p-2.5 border border-border/40">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-body">{t('wiki.tolerance_half')}</p>
                        <p className="text-sm font-medium text-foreground font-body">{substance.tolerance.half}</p>
                      </div>
                    )}
                    {substance.tolerance.zero && (
                      <div className="bg-muted/40 rounded-lg p-2.5 border border-border/40">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-body">{t('wiki.tolerance_baseline')}</p>
                        <p className="text-sm font-medium text-foreground font-body">{substance.tolerance.zero}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {substance.crossTolerances.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">{t('wiki.cross_tolerances')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {substance.crossTolerances.map((ct, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs border border-border rounded-full text-muted-foreground font-body bg-muted/50">{ct}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Harm Reduction Tips */}
            <div className="card-elevated p-6 space-y-4">
              <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" /> {t('wiki.harm_reduction')}
              </h2>
              <p className="text-xs text-muted-foreground font-body italic">{t('wiki.harm_reduction_note')}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {harmReductionTips.map(({ icon: Icon, key }) => (
                  <div key={key} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/40">
                    <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground font-body">{t(`wiki.tip_${key}`)}</p>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">{t(`wiki.tip_${key}_desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/emergency" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline font-body">
                  <Phone className="w-3.5 h-3.5" /> {t('wiki.emergency_resources')}
                </Link>
                <Link to="/combinations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline font-body">
                  <Shield className="w-3.5 h-3.5" /> {t('wiki.combo_checker')}
                </Link>
                <Link to="/matrix" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline font-body">
                  <Beaker className="w-3.5 h-3.5" /> {t('wiki.interaction_matrix')}
                </Link>
              </div>
            </div>

            {/* TripSit Interactions */}
            {tripSitLoading && (
              <div className="card-elevated p-6 flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground font-body">{t('wiki.loading_tripsit')}</span>
              </div>
            )}

            {tripSitCombos.length > 0 && (
              <div className="card-elevated p-6 space-y-3">
                <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> {t('wiki.known_interactions')}
                </h2>
                <p className="text-xs text-muted-foreground font-body italic">{t('wiki.interactions_note')}</p>
                <div className="grid sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                  {tripSitCombos
                    .sort((a, b) => {
                      const order: Record<string, number> = { severe: 0, moderate: 1, mild: 2, none: 3 };
                      return (order[a.severity] ?? 4) - (order[b.severity] ?? 4);
                    })
                    .map((combo, i) => {
                      const styles: Record<string, string> = {
                        none: 'bg-emerald-50 border-emerald-200 text-emerald-800',
                        mild: 'bg-sky-50 border-sky-200 text-sky-800',
                        moderate: 'bg-amber-50 border-amber-200 text-amber-800',
                        severe: 'bg-red-50 border-red-200 text-red-800',
                      };
                      return (
                        <div key={i} className={`p-2.5 rounded-lg border text-xs font-body ${styles[combo.severity] || ''}`}>
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

            {/* View on PsychonautWiki */}
            {substance.url && (
              <a
                href={substance.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-body"
              >
                <ExternalLink className="w-3.5 h-3.5" /> {t('wiki.view_on_wiki')}
              </a>
            )}

            {/* Sources attribution */}
            <div className="bg-muted/30 border border-border rounded-lg p-4 flex items-start gap-3">
              <ExternalLink className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground font-body">{t('wiki.sources')}</p>
                <p className="text-xs text-muted-foreground font-body">
                  {t('wiki.source_attribution')}
                </p>
              </div>
            </div>
          </>
        )}

        <Disclaimer />
      </div>
    </Layout>
  );
}
