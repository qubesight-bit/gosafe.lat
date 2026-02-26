import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, Pill, BookOpen, AlertCircle, Home, Shield, Stethoscope, Combine, Grid3X3, HelpCircle, Languages, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Navigation() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setToolsOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const primaryNav = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/interactions', label: t('nav.interactions'), icon: Pill },
    { to: '/substances', label: t('nav.substances'), icon: BookOpen },
  ];

  const toolsNav = [
    { to: '/combinations', label: t('nav.combos'), icon: Combine },
    { to: '/matrix', label: t('nav.matrix'), icon: Grid3X3 },
    { to: '/symptom-checker', label: t('nav.symptoms'), icon: Stethoscope },
    { to: '/faq', label: t('nav.faq'), icon: HelpCircle },
  ];

  const allNav = [...primaryNav, ...toolsNav, { to: '/emergency', label: t('nav.emergency'), icon: AlertCircle }];

  const isActive = (to: string) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
  const toolsActive = toolsNav.some(i => isActive(i.to));

  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow duration-300">
              <Shield className="w-[18px] h-[18px] text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-foreground text-[17px] leading-tight tracking-tight">
                GoSafe.lat
              </span>
              <span className="text-[9px] text-muted-foreground/70 uppercase tracking-[0.2em] font-body leading-none">
                Harm Reduction
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {primaryNav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 font-body ${
                  isActive(to)
                    ? 'text-primary bg-primary/8'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {isActive(to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 font-body ${
                  toolsActive
                    ? 'text-primary bg-primary/8'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                Tools
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
                {toolsActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
                )}
              </button>

              {toolsOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl border border-border/60 bg-popover/95 backdrop-blur-xl shadow-xl shadow-foreground/5 p-2 animate-fade-in">
                  {toolsNav.map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 font-body ${
                        isActive(to)
                          ? 'text-primary bg-primary/8'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isActive(to) ? 'bg-primary/15' : 'bg-muted/60'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency — always visible with accent */}
            <Link
              to="/emergency"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 font-body ${
                isActive('/emergency')
                  ? 'text-destructive bg-destructive/10'
                  : 'text-muted-foreground hover:text-destructive hover:bg-destructive/5'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              {t('nav.emergency')}
            </Link>

            <div className="w-px h-6 bg-border/60 mx-2" />

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 border border-border/50"
              aria-label="Toggle language"
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="p-2 rounded-xl text-muted-foreground hover:bg-muted/50 transition-colors border border-border/50 text-[11px] font-bold font-body"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              className="p-2 rounded-xl text-muted-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/40 py-3 space-y-0.5 animate-fade-in">
            {allNav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all font-body ${
                  isActive(to)
                    ? to === '/emergency' ? 'text-destructive bg-destructive/8' : 'text-primary bg-primary/8'
                    : to === '/emergency' ? 'text-muted-foreground hover:text-destructive hover:bg-destructive/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive(to) 
                    ? to === '/emergency' ? 'bg-destructive/15' : 'bg-primary/15' 
                    : 'bg-muted/60'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
