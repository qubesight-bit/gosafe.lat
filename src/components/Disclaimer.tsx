import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface DisclaimerProps {
  variant?: 'default' | 'compact';
}

export function Disclaimer({ variant = 'default' }: DisclaimerProps) {
  const { t } = useLanguage();

  if (variant === 'compact') {
    return (
      <div className="disclaimer-box px-4 py-2.5 flex items-start gap-2 text-sm">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <span className="text-amber-800 font-body">
          <strong className="font-semibold">{t('disclaimer.compact').split('.')[0]}.</strong>{' '}
          {t('disclaimer.compact').split('.').slice(1).join('.')}
        </span>
      </div>
    );
  }

  return (
    <div className="disclaimer-box px-5 py-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-amber-900 font-display text-base mb-1">
            {t('disclaimer.title')}
          </p>
          <p className="text-amber-800 text-sm leading-relaxed font-body">
            {t('disclaimer.body')}
          </p>
        </div>
      </div>
    </div>
  );
}
