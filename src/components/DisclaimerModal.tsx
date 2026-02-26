import { useState, useEffect } from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import gosafeLogo from '@/assets/gosafe-logo.png';

const DISCLAIMER_KEY = 'gosafe_disclaimer_accepted';

const sources = [
  { name: 'WHO', url: 'https://www.who.int' },
  { name: 'NIH', url: 'https://www.nih.gov' },
  { name: 'NIDA', url: 'https://nida.nih.gov' },
  { name: 'CDC', url: 'https://www.cdc.gov' },
  { name: 'EMA', url: 'https://www.ema.europa.eu' },
  { name: 'IAFA CR', url: 'https://www.iafa.go.cr' },
  { name: 'Isabel Healthcare', url: 'https://www.isabelhealthcare.com' },
  { name: 'PsychonautWiki', url: 'https://psychonautwiki.org' },
  { name: 'TripSit', url: 'https://tripsit.me' },
];

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const alreadyAccepted = sessionStorage.getItem(DISCLAIMER_KEY);
    if (!alreadyAccepted) {
      setOpen(true);
    }
  }, []);

  const handleContinue = () => {
    sessionStorage.setItem(DISCLAIMER_KEY, 'true');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-[460px] p-0 [&>button]:hidden border-0 shadow-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Top branded header */}
        <div className="relative bg-gradient-to-br from-primary to-primary/80 px-6 pt-6 pb-6 text-center overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary-foreground/5 pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary-foreground/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex p-2.5 rounded-xl bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 mb-3 shadow-lg">
              <img src={gosafeLogo} alt="GoSafe.lat logo" className="w-12 h-12 object-contain" />
            </div>
            <h2 className="font-display text-lg font-bold text-primary-foreground mb-1">
              Educational Purposes Only
            </h2>
            <p className="text-primary-foreground/75 text-sm font-body leading-relaxed max-w-xs mx-auto">
              This platform does not provide medical advice, diagnosis, prescriptions, or treatment guidance. All information is based exclusively on reputable governmental &amp; academic sources.
            </p>
          </div>
        </div>

        {/* Content area */}
        <div className="px-5 py-4 space-y-3">
          {/* Consult notice */}
          <p className="text-center text-muted-foreground text-xs font-body leading-relaxed">
            Always consult a licensed healthcare professional for medical decisions.
          </p>

          {/* Sources */}
          <div className="rounded-xl bg-muted/40 border border-border/60 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-3 font-body">
              Verified Sources We Use
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sources.map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-background border border-border/80 text-foreground text-[11px] font-medium hover:border-primary/40 hover:text-primary transition-all duration-200 font-body shadow-sm"
                >
                  {name}
                  <ExternalLink className="w-2.5 h-2.5 opacity-40" />
                </a>
              ))}
            </div>
          </div>

          {/* Acceptance */}
          <div className="rounded-xl border-2 border-primary/20 bg-primary/[0.03] p-4 transition-colors has-[:checked]:border-primary/50 has-[:checked]:bg-primary/[0.06]">
            <div className="flex items-start gap-3">
              <Checkbox
                id="disclaimer-accept"
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked === true)}
                className="mt-0.5"
              />
              <label
                htmlFor="disclaimer-accept"
                className="text-[13px] font-body text-foreground/90 leading-relaxed cursor-pointer select-none"
              >
                I understand this platform is for <strong className="text-foreground">educational and informational purposes only</strong> and is not a replacement for professional medical advice, diagnosis, or treatment.
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-5 pb-5 pt-0 sm:justify-center">
          <Button
            onClick={handleContinue}
            disabled={!accepted}
            size="lg"
            className="w-full gap-2 rounded-xl font-semibold text-sm shadow-lg disabled:opacity-40"
          >
            <Shield className="w-4 h-4" />
            Continue to GoSafe.lat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
