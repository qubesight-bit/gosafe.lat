import { AlertTriangle } from 'lucide-react';

interface DisclaimerProps {
  variant?: 'default' | 'compact';
}

export function Disclaimer({ variant = 'default' }: DisclaimerProps) {
  if (variant === 'compact') {
    return (
      <div className="disclaimer-box px-4 py-2.5 flex items-start gap-2 text-sm">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <span className="text-amber-800 font-body">
          <strong className="font-semibold">Educational purposes only.</strong> This information does not replace professional medical advice, diagnosis, or treatment.
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
            Educational Information Only
          </p>
          <p className="text-amber-800 text-sm leading-relaxed font-body">
            This tool is for <strong>educational purposes only</strong> and does not replace professional medical advice, diagnosis, or treatment. 
            Always consult a qualified healthcare professional before making any decisions related to medications or health conditions. 
            Do not disregard professional medical advice based on information found here.
          </p>
        </div>
      </div>
    </div>
  );
}
