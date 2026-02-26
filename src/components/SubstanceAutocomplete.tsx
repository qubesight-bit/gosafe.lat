import { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

// Singleton cache so we only fetch once across all instances
let cachedNames: string[] | null = null;
let fetchPromise: Promise<string[]> | null = null;

async function fetchAllDrugNames(): Promise<string[]> {
  if (cachedNames) return cachedNames;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const { data, error } = await supabase.functions.invoke('tripsit-api', {
        body: { action: 'all_drug_names' },
      });
      if (error || !data?.data) return [];
      // API returns [[...names]] — flatten and filter for strings
      const raw = Array.isArray(data.data[0]) ? data.data[0] : data.data;
      cachedNames = (raw as unknown[]).filter((n): n is string => typeof n === 'string');
      return cachedNames;
    } catch {
      return [];
    }
  })();

  return fetchPromise;
}

interface SubstanceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  label?: string;
}

export function SubstanceAutocomplete({
  value,
  onChange,
  onKeyDown,
  placeholder = 'e.g. Cannabis',
  label,
}: SubstanceAutocompleteProps) {
  const [allNames, setAllNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setLoading(true);
    fetchAllDrugNames()
      .then(setAllNames)
      .finally(() => setLoading(false));
  }, []);

  const suggestions = useMemo(() => {
    if (!value.trim() || value.trim().length < 2) return [];
    const q = value.toLowerCase();
    return allNames
      .filter(n => typeof n === 'string' && n.toLowerCase().includes(q))
      .slice(0, 12);
  }, [value, allNames]);

  useEffect(() => {
    setOpen(suggestions.length > 0);
    setHighlightIndex(-1);
  }, [suggestions]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectItem = (name: string) => {
    onChange(name);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (open && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightIndex(prev => Math.min(prev + 1, suggestions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && highlightIndex >= 0) {
        e.preventDefault();
        selectItem(suggestions[highlightIndex]);
        return;
      } else if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
    }
    onKeyDown?.(e);
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIndex]);

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5 font-body">{label}</label>
      )}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg"
        >
          {suggestions.map((name, i) => (
            <li
              key={name}
              onClick={() => selectItem(name)}
              className={`px-4 py-2 text-sm font-body cursor-pointer transition-colors capitalize ${
                i === highlightIndex
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
