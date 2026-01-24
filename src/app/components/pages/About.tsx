import { motion } from 'motion/react';
import { Shield, Target, Users, Zap, Globe, Heart } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We prioritize user safety with industry-leading encryption and data protection',
    },
    {
      icon: Target,
      title: 'Accuracy',
      description: 'Advanced AI algorithms deliver reliable scam detection with continuous improvement',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a global community of aware, educated, and protected users',
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Real-time analysis delivers instant protection against emerging threats',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving users worldwide with multilingual support and localized content',
    },
    {
      icon: Heart,
      title: 'Public Benefit',
      description: 'Mission-driven to make the internet safer for everyone, especially in India',
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
              About <span className="text-[#00d9ff]">ScamShield</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              ScamShield is an AI-powered cybersecurity platform dedicated to protecting users from digital scams and online fraud
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                We believe everyone deserves to use the internet safely. Our mission is to empower users with the knowledge and tools to identify, prevent, and report digital scams.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Through awareness, education, and cutting-edge technology, we're building a safer digital world—starting with India and expanding globally.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/20 rounded-xl p-12 border border-[#00d9ff]/30">
                <Shield className="w-24 h-24 text-[#00d9ff] mb-6" />
                <p className="text-gray-300 text-sm italic">
                  "Protection through awareness, safety through technology, trust through transparency"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-white mb-16"
          >
            Our Core <span className="text-[#00d9ff]">Values</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all hover:-translate-y-2"
                >
                  <Icon className="w-12 h-12 text-[#00d9ff] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8">
                <div className="text-4xl font-bold text-[#00d9ff] mb-2">1.2M+</div>
                <p className="text-gray-400">Scams Detected & Blocked</p>
              </div>
              <div className="p-8">
                <div className="text-4xl font-bold text-[#00ff41] mb-2">523K+</div>
                <p className="text-gray-400">Users Protected Worldwide</p>
              </div>
              <div className="p-8">
                <div className="text-4xl font-bold text-[#00d9ff] mb-2">99.2%</div>
                <p className="text-gray-400">Detection Accuracy Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Focus Section */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#00d9ff]/10 to-[#00ff41]/10 rounded-xl p-12 border border-[#00d9ff]/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Focused on India, Expanding Globally</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              India faces unique cybersecurity challenges with rapid digital adoption. We started here with localized content, support in Odia and English, and deep understanding of regional scam patterns.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our goal is to expand our protective reach globally while maintaining the quality and trustworthiness that users depend on.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
