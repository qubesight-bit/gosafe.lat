import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Pill, BookOpen, AlertCircle, Shield, CheckCircle, Globe, FlaskConical, MapPin, ExternalLink } from 'lucide-react';
import heroImage from '@/assets/hero-health.jpg';

const features = [
  {
    icon: Pill,
    title: 'Medication Interaction Awareness',
    desc: 'Educational information on known medication interactions, severity levels, and mechanisms — based on governmental and academic sources.',
    to: '/interactions',
    cta: 'Explore Interactions',
    color: 'text-primary',
    bg: 'bg-primary-muted',
  },
  {
    icon: BookOpen,
    title: 'Substance Education',
    desc: 'Comprehensive, source-cited public health education on psychoactive substances — risks, classifications, and harm prevention awareness.',
    to: '/substances',
    cta: 'View Substance Library',
    color: 'text-green-700',
    bg: 'bg-green-50',
  },
  {
    icon: AlertCircle,
    title: 'Emergency Resources',
    desc: 'Warning signs, when to seek immediate help, and how to contact emergency services and healthcare professionals.',
    to: '/emergency',
    cta: 'View Emergency Info',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
];

const principles = [
  { icon: Shield, label: 'Ethics-First', desc: 'No medical advice, prescriptions, or treatment recommendations — ever.' },
  { icon: Globe, label: 'Source-Transparent', desc: 'Every piece of information is cited with its institutional source and type.' },
  { icon: CheckCircle, label: 'Professionally Aligned', desc: 'Content aligned with WHO, NIH, NIDA, and IAFA Costa Rica guidelines.' },
  { icon: FlaskConical, label: 'Harm Reduction Focus', desc: 'Public health education to support awareness, not to guide or enable use.' },
];

const sources = [
  { name: 'WHO', full: 'World Health Organization' },
  { name: 'NIH', full: 'National Institutes of Health' },
  { name: 'NIDA', full: 'National Institute on Drug Abuse' },
  { name: 'CDC', full: 'Centers for Disease Control' },
  { name: 'EMA', full: 'European Medicines Agency' },
  { name: 'IAFA CR', full: 'Instituto sobre Alcoholismo y Farmacodependencia' },
];

const Index = () => {
  return (
    <Layout>
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
              Public Health Education Platform — Educational Only
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-5">
              Source-Transparent<br />
              <span className="opacity-85">Health Education</span>
            </h1>
            <p className="text-primary-foreground/85 text-lg md:text-xl font-body leading-relaxed mb-8 max-w-xl">
              Public health information on medication interactions and substance awareness — grounded in governmental and academic sources. Not medical advice.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/interactions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:bg-primary-foreground/90 transition-all duration-200 shadow-elevated font-body text-sm"
              >
                <Pill className="w-4 h-4" />
                Medication Interactions
              </Link>
              <Link
                to="/substances"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground/15 border border-primary-foreground/30 text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/25 transition-all duration-200 font-body text-sm"
              >
                <BookOpen className="w-4 h-4" />
                Substance Education
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-accent-muted border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-amber-800 text-sm font-body">
            <strong className="font-semibold">Educational purposes only.</strong> This platform does not provide medical advice, diagnosis, prescriptions, or treatment guidance. Always consult a licensed healthcare professional for medical decisions.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Public Health Tools
          </h2>
          <p className="text-muted-foreground text-lg font-body max-w-xl mx-auto">
            Educational resources grounded in cited, institutional health data.
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
              Our Ethical Framework
            </h2>
            <p className="text-muted-foreground font-body">What guides every piece of content on this platform.</p>
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
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Approved Source Institutions</h2>
          <p className="text-muted-foreground text-sm font-body">Only governmental, academic, and clearly-labeled educational sources are used.</p>
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
          {/* Decorative background circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary-foreground/5 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary-foreground/5 pointer-events-none" />
          {/* Icon */}
          <div className="relative z-10 shrink-0 w-16 h-16 rounded-2xl bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-primary-foreground" />
          </div>
          {/* Text */}
          <div className="relative z-10 flex-1 text-center sm:text-left">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/60 mb-1 font-body">Harm Reduction Resource</span>
            <h3 className="font-display font-bold text-primary-foreground text-xl md:text-2xl mb-1">
              Find Naloxone Near You
            </h3>
            <p className="text-primary-foreground/75 text-sm font-body leading-relaxed max-w-md">
              Naloxone (Narcan) reverses opioid overdoses. Use this finder to locate free or low-cost naloxone at pharmacies and community programs near you.
            </p>
          </div>
          {/* Button */}
          <a
            href="https://nextdistro.org/naloxone#state-finder"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 bg-primary-foreground text-primary font-bold rounded-xl hover:bg-primary-foreground/90 active:scale-95 transition-all duration-200 shadow-elevated font-body text-sm group"
          >
            <MapPin className="w-4 h-4" />
            Find Naloxone
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
              Experiencing a health emergency?
            </h3>
            <p className="text-red-700 text-sm font-body">
              Do not use this platform. Call emergency services immediately. Costa Rica: 911 | International: local emergency number.
            </p>
          </div>
          <Link
            to="/emergency"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors font-body text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            Emergency Info
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
