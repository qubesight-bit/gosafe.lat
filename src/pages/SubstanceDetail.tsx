import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Disclaimer } from '@/components/Disclaimer';
import { SourceSection } from '@/components/SourceCard';
import { substances, categoryColors, dependencyColors } from '@/data/substances';
import {
  AlertTriangle, AlertCircle, ArrowLeft, Brain, Heart, Clock, Zap, Scale, Shield
} from 'lucide-react';

const dependencyLabels: Record<string, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  'very high': 'Very High',
};

const combinationColors: Record<string, string> = {
  caution: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  dangerous: 'bg-orange-50 text-orange-700 border-orange-200',
  severe: 'bg-red-50 text-red-700 border-red-200',
};

export default function SubstanceDetail() {
  const { id } = useParams<{ id: string }>();
  const substance = substances.find((s) => s.id === id);

  if (!substance) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">Substance not found</h1>
          <p className="text-muted-foreground font-body mb-6">This substance is not in the educational database.</p>
          <Link to="/substances" className="text-primary hover:underline font-body">← Back to Library</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="section-hero text-primary-foreground py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/substances"
            className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground text-sm font-body mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </Link>
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <h1 className="font-display text-3xl md:text-4xl font-bold">{substance.name}</h1>
            <span className={`text-sm font-medium px-3 py-1 rounded-full border mt-1 ${categoryColors[substance.category]}`}>
              {substance.classification}
            </span>
          </div>
          <p className="text-primary-foreground/75 text-sm font-body">
            Also known as: {substance.commonNames.join(', ')}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Disclaimer />

        {/* General Effects */}
        <div className="card-elevated p-6 space-y-3">
          <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> General Effects Overview
          </h2>
          <p className="text-foreground/80 text-sm font-body leading-relaxed">{substance.generalEffects}</p>
          <p className="text-xs text-muted-foreground font-body italic">
            Individual effects vary significantly based on biology, health status, and environmental context. This is educational context only.
          </p>
        </div>

        {/* Risk Profiles */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Physical Risks */}
          <div className="card-elevated p-5 space-y-3">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" /> Physical Health Risks
            </h3>
            <ul className="space-y-2">
              {substance.physicalRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Mental Risks */}
          <div className="card-elevated p-5 space-y-3">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" /> Mental Health Risks
            </h3>
            <ul className="space-y-2">
              {substance.mentalRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Short-term */}
          <div className="card-elevated p-5 space-y-3">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Short-Term Risks
            </h3>
            <ul className="space-y-2">
              {substance.shortTermRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Long-term */}
          <div className="card-elevated p-5 space-y-3">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" /> Long-Term Risks
            </h3>
            <ul className="space-y-2">
              {substance.longTermRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dependency Potential */}
        <div className="card-elevated p-6 space-y-3">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary" /> Dependency Potential
          </h3>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${dependencyColors[substance.dependencyPotential]}`}>
              {dependencyLabels[substance.dependencyPotential]}
            </span>
            <span className="text-muted-foreground text-sm font-body">{substance.dependencyNote}</span>
          </div>
        </div>

        {/* Combination Risks */}
        <div className="card-elevated p-6 space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> High-Level Combination Risk Overview
          </h3>
          <p className="text-xs text-muted-foreground font-body italic">
            This is educational awareness only. No operational or procedural guidance is provided or implied.
          </p>
          <div className="grid gap-3">
            {substance.combinationRisks.map((risk, i) => (
              <div key={i} className={`p-3 rounded-lg border text-sm font-body ${combinationColors[risk.riskLevel]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <strong>{substance.name} + {risk.substance}</strong>
                  <span className="text-xs uppercase font-medium px-1.5 py-0.5 rounded bg-current/10 border border-current/20">
                    {risk.riskLevel}
                  </span>
                </div>
                <p className="opacity-90 text-xs">{risk.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Warnings */}
        <div className="emergency-box p-6 space-y-4">
          <h3 className="font-display font-semibold text-red-800 flex items-center gap-2 text-lg">
            <AlertCircle className="w-5 h-5 text-red-600" /> Emergency Warning Signs
          </h3>
          <p className="text-red-700 text-sm font-body">
            If any of the following occur, call emergency services immediately (Costa Rica: 911):
          </p>
          <ul className="space-y-2">
            {substance.emergencyWarnings.map((warning, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-800 font-body">
                <AlertCircle className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                {warning}
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-red-200">
            <Link
              to="/emergency"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-900 font-body"
            >
              View full emergency resources →
            </Link>
          </div>
        </div>

        {/* Legal Status */}
        <div className="card-elevated p-6 space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Legal Status Overview
          </h3>
          <p className="text-xs text-muted-foreground font-body italic mb-3">
            This information is for educational awareness only and does not constitute legal advice. Verify current laws with local authorities.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">Costa Rica</p>
              <p className="text-sm text-foreground/80 font-body leading-relaxed">{substance.legalStatusCR}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 font-body">Global Overview</p>
              <p className="text-sm text-foreground/80 font-body leading-relaxed">{substance.legalStatusGlobal}</p>
            </div>
          </div>
        </div>

        {/* Sources */}
        <SourceSection sources={substance.sources} />

        {/* Final disclaimer */}
        <Disclaimer />
      </div>
    </Layout>
  );
}
