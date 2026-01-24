import { motion } from 'motion/react';
import { AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';

export function Disclaimer() {
  const disclaimerSections = [
    {
      icon: Info,
      title: 'Informational Purpose Only',
      content: [
        'ScamShield provides analytical insights and recommendations based on AI analysis of messages and links',
        'Our analysis should be used as a tool for awareness, not as a definitive legal or technical judgment',
        'Always exercise personal judgment and verify information through multiple sources',
        'We do not provide official legal, financial, or professional advice',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'No Guarantee of Accuracy',
      content: [
        'While our AI models are trained on extensive datasets, no system achieves 100% accuracy',
        'False positives and false negatives may occur',
        'Legitimate messages may be flagged, and actual scams may occasionally pass detection',
        'Users should not make final decisions based solely on our scam scores',
      ],
    },
    {
      icon: AlertCircle,
      title: 'User Responsibility',
      content: [
        'Users are responsible for verifying suspicious links before clicking',
        'Users must not rely exclusively on ScamShield for cybersecurity decisions',
        'Always maintain independent judgment about messages and links',
        'Consider consulting official sources before responding to alerts',
      ],
    },
  ];

  const limitations = [
    {
      title: 'Detection Limitations',
      items: [
        'New scam patterns may not be immediately recognized',
        'Highly sophisticated attacks may bypass detection',
        'Language-specific variations may affect accuracy',
        'Rapidly evolving threats are continuously being added to our database',
      ],
    },
    {
      title: 'Data Limitations',
      items: [
        'Analysis is based on publicly available threat intelligence',
        'Regional scam patterns may differ from our training data',
        'Context-specific threats may not be captured by our models',
        'Limited information (short messages) may affect accuracy',
      ],
    },
    {
      title: 'Technical Limitations',
      items: [
        'System availability may be interrupted for maintenance',
        'API rate limits apply to all users',
        'Offline messages cannot be analyzed in real-time',
        'Network connectivity issues may affect service delivery',
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
              Legal <span className="text-[#00d9ff]">Disclaimer</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Important information about ScamShield's capabilities, limitations, and user responsibilities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="px-6 py-20 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-y border-red-500/20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl bg-red-500/5 border border-red-500/30 flex gap-4"
          >
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white mb-2">Important Notice</h3>
              <p className="text-gray-300">
                ScamShield is an <strong>informational tool only</strong>. It is not a substitute for legal advice, financial guidance, or professional security consultancy. Users are responsible for all decisions made based on ScamShield's analysis.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Disclaimer Sections */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Key <span className="text-[#00d9ff]">Disclaimers</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {disclaimerSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-orange-500/20 hover:border-orange-500/50 transition-all"
                >
                  <Icon className="w-8 h-8 text-orange-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-[#00d9ff] flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Limitations */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            System <span className="text-[#00d9ff]">Limitations</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {limitations.map((limitation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20"
              >
                <h3 className="text-xl font-bold text-[#00d9ff] mb-6">{limitation.title}</h3>
                <ul className="space-y-3">
                  {limitation.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <span className="text-[#00ff41] flex-shrink-0 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Liability & User Agreement */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Liability & User <span className="text-[#00d9ff]">Agreement</span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-[#00d9ff] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">No Liability for Decisions</h3>
                    <p className="text-gray-300">
                      ScamShield and its developers are not liable for any decisions, actions, or consequences resulting from reliance on our analysis. Users make all decisions at their own discretion and risk.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-[#00d9ff] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Verification Required</h3>
                    <p className="text-gray-300">
                      Always verify warnings independently before taking action. If a link is flagged as suspicious, verify through official channels before dismissing it as a scam.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-[#00d9ff] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Third-Party Content</h3>
                    <p className="text-gray-300">
                      ScamShield is not responsible for content analysis accuracy, third-party links, or damage resulting from following flagged links. Always exercise caution online.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-[#00d9ff] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Service Availability</h3>
                    <p className="text-gray-300">
                      We make no guarantees about uninterrupted service availability. ScamShield is provided "as is" without warranties of any kind, express or implied.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Recommended Best Practices</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00ff41]/20">
                <h3 className="text-xl font-bold text-[#00ff41] mb-6">For Your Safety</h3>
                <ul className="space-y-3">
                  {[
                    'Never click suspicious links immediately',
                    'Verify URLs before entering credentials',
                    'Use strong, unique passwords',
                    'Enable two-factor authentication',
                    'Keep software and apps updated',
                    'Report actual scams to authorities',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#00ff41] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00ff41]/20">
                <h3 className="text-xl font-bold text-[#00ff41] mb-6">Using ScamShield</h3>
                <ul className="space-y-3">
                  {[
                    'Use as a supplementary security tool',
                    'Cross-check warnings with other sources',
                    'Consider message context and sender',
                    'Report false positives to us',
                    'Stay informed about current scams',
                    'Share knowledge with friends & family',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#00ff41] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Questions About Our Disclaimer?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We're committed to transparency and clarity about our limitations and capabilities
            </p>
            <a
              href="mailto:legal@scamshield.com"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all hover:-translate-y-1"
            >
              Contact Legal Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
