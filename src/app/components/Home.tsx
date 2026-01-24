import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Brain, Zap, CheckCircle, MessageSquare, Link as LinkIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AIIntro } from './AIIntro';

export function Home() {
  const [stats, setStats] = useState({ scams: 0, users: 0, links: 0 });
  const [userData, setUserData] = useState<{ fullName?: string; username?: string } | null>(null);
  const [showAIIntro, setShowAIIntro] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
    
    // Check if AIIntro should be shown
    const aiIntroShown = sessionStorage.getItem('aiIntroShown');
    if (!aiIntroShown) {
      setShowAIIntro(true);
    }
  }, []);

  useEffect(() => {
    // Animate counters
    const targets = { scams: 1247893, users: 523456, links: 2891023 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        scams: Math.floor(targets.scams * progress),
        users: Math.floor(targets.users * progress),
        links: Math.floor(targets.links * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const displayName = userData?.fullName || userData?.username || 'User';

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze patterns to identify scams instantly',
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description: 'Get immediate results on suspicious messages and links within seconds',
    },
    {
      icon: CheckCircle,
      title: 'Trusted Protection',
      description: 'Join thousands of users protected by our cutting-edge security technology',
    },
  ];

  return (
    <>
      {/* AI Intro Overlay - shown on top of everything with backdrop */}
      {showAIIntro && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          <AIIntro 
            onComplete={() => {
              setShowAIIntro(false);
              sessionStorage.setItem('aiIntroShown', 'true');
            }} 
          />
        </div>
      )}
      
      {/* Main Home Page Content - visible with nav and footer */}
      <div className={`min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#131829] to-[#0a0e27] ${showAIIntro ? 'blur-sm' : ''}`}>
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,217,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,217,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        {/* Glow Effects */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00d9ff]/10 blur-3xl rounded-full opacity-20"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-[#00ff41]/10 blur-3xl rounded-full opacity-20"></div>

        <div className="relative z-10 max-w-screen-xl w-full mx-auto text-center">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-lg"
          >
            <p className="text-gray-300">
              Welcome back, <span className="font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff41] bg-clip-text text-transparent">{displayName}</span>! 👋
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
              Protect Yourself
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] via-[#00ff41] to-[#00d9ff] drop-shadow-[0_0_30px_rgba(0,217,255,0.5)] animate-pulse">
                from Scams
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-2xl mx-auto font-light">
              Real-time scam detection for messages and links. Stay safe online.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <Link
              to="/message-analyzer"
              className="px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00a3cc] text-[#0a0e27] rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 font-semibold text-lg"
            >
              <MessageSquare className="w-6 h-6" />
              Analyze Message
            </Link>
            <Link
              to="/link-checker"
              className="px-8 py-4 bg-gradient-to-r from-[#00ff41] to-[#00cc34] text-[#0a0e27] rounded-lg hover:shadow-[0_0_30px_rgba(0,255,65,0.6)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 font-semibold text-lg"
            >
              <LinkIcon className="w-6 h-6" />
              Check Link
            </Link>
          </motion.div>

          {/* Cyber Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-md mx-auto"
          >
            <div className="relative">
              <Shield className="w-64 h-64 mx-auto text-[#00d9ff] opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/30 to-[#00ff41]/30 blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,217,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,217,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        <div className="max-w-screen-xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-[#00d9ff]">ScamShield</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powered by advanced AI and machine learning to keep you safe from digital threats
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)] hover:-translate-y-2"
                >
                  <div className="w-16 h-16 mb-6 rounded-lg bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/20 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                    <Icon className="w-8 h-8 text-[#00d9ff]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5 border-y border-[#00d9ff]/10">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#00ff41] mb-2">
                {stats.scams.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-lg font-medium">Scams Detected</div>
              <div className="text-gray-500 text-sm mt-2">Threats blocked daily</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#00ff41] mb-2">
                {stats.users.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-lg font-medium">Users Protected</div>
              <div className="text-gray-500 text-sm mt-2">Trusted worldwide</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#00ff41] mb-2">
                {stats.links.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-lg font-medium">Links Verified</div>
              <div className="text-gray-500 text-sm mt-2">Safety checked</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,217,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,217,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        <div className="max-w-screen-xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Stay <span className="text-[#00d9ff]">Safe</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Analyze your messages and links instantly. No sign-up required to get started.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/message-analyzer"
                className="px-10 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00a3cc] text-[#0a0e27] rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all duration-300 hover:-translate-y-1 font-semibold text-lg"
              >
                Start Analyzing
              </Link>
              <Link
                to="/report"
                className="px-10 py-4 border-2 border-[#00d9ff] text-[#00d9ff] rounded-lg hover:bg-[#00d9ff]/10 transition-all duration-300 hover:-translate-y-1 font-semibold text-lg"
              >
                Report a Scam
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
