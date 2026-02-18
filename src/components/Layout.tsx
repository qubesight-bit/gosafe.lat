import { ReactNode } from 'react';
import { GlobalHealthBanner } from './GlobalHealthBanner';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHealthBanner />
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-foreground/5 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-display font-semibold text-foreground mb-2">HealthEd CR</h4>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                Public health education platform focused on medication interaction awareness and harm prevention. Educational only — not a substitute for medical care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">Information</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Content for educational purposes only</li>
                <li>Sources cited on all pages</li>
                <li>Aligned with WHO & IAFA guidelines</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">Emergency</h4>
              <p className="text-muted-foreground text-sm">
                If you or someone you know needs immediate help, call your local emergency services immediately.
              </p>
              <p className="text-primary font-semibold mt-1 text-sm">Costa Rica: 911</p>
            </div>
          </div>
          <div className="border-t border-border pt-4 flex flex-wrap gap-4 items-center justify-between text-xs text-muted-foreground">
            <p>© 2024 HealthEd CR — Public Health Education Platform</p>
            <p>Not medical advice · For educational purposes only · Consult a healthcare professional</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
