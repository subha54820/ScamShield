import { motion } from 'motion/react';
import { Mail, MessageSquare, AlertCircle, Users, Phone, MapPin, ArrowRight } from 'lucide-react';

export function SupportCenter() {
  const supportChannels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us your questions or concerns',
      contact: 'support@scamshield.com',
      responseTime: '24-48 hours',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available on website',
      responseTime: 'Instant',
    },
    {
      icon: AlertCircle,
      title: 'Report Issues',
      description: 'Report bugs, scams, or false positives',
      contact: 'feedback@scamshield.com',
      responseTime: '24 hours',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call our support team',
      contact: '+91-1800-SCAMSHIELD',
      responseTime: 'Business Hours',
    },
  ];

  const supportCategories = [
    {
      icon: MessageSquare,
      title: 'General Support',
      description: 'Questions about ScamShield features and usage',
      items: [
        'How to use the platform',
        'Feature explanations',
        'Account management',
        'General inquiries',
      ],
    },
    {
      icon: MessageSquare,
      title: 'Report a Scam',
      description: 'Help us identify new scams and threats',
      items: [
        'Submit suspicious messages',
        'Report phishing links',
        'Share scam experiences',
        'Contribute to our database',
      ],
    },
    {
      icon: AlertCircle,
      title: 'Report False Positives',
      description: 'Tell us if we incorrectly flagged something',
      items: [
        'Legitimate messages flagged as scams',
        'Legitimate links flagged as malicious',
        'Accuracy concerns',
        'Algorithm feedback',
      ],
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with other ScamShield users',
      items: [
        'Community forums',
        'User discussions',
        'Share tips and experiences',
        'Learn from others',
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
              Support <span className="text-[#00d9ff]">Center</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get help from our team, report issues, or connect with the ScamShield community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Contact <span className="text-[#00d9ff]">Us</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={index}
                  href={`mailto:${channel.contact}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all group hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                >
                  <Icon className="w-8 h-8 text-[#00d9ff] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">{channel.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{channel.description}</p>
                  <p className="text-[#00ff41] text-sm font-mono mb-2">{channel.contact}</p>
                  <p className="text-gray-500 text-xs">{channel.responseTime} response</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            How Can We <span className="text-[#00d9ff]">Help?</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {supportCategories.map((category, index) => {
              const Icon = category.icon;
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
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{category.description}</p>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41]"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Quick <span className="text-[#00d9ff]">Links</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: 'Documentation',
                description: 'Learn how to use ScamShield',
                link: '/docs',
                icon: '📚',
              },
              {
                title: 'FAQ',
                description: 'Find answers to common questions',
                link: '/faq',
                icon: '❓',
              },
              {
                title: 'Blog',
                description: 'Read about scams and security tips',
                link: '/blog',
                icon: '📝',
              },
              {
                title: 'Security',
                description: 'Learn about our security practices',
                link: '/security',
                icon: '🔒',
              },
              {
                title: 'Privacy Policy',
                description: 'Understand how we handle your data',
                link: '/privacy',
                icon: '🛡️',
              },
              {
                title: 'Terms & Conditions',
                description: 'Review our terms of service',
                link: '/terms',
                icon: '📋',
              },
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all group hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
              >
                <div className="text-3xl mb-3">{link.icon}</div>
                <h3 className="font-bold text-white mb-2 group-hover:text-[#00d9ff] transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-400 text-sm">{link.description}</p>
                <div className="mt-4 flex items-center gap-2 text-[#00d9ff] text-sm group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting Guidelines */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Reporting <span className="text-[#00d9ff]">Guidelines</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                <h3 className="text-xl font-bold text-white mb-6">When Reporting a Scam</h3>
                <ol className="space-y-4">
                  {[
                    'Provide the suspicious message or link',
                    'Include screenshots if possible',
                    'Mention the sender (if you know them)',
                    'Describe why you think it\'s a scam',
                    'Let us know if you interacted with it',
                  ].map((step, idx) => (
                    <li key={idx} className="flex gap-4 text-gray-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00d9ff]/20 flex items-center justify-center text-[#00d9ff] font-bold text-sm">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                <h3 className="text-xl font-bold text-white mb-6">When Reporting a False Positive</h3>
                <ol className="space-y-4">
                  {[
                    'Copy the flagged message or link',
                    'Explain why you believe it\'s legitimate',
                    'Provide sender details if helpful',
                    'Mention what score was assigned',
                    'Describe any context we should know',
                  ].map((step, idx) => (
                    <li key={idx} className="flex gap-4 text-gray-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00d9ff]/20 flex items-center justify-center text-[#00d9ff] font-bold text-sm">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-12 rounded-2xl bg-gradient-to-r from-[#00d9ff]/10 to-[#00ff41]/10 border border-[#00d9ff]/30 text-center"
          >
            <Users className="w-12 h-12 text-[#00d9ff] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with other ScamShield users, share experiences, learn about emerging threats, and help make the internet safer for everyone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/scamshield"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] text-white rounded-lg font-semibold hover:bg-[#4752C4] transition-all"
              >
                Join Discord Community
              </a>
              <a
                href="https://twitter.com/scamshield"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1DA1F2] text-white rounded-lg font-semibold hover:bg-[#1a91da] transition-all"
              >
                Follow on Twitter
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <Mail className="w-8 h-8 text-[#00d9ff] mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">General Inquiries</h3>
              <a href="mailto:contact@scamshield.com" className="text-gray-300 hover:text-[#00d9ff]">
                contact@scamshield.com
              </a>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 text-[#00d9ff] mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Support</h3>
              <a href="tel:+918001800111" className="text-gray-300 hover:text-[#00d9ff]">
                +91-800-SCAMSHIELD
              </a>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-[#00d9ff] mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Location</h3>
              <p className="text-gray-300">India (Remote First)</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
