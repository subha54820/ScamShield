import React from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import './LegalPages.css';

export function Terms() {
  return (
    <div className="legal-page">
      {/* Header */}
      <motion.div
        className="legal-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="legal-header-content">
          <Shield className="w-10 h-10" />
          <h1>Terms & Conditions</h1>
          <p>Last updated: January 2025</p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="legal-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <section className="legal-section">
          <h2>1. Overview</h2>
          <p>
            ScamShield is an informational cybersecurity tool designed to help users identify
            potential scams and suspicious links. By using ScamShield, you acknowledge and agree to
            these terms and conditions.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Advisory Nature of Analysis</h2>
          <div className="disclaimer-box">
            <AlertCircle className="w-5 h-5" />
            <div>
              <h3>Important Disclaimer</h3>
              <p>
                Analysis results provided by ScamShield are <strong>advisory only</strong> and do
                not constitute legal, financial, or professional advice. Users should not rely
                solely on ScamShield results for making important decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>3. User Responsibility</h2>
          <p>
            Users are solely responsible for the final actions taken based on ScamShield analysis.
            ScamShield provides information to help you make informed decisions, but the decision
            and responsibility rest with the user.
          </p>
          <ul className="legal-list">
            <li>Verify information independently before taking action</li>
            <li>Consult qualified professionals for sensitive matters</li>
            <li>Use your own judgment when evaluating risks</li>
            <li>Report genuine scams to appropriate authorities</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Accuracy Limitations</h2>
          <div className="info-box">
            <CheckCircle2 className="w-5 h-5" />
            <div>
              <p>
                <strong>ScamShield does not guarantee 100% scam detection accuracy.</strong> While
                we continuously improve our detection algorithms:
              </p>
              <ul className="legal-list">
                <li>Some scams may not be detected (false negatives)</li>
                <li>Some legitimate content may be flagged (false positives)</li>
                <li>New scam methods may not be immediately recognized</li>
                <li>Detection depends on current threat databases and AI models</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>5. No Liability for Financial Loss</h2>
          <p>
            ScamShield shall not be liable for any financial losses, damages, or harm caused by:
          </p>
          <ul className="legal-list">
            <li>Scams that were not detected by the platform</li>
            <li>User actions taken despite warnings</li>
            <li>Third-party fraud or external scams</li>
            <li>Service interruptions or downtime</li>
            <li>Data breaches or unauthorized access</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Prohibited Activities</h2>
          <p>Users agree not to:</p>
          <ul className="legal-list">
            <li>Use ScamShield for malicious purposes</li>
            <li>Attempt to hack or bypass security measures</li>
            <li>Use the platform to harm other users or businesses</li>
            <li>Share false information as coming from ScamShield</li>
            <li>Reverse-engineer or copy ScamShield's detection algorithms</li>
            <li>Use the platform for illegal activities</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Service Modifications</h2>
          <p>
            ScamShield may update, modify, or discontinue services <strong>without prior notice</strong>.
            This includes:
          </p>
          <ul className="legal-list">
            <li>Changes to detection algorithms and accuracy</li>
            <li>Updates to features and functionality</li>
            <li>Modifications to terms and conditions</li>
            <li>Temporary or permanent service suspensions</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, ScamShield and its creators, contributors,
            and partners shall not be liable for any indirect, incidental, special, or consequential
            damages arising from your use of the platform.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by applicable laws. Any disputes will be resolved through
            mutual agreement or, if necessary, through appropriate legal channels.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Changes to These Terms</h2>
          <p>
            ScamShield reserves the right to modify these terms at any time. Continued use of the
            platform after modifications constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Contact Us</h2>
          <p>
            If you have questions about these terms, please contact us through our support form.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
