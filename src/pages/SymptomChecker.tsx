import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import { Stethoscope, AlertCircle, ExternalLink } from 'lucide-react';

const SymptomChecker = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <SEO title={t('symptoms.title')} description={t('symptoms.subtitle')} path="/symptom-checker" />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{t('symptoms.title')}</h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">{t('symptoms.subtitle')}</p>
        </div>

        <div className="disclaimer-box p-4 flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
          <p className="text-sm font-body text-foreground/80">
            <strong className="font-semibold">{t('symptoms.disclaimer_1')}</strong>
          </p>
        </div>

        <div className="disclaimer-box p-4 flex items-start gap-3 mb-4 border-blue-500/30 bg-blue-500/5">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm font-body text-foreground/80">
            <strong className="font-semibold">{t('symptoms.english_only')}</strong>
          </p>
        </div>

        <div className="card-elevated rounded-xl overflow-hidden mb-6">
          <iframe
            src="https://symptomchecker.isabelhealthcare.com/isabel-tool-page"
            title="Isabel Symptom Checker"
            className="w-full border-0"
            style={{ minHeight: '700px', height: '80vh' }}
            allow="clipboard-read; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        <div className="text-center space-y-3">
          <a
            href="https://symptomchecker.isabelhealthcare.com/isabel-tool-page"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-body"
          >
            <ExternalLink className="w-4 h-4" />
            {t('symptoms.open_external') || 'Open in Isabel Healthcare website'}
          </a>
          <p className="text-xs text-muted-foreground font-body max-w-lg mx-auto">
            {t('symptoms.disclaimer_2')}
          </p>
          <p className="text-xs text-muted-foreground/70 font-body">
            Powered by <a href="https://www.isabelhealthcare.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Isabel Healthcare</a>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default SymptomChecker;
