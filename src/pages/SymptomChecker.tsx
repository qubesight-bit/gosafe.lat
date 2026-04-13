import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import { Stethoscope, AlertCircle, ExternalLink, ShieldCheck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SymptomChecker = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <SEO title={t('symptoms.title')} description={t('symptoms.subtitle')} path="/symptom-checker" />
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{t('symptoms.title')}</h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">{t('symptoms.subtitle')}</p>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-box p-4 flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
          <p className="text-sm font-body text-foreground/80">
            <strong className="font-semibold">{t('symptoms.disclaimer_1')}</strong>
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="card-elevated p-8 text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">
            Isabel Symptom Checker
          </h2>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
            {t('symptoms.isabel_description') || 'A trusted clinical-grade symptom checker used by healthcare professionals worldwide since 2001. Enter your symptoms for a differential diagnosis list.'}
          </p>
          <Button asChild size="lg" className="h-14 px-8 text-base font-semibold gap-2">
            <a
              href="https://symptomchecker.isabelhealthcare.com/isabel-tool-page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5" />
              {t('symptoms.open_checker') || 'Open Isabel Symptom Checker'}
            </a>
          </Button>
          <p className="text-xs text-muted-foreground mt-4 font-body">
            {t('symptoms.opens_external') || 'Opens in a new tab on isabelhealthcare.com'}
          </p>
        </div>

        {/* How to use */}
        <div className="card-elevated p-6 mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            {t('symptoms.how_to_use') || 'How to use'}
          </h3>
          <ol className="space-y-3 text-sm font-body text-foreground/80 list-decimal list-inside">
            <li>{t('symptoms.step_1') || 'Click the button above to open the Isabel Symptom Checker.'}</li>
            <li>{t('symptoms.step_2') || 'Enter your symptoms — you can add as many as you need.'}</li>
            <li>{t('symptoms.step_3') || 'Provide basic demographic information (age, sex, region).'}</li>
            <li>{t('symptoms.step_4') || 'Review the differential diagnosis list generated.'}</li>
            <li>{t('symptoms.step_5') || 'Share the results with your healthcare provider for proper evaluation.'}</li>
          </ol>
        </div>

        {/* Emergency reminder */}
        <div className="disclaimer-box p-4 flex items-start gap-3 border-red-500/30 bg-red-500/5">
          <Phone className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm font-body text-foreground/80">
            <strong className="font-semibold">{t('symptoms.emergency_note') || 'If you are experiencing a medical emergency, call your local emergency number immediately. Do not rely on any online tool.'}</strong>
          </p>
        </div>

        {/* Attribution */}
        <p className="text-center text-xs text-muted-foreground/70 font-body mt-6">
          {t('symptoms.disclaimer_2')}
          <br />
          Powered by{' '}
          <a href="https://www.isabelhealthcare.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            Isabel Healthcare
          </a>
        </p>
      </section>
    </Layout>
  );
};

export default SymptomChecker;
