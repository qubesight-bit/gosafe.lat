import { useState, useEffect } from 'react';
import { X, Globe } from 'lucide-react';

export function GlobalHealthBanner() {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Re-show banner every 10 minutes
    if (dismissed) {
      const timer = setTimeout(() => {
        setVisible(true);
        setDismissed(false);
      }, 10 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  if (!visible) return null;

  return (
    <div className="global-banner animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3">
        <Globe className="w-4 h-4 mt-0.5 shrink-0 opacity-80" />
        <div className="flex-1 text-sm">
          <p className="font-medium">
            For official guidance and further information, please contact your local health authority or a licensed healthcare professional.
          </p>
          <p className="opacity-80 text-xs mt-0.5">
            Para más información oficial y orientación, contacte a su organismo de salud local o a un profesional de la salud autorizado.
          </p>
        </div>
        <button
          onClick={() => { setVisible(false); setDismissed(true); }}
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity p-1 rounded"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
