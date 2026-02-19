import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Disclaimer } from '@/components/Disclaimer';
import { SourceSection } from '@/components/SourceCard';
import { searchInteraction, severityConfig, knownInteractions } from '@/data/interactions';
import type { InteractionResult } from '@/data/interactions';
import { lookupRxNavInteraction } from '@/lib/rxnav';
import type { NormalizedInteraction } from '@/lib/rxnav';
import { Pill, Search, AlertCircle, ChevronDown, Info, Loader2, Database, Globe } from 'lucide-react';

const commonDrugs = [
  'Warfarin', 'Aspirin', 'SSRI', 'MAOI', 'Metformin',
  'Ibuprofen', 'Atorvastatin', 'Clarithromycin', 'Lisinopril',
  'Potassium', 'Acetaminophen', 'Alcohol', 'Cocaine', 'Nutmeg',
  'Cannabis', 'MDMA', 'Psilocybin',
];

type ResultState =
  | { type: 'static'; data: InteractionResult }
  | { type: 'rxnav'; data: NormalizedInteraction }
  | { type: 'not-found' }
  | null;

export default function MedicationInteractions() {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [result, setResult] = useState<ResultState>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedTerms, setSearchedTerms] = useState({ d1: '', d2: '' });

  const handleSearch = async () => {
    if (!drug1.trim() || !drug2.trim()) return;
    setLoading(true);
    setSearched(false);
    setResult(null);

    const terms = { d1: drug1.trim(), d2: drug2.trim() };
    setSearchedTerms(terms);

    // 1. Check static DB first (covers illicit substances & supplements)
    const staticMatch = searchInteraction(terms.d1, terms.d2);
    if (staticMatch) {
      setResult({ type: 'static', data: staticMatch });
      setSearched(true);
      setLoading(false);
      return;
    }

    // 2. Try NIH NLM RxNav API (covers FDA-approved pharmaceuticals)
    try {
      const rxResult = await lookupRxNavInteraction(terms.d1, terms.d2);
      if (rxResult === 'not-in-rxnorm') {
        // Neither drug found in RxNorm and not in static DB
        setResult({ type: 'not-found' });
      } else if (rxResult) {
        setResult({ type: 'rxnav', data: rxResult });
      } else {
        setResult({ type: 'not-found' });
      }
    } catch {
      setResult({ type: 'not-found' });
    }

    setSearched(true);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const resetSearch = () => {
    setDrug1('');
    setDrug2('');
    setResult(null);
    setSearched(false);
  };

  const SeverityBadge = ({ severity }: { severity: keyof typeof severityConfig }) => {
    const config = severityConfig[severity];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${config.className}`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  // Normalize result for display
  const displayData = result && result.type !== 'not-found'
    ? result.type === 'static'
      ? {
          drug1: result.data.drug1,
          drug2: result.data.drug2,
          severity: result.data.severity,
          mechanism: result.data.mechanism,
          clinicalNote: result.data.clinicalNote,
          sources: result.data.sources,
          sourceLabel: 'Static Educational Database',
          sourceIcon: <Database className="w-3.5 h-3.5" />,
        }
      : {
          drug1: result.data.drug1,
          drug2: result.data.drug2,
          severity: result.data.severity,
          mechanism: result.data.mechanism,
          clinicalNote: result.data.clinicalNote,
          sources: result.data.sources,
          sourceLabel: 'NIH / NLM RxNav Live Database',
          sourceIcon: <Globe className="w-3.5 h-3.5" />,
        }
    : null;

  return (
    <Layout>
      {/* Header */}
      <section className="section-hero text-primary-foreground py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <span className="text-primary-foreground/80 text-sm font-body uppercase tracking-wide font-medium">Educational Tool</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Medication Interaction Awareness
          </h1>
          <p className="text-primary-foreground/85 font-body text-lg max-w-2xl leading-relaxed">
            Search for educational information on reported medication interactions — powered by the NIH/NLM RxNav live database and an expanded static reference covering psychoactive substances.
          </p>
          {/* Source badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/15 border border-primary-foreground/20 text-primary-foreground/80 text-xs font-body">
            <Globe className="w-3.5 h-3.5" />
            Powered by NIH/NLM RxNav API — U.S. National Library of Medicine
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Disclaimer />

        {/* Search tool */}
        <div className="card-elevated p-6 md:p-8 space-y-6">
          <div>
            <h2 className="font-display font-semibold text-foreground text-xl mb-1">Search Interactions</h2>
            <p className="text-muted-foreground text-sm font-body">
              Enter two medication or substance names. Pharmaceutical interactions are queried live from the NIH/NLM RxNav database. Substances not in RxNorm (e.g. illicit drugs, supplements) are looked up in our expanded static reference.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">First Medication / Substance</label>
              <input
                type="text"
                value={drug1}
                onChange={e => setDrug1(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Warfarin"
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Second Medication / Substance</label>
              <input
                type="text"
                value={drug2}
                onChange={e => setDrug2(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Aspirin"
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body text-sm"
              />
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-body">Common examples:</p>
            <div className="flex flex-wrap gap-2">
              {commonDrugs.map(d => (
                <button
                  key={d}
                  onClick={() => !drug1 ? setDrug1(d) : setDrug2(d)}
                  className="px-2.5 py-1 text-xs border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary-muted transition-colors font-body"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              disabled={!drug1.trim() || !drug2.trim() || loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-body text-sm shadow-primary"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Querying NIH Database…</>
              ) : (
                <><Search className="w-4 h-4" /> Search Educational Database</>
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

        {/* Not found result */}
        {result?.type === 'not-found' && (
          <div className="card-elevated p-6 space-y-4 animate-fade-up">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">No interaction found in educational databases</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  Neither the <strong>NIH/NLM RxNav live database</strong> nor our <strong>expanded static reference</strong> has a documented interaction between{' '}
                  <strong>"{searchedTerms.d1}"</strong> and <strong>"{searchedTerms.d2}"</strong>.
                </p>
                <p className="text-muted-foreground text-sm font-body mt-2">
                  This may mean one or both names are not recognized in RxNorm, or no interaction has been formally documented. It does <em>not</em> confirm the combination is safe.
                </p>
                <ul className="mt-3 space-y-1 text-sm font-body text-muted-foreground list-disc list-inside">
                  <li>Try searching by generic name (e.g. "acetaminophen" instead of "Tylenol")</li>
                  <li>Try common alternate names or spellings</li>
                  <li>Consult a licensed pharmacist for comprehensive screening</li>
                </ul>
              </div>
            </div>
            <div className="disclaimer-box px-4 py-3">
              <p className="text-amber-800 text-sm font-body">
                <strong>Important:</strong> Absence of a result in this tool should never be interpreted as confirmation that a combination is safe. Always consult a healthcare professional.
              </p>
            </div>
          </div>
        )}

        {/* Found result */}
        {displayData && (
          <div className="space-y-6 animate-fade-up">
            <div className="card-elevated p-6 md:p-8 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-foreground text-xl mb-1 capitalize">
                    {displayData.drug1} + {displayData.drug2}
                  </h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-body">
                    {displayData.sourceIcon}
                    <span>Source: {displayData.sourceLabel}</span>
                  </div>
                </div>
                <SeverityBadge severity={displayData.severity} />
              </div>

              <div className="h-px bg-border" />

              <div className={`p-4 rounded-lg border ${severityConfig[displayData.severity].className}`}>
                <p className="text-sm font-body leading-relaxed">{severityConfig[displayData.severity].description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide font-body">Interaction Mechanism (Educational Overview)</h4>
                <p className="text-foreground/80 text-sm font-body leading-relaxed">{displayData.mechanism}</p>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1 font-body">Professional Referral Note</p>
                <p className="text-sm font-body leading-relaxed text-foreground/80">{displayData.clinicalNote}</p>
              </div>

              <div className="disclaimer-box px-4 py-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-amber-800 text-sm font-body">
                  <strong>This tool is for educational purposes only and does not replace professional medical advice.</strong> Do not modify, start, or stop any medication without consulting a licensed healthcare professional.
                </p>
              </div>
            </div>

            <SourceSection sources={displayData.sources} />
          </div>
        )}

        {/* Sample interactions */}
        {!searched && !loading && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-foreground">Sample Documented Interactions</h3>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm font-body">Click any example to auto-fill the search tool.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {knownInteractions.slice(0, 6).map((interaction) => {
                const config = severityConfig[interaction.severity];
                return (
                  <button
                    key={`${interaction.drug1}-${interaction.drug2}`}
                    onClick={() => { setDrug1(interaction.drug1); setDrug2(interaction.drug2); }}
                    className="card-elevated card-hover p-4 text-left flex items-start gap-3 w-full"
                  >
                    <span className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${config.className}`}>
                      {config.icon}
                    </span>
                    <div>
                      <p className="font-medium text-sm text-foreground font-body capitalize">
                        {interaction.drug1} + {interaction.drug2}
                      </p>
                      <p className={`text-xs mt-0.5 font-body ${config.className.replace('border', '')} rounded px-1.5 py-0.5 inline-block`}>
                        {config.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
