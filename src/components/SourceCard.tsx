import { type Source } from '@/data/interactions';
import { type SubstanceSource } from '@/data/substances';
import { ExternalLink, BookOpen } from 'lucide-react';

type AnySource = Source | SubstanceSource;

const typeLabels: Record<string, { label: string; className: string }> = {
  governmental: { label: 'Governmental / Academic', className: 'source-governmental' },
  academic: { label: 'Academic', className: 'source-governmental' },
  educational: { label: 'Educational', className: 'source-educational' },
  anecdotal: { label: 'Anecdotal ⚠', className: 'source-anecdotal' },
};

interface SourceCardProps {
  source: AnySource;
  compact?: boolean;
}

export function SourceCard({ source, compact = false }: SourceCardProps) {
  const typeInfo = typeLabels[source.type] || typeLabels.educational;

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${typeInfo.className}`}>
          {typeInfo.label}
        </span>
        <span className="text-muted-foreground">{source.institution}</span>
        {source.url && (
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="card-elevated p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span className="font-medium text-sm text-foreground">{source.name}</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0 ${typeInfo.className}`}>
          {typeInfo.label}
        </span>
      </div>
      <p className="text-xs text-muted-foreground pl-6">{source.institution}</p>
      <p className="text-sm text-foreground/80 pl-6 italic">{source.title}</p>
      {source.type === 'anecdotal' && (
        <p className="text-xs text-amber-700 pl-6 font-medium">
          ⚠ This source contains anecdotal community reports. It is labeled accordingly and not treated as authoritative clinical data.
        </p>
      )}
      {source.url && (
        <div className="pl-6">
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            Visit source <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}

interface SourceSectionProps {
  sources: AnySource[];
}

export function SourceSection({ sources }: SourceSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        Sources & References
      </h3>
      <div className="grid gap-3">
        {sources.map((source, i) => (
          <SourceCard key={i} source={source} />
        ))}
      </div>
    </div>
  );
}
