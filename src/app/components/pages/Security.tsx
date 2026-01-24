import { motion } from 'motion/react';
import { Shield, Lock, RefreshCw, AlertCircle, CheckCircle, Eye } from 'lucide-react';

export function Security() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data transmissions use industry-standard TLS 1.3 encryption protocols to protect user information in transit.',
    },
    {
      icon: Shield,
      title: 'Multi-Factor Authentication',
      description: 'Secure account access with optional two-factor authentication (2FA) using authenticator apps or SMS verification.',
    },
    {
      icon: RefreshCw,
      title: 'Regular Security Updates',
      description: 'Continuous security patching and updates to address emerging vulnerabilities and threats in real-time.',
    },
    {
      icon: AlertCircle,
      title: 'Real-Time Threat Detection',
      description: 'AI-powered monitoring systems continuously scan for suspicious activity and unauthorized access attempts.',
    },
    {
      icon: CheckCircle,
      title: 'Data Integrity Verification',
      description: 'Cryptographic hashing and checksums ensure data accuracy and detect any unauthorized modifications.',
    },
    {
      icon: Eye,
      title: 'Security Auditing',
      description: 'Comprehensive logging of all system activities for compliance, investigation, and security analysis.',
    },
  ];

  const securityPractices = [
    {
      category: 'Data Protection',
      items: [
        'GDPR-compliant data handling',
        'Database encryption at rest (AES-256)',
        'Secure data deletion protocols',
        'Regular data backup with encryption',
        'Minimal data collection (only what\'s necessary)',
      ],
    },
    {
      category: 'Access Control',
      items: [
        'Role-based access control (RBAC)',
        'API key authentication with rate limiting',
        'IP whitelisting for admin access',
        'Session timeout after inactivity',
        'Secure password hashing (bcrypt + salt)',
      ],
    },
    {
      category: 'Infrastructure Security',
      items: [
        'Web Application Firewall (WAF)',
        'DDoS protection and mitigation',
        'Regular penetration testing',
        'Intrusion detection systems (IDS)',
        'Isolated database and application servers',
      ],
    },
    {
      category: 'Development & Deployment',
      items: [
        'Secure SDLC practices',
        'Code review and static analysis',
        'Dependency vulnerability scanning',
        'Security-first API design',
        'Continuous integration/deployment with security gates',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#131829] to-[#0a0e27] pt-24">
      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Security & <span className="text-[#00d9ff]">Privacy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade security measures protecting your data and ensuring your safety online
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Core Security <span className="text-[#00d9ff]">Features</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all group hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                >
                  <Icon className="w-8 h-8 text-[#00d9ff] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Security <span className="text-[#00d9ff]">Practices</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {securityPractices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20"
              >
                <h3 className="text-xl font-bold text-[#00d9ff] mb-6">{practice.category}</h3>
                <ul className="space-y-3">
                  {practice.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#00ff41] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Standards */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Compliance & <span className="text-[#00d9ff]">Standards</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'GDPR Compliant',
                  description: 'Full compliance with European General Data Protection Regulation',
                },
                {
                  title: 'ISO 27001 Standards',
                  description: 'Information security management system certification',
                },
                {
                  title: 'SOC 2 Compliance',
                  description: 'Service Organization Control audit compliance',
                },
                {
                  title: 'OWASP Top 10',
                  description: 'Protection against top 10 web application vulnerabilities',
                },
                {
                  title: 'Data Localization',
                  description: 'India-focused data storage with regulatory compliance',
                },
                {
                  title: '99.9% Uptime SLA',
                  description: 'Service Level Agreement ensuring platform availability',
                },
              ].map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00ff41]/20 hover:border-[#00ff41]/50 transition-all text-center"
                >
                  <CheckCircle className="w-8 h-8 text-[#00ff41] mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">{standard.title}</h3>
                  <p className="text-gray-400 text-sm">{standard.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Incident Response</h2>
            
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
              <h3 className="text-xl font-bold text-white mb-6">Responsible Disclosure Policy</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We take security vulnerabilities seriously. If you discover a security vulnerability in ScamShield, please report it responsibly by contacting <strong>security@scamshield.com</strong> instead of posting it publicly.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#00ff41] mt-1" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Immediate Response</h4>
                    <p className="text-gray-400">We'll acknowledge receipt within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#00ff41] mt-1" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Investigation</h4>
                    <p className="text-gray-400">Our team will investigate and confirm the vulnerability</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#00ff41] mt-1" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Resolution & Notification</h4>
                    <p className="text-gray-400">We'll patch the vulnerability and credit the discoverer</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm mt-8 border-t border-[#00d9ff]/20 pt-6">
                Please do not disclose the vulnerability to others until we've had time to address it. We appreciate your contribution to keeping ScamShield secure for all users.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Security Team */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Security Questions?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our security team for any inquiries about our security practices, infrastructure, or to report vulnerabilities
            </p>
            <a
              href="mailto:security@scamshield.com"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all hover:-translate-y-1"
            >
              Contact Security Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
