import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  Menu, X, Pill, BookOpen, AlertCircle, Home, Shield, Stethoscope,
  Combine, Grid3X3, HelpCircle, Languages, ChevronDown, FileText,
  Beaker, Heart, ShieldAlert, Check, Database,
} from 'lucide-react';
import { useLanguage, LANGUAGES } from '@/i18n/LanguageContext';
import gosafeLogo from '@/assets/gosafe-logo.png';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export function Navigation() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const currentLang = LANGUAGES.find(l => l.code === lang)!;

  const rxNav: NavItem[] = [
    { to: '/interactions', label: t('nav.interactions'), icon: Pill, description: t('nav.desc_interactions') },
    { to: '/symptom-checker', label: t('nav.symptoms'), icon: Stethoscope, description: t('nav.desc_symptoms') },
  ];

  const harmNav: NavItem[] = [
    { to: '/substances', label: t('nav.substances'), icon: BookOpen, description: t('nav.desc_substances') },
    { to: '/combinations', label: t('nav.combos'), icon: Combine, description: t('nav.desc_combos') },
    { to: '/matrix', label: t('nav.matrix'), icon: Grid3X3, description: t('nav.desc_matrix') },
    { to: '/symptom-checker', label: t('nav.symptoms'), icon: Stethoscope, description: t('nav.desc_symptoms_hr') },
    { to: '/reports', label: t('nav.reports'), icon: FileText, description: t('nav.desc_reports') },
  ];

  const infoNav: NavItem[] = [
    { to: '/faq', label: t('nav.faq'), icon: HelpCircle, description: t('nav.desc_faq') },
    { to: '/emergency', label: t('nav.emergency'), icon: AlertCircle, description: t('nav.desc_emergency') },
    { to: '/faq#transparency', label: t('nav.transparency'), icon: Database, description: t('nav.desc_transparency') },
  ];

  const allToolItems = [...rxNav, ...harmNav, ...infoNav];
  const anyToolActive = allToolItems.some(i => isActive(i.to));

  function NavSection({ title, icon: SectionIcon, items }: { title: string; icon: React.ComponentType<{ className?: string }>; items: NavItem[] }) {
    return (
      <div>
        <div className="flex items-center gap-2 px-3 mb-1.5">
          <SectionIcon className="w-3.5 h-3.5 text-muted-foreground/60" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60 font-body">{title}</span>
        </div>
        {items.map(({ to, label, icon: Icon, description }) => (
          <Link
            key={`${to}-${description}`}
            to={to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 font-body group ${
              isActive(to)
                ? to === '/emergency' ? 'text-destructive bg-destructive/8' : 'text-primary bg-primary/8'
                : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              isActive(to)
                ? to === '/emergency' ? 'bg-destructive/15' : 'bg-primary/15'
                : 'bg-muted/60 group-hover:bg-muted'
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block leading-tight">{label}</span>
              {description && <span className="block text-[11px] text-muted-foreground/70 leading-tight mt-0.5">{description}</span>}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img src={gosafeLogo} alt="GoSafe.lat logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-foreground text-[17px] leading-tight tracking-tight">
                GoSafe.lat
              </span>
              <span className="text-[9px] text-muted-foreground/70 uppercase tracking-[0.2em] font-body leading-none">
                {t('nav.tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            <Link
              to="/"
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 font-body ${
                isActive('/')
                  ? 'text-primary bg-primary/8'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Home className="w-4 h-4" />
              {t('nav.home')}
              {isActive('/') && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />}
            </Link>

            {/* Mega menu trigger */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 font-body ${
                  anyToolActive
                    ? 'text-primary bg-primary/8'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Beaker className="w-4 h-4" />
                {t('nav.tools')}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />
                {anyToolActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />}
              </button>

              {megaOpen && (
                <div className="absolute top-full right-0 mt-2 w-[420px] rounded-2xl border border-border/60 bg-popover/95 backdrop-blur-xl shadow-2xl shadow-foreground/5 p-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <NavSection title={t('nav.section_rx')} icon={Heart} items={rxNav} />
                      <NavSection title={t('nav.section_info')} icon={HelpCircle} items={infoNav} />
                    </div>
                    <div>
                      <NavSection title={t('nav.section_harm')} icon={ShieldAlert} items={harmNav} />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/40">
                    <p className="text-[10px] text-muted-foreground/60 font-body text-center">
                      {t('nav.educational_note')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Emergency — always visible */}
            <Link
              to="/emergency"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 font-body ${
                isActive('/emergency')
                  ? 'text-destructive bg-destructive/10'
                  : 'text-destructive/70 hover:text-destructive hover:bg-destructive/5'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              {t('nav.emergency')}
            </Link>

            <div className="w-px h-6 bg-border/60 mx-2" />

            {/* Language dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 border border-border/50"
                aria-label="Select language"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-44 rounded-xl border border-border/60 bg-popover/95 backdrop-blur-xl shadow-xl p-1.5 animate-fade-in z-50">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-body transition-colors ${
                        lang === l.code
                          ? 'text-primary bg-primary/8 font-semibold'
                          : 'text-foreground/80 hover:bg-muted/50'
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span className="flex-1 text-left">{l.label}</span>
                      {lang === l.code && <Check className="w-3.5 h-3.5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <Link
              to="/emergency"
              className="p-2 rounded-xl text-destructive/70 hover:text-destructive hover:bg-destructive/5 transition-colors"
              aria-label="Emergency"
            >
              <AlertCircle className="w-5 h-5" />
            </Link>
            {/* Mobile language dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 rounded-xl text-muted-foreground hover:bg-muted/50 transition-colors border border-border/50 text-[11px] font-bold font-body flex items-center gap-1"
                aria-label="Select language"
              >
                {currentLang.flag}
                <ChevronDown className="w-2.5 h-2.5" />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-40 rounded-xl border border-border/60 bg-popover/95 backdrop-blur-xl shadow-xl p-1.5 animate-fade-in z-50">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-body transition-colors ${
                        lang === l.code
                          ? 'text-primary bg-primary/8 font-semibold'
                          : 'text-foreground/80 hover:bg-muted/50'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span className="flex-1 text-left">{l.label}</span>
                      {lang === l.code && <Check className="w-3 h-3 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
          <div className="lg:hidden border-t border-border/40 py-4 animate-fade-in space-y-5">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all font-body ${
                isActive('/') ? 'text-primary bg-primary/8' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/') ? 'bg-primary/15' : 'bg-muted/60'}`}>
                <Home className="w-4 h-4" />
              </div>
              {t('nav.home')}
            </Link>

            <div className="px-1">
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 px-3 mb-2">
                    <Heart className="w-3.5 h-3.5 text-muted-foreground/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 font-body">{t('nav.section_rx')}</span>
                  </div>
                  {rxNav.map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all font-body ${
                        isActive(to) ? 'text-primary bg-primary/8' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive(to) ? 'bg-primary/15' : 'bg-muted/60'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {label}
                    </Link>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-2 px-3 mb-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-muted-foreground/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 font-body">{t('nav.section_harm')}</span>
                  </div>
                  {harmNav.map(({ to, label, icon: Icon, description }) => (
                    <Link
                      key={`${to}-${description}`}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all font-body ${
                        isActive(to) ? 'text-primary bg-primary/8' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive(to) ? 'bg-primary/15' : 'bg-muted/60'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {label}
                    </Link>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-2 px-3 mb-2">
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 font-body">{t('nav.section_info')}</span>
                  </div>
                  {infoNav.map(({ to, label, icon: Icon }) => (
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
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
