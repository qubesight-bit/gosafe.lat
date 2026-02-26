import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COOKIE_CONSENT_KEY = 'gosafe_cookie_consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto bg-background border border-border rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
            <Cookie className="w-4.5 h-4.5 text-primary" />
          </div>
          <div className="text-sm font-body text-foreground/85 leading-relaxed">
            <p>
              We use minimal cookies and sessionStorage for essential functionality only — no tracking, no ads, no third-party analytics.{' '}
              <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDecline}
            className="text-muted-foreground text-xs flex-1 sm:flex-none"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="text-xs flex-1 sm:flex-none"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
