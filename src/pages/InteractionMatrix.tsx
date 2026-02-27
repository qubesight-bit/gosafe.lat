import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Disclaimer } from '@/components/Disclaimer';
import { MATRIX_SUBSTANCES, getCombo, type ComboStatus, type MatrixSubstance } from '@/data/combo-matrix';
import { Grid3X3, Info, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type StatusKey = 'dangerous' | 'unsafe' | 'caution' | 'low_risk_decrease' | 'low_risk_no_synergy' | 'low_risk_synergy' | 'serotonin_syndrome';

function normalizeStatus(raw: ComboStatus): StatusKey {
  const s = raw.toLowerCase();
  if (s.includes('serotonin')) return 'serotonin_syndrome';
  if (s.includes('dangerous')) return 'dangerous';
  if (s.includes('unsafe')) return 'unsafe';
  if (s.includes('caution')) return 'caution';
  if (s.includes('decrease')) return 'low_risk_decrease';
  if (s.includes('no synergy')) return 'low_risk_no_synergy';
  if (s.includes('synergy')) return 'low_risk_synergy';
  return 'caution';
}

const statusConfig: Record<StatusKey, { label: string; bg: string; textColor: string; description: string }> = {
  dangerous: {
    label: 'Documented High Risk',
    bg: 'bg-red-600',
    textColor: 'text-red-50',
    description: 'Documented high risk — serious health risks reported. Evidence of severe harm.',
  },
  unsafe: {
    label: 'Documented Moderate Risk',
    bg: 'bg-orange-500',
    textColor: 'text-orange-50',
    description: 'Documented moderate risk — may cause significant harm.',
  },
  serotonin_syndrome: {
    label: 'Serotonin Syndrome Risk',
    bg: 'bg-red-800',
    textColor: 'text-red-50',
    description: 'Documented risk of serotonin syndrome — potentially fatal emergency.',
  },
  caution: {
    label: 'Caution Advised',
    bg: 'bg-amber-500',
    textColor: 'text-amber-50',
    description: 'Caution advised — unpredictable outcomes may occur.',
  },
  low_risk_decrease: {
    label: 'Limited Data — Decrease',
    bg: 'bg-slate-400',
    textColor: 'text-slate-50',
    description: 'Limited data — one may reduce the effects of the other. Risk unknown.',
  },
  low_risk_no_synergy: {
    label: 'Limited Data',
    bg: 'bg-slate-500',
    textColor: 'text-slate-50',
    description: 'Limited data available. Risk level not fully characterized.',
  },
  low_risk_synergy: {
    label: 'Limited Data — Synergy',
    bg: 'bg-slate-600',
    textColor: 'text-slate-50',
    description: 'Limited data with reported synergistic effects. Unpredictable outcomes may occur.',
  },
};

export default function InteractionMatrix() {
  const { t } = useLanguage();
  const drugs = MATRIX_SUBSTANCES;

  return (
    <Layout>
      <SEO title={t('matrix.title')} description={t('matrix.subtitle')} path="/matrix" />
      <section className="section-hero text-primary-foreground py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <span className="text-primary-foreground/80 text-sm font-body uppercase tracking-wide font-medium">{t('matrix.badge')}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">{t('matrix.title')}</h1>
          <p className="text-primary-foreground/85 font-body text-lg max-w-2xl leading-relaxed">{t('matrix.subtitle')}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <Disclaimer />

        {/* Non-dismissable sticky disclaimer */}
        <div className="sticky top-16 z-30 bg-destructive/10 border-2 border-destructive/30 rounded-lg p-4 flex items-start gap-3 shadow-md">
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
          <p className="text-destructive text-sm font-body font-semibold leading-relaxed">
            {t('matrix.sticky_disclaimer')}
          </p>
        </div>

        {/* Legend */}
        <div className="card-elevated p-5">
          <h3 className="font-display font-semibold text-foreground text-sm mb-3 uppercase tracking-wide">{t('matrix.legend')}</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <div key={key} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.textColor}`}>
                {cfg.label}
              </div>
            ))}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
              {t('matrix.no_data')}
            </div>
          </div>
        </div>

        {/* Matrix */}
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="border-collapse" style={{ minWidth: `${drugs.length * 44 + 140}px` }}>
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 bg-card p-0 w-[140px] min-w-[140px]">
                    <div className="h-[140px]" />
                  </th>
                  {drugs.map((d) => (
                    <th key={d} className="p-0 text-center" style={{ width: '40px', minWidth: '40px' }}>
                      <div className="h-[140px] flex items-end justify-center pb-2">
                        <span
                          className="text-[11px] font-medium text-foreground font-body whitespace-nowrap"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          {d}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {drugs.map((rowDrug, rowIdx) => (
                  <tr key={rowDrug}>
                    <td className="sticky left-0 z-10 bg-card border-t border-border px-3 py-0 w-[140px] min-w-[140px]">
                      <span className="text-[11px] font-medium text-foreground font-body whitespace-nowrap">
                        {rowDrug}
                      </span>
                    </td>
                    {drugs.map((colDrug, colIdx) => {
                      if (colIdx === rowIdx) {
                        return (
                          <td key={colDrug} className="border-t border-border p-0">
                            <div className="w-[40px] h-[40px] bg-foreground/10 flex items-center justify-center">
                              <span className="text-[10px] text-muted-foreground">—</span>
                            </div>
                          </td>
                        );
                      }

                      const cell = getCombo(rowDrug as MatrixSubstance, colDrug as MatrixSubstance);
                      const status = cell ? normalizeStatus(cell.status) : null;
                      const cfg = status ? statusConfig[status] : null;

                      return (
                        <td key={colDrug} className="border-t border-border p-0">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={`w-[40px] h-[40px] cursor-pointer transition-opacity hover:opacity-80 ${
                                  cfg ? cfg.bg : 'bg-muted/40'
                                }`}
                                role="gridcell"
                                aria-label={`${rowDrug} + ${colDrug}: ${cfg?.label || 'No data'}`}
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <div className="space-y-1">
                                <p className="font-semibold text-sm">
                                  {rowDrug} + {colDrug}
                                </p>
                                {cfg ? (
                                  <>
                                    <p className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${cfg.bg} ${cfg.textColor}`}>
                                      {cfg.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{cfg.description}</p>
                                  </>
                                ) : (
                                  <p className="text-xs text-muted-foreground">Limited data — risk unknown.</p>
                                )}
                                {cell?.note && (
                                  <p className="text-xs text-foreground/70 italic border-t border-border pt-1 mt-1">{cell.note}</p>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Source attribution */}
        <div className="flex items-start gap-3 p-4 bg-muted/50 border border-border rounded-lg">
          <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="text-xs text-muted-foreground font-body space-y-1">
            <p>
              <strong className="text-foreground">Data source:</strong> TripSit Community Database (
              <a href="https://combo.tripsit.me/" target="_blank" rel="noopener noreferrer" className="text-primary underline">combo.tripsit.me</a>
              ) — community-sourced data (anecdotal).
            </p>
            <p>
              {t('matrix.source_note')}
            </p>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div className="disclaimer-box p-5">
          <p className="text-amber-800 text-sm font-body leading-relaxed">
            <strong className="font-semibold">Important:</strong> {t('matrix.bottom_disclaimer')}
          </p>
        </div>
      </div>
    </Layout>
  );
}
