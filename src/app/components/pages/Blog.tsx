import { motion } from 'motion/react';
import { Calendar, ArrowRight, Newspaper, TrendingUp, Shield } from 'lucide-react';

export function Blog() {
  const articles = [
    {
      icon: TrendingUp,
      title: 'Latest Scam Trends in 2026',
      excerpt: 'Discover the emerging phishing techniques and social engineering tactics used by fraudsters this year.',
      date: 'Jan 24, 2026',
      category: 'Trends',
    },
    {
      icon: Shield,
      title: '10 Ways to Protect Your Personal Information',
      excerpt: 'Essential security practices everyone should know to safeguard their digital identity.',
      date: 'Jan 20, 2026',
      category: 'Safety Tips',
    },
    {
      icon: Newspaper,
      title: 'Understanding OTP Scams & How to Avoid Them',
      excerpt: 'Learn how scammers exploit OTP systems and what you can do to stay safe.',
      date: 'Jan 15, 2026',
      category: 'Education',
    },
    {
      icon: TrendingUp,
      title: 'E-commerce Fraud Prevention Guide',
      excerpt: 'Protect yourself while shopping online with our comprehensive fraud prevention guide.',
      date: 'Jan 10, 2026',
      category: 'Trends',
    },
    {
      icon: Shield,
      title: 'Cybersecurity Awareness for Small Businesses',
      excerpt: 'SMEs guide to implementing cost-effective security measures against digital threats.',
      date: 'Jan 5, 2026',
      category: 'Business',
    },
    {
      icon: Newspaper,
      title: 'Banking Scams: Recognition & Response',
      excerpt: 'How to identify banking scams and take immediate action to protect your accounts.',
      date: 'Dec 28, 2025',
      category: 'Education',
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
              ScamShield <span className="text-[#00d9ff]">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn, identify, and stay protected. Discover the latest trends, security tips, and cybersecurity awareness content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => {
              const Icon = article.icon;
              return (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all hover:-translate-y-2 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-10 h-10 text-[#00d9ff]" />
                    <span className="text-xs px-3 py-1 bg-[#00d9ff]/20 text-[#00d9ff] rounded-full">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d9ff] transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#00d9ff]/10">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#00d9ff] group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly security tips, scam awareness, and cybersecurity insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-[#131829] border border-[#00d9ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d9ff]"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
