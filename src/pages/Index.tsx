import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Pill, BookOpen, AlertCircle, Shield, CheckCircle, Globe, FlaskConical, MapPin, ExternalLink, Stethoscope, Beaker } from 'lucide-react';
import heroImage from '@/assets/hero-health.jpg';
import gosafeLogo from '@/assets/gosafe-logo.png';
import { useLanguage } from '@/i18n/LanguageContext';

const sources = [
  { name: 'WHO', full: 'World Health Organization' },
  { name: 'NIH', full: 'National Institutes of Health' },
  { name: 'NIDA', full: 'National Institute on Drug Abuse' },
  { name: 'CDC', full: 'Centers for Disease Control' },
  { name: 'EMA', full: 'European Medicines Agency' },
  { name: 'IAFA CR', full: 'Instituto sobre Alcoholismo y Farmacodependencia' },
];

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Pill,
      title: t('index.feature_interactions_title'),
      desc: t('index.feature_interactions_desc'),
      to: '/interactions',
      cta: t('index.feature_interactions_cta'),
      color: 'text-primary',
      bg: 'bg-primary-muted',
    },
    {
      icon: BookOpen,
      title: t('index.feature_substances_title'),
      desc: t('index.feature_substances_desc'),
      to: '/substances',
      cta: t('index.feature_substances_cta'),
      color: 'text-green-700',
      bg: 'bg-green-50',
    },
    {
      icon: Stethoscope,
      title: t('index.feature_symptoms_title'),
      desc: t('index.feature_symptoms_desc'),
      to: '/symptom-checker',
      cta: t('index.feature_symptoms_cta'),
      color: 'text-purple-700',
      bg: 'bg-purple-50',
    },
    {
      icon: AlertCircle,
      title: t('index.feature_emergency_title'),
      desc: t('index.feature_emergency_desc'),
      to: '/emergency',
      cta: t('index.feature_emergency_cta'),
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ];

  const principles = [
    { icon: Shield, label: t('index.principle_ethics'), desc: t('index.principle_ethics_desc') },
    { icon: Globe, label: t('index.principle_source'), desc: t('index.principle_source_desc') },
    { icon: CheckCircle, label: t('index.principle_aligned'), desc: t('index.principle_aligned_desc') },
    { icon: FlaskConical, label: t('index.principle_harm'), desc: t('index.principle_harm_desc') },
  ];

  return (
    <Layout>
      <SEO
        title="GoSafe.lat"
        description="Public health education on medication interactions and substance awareness."
        path="/"
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 section-hero opacity-88" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/15 border border-primary-foreground/25 text-primary-foreground text-xs font-medium mb-6 font-body">
              <Shield className="w-3.5 h-3.5" />
              {t('index.badge')}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-5">
              {t('index.title_1')}<br />
              <span className="opacity-85">{t('index.title_2')}</span>
            </h1>
            <p className="text-primary-foreground/85 text-lg md:text-xl font-body leading-relaxed mb-8 max-w-xl">
              {t('index.subtitle')}
            </p>
            <div className="space-y-4">
              {/* Rx / Pharmaceutical */}
              <div>
                <span className="text-primary-foreground/60 text-[10px] font-semibold uppercase tracking-widest font-body mb-2 block">💊 Rx &amp; Pharmaceutical</span>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    to="/interactions"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground text-primary font-semibold rounded-lg hover:bg-primary-foreground/90 transition-all duration-200 shadow-elevated font-body text-sm"
                  >
                    <Pill className="w-4 h-4" />
                    Medication Interactions
                  </Link>
                  <Link
                    to="/symptom-checker"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground text-primary font-semibold rounded-lg hover:bg-primary-foreground/90 transition-all duration-200 shadow-elevated font-body text-sm"
                  >
                    <Stethoscope className="w-4 h-4" />
                    Symptom Checker
                  </Link>
                </div>
              </div>
              {/* Substances / Semi-legal & Illegal */}
              <div>
                <span className="text-primary-foreground/60 text-[10px] font-semibold uppercase tracking-widest font-body mb-2 block">🧪 Substances &amp; Harm Reduction</span>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    to="/substances"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/15 border border-primary-foreground/30 text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/25 transition-all duration-200 font-body text-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    Substance Education
                  </Link>
                  <Link
                    to="/combinations"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/15 border border-primary-foreground/30 text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/25 transition-all duration-200 font-body text-sm"
                  >
                    <Beaker className="w-4 h-4" />
                    Combination Checker
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-accent-muted border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-amber-800 text-sm font-body">
            <strong className="font-semibold">{t('index.disclaimer_banner')}</strong>
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t('index.tools_title')}
          </h2>
          <p className="text-muted-foreground text-lg font-body max-w-xl mx-auto">
            {t('index.tools_subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, to, cta, color, bg }) => (
            <div key={to} className="card-elevated card-hover p-6 flex flex-col">
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-display font-semibold text-foreground text-xl mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed flex-1 mb-5">{desc}</p>
              <Link
                to={to}
                className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all duration-200 font-body"
              >
                {cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="bg-foreground/[0.02] border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t('index.principles_title')}
            </h2>
            <p className="text-muted-foreground font-body">{t('index.principles_subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary-muted flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground font-display">{label}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approved Sources */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">{t('index.sources_title')}</h2>
          <p className="text-muted-foreground text-sm font-body">{t('index.sources_subtitle')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {sources.map(({ name, full }) => (
            <div key={name} className="card-elevated px-4 py-2.5 flex items-center gap-2">
              <span className="source-governmental px-2 py-0.5 rounded-full text-xs font-medium">{name}</span>
              <span className="text-muted-foreground text-sm font-body">{full}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Naloxone Finder CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-elevated p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary-foreground/5 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary-foreground/5 pointer-events-none" />
          <div className="relative z-10 shrink-0 w-16 h-16 rounded-2xl bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="relative z-10 flex-1 text-center sm:text-left">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/60 mb-1 font-body">{t('index.naloxone_badge')}</span>
            <h3 className="font-display font-bold text-primary-foreground text-xl md:text-2xl mb-1">
              {t('index.naloxone_title')}
            </h3>
            <p className="text-primary-foreground/75 text-sm font-body leading-relaxed max-w-md">
              {t('index.naloxone_desc')}
            </p>
          </div>
          <a
            href="https://nextdistro.org/naloxone#state-finder"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 bg-primary-foreground text-primary font-bold rounded-xl hover:bg-primary-foreground/90 active:scale-95 transition-all duration-200 shadow-elevated font-body text-sm group"
          >
            <MapPin className="w-4 h-4" />
            {t('index.naloxone_cta')}
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="emergency-box p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <AlertCircle className="w-8 h-8 text-red-600 shrink-0" />
          <div className="flex-1">
            <h3 className="font-display font-semibold text-red-800 text-lg mb-1">
              {t('index.emergency_title')}
            </h3>
            <p className="text-red-700 text-sm font-body">
              {t('index.emergency_desc')}
            </p>
          </div>
          <Link
            to="/emergency"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors font-body text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            {t('index.emergency_cta')}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
