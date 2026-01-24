import { motion } from 'motion/react';
import { Briefcase, Users, Zap, Globe, Heart, ArrowRight } from 'lucide-react';

export function Careers() {
  const roles = [
    {
      title: 'AI/ML Engineer',
      category: 'Engineering',
      type: 'Full-time',
      description: 'Develop advanced machine learning models for scam detection algorithms.',
    },
    {
      title: 'Security Researcher',
      category: 'Security',
      type: 'Full-time',
      description: 'Research emerging threats and vulnerabilities in digital platforms.',
    },
    {
      title: 'Frontend Developer',
      category: 'Engineering',
      type: 'Full-time',
      description: 'Build intuitive user interfaces for our cybersecurity platform.',
    },
    {
      title: 'Backend Developer',
      category: 'Engineering',
      type: 'Full-time',
      description: 'Design scalable APIs and infrastructure for real-time scam detection.',
    },
    {
      title: 'Cybersecurity Analyst',
      category: 'Security',
      type: 'Full-time',
      description: 'Analyze security incidents and contribute to threat intelligence.',
    },
    {
      title: 'Internship Program',
      category: 'Internship',
      type: 'Summer 2026',
      description: 'Learn cybersecurity, ethical hacking, and contribute to real-world projects.',
    },
  ];

  const benefits = [
    { icon: Heart, title: 'Mission-Driven', description: 'Work on protecting millions from digital threats' },
    { icon: Globe, title: 'Remote-Friendly', description: 'Work from anywhere with flexible schedules' },
    { icon: Zap, title: 'Learning Culture', description: 'Continuous learning opportunities and certifications' },
    { icon: Users, title: 'Diverse Team', description: 'Work with talented security and tech professionals' },
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
              Join Our <span className="text-[#00d9ff]">Mission</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Be part of a mission-driven cybersecurity team protecting millions from digital scams
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Why Join <span className="text-[#00d9ff]">ScamShield</span>?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20"
                >
                  <Icon className="w-10 h-10 text-[#00d9ff] mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Open <span className="text-[#00d9ff]">Positions</span>
          </motion.h2>

          <div className="space-y-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl bg-gradient-to-r from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all group cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#00d9ff] transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-gray-400 mt-1">{role.description}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[#00d9ff] group-hover:translate-x-2 transition-transform flex-shrink-0 mt-1" />
                </div>
                <div className="flex gap-4 mt-4">
                  <span className="px-3 py-1 bg-[#00d9ff]/20 text-[#00d9ff] rounded-full text-sm font-medium">
                    {role.category}
                  </span>
                  <span className="px-3 py-1 bg-[#00ff41]/20 text-[#00ff41] rounded-full text-sm font-medium">
                    {role.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Opportunities */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Continuous Learning</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              We invest in our team's growth with:
            </p>
            <ul className="text-left max-w-2xl mx-auto space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00d9ff] rounded-full"></div>
                Cybersecurity certifications (CEH, OSCP, Security+)
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00d9ff] rounded-full"></div>
                Ethical hacking workshops and training
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00d9ff] rounded-full"></div>
                Conference attendance and networking
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00d9ff] rounded-full"></div>
                Mentorship from industry experts
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Make an Impact?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Send us your resume and tell us why you want to join ScamShield
            </p>
            <a
              href="mailto:careers@scamshield.com"
              className="inline-block px-12 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all hover:-translate-y-1"
            >
              Apply Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
