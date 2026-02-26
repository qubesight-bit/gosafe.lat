import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO title="Privacy Policy — GoSafe.lat" description="Privacy Policy for GoSafe.lat" path="/privacy" />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-6 font-body">Last updated: February 2025</p>

        <div className="prose prose-sm max-w-none space-y-6 font-body text-foreground/90">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>GoSafe.lat ("we", "us", "our") is an open-source, educational harm reduction platform operated by QubeSight. This Privacy Policy explains how we handle information when you use our website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <p>GoSafe.lat is designed with privacy in mind. We do <strong>not</strong>:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Require user accounts or registration</li>
              <li>Collect personally identifiable information (PII)</li>
              <li>Track individual users across sessions</li>
              <li>Sell or share any data with third parties</li>
              <li>Use advertising trackers or analytics that identify individuals</li>
            </ul>
            <p className="mt-3">We may collect anonymous, aggregated usage data (e.g., page views, general geographic region) solely to improve the platform's functionality and content.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">3. Cookies &amp; Local Storage</h2>
            <p>We use minimal browser storage (sessionStorage) exclusively for functional purposes, such as remembering your disclaimer acknowledgment during a browsing session. No tracking cookies are used.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">4. Third-Party Services</h2>
            <p>Our platform references data from reputable third-party sources (WHO, NIH, CDC, EMA, etc.). When you click external links, those websites have their own privacy policies. We also use PayPal for donations, which is subject to PayPal's privacy policy.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Data Security</h2>
            <p>Since we do not collect personal data, there is minimal risk of data breaches affecting our users. Our platform is served over HTTPS to ensure secure connections.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">6. Children's Privacy</h2>
            <p>GoSafe.lat is intended for educational use by adults. We do not knowingly collect information from individuals under 18 years of age.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">8. Contact</h2>
            <p>For questions about this policy, visit <a href="https://qubesight.lat" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">qubesight.lat</a>.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
