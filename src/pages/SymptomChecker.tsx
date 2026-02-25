import { Layout } from '@/components/Layout';
import { Stethoscope, AlertCircle, Shield } from 'lucide-react';
import { Disclaimer } from '@/components/Disclaimer';

const SymptomChecker = () => {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-7 h-7 text-purple-700" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Symptom Checker
          </h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Enter your symptoms for educational differential diagnosis information, triage scoring, and links to trusted medical knowledge pages.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-accent-muted border border-amber-200 rounded-xl p-4 flex items-start gap-3 mb-8">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-amber-800 text-sm font-body">
              <strong className="font-semibold">Educational purposes only.</strong> This tool does not provide medical advice, diagnosis, or treatment recommendations. Results are for awareness only — always consult a licensed healthcare professional.
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="card-elevated p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-muted-foreground" />
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground text-sm font-body max-w-md mx-auto">
            The Symptom Checker is being integrated with the Isabel Healthcare API. This feature will include symptom autocomplete, ranked differential diagnoses, triage scoring, and links to trusted knowledge pages.
          </p>
        </div>
      </section>
      <Disclaimer />
    </Layout>
  );
};

export default SymptomChecker;
