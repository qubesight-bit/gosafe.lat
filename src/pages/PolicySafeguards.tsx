import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Shield, AlertTriangle, FileText, Scale, Lock, Users, Globe, Ban } from 'lucide-react';

export default function PolicySafeguards() {
  return (
    <Layout>
      <SEO
        title="Policy & Safeguards — GoSafe.lat"
        description="International compliance, content safeguards, and no-facilitation policies for GoSafe.lat public health education platform."
        path="/policy"
      />

      <section className="section-hero text-primary-foreground py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-primary-foreground/80 text-sm font-body uppercase tracking-wide font-medium">Policy & Safeguards</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Policy & Safeguards</h1>
          <p className="text-primary-foreground/85 font-body text-lg max-w-2xl leading-relaxed">
            International compliance framework, content safeguards, and institutional alignment for the GoSafe.lat public health education platform.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* International Compliance */}
        <div className="card-elevated p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" /> A. International Compliance
          </h2>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">GoSafe.lat is a public health education platform that:</p>
          <ul className="space-y-2 text-sm text-foreground/80 font-body">
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Does not facilitate illicit drug use in any form.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Does not provide operational guidance for substance use, preparation, or administration.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Aligns its content with guidelines from WHO, NIH, NIDA, and IAFA Costa Rica.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Operates strictly within the scope of public health education and risk awareness.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Does not endorse, promote, or normalize the use of any controlled substance.</li>
          </ul>
        </div>

        {/* No Facilitation Clause */}
        <div className="card-elevated p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
            <Ban className="w-5 h-5 text-destructive" /> B. No Facilitation Clause
          </h2>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">GoSafe.lat explicitly does not provide:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Dosage information or ranges',
              'Consumption or administration instructions',
              'Routes of administration details',
              'Preparation methods or guides',
              'Law evasion or detection avoidance guidance',
              'Substance use optimization strategies',
              'Tolerance management instructions',
              'Enhancement or potentiation strategies',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-destructive/5 border border-destructive/15 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/80 font-body">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Review Process */}
        <div className="card-elevated p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> C. Content Review Process
          </h2>
          <ul className="space-y-2 text-sm text-foreground/80 font-body">
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />All third-party data (PsychonautWiki, TripSit, RxNav) is filtered through server-side validation before reaching users.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Restricted content categories (dosage, preparation, routes of administration, "safer use" instructions, tolerance management, enhancement strategies) are automatically excluded at the API ingestion layer.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />If restricted fields are detected in API responses, the ingestion is rejected before data reaches the client.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />High-risk entries undergo manual review for compliance with platform content policies.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Only substance classification, high-level effect descriptions, physical/mental health risks, toxicity warnings, dependency potential, and neutral legal classification are allowed.</li>
          </ul>
        </div>

        {/* Professional Referral Requirement */}
        <div className="card-elevated p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> D. Professional Referral Requirement
          </h2>
          <p className="text-sm text-foreground/80 font-body leading-relaxed">
            All tools on this platform are non-clinical and educational in nature. They do not provide medical advice, diagnosis, prescriptions, or treatment recommendations.
          </p>
          <p className="text-sm text-foreground/80 font-body leading-relaxed">
            Users are explicitly directed to consult licensed healthcare professionals for any medical decisions, medication changes, or health concerns. Every tool output includes a professional referral notice.
          </p>
        </div>

        {/* AI Behavior Constraints */}
        <div className="card-elevated p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" /> E. AI & Content Behavior Constraints
          </h2>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">The platform and all AI-assisted features are constrained to never:</p>
          <ul className="space-y-2 text-sm text-foreground/80 font-body">
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />Compare substances as "safer than" one another.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />Suggest substance substitution or alternatives.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />Provide behavioral guidance for substance use.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />Suggest how to reduce tolerance or optimize effects.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />Provide personalized recommendations or clinical inference.</li>
            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />Generate content that could be interpreted as endorsement or facilitation.</li>
          </ul>
          <p className="text-sm text-muted-foreground font-body leading-relaxed italic">
            If prompted for restricted content, the system returns a refusal and redirects the user to professional care resources.
          </p>
        </div>

        {/* Legal Status Neutrality */}
        <div className="card-elevated p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground text-xl flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" /> F. Legal Status Neutrality
          </h2>
          <p className="text-sm text-foreground/80 font-body leading-relaxed">
            All legal status information presented on this platform is neutral in tone. The platform does not compare enforcement intensity between jurisdictions or imply where a substance is "more permissible."
          </p>
          <p className="text-sm text-foreground/80 font-body leading-relaxed">
            Standard language used: "Legal status varies by jurisdiction" and "Subject to national and international regulation." Users are directed to consult local authorities for current legal status.
          </p>
        </div>

        {/* Institutional Independence */}
        <div className="bg-muted/50 border border-border rounded-lg p-5 flex items-start gap-3">
          <Shield className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <div className="text-sm text-muted-foreground font-body space-y-1">
            <p>
              <strong className="text-foreground">Institutional Independence:</strong> GoSafe.lat is an independent public health education platform. It is not affiliated with or endorsed by WHO, UNODC, NIH, or any governmental body. All data sources are cited and labeled by type (governmental, academic, community, anecdotal).
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="card-elevated p-6 space-y-3">
          <h2 className="font-display font-semibold text-foreground text-xl">Contact</h2>
          <p className="text-sm text-muted-foreground font-body">
            For policy inquiries, content concerns, or compliance questions: <a href="mailto:legal@gosafe.lat" className="text-primary hover:underline font-medium">legal@gosafe.lat</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
