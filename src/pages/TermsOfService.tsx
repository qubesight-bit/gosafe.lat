import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <Layout>
      <SEO title="Terms of Service — GoSafe.lat" description="Terms of Service for GoSafe.lat" path="/terms" />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-primary" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Terms of Service</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-6 font-body">Last updated: February 2025</p>

        <div className="prose prose-sm max-w-none space-y-6 font-body text-foreground/90">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing and using GoSafe.lat, you agree to be bound by these Terms of Service. If you do not agree, please do not use this platform.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">2. Educational Purpose</h2>
            <p>GoSafe.lat is an <strong>educational and informational platform only</strong>. All content is provided for harm reduction education and pharmacological awareness. This platform:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Does <strong>not</strong> provide medical advice, diagnosis, or treatment</li>
              <li>Does <strong>not</strong> replace consultation with licensed healthcare professionals</li>
              <li>Does <strong>not</strong> endorse, encourage, or facilitate the use of illegal substances</li>
              <li>Does <strong>not</strong> provide dosage instructions, preparation methods, or consumption guidance</li>
              <li>Does <strong>not</strong> guarantee the safety of any substance or combination</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">3. Information Sources</h2>
            <p>All information presented on GoSafe.lat is sourced exclusively from reputable governmental, academic, and established harm reduction organizations, including but not limited to: WHO, NIH, NIDA, CDC, EMA, IAFA CR, Isabel Healthcare, PsychonautWiki, and TripSit. Anecdotal or community-sourced data is clearly labeled as such.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">4. No Warranty</h2>
            <p>The information on GoSafe.lat is provided "as is" without warranty of any kind, express or implied. While we strive for accuracy, we make no guarantees about the completeness, reliability, or timeliness of any information. Drug interactions and medical knowledge evolve continuously.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Limitation of Liability</h2>
            <p>GoSafe.lat, QubeSight, and its contributors shall not be held liable for any damages, injuries, or adverse outcomes arising from the use or misuse of information presented on this platform. Users assume all risks associated with the use of this information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">6. User Responsibilities</h2>
            <p>By using this platform, you acknowledge and agree that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You will consult a qualified healthcare professional before making any medical decisions</li>
              <li>You will not rely solely on this platform for health-related decisions</li>
              <li>You are at least 18 years of age or have parental/guardian consent</li>
              <li>You understand that substance interaction data may be incomplete or evolving</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">7. Open-Source License</h2>
            <p>GoSafe.lat is released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MIT License</a>. You are free to use, modify, and distribute the source code in accordance with the license terms.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">8. Donations</h2>
            <p>Donations made through PayPal are voluntary and non-refundable. Donations support the maintenance and development of the platform and do not entitle donors to any special services or guarantees.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">9. Modifications</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">10. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through appropriate legal channels.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">11. Contact</h2>
            <p>For questions about these terms, mail us to: <a href="mailto:legal@gosafe.lat" className="text-primary hover:underline">legal@gosafe.lat</a>.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
