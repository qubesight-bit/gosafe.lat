import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Disclaimer } from '@/components/Disclaimer';
import { SourceSection } from '@/components/SourceCard';
import { searchInteraction, severityConfig, knownInteractions } from '@/data/interactions';
import type { InteractionResult } from '@/data/interactions';
import { Pill, Search, AlertCircle, ChevronDown, Info } from 'lucide-react';

const commonDrugs = [
  'Warfarin', 'Aspirin', 'SSRI', 'MAOI', 'Metformin',
  'Ibuprofen', 'Atorvastatin', 'Clarithromycin', 'Lisinopril',
  'Potassium', 'Acetaminophen', 'Alcohol',
];

export default function MedicationInteractions() {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [result, setResult] = useState<InteractionResult | null | 'not-found'>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!drug1.trim() || !drug2.trim()) return;
    const found = searchInteraction(drug1, drug2);
    setResult(found ?? 'not-found');
    setSearched(true);
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
            Search for educational information on reported medication interactions, based on governmental and academic health sources.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Disclaimer />

        {/* Search tool */}
        <div className="card-elevated p-6 md:p-8 space-y-6">
          <div>
            <h2 className="font-display font-semibold text-foreground text-xl mb-1">Search Interactions</h2>
            <p className="text-muted-foreground text-sm font-body">Enter two medication names (generic names preferred) to search the educational database.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">First Medication</label>
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
              disabled={!drug1.trim() || !drug2.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-body text-sm shadow-primary"
            >
              <Search className="w-4 h-4" />
              Search Educational Database
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

        {/* Results */}
        {result === 'not-found' && (
          <div className="card-elevated p-6 space-y-4 animate-fade-up">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">No interaction found in educational database</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  This educational tool does not have a record of a specific interaction between <strong>"{drug1}"</strong> and <strong>"{drug2}"</strong>. 
                  This does not confirm safety or the absence of an interaction — our database is limited in scope.
                </p>
                <p className="text-muted-foreground text-sm font-body mt-2">
                  Please consult a licensed pharmacist or healthcare professional for complete medication interaction screening.
                </p>
              </div>
            </div>
            <div className="disclaimer-box px-4 py-3">
              <p className="text-amber-800 text-sm font-body">
                <strong>Important:</strong> Absence of a result in this tool should never be interpreted as confirmation that a combination is safe. Always consult a healthcare professional.
              </p>
            </div>
          </div>
        )}

        {result && result !== 'not-found' && (
          <div className="space-y-6 animate-fade-up">
            {/* Result Header */}
            <div className="card-elevated p-6 md:p-8 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-foreground text-xl mb-1">
                    {result.drug1.charAt(0).toUpperCase() + result.drug1.slice(1)} + {result.drug2.charAt(0).toUpperCase() + result.drug2.slice(1)}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body">Interaction information from educational database</p>
                </div>
                <SeverityBadge severity={result.severity} />
              </div>

              <div className="h-px bg-border" />

              {/* Severity explanation */}
              <div className={`p-4 rounded-lg border ${severityConfig[result.severity].className}`}>
                <p className="text-sm font-body leading-relaxed">{severityConfig[result.severity].description}</p>
              </div>

              {/* Mechanism */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide font-body">Interaction Mechanism (Educational Overview)</h4>
                <p className="text-foreground/80 text-sm font-body leading-relaxed">{result.mechanism}</p>
              </div>

              {/* Clinical note */}
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1 font-body">Professional Referral Note</p>
                <p className="text-sm font-body leading-relaxed text-foreground/80">{result.clinicalNote}</p>
              </div>

              {/* Mandatory disclaimer */}
              <div className="disclaimer-box px-4 py-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-amber-800 text-sm font-body">
                  <strong>This tool is for educational purposes only and does not replace professional medical advice.</strong> Do not modify, start, or stop any medication without consulting a licensed healthcare professional.
                </p>
              </div>
            </div>

            {/* Sources */}
            <SourceSection sources={result.sources} />
          </div>
        )}

        {/* Example interactions shown */}
        {!searched && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-foreground">Sample Documented Interactions</h3>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm font-body">Click any example below to auto-fill the search tool.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {knownInteractions.slice(0, 4).map((interaction) => {
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
