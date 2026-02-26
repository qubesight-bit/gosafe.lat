import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Pill, BookOpen, AlertCircle, Home, Shield, Stethoscope, Combine, Grid3X3, HelpCircle, Languages } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Navigation() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/interactions', label: t('nav.interactions'), icon: Pill },
    { to: '/combinations', label: t('nav.combos'), icon: Combine },
    { to: '/matrix', label: t('nav.matrix'), icon: Grid3X3 },
    { to: '/substances', label: t('nav.substances'), icon: BookOpen },
    { to: '/faq', label: t('nav.faq'), icon: HelpCircle },
    { to: '/symptom-checker', label: t('nav.symptoms'), icon: Stethoscope },
    { to: '/emergency', label: t('nav.emergency'), icon: AlertCircle },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-semibold text-foreground text-lg leading-none block">
                GoSafe.lat
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-body leading-none">
                Harm Reduction Platform
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-body ${
                    active
                      ? 'bg-primary-muted text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 ml-1 border border-border"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors border border-border text-xs font-bold font-body"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-3 space-y-1 animate-slide-down">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all font-body ${
                    active
                      ? 'bg-primary-muted text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
