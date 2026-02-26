import { useState, useEffect } from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
        className="sm:max-w-lg [&>button]:hidden max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center sm:text-center">
          <div className="flex justify-center mb-4">
            <img src={gosafeLogo} alt="GoSafe.lat logo" className="w-20 h-20 object-contain" />
          </div>
          <DialogTitle className="font-display text-xl">
            Educational Purposes Only
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed mt-2">
            This platform does not provide medical advice, diagnosis, prescriptions, or treatment guidance. Always consult a licensed healthcare professional for medical decisions.
          </DialogDescription>
        </DialogHeader>

        {/* Sources section */}
        <div className="border border-border rounded-lg p-4 my-2 bg-muted/20">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2.5 font-body">
            All information is based exclusively on reputable governmental &amp; academic sources
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sources.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors font-body"
              >
                {name}
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            ))}
          </div>
        </div>

        {/* Acceptance checkbox */}
        <div className="border border-border rounded-lg p-4 my-1 bg-muted/30">
          <div className="flex items-start gap-3">
            <Checkbox
              id="disclaimer-accept"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked === true)}
              className="mt-0.5"
            />
            <label
              htmlFor="disclaimer-accept"
              className="text-sm font-body text-foreground leading-relaxed cursor-pointer select-none"
            >
              I understand that this platform is for <strong>educational and informational purposes only</strong> and is not a replacement for professional medical advice, diagnosis, or treatment.
            </label>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleContinue}
            disabled={!accepted}
            className="w-full sm:w-auto gap-2"
          >
            <Shield className="w-4 h-4" />
            Continue to GoSafe.lat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
