import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { AlertTriangle, Phone } from 'lucide-react';
import { globalEmergencyContacts } from '@/data/emergency-contacts';

const LegalDisclaimer = () => {
  return (
    <Layout>
      <SEO title="Legal Disclaimer — GoSafe.lat" description="Legal Disclaimer for GoSafe.lat" path="/legal" />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="w-8 h-8 text-primary" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Legal Disclaimer</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-6 font-body">Last updated: February 2025</p>

        <div className="prose prose-sm max-w-none space-y-6 font-body text-foreground/90">
          <section className="bg-accent-muted border border-amber-200 rounded-xl p-5">
            <h2 className="font-display text-xl font-semibold text-foreground mt-0">⚠️ Important Notice</h2>
            <p className="mb-0">GoSafe.lat is an <strong>educational platform only</strong>. Nothing on this website constitutes medical advice, diagnosis, prescription, treatment recommendation, or encouragement of any activity. Always seek the guidance of a qualified healthcare provider with any questions you may have regarding a medical condition or substance interaction.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Not Medical Advice</h2>
            <p>The content on GoSafe.lat is compiled from publicly available governmental and academic sources for educational and harm reduction purposes. This information is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Never disregard professional medical advice or delay seeking it because of something you have read on this platform.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">No Endorsement of Substance Use</h2>
            <p>GoSafe.lat does not endorse, promote, encourage, or facilitate the use of any controlled or uncontrolled substance. Information about substances and their interactions is provided solely in the context of public health education and harm reduction, aligned with the principles of organizations such as the World Health Organization (WHO) and the National Institute on Drug Abuse (NIDA).</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Accuracy &amp; Completeness</h2>
            <p>While we make every effort to ensure the accuracy and currency of information, pharmacological science is constantly evolving. We cannot guarantee that all information is complete, current, or error-free. Drug interaction data may not cover all possible combinations, dosages, or individual physiological responses.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Anecdotal Data Disclosure</h2>
            <p>Some content on this platform is sourced from community-based harm reduction organizations (e.g., PsychonautWiki, TripSit, Erowid). Such content is clearly labeled as anecdotal or community-sourced and should not be treated as clinical or scientific evidence.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Limitation of Liability</h2>
            <p>Under no circumstances shall GoSafe.lat, QubeSight, or any of its contributors, developers, or affiliates be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your use of this platform, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal injury or death</li>
              <li>Adverse drug reactions or interactions</li>
              <li>Misinterpretation of educational content</li>
              <li>Decisions made based on information provided on this platform</li>
              <li>Any illegal activity undertaken by users</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Third-Party Links</h2>
            <p>This platform contains links to external websites operated by governmental bodies, academic institutions, and other organizations. We are not responsible for the content, privacy practices, or policies of these external sites.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Emergency Situations</h2>
            <p>If you or someone you know is experiencing a medical emergency, <strong>call your local emergency number immediately</strong>. Do not rely on this platform for emergency guidance.</p>
            <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-4 h-4 text-destructive" />
                <h3 className="font-display font-semibold text-foreground text-sm">Global Emergency Numbers</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {globalEmergencyContacts.map(({ country, emoji, number }) => (
                  <div key={country} className="flex items-center justify-between gap-2 text-sm py-1 px-2 rounded-md bg-background/50">
                    <span className="text-foreground/80 font-body">{emoji} {country}</span>
                    <span className="font-bold text-foreground font-body shrink-0">{number}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Indemnification</h2>
            <p>By using GoSafe.lat, you agree to indemnify and hold harmless GoSafe.lat, QubeSight, and all associated parties from any claims, damages, losses, or expenses arising from your use of the platform or violation of these terms.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
            <p>For legal inquiries, mail us to: <a href="mailto:legal@gosafe.lat" className="text-primary hover:underline">legal@gosafe.lat</a>.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LegalDisclaimer;
