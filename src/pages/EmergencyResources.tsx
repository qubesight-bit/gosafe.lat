import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { AlertCircle, Phone, Heart, Brain, Thermometer, Activity, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const contacts = [
  {
    country: 'Costa Rica',
    services: [
      { name: 'Emergency (Police, Fire, Medical)', number: '911' },
      { name: 'Cruz Roja Costarricense (Red Cross)', number: '128' },
      { name: 'IAFA – Instituto de Alcoholismo y Farmacodependencia', number: '800-4232' },
      { name: 'Hospital Nacional de Salud Mental', number: '+506 2527-1100' },
    ],
  },
  {
    country: 'International (Selected)',
    services: [
      { name: 'USA — Emergency Services', number: '911' },
      { name: 'USA — SAMHSA Helpline (Mental Health & Substance Use)', number: '1-800-662-4357' },
      { name: 'UK — Emergency Services', number: '999' },
      { name: 'EU General Emergency', number: '112' },
      { name: 'WHO Global Health Directory', number: 'www.who.int/contacts' },
    ],
  },
];

const professionalReferralTypes = [
  'Emergency Medicine Physician',
  'Clinical Toxicologist',
  'Licensed Pharmacist',
  'Psychiatrist or Clinical Psychologist',
  'Primary Care Physician / General Practitioner',
  'Addiction Medicine Specialist',
  'Social Worker or Case Manager',
];

export default function EmergencyResources() {
  const { t } = useLanguage();

  const warningCategories = [
    {
      icon: Heart,
      title: t('warn.cardiovascular'),
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      signs: [
        'Chest pain, pressure, or tightness',
        'Irregular, very rapid, or absent pulse',
        'Sudden shortness of breath',
        'Bluish color of lips, fingernails, or skin (cyanosis)',
        'Fainting or near-fainting',
      ],
    },
    {
      icon: Brain,
      title: t('warn.neurological'),
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      signs: [
        'Sudden severe headache unlike any before',
        'Seizures or convulsions',
        'Sudden confusion or disorientation',
        'Difficulty speaking, understanding, or moving',
        'Loss of consciousness or unresponsiveness',
      ],
    },
    {
      icon: Thermometer,
      title: t('warn.temperature'),
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      signs: [
        'Extremely hot skin without sweating (heat stroke)',
        'Rapidly rising body temperature with confusion',
        'Uncontrolled shivering combined with mental confusion',
        'Severe muscle rigidity with fever',
      ],
    },
    {
      icon: Activity,
      title: t('warn.respiratory'),
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      signs: [
        'Breathing rate very slow or very rapid',
        'Difficulty breathing or choking',
        'Gurgling or unusual breathing sounds',
        'Person not breathing',
      ],
    },
    {
      icon: Brain,
      title: t('warn.psychiatric'),
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      signs: [
        'Severe, acute psychosis with danger to self or others',
        'Expression of intent to self-harm or harm others',
        'Complete disconnection from reality with agitation',
        'Extreme, uncontrollable panic with physical symptoms',
      ],
    },
  ];

  return (
    <Layout>
      <SEO
        title={t('emergency.title')}
        description={t('emergency.subtitle')}
        path="/emergency"
      />
      {/* Header */}
      <section className="bg-red-700 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-white/80 text-sm font-body uppercase tracking-wide font-medium">{t('emergency.badge')}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            {t('emergency.title')}
          </h1>
          <p className="text-white/85 font-body text-lg max-w-2xl leading-relaxed">
            {t('emergency.subtitle')}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 bg-white/15 border border-white/30 rounded-xl px-5 py-3">
            <Phone className="w-5 h-5 animate-pulse-slow" />
            <div>
              <p className="font-semibold font-body">{t('emergency.cr_label')}</p>
              <p className="text-2xl font-bold font-display">911</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Critical top box */}
        <div className="emergency-box p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display font-bold text-red-800 text-xl mb-2">
                {t('emergency.active_title')}
              </h2>
              <p className="text-red-700 font-body text-sm leading-relaxed">
                {t('emergency.active_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Warning Signs */}
        <div>
          <h2 className="font-display font-bold text-foreground text-2xl mb-2">{t('emergency.warning_title')}</h2>
          <p className="text-muted-foreground font-body text-sm mb-6">
            {t('emergency.warning_desc')}
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {warningCategories.map(({ icon: Icon, title, color, bg, border, signs }) => (
              <div key={title} className={`card-elevated p-5 border-l-4 ${border} space-y-3`}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <h3 className={`font-display font-semibold ${color} text-sm`}>{title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {signs.map((sign, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                      <span className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')} mt-2 shrink-0`} />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="font-display font-bold text-foreground text-2xl mb-2">{t('emergency.contacts_title')}</h2>
          <p className="text-muted-foreground font-body text-sm mb-6">
            {t('emergency.contacts_desc')}
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {contacts.map(({ country, services }) => (
              <div key={country} className="card-elevated p-5 space-y-3">
                <h3 className="font-display font-semibold text-foreground text-lg border-b border-border pb-2">{country}</h3>
                <div className="space-y-2.5">
                  {services.map(({ name, number }) => (
                    <div key={name} className="flex items-start justify-between gap-3">
                      <p className="text-sm text-muted-foreground font-body flex-1">{name}</p>
                      <span className="text-sm font-bold text-foreground font-body shrink-0">{number}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Referral */}
        <div className="card-elevated p-6 space-y-4">
          <h2 className="font-display font-bold text-foreground text-xl flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            {t('emergency.professional_title')}
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            {t('emergency.professional_desc')}
          </p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {professionalReferralTypes.map((type) => (
              <div key={type} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-sm font-body text-foreground/80">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* IAFA Section */}
        <div className="card-elevated p-6 space-y-3 border-l-4 border-primary">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground text-lg">IAFA Costa Rica</h3>
              <p className="text-muted-foreground text-xs font-body">Instituto sobre Alcoholismo y Farmacodependencia — Official governmental body</p>
            </div>
          </div>
          <p className="text-foreground/80 text-sm font-body leading-relaxed">
            {t('emergency.iafa_desc')}
          </p>
          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-body">{t('emergency.iafa_helpline')}</p>
              <p className="font-bold text-foreground font-body">800-4232</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-body">{t('emergency.iafa_website')}</p>
              <p className="font-bold text-foreground font-body">www.iafa.go.cr</p>
            </div>
          </div>
        </div>

        {/* Final note */}
        <div className="disclaimer-box p-5">
          <p className="text-amber-800 text-sm font-body leading-relaxed">
            <strong>{t('emergency.bottom_disclaimer')}</strong>
          </p>
        </div>
      </div>
    </Layout>
  );
}
