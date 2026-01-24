import { motion } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is ScamShield?',
          a: 'ScamShield is an AI-powered cybersecurity platform that analyzes messages and links to detect scams, phishing attempts, and other online threats. Our advanced algorithms scan for suspicious patterns and provide risk scores to help you make informed decisions online.',
        },
        {
          q: 'How does ScamShield work?',
          a: 'ScamShield uses machine learning models trained on millions of scam samples to identify patterns. It analyzes linguistic elements, URLs, sender behavior, and historical threat data to generate accurate risk assessments in real-time.',
        },
        {
          q: 'Is ScamShield free to use?',
          a: 'Yes! ScamShield is completely free for all users. We believe digital safety should be accessible to everyone. We may introduce premium features in the future, but core functionality will always remain free.',
        },
        {
          q: 'What languages does ScamShield support?',
          a: 'ScamShield currently supports English and Odia, with plans to expand to more Indian languages. We\'re committed to making digital safety accessible across language barriers.',
        },
      ],
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'How accurate is ScamShield\'s detection?',
          a: 'Our current models achieve 99.2% accuracy on test datasets. However, no system is 100% accurate. We continuously improve our models and appreciate user feedback on false positives/negatives to enhance accuracy.',
        },
        {
          q: 'Can I use ScamShield for APIs and integrations?',
          a: 'Yes! We offer API access for developers who want to integrate ScamShield into their applications. Check our API documentation for endpoint details and integration guides.',
        },
        {
          q: 'How fast is the analysis?',
          a: 'Most analyses complete in under 100ms. Our optimized infrastructure ensures instant feedback, allowing you to make quick decisions without delays.',
        },
        {
          q: 'What happens if I click a flagged link?',
          a: 'Clicking a flagged link doesn\'t automatically compromise your device. However, use caution and don\'t enter personal information. If you suspect you\'ve interacted with a scam, consider changing your passwords and monitoring your accounts.',
        },
      ],
    },
    {
      category: 'Safety & Privacy',
      questions: [
        {
          q: 'Is my data safe with ScamShield?',
          a: 'Yes. We use end-to-end encryption (TLS 1.3) for all transmissions and never store your personal information without consent. Our systems comply with GDPR and India\'s data protection standards.',
        },
        {
          q: 'Do you store my messages?',
          a: 'We process your messages to provide analysis but don\'t store them permanently. Messages are analyzed and deleted according to our privacy policy. You can review full details in our Privacy Policy.',
        },
        {
          q: 'Can I trust ScamShield with sensitive information?',
          a: 'ScamShield is designed for analysis only - never paste full credentials, bank details, or highly sensitive data. Use it to analyze suspicious messages/links, not to transmit sensitive information.',
        },
        {
          q: 'How do you protect against false positives?',
          a: 'We continuously refine our models based on user feedback and incorporate multiple analysis techniques. False positives are reported to our team and used to improve accuracy. Please report any false alarms!',
        },
      ],
    },
    {
      category: 'Scam Detection',
      questions: [
        {
          q: 'What types of scams can ScamShield detect?',
          a: 'We detect phishing, fake payment requests, romance scams, investment fraud, fake tech support, credential harvesting, malware distribution, lottery scams, and many more. Our database continuously updates as new scam types emerge.',
        },
        {
          q: 'How do I interpret the scam score?',
          a: 'Scores range from 0-100: Green (0-30) = Safe, Yellow (30-70) = Caution needed, Red (70-100) = High risk. These scores guide your decision-making but aren\'t absolute verdicts. Always exercise personal judgment.',
        },
        {
          q: 'Can ScamShield detect zero-day scams?',
          a: 'While we can\'t guarantee detection of completely novel attacks, our pattern-based approach often catches variations. New scams are rapidly added to our threat database as they\'re discovered and reported.',
        },
        {
          q: 'What should I do if I fall for a scam?',
          a: 'Act quickly: Change relevant passwords, contact your bank if money is involved, report to cyber authorities (like India\'s cyber cells), and register a complaint. Use ScamShield to identify further suspicious attempts.',
        },
      ],
    },
    {
      category: 'Limitations',
      questions: [
        {
          q: 'What are ScamShield\'s limitations?',
          a: 'No system is 100% accurate. Context matters - legitimate messages can appear suspicious and vice versa. ScamShield is a tool to supplement your judgment, not replace it. Always verify independently.',
        },
        {
          q: 'Can ScamShield guarantee 100% protection?',
          a: 'No. We achieve 99.2% accuracy, but determined attackers may find ways around our detection. That\'s why we recommend combining ScamShield with other security practices: strong passwords, 2FA, and critical thinking.',
        },
        {
          q: 'What if ScamShield flags a legitimate message?',
          a: 'False positives happen. If you believe a flagged message is legitimate, you can verify through official channels (contact the company directly using known contact info) and report the false positive to help us improve.',
        },
        {
          q: 'Does ScamShield protect against malware after clicking a link?',
          a: 'ScamShield detects malicious links but is just one layer of protection. Always maintain updated antivirus software, OS updates, and safe browsing habits. Don\'t rely solely on our analysis.',
        },
      ],
    },
    {
      category: 'Support',
      questions: [
        {
          q: 'How do I report a scam?',
          a: 'Use our "Report Scam" feature to submit suspicious messages/links. This helps us improve detection. For legal matters, report to official authorities like:  Indian Cyber Cell (cybercell.gov.in), RBI Fraud Helpline, or local police.',
        },
        {
          q: 'How do I report a false positive?',
          a: 'We value your feedback! Please visit our Support Center or email us at feedback@scamshield.com with details about the false positive. This helps us refine our algorithms.',
        },
        {
          q: 'Where can I find more help?',
          a: 'Check our Documentation for detailed guides, FAQ for common questions, or contact our Support Team. We\'re here to help you stay safe online!',
        },
        {
          q: 'Is there a community forum?',
          a: 'We\'re building our community! Follow us on social media for updates, tips, and scam awareness content. Join discussions and share experiences with other users.',
        },
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
            <HelpCircle className="w-12 h-12 text-[#00d9ff] mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked <span className="text-[#00d9ff]">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about ScamShield, how it works, and how to stay safe online
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      {faqs.map((section, sectionIndex) => (
        <section
          key={sectionIndex}
          className={sectionIndex % 2 === 0 ? '' : 'bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5'}
        >
          <div className="px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-12 text-center"
              >
                {section.category}
              </motion.h2>

              <div className="space-y-4">
                {section.questions.map((faq, qIndex) => {
                  const isOpen = openIndex === sectionIndex * 100 + qIndex;
                  return (
                    <motion.div
                      key={qIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: qIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <button
                        onClick={() =>
                          setOpenIndex(isOpen ? null : sectionIndex * 100 + qIndex)
                        }
                        className="w-full p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all text-left group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-bold text-white group-hover:text-[#00d9ff] transition-colors">
                            {faq.q}
                          </h3>
                          <ChevronDown
                            className={`w-6 h-6 text-[#00d9ff] flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </div>

                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-[#00d9ff]/20"
                          >
                            <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                          </motion.div>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Still Have Questions */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Still Have Questions?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/docs"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all hover:-translate-y-1"
              >
                Read Documentation
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
