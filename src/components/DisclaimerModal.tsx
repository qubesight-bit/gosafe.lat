import { useState, useEffect } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
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

const DISCLAIMER_KEY = 'gosafe_disclaimer_accepted';

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
        className="sm:max-w-md [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center sm:text-center">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-accent-muted flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
          </div>
          <DialogTitle className="font-display text-xl">
            Educational Purposes Only
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed mt-2">
            This platform does not provide medical advice, diagnosis, prescriptions, or treatment guidance. Always consult a licensed healthcare professional for medical decisions.
          </DialogDescription>
        </DialogHeader>

        <div className="border border-border rounded-lg p-4 my-2 bg-muted/30">
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
