import React from 'react';
import { motion } from 'motion/react';
import { Lock, Database, Users, FileText } from 'lucide-react';
import './LegalPages.css';

export function PrivacyPolicy() {
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
          <Lock className="w-10 h-10" />
          <h1>Privacy Policy</h1>
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
          <h2>Overview</h2>
          <p>
            ScamShield is committed to protecting your privacy. This Privacy Policy explains how
            we collect, use, and protect your personal information when you use our platform.
          </p>
        </section>

        <section className="legal-section">
          <div className="section-header">
            <Database className="w-5 h-5" />
            <h2>1. Data We Collect</h2>
          </div>

          <h3>Phone Number</h3>
          <p>
            We collect your phone number for OTP-based authentication. This ensures secure access
            to your account without requiring complex passwords.
          </p>

          <h3>Messages & Links for Analysis</h3>
          <p>
            When you submit messages or links for scam analysis, we receive:
          </p>
          <ul className="legal-list">
            <li>The content of the message or URL</li>
            <li>Timestamp of submission</li>
            <li>Analysis results generated</li>
          </ul>

          <h3>Device & Usage Data</h3>
          <p>
            We collect basic analytics to improve our service:
          </p>
          <ul className="legal-list">
            <li>Device type and browser information</li>
            <li>Pages visited and features used</li>
            <li>Time spent on the platform</li>
            <li>General location (country/region only, not precise)</li>
          </ul>
        </section>

        <section className="legal-section">
          <div className="section-header">
            <FileText className="w-5 h-5" />
            <h2>2. How We Use Your Data</h2>
          </div>

          <h3>To Analyze Scam Risk</h3>
          <p>
            Your submitted messages and links are analyzed using our AI detection algorithms to
            identify potential scams, phishing attempts, and fraudulent content.
          </p>

          <h3>To Improve Detection Accuracy</h3>
          <p>
            We use aggregated, anonymized data to improve our detection models. This includes:
          </p>
          <ul className="legal-list">
            <li>Identifying new scam patterns</li>
            <li>Refining AI algorithms</li>
            <li>Testing detection accuracy</li>
            <li>Training new security features</li>
          </ul>

          <h3>To Provide Safety Recommendations</h3>
          <p>
            We use your data to generate personalized safety tips and recommendations based on
            your usage patterns and the types of threats you encounter.
          </p>

          <h3>To Comply with Legal Requirements</h3>
          <p>
            We may disclose information if required by law or to protect against fraud and security
            threats.
          </p>
        </section>

        <section className="legal-section">
          <div className="section-header">
            <Lock className="w-5 h-5" />
            <h2>3. Data Protection</h2>
          </div>

          <h3>No Data Selling or Sharing</h3>
          <p>
            <strong>We do not sell, trade, or share your personal data with third parties</strong> for
            marketing or commercial purposes.
          </p>

          <h3>Encryption in Transit</h3>
          <p>
            All data transmitted to ScamShield is encrypted using HTTPS/TLS protocols to prevent
            unauthorized interception.
          </p>

          <h3>Limited Data Retention</h3>
          <p>
            We follow these retention policies:
          </p>
          <ul className="legal-list">
            <li>OTP codes: Deleted immediately after use (30 seconds)</li>
            <li>Phone numbers: Retained for account access only</li>
            <li>Analysis submissions: Stored for 90 days max, then anonymized</li>
            <li>Usage analytics: Aggregated and retained for 1 year</li>
          </ul>

          <h3>No Permanent Storage of Sensitive Details</h3>
          <p>
            We do not permanently store OTP codes, passwords, or sensitive financial information.
            These are either discarded immediately or securely deleted.
          </p>
        </section>

        <section className="legal-section">
          <div className="section-header">
            <Users className="w-5 h-5" />
            <h2>4. Your Privacy Rights</h2>
          </div>

          <h3>Right to Data Access</h3>
          <p>
            You have the right to request what personal data we hold about you and how it's being
            used.
          </p>

          <h3>Right to Data Deletion</h3>
          <p>
            You can request complete deletion of your account and associated data. Upon deletion:
          </p>
          <ul className="legal-list">
            <li>Account information is permanently removed</li>
            <li>Phone number is deleted</li>
            <li>Analysis history is anonymized</li>
            <li>Usage data is discarded</li>
          </ul>

          <h3>Right to Anonymity</h3>
          <p>
            You can use ScamShield for analysis without logging in. This allows you to:
          </p>
          <ul className="legal-list">
            <li>Check links and messages without registration</li>
            <li>Receive instant analysis results</li>
            <li>Maintain complete anonymity</li>
            <li>Get safety recommendations without account creation</li>
          </ul>

          <h3>Right to Object</h3>
          <p>
            You can object to specific uses of your data. Contact us with details of your request.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Third-Party Services</h2>

          <h3>SMS Gateway for OTP</h3>
          <p>
            We use third-party SMS providers to deliver OTP codes. These providers:
          </p>
          <ul className="legal-list">
            <li>Do not store phone numbers permanently</li>
            <li>Are contractually bound to protect your data</li>
            <li>Cannot access your account or analysis data</li>
          </ul>

          <h3>Analytics Tools</h3>
          <p>
            We use non-personal analytics tools to understand how our platform is used. This data:
          </p>
          <ul className="legal-list">
            <li>Is aggregated and anonymized</li>
            <li>Does not identify individual users</li>
            <li>Is used only for platform improvement</li>
            <li>Is never sold to third parties</li>
          </ul>

          <h3>No Tracking Cookies</h3>
          <p>
            ScamShield does not use tracking cookies or third-party trackers for advertising.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Children's Privacy</h2>
          <p>
            ScamShield is not intended for children under 13 years old. We do not knowingly collect
            personal information from children. Parents who believe their child's data was collected
            should contact us immediately.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Policy Updates</h2>
          <p>
            We may update this Privacy Policy for security reasons, legal compliance, or platform
            improvements. Updates will be notified through:
          </p>
          <ul className="legal-list">
            <li>Website notifications</li>
            <li>Email (for registered users)</li>
            <li>Updated "Last Modified" date on this page</li>
          </ul>
          <p>
            Continued use of ScamShield after updates constitutes acceptance of the new policy.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. International Data Transfers</h2>
          <p>
            If you access ScamShield from outside your country of residence, your data may be
            transferred internationally. By using our platform, you consent to this transfer.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Security Measures</h2>
          <p>We implement industry-standard security measures including:</p>
          <ul className="legal-list">
            <li>HTTPS/TLS encryption</li>
            <li>Secure authentication protocols</li>
            <li>Regular security audits</li>
            <li>Data access controls</li>
            <li>Encrypted data storage</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>10. Contact Us for Privacy Concerns</h2>
          <p>
            If you have questions about your privacy or want to exercise your data rights, please
            use our contact form to reach our support team. We will respond within 7 business days.
          </p>
        </section>

        <section className="legal-section legal-section-last">
          <div className="privacy-commitment">
            <p>
              <strong>Your privacy matters to us.</strong> We are committed to transparent data
              practices and giving you control over your personal information.
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
