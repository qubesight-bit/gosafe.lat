import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Disclaimer } from '@/components/Disclaimer';
import { SubstanceAutocomplete } from '@/components/SubstanceAutocomplete';
import { useTripSitApi, mapTripSitStatus } from '@/hooks/use-tripsit-api';
import type { TripSitInteraction } from '@/hooks/use-tripsit-api';
import { Shield, Search, Loader2, AlertTriangle, CheckCircle2, Info, ExternalLink } from 'lucide-react';

const examplePairs = [
  ['Cannabis', 'LSD'],
  ['MDMA', 'Alcohol'],
  ['Mushrooms', 'Cannabis'],
  ['Cocaine', 'Alcohol'],
  ['Ketamine', 'MDMA'],
  ['LSD', 'MDMA'],
];

export default function CombinationChecker() {
  const [drugA, setDrugA] = useState('');
  const [drugB, setDrugB] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TripSitInteraction | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchedTerms, setSearchedTerms] = useState({ a: '', b: '' });

  const api = useTripSitApi();

  const handleSearch = async () => {
    if (!drugA.trim() || !drugB.trim()) return;
    setLoading(true);
    setResult(null);
    setNotFound(false);
    setSearched(false);
    setSearchedTerms({ a: drugA.trim(), b: drugB.trim() });

    try {
      const data = await api.getInteraction(drugA.trim(), drugB.trim());
      if (data) {
        setResult(data);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }

    setSearched(true);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const resetSearch = () => {
    setDrugA('');
    setDrugB('');
    setResult(null);
    setNotFound(false);
    setSearched(false);
  };

  const mapped = result ? mapTripSitStatus(result.status) : null;

  const severityStyles: Record<string, string> = {
    none: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    mild: 'bg-sky-50 border-sky-200 text-sky-800',
    moderate: 'bg-amber-50 border-amber-200 text-amber-800',
    severe: 'bg-red-50 border-red-200 text-red-800',
  };

  const severityIcons: Record<string, React.ReactNode> = {
    none: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    mild: <Info className="w-5 h-5 text-sky-600" />,
    moderate: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    severe: <AlertTriangle className="w-5 h-5 text-red-600" />,
  };

  return (
    <Layout>
      {/* Header */}
      <section className="section-hero text-primary-foreground py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-primary-foreground/80 text-sm font-body uppercase tracking-wide font-medium">Harm Reduction Tool</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Combination Safety Checker
          </h1>
          <p className="text-primary-foreground/85 font-body text-lg max-w-2xl leading-relaxed">
            Check reported interaction safety between two substances — powered by the TripSit community database. For educational awareness only.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/15 border border-primary-foreground/20 text-primary-foreground/80 text-xs font-body">
            <ExternalLink className="w-3.5 h-3.5" />
            Source: TripSit.me Community Database
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Disclaimer />

        {/* Search */}
        <div className="card-elevated p-6 md:p-8 space-y-6">
          <div>
            <h2 className="font-display font-semibold text-foreground text-xl mb-1">Check Combination</h2>
            <p className="text-muted-foreground text-sm font-body">
              Enter two substance names to check their reported interaction status. This uses TripSit's community-maintained combination database.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <SubstanceAutocomplete
              value={drugA}
              onChange={setDrugA}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Cannabis"
              label="First Substance"
            />
            <SubstanceAutocomplete
              value={drugB}
              onChange={setDrugB}
              onKeyDown={handleKeyDown}
              placeholder="e.g. MDMA"
              label="Second Substance"
            />
          </div>

          {/* Example combos */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-body">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {examplePairs.map(([a, b]) => (
                <button
                  key={`${a}-${b}`}
                  onClick={() => { setDrugA(a); setDrugB(b); }}
                  className="px-2.5 py-1 text-xs border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-colors font-body"
                >
                  {a} + {b}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              disabled={!drugA.trim() || !drugB.trim() || loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-body text-sm shadow-primary"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Checking…</>
              ) : (
                <><Search className="w-4 h-4" /> Check Combination</>
              )}
            </button>
            {searched && (
              <button
                onClick={resetSearch}
                className="px-4 py-2.5 border border-border text-muted-foreground rounded-lg hover:bg-muted transition-colors font-body text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Not found */}
        {notFound && (
          <div className="card-elevated p-6 space-y-4 animate-fade-up">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">No data found</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  The TripSit database has no documented interaction between{' '}
                  <strong>"{searchedTerms.a}"</strong> and <strong>"{searchedTerms.b}"</strong>.
                  This does <em>not</em> mean the combination is safe.
                </p>
                <ul className="mt-3 space-y-1 text-sm font-body text-muted-foreground list-disc list-inside">
                  <li>Try alternate names or common street names</li>
                  <li>Check the substance name spelling</li>
                  <li>Consult a healthcare professional for safety information</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && mapped && (
          <div className="space-y-6 animate-fade-up">
            <div className="card-elevated p-6 md:p-8 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-foreground text-xl mb-1 capitalize">
                    {searchedTerms.a} + {searchedTerms.b}
                  </h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-body">
                    <ExternalLink className="w-3 h-3" />
                    Source: TripSit.me Community Database (Anecdotal)
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${severityStyles[mapped.severity]}`}>
                  {severityIcons[mapped.severity]}
                  {mapped.label}
                </span>
              </div>

              <div className="h-px bg-border" />

              {/* Status card */}
              <div className={`p-4 rounded-lg border ${severityStyles[mapped.severity]}`}>
                <div className="flex items-start gap-3">
                  {severityIcons[mapped.severity]}
                  <div>
                    <p className="font-semibold text-sm mb-1">Status: {result.status}</p>
                    <p className="text-sm leading-relaxed">{mapped.description}</p>
                  </div>
                </div>
              </div>

              {/* Note from TripSit if available */}
              {(result as unknown as { note?: string }).note && (
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1 font-body">Community Note</p>
                  <p className="text-sm font-body leading-relaxed text-foreground/80">
                    {(result as unknown as { note?: string }).note}
                  </p>
                </div>
              )}

              {/* Category info */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-muted/30 border border-border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-body mb-0.5">Category A</p>
                  <p className="text-sm font-medium text-foreground font-body capitalize">{result.interactionCategoryA}</p>
                </div>
                <div className="bg-muted/30 border border-border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-body mb-0.5">Category B</p>
                  <p className="text-sm font-medium text-foreground font-body capitalize">{result.interactionCategoryB}</p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="disclaimer-box px-4 py-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-amber-800 text-sm font-body">
                  <strong>This data is community-sourced and anecdotal.</strong> TripSit data is not medical advice.
                  Absence of danger rating does not confirm safety. Always consult a healthcare professional.
                </p>
              </div>
            </div>

            {/* Source attribution */}
            <div className="card-elevated p-4">
              <h4 className="font-display font-semibold text-foreground text-sm mb-2">Source</h4>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground font-body">TripSit.me</p>
                  <p className="text-xs text-muted-foreground font-body">Community-maintained harm reduction database</p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">Type: <span className="text-amber-600 font-medium">Anecdotal / Community</span></p>
                  <a
                    href="https://combo.tripsit.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline font-body mt-1 inline-block"
                  >
                    combo.tripsit.me →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend when not searched */}
        {!searched && !loading && (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground">TripSit Interaction Legend</h3>
            <p className="text-muted-foreground text-sm font-body">
              TripSit uses the following community-defined interaction statuses:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { status: 'Low Risk & Synergy', severity: 'none' as const, desc: 'Low documented risk with synergistic effects' },
                { status: 'Low Risk & No Synergy', severity: 'none' as const, desc: 'Low documented risk, no notable synergy' },
                { status: 'Low Risk & Decrease', severity: 'mild' as const, desc: 'Low risk, one may reduce the other\'s effects' },
                { status: 'Caution', severity: 'moderate' as const, desc: 'Requires caution — unpredictable or amplified effects' },
                { status: 'Unsafe', severity: 'severe' as const, desc: 'Considered unsafe, may cause significant harm' },
                { status: 'Dangerous', severity: 'severe' as const, desc: 'Dangerous combination with serious health risks' },
              ].map(item => (
                <div key={item.status} className={`p-3 rounded-lg border flex items-start gap-2 ${severityStyles[item.severity]}`}>
                  {severityIcons[item.severity]}
                  <div>
                    <p className="text-sm font-semibold">{item.status}</p>
                    <p className="text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom disclaimer */}
        <div className="disclaimer-box p-5">
          <p className="text-amber-800 text-sm font-body leading-relaxed">
            <strong className="font-semibold">Data source notice:</strong> This tool uses data from TripSit.me, a community-maintained harm reduction resource.
            All interaction data is <strong>anecdotal and community-sourced</strong> — it is not peer-reviewed medical literature.
            No dosage, preparation, or route of administration information is provided.
            Always consult a licensed healthcare professional for medical decisions.
          </p>
        </div>
      </div>
    </Layout>
  );
}
