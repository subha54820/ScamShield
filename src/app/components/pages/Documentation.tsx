import { motion } from 'motion/react';
import { BookOpen, Code, Shield, Zap, HelpCircle, Users } from 'lucide-react';

export function Documentation() {
  const guides = [
    {
      icon: Shield,
      title: 'Understanding Scam Scores',
      description: 'Learn how to interpret our risk scores and what each level means',
      topics: [
        'Score Range: 0-100 (Higher = More Suspicious)',
        'Green (0-30): Likely Safe',
        'Yellow (30-70): Requires Caution',
        'Red (70-100): High Scam Risk',
      ],
    },
    {
      icon: Code,
      title: 'Message Analysis',
      description: 'How ScamShield analyzes messages for scam indicators',
      topics: [
        'Keyword Pattern Matching',
        'Grammatical Anomalies Detection',
        'Urgency Language Analysis',
        'Financial Request Detection',
      ],
    },
    {
      icon: Zap,
      title: 'Link Checking',
      description: 'Get insights into how we verify and check URLs',
      topics: [
        'Domain Reputation Scoring',
        'SSL Certificate Validation',
        'Historical Threat Data',
        'Real-time Threat Feeds',
      ],
    },
    {
      icon: HelpCircle,
      title: 'Recommendations',
      description: 'Recommended actions based on analysis results',
      topics: [
        'Safe Messages: Share Freely',
        'Suspicious: Verify & Proceed with Caution',
        'High Risk: Do Not Click or Reply',
        'Report to Authorities: Critical Scams',
      ],
    },
  ];

  const apiGuide = [
    {
      endpoint: 'POST /api/analyze-message',
      description: 'Analyze a message for scam indicators',
      parameters: ['message (string)', 'language (string, optional)'],
      response: ['scam_score (number)', 'risk_level (string)', 'indicators (array)'],
    },
    {
      endpoint: 'POST /api/check-link',
      description: 'Analyze a URL for phishing/malware',
      parameters: ['url (string)', 'full_analysis (boolean, optional)'],
      response: ['threat_score (number)', 'threat_type (string)', 'details (object)'],
    },
    {
      endpoint: 'GET /api/scam-trends',
      description: 'Retrieve latest scam trends',
      parameters: ['region (string, optional)', 'period (string, optional)'],
      response: ['trends (array)', 'timestamp (string)', 'statistics (object)'],
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
            <BookOpen className="w-12 h-12 text-[#00d9ff] mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="text-[#00d9ff]">Documentation</span> & Guides
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete guides to understanding ScamShield's analysis, features, and API
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            How <span className="text-[#00d9ff]">ScamShield</span> Works
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all"
                >
                  <Icon className="w-8 h-8 text-[#00d9ff] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{guide.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{guide.description}</p>
                  <ul className="space-y-2">
                    {guide.topics.map((topic, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-[#00ff41]">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Getting Started</h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  step: 1,
                  title: 'Input Your Content',
                  description: 'Paste a message or URL into ScamShield for analysis',
                },
                {
                  step: 2,
                  title: 'Get Instant Analysis',
                  description: 'Our AI analyzes the content and provides a risk score',
                },
                {
                  step: 3,
                  title: 'Review Results',
                  description: 'Check the detailed breakdown and key indicators',
                },
                {
                  step: 4,
                  title: 'Take Action',
                  description: 'Follow our recommendations based on the risk level',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#00d9ff] to-[#00ff41]">
                      <span className="font-bold text-[#0a0e27]">{item.step}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scam Score Interpretation */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Scam Score <span className="text-[#00d9ff]">Levels</span>
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                range: '0-25',
                level: 'Safe',
                color: 'from-green-500/20 border-green-500/30',
                textColor: 'text-green-400',
                icon: '✓',
                description: 'Likely legitimate and safe to interact with',
              },
              {
                range: '25-50',
                level: 'Low Risk',
                color: 'from-blue-500/20 border-blue-500/30',
                textColor: 'text-blue-400',
                icon: '?',
                description: 'Some caution recommended',
              },
              {
                range: '50-75',
                level: 'Medium Risk',
                color: 'from-yellow-500/20 border-yellow-500/30',
                textColor: 'text-yellow-400',
                icon: '!',
                description: 'Exercise caution, verify first',
              },
              {
                range: '75-100',
                level: 'High Risk',
                color: 'from-red-500/20 border-red-500/30',
                textColor: 'text-red-400',
                icon: '✕',
                description: 'Likely a scam, do not interact',
              },
            ].map((score, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl bg-gradient-to-br ${score.color} border transition-all text-center`}
              >
                <div className={`text-4xl font-bold ${score.textColor} mb-2`}>{score.icon}</div>
                <div className={`text-2xl font-bold ${score.textColor} mb-1`}>{score.range}</div>
                <h3 className="text-lg font-bold text-white mb-3">{score.level}</h3>
                <p className="text-gray-300 text-sm">{score.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            API <span className="text-[#00d9ff]">Reference</span>
          </motion.h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            {apiGuide.map((api, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20"
              >
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#00d9ff]/20">
                  <Code className="w-6 h-6 text-[#00d9ff] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-mono font-bold text-[#00d9ff] mb-2">{api.endpoint}</h3>
                    <p className="text-gray-300">{api.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-white mb-3">Parameters</h4>
                    <ul className="space-y-2">
                      {api.parameters.map((param, idx) => (
                        <li key={idx} className="text-gray-400 text-sm font-mono">
                          <span className="text-[#00ff41]">{param.split(' ')[0]}</span>
                          <span className="text-gray-500"> {param.substring(param.indexOf(' '))}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-3">Response</h4>
                    <ul className="space-y-2">
                      {api.response.map((resp, idx) => (
                        <li key={idx} className="text-gray-400 text-sm font-mono">
                          <span className="text-[#00d9ff]">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Best <span className="text-[#00d9ff]">Practices</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20"
            >
              <h3 className="text-xl font-bold text-[#00d9ff] mb-6">Do's</h3>
              <ul className="space-y-3">
                {[
                  'Use ScamShield as part of your safety routine',
                  'Cross-reference warnings with trusted sources',
                  'Report actual scams to authorities',
                  'Keep your devices updated',
                  'Share ScamShield with friends and family',
                  'Review analysis results carefully',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="text-[#00ff41] font-bold flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-red-500/20"
            >
              <h3 className="text-xl font-bold text-red-400 mb-6">Don'ts</h3>
              <ul className="space-y-3">
                {[
                  'Rely solely on ScamShield for decisions',
                  'Click links before verifying legitimacy',
                  'Share personal info with unverified contacts',
                  'Ignore high-risk warnings',
                  'Use weak or reused passwords',
                  'Download files from suspicious links',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-400 font-bold flex-shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Users className="w-12 h-12 text-[#00d9ff] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">Need More Help?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Check our FAQ section for common questions, or reach out to our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/faq"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all hover:-translate-y-1"
              >
                View FAQ
              </a>
              <a
                href="/support"
                className="inline-block px-8 py-4 bg-[#00d9ff]/20 text-[#00d9ff] rounded-lg font-semibold border border-[#00d9ff]/50 hover:border-[#00d9ff] transition-all"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
