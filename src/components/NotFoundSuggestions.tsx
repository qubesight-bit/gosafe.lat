import { useMemo } from 'react';
import { Info } from 'lucide-react';

function getSimilarNames(query: string, allNames: string[], max = 5): string[] {
  if (!query.trim() || allNames.length === 0) return [];
  const q = query.toLowerCase();
  const startsWith = allNames.filter(n => n.toLowerCase().startsWith(q));
  const includes = allNames.filter(n => n.toLowerCase().includes(q) && !n.toLowerCase().startsWith(q));
  if (startsWith.length + includes.length >= max) {
    return [...startsWith, ...includes].slice(0, max);
  }
  const bigrams = (s: string) => {
    const b = new Set<string>();
    for (let i = 0; i < s.length - 1; i++) b.add(s.slice(i, i + 2));
    return b;
  };
  const qBigrams = bigrams(q);
  const rest = allNames
    .filter(n => !n.toLowerCase().includes(q))
    .map(n => {
      const nBigrams = bigrams(n.toLowerCase());
      let overlap = 0;
      qBigrams.forEach(b => { if (nBigrams.has(b)) overlap++; });
      return { name: n, score: overlap / Math.max(qBigrams.size, 1) };
    })
    .filter(x => x.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .map(x => x.name);
  return [...startsWith, ...includes, ...rest].slice(0, max);
}

interface NotFoundSuggestionsProps {
  searchedTerms: { a: string; b: string };
  allNames: string[];
  onSelect: (a: string, b: string) => void;
}

export function NotFoundSuggestions({ searchedTerms, allNames, onSelect }: NotFoundSuggestionsProps) {
  const suggestionsA = useMemo(() => getSimilarNames(searchedTerms.a, allNames), [searchedTerms.a, allNames]);
  const suggestionsB = useMemo(() => getSimilarNames(searchedTerms.b, allNames), [searchedTerms.b, allNames]);

  const hasSuggestions = suggestionsA.length > 0 || suggestionsB.length > 0;

  return (
    <div className="card-elevated p-6 space-y-4 animate-fade-up">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <div className="space-y-3 w-full">
          <h3 className="font-display font-semibold text-foreground mb-1">No data found</h3>
          <p className="text-muted-foreground text-sm font-body leading-relaxed">
            The TripSit database has no documented interaction between{' '}
            <strong>"{searchedTerms.a}"</strong> and <strong>"{searchedTerms.b}"</strong>.
            This does <em>not</em> mean the combination is safe.
          </p>

          {hasSuggestions && (
            <p className="text-xs text-muted-foreground font-body font-medium">Try a different combination:</p>
          )}
          {suggestionsA.length > 0 && (
            <div className="bg-muted/40 border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-body mb-2">
                Did you mean instead of <strong className="text-foreground">"{searchedTerms.a}"</strong>?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {suggestionsA.map(name => (
                  <button
                    key={name}
                    onClick={() => onSelect(name, searchedTerms.b)}
                    className="px-2.5 py-1 text-xs border border-border rounded-full text-primary hover:bg-primary/10 hover:border-primary transition-colors font-body capitalize"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestionsB.length > 0 && (
            <div className="bg-muted/40 border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-body mb-2">
                Did you mean instead of <strong className="text-foreground">"{searchedTerms.b}"</strong>?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {suggestionsB.map(name => (
                  <button
                    key={name}
                    onClick={() => onSelect(searchedTerms.a, name)}
                    className="px-2.5 py-1 text-xs border border-border rounded-full text-primary hover:bg-primary/10 hover:border-primary transition-colors font-body capitalize"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <ul className="space-y-1 text-sm font-body text-muted-foreground list-disc list-inside">
            <li>Try alternate names or common street names</li>
            <li>Check the substance name spelling</li>
            <li>Consult a healthcare professional for safety information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
