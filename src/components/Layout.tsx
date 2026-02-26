import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GlobalHealthBanner } from './GlobalHealthBanner';
import { Navigation } from './Navigation';
import { DonateButton } from './DonateButton';
import { DisclaimerModal } from './DisclaimerModal';
import { useLanguage } from '@/i18n/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <DisclaimerModal />
      <GlobalHealthBanner />
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-foreground/5 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-display font-semibold text-foreground mb-2">GoSafe.lat</h4>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {t('footer.desc')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">{t('footer.info_title')}</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>{t('footer.info_1')}</li>
                <li>{t('footer.info_2')}</li>
                <li>{t('footer.info_3')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">{t('footer.emergency_title')}</h4>
              <p className="text-muted-foreground text-sm">
                {t('footer.emergency_text')}
              </p>
              <p className="text-primary font-semibold mt-1 text-sm">{t('footer.cr_emergency')}</p>
            </div>
          </div>
          <div className="border-t border-border pt-4 space-y-4">
            <div className="flex justify-center">
              <DonateButton />
            </div>
            <p className="text-center text-xs text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
              Made and built by <a href="https://qubesight.lat" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-primary transition-colors underline underline-offset-2">QubeSight</a> for the people — GoSafe.lat is open-source and free to use for pharmacological education and harm reduction, helping prevent overdoses and dangerous pharmaceutical interactions.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <p>{t('footer.copyright')}</p>
                <a
                  href="https://opensource.org/licenses/MIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                >
                  MIT License
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <span className="text-border">·</span>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                <span className="text-border">·</span>
                <Link to="/legal" className="text-muted-foreground hover:text-primary transition-colors">Legal Disclaimer</Link>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{t('footer.not_medical')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
