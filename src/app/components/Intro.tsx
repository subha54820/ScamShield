import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, CheckCircle2 } from 'lucide-react';

export function Intro() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    const showIntroOnce = sessionStorage.getItem('showIntroOnce');
    
    // Auto-navigate after 4 seconds
    const timer = setTimeout(() => {
      // If user is authenticated and hasn't seen intro, show it then go to home
      if (user && !showIntroOnce) {
        sessionStorage.setItem('showIntroOnce', 'true');
        navigate('/');
      } 
      // If user is authenticated and already saw intro, go home
      else if (user && showIntroOnce) {
        navigate('/');
      }
      // If not authenticated, go to login
      else {
        navigate('/login');
      }
    }, 4000);

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(p => (p < 100 ? p + 2 : 100));
    }, 40);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d9ff] rounded-full blur-3xl"
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff41] rounded-full blur-3xl"
          animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.div 
            className="mx-auto w-32 h-32 mb-8 relative"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/10 flex items-center justify-center border-2 border-[#00d9ff]/40 relative overflow-hidden group">
              {/* Rotating Border */}
              <motion.div 
                className="absolute inset-0 border-2 border-transparent border-t-[#00d9ff] rounded-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Shield Icon */}
              <Shield className="w-20 h-20 text-[#00d9ff] relative z-10" />
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-[#00d9ff]/20 blur-2xl -z-10" />
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-black tracking-tighter mb-4"
          >
            <span className="bg-gradient-to-r from-[#00d9ff] via-[#00ff41] to-[#00d9ff] bg-clip-text text-transparent">
              SCAMSHIELD
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 font-light"
          >
            Your Cybersecurity Guardian
          </motion.p>
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="mb-12 space-y-6">
          <div className="space-y-4">
            {[
              { icon: Lock, text: 'Bank-Level Security', color: '#00d9ff' },
              { icon: Zap, text: 'Real-Time Threat Detection', color: '#00ff41' },
              { icon: CheckCircle2, text: 'Verified Scam Prevention', color: '#00ff41' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                className="flex items-center justify-center gap-4"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-xl border border-[#00d9ff]/30"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <span className="text-lg font-semibold text-gray-100">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-full h-1.5 bg-[#1a1f3a] rounded-full overflow-hidden backdrop-blur-sm border border-[#00d9ff]/20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00d9ff] to-[#00ff41] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          variants={itemVariants}
          className="space-y-2"
        >
          <motion.p 
            className="text-sm font-mono text-[#00d9ff]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Initializing security protocols...
          </motion.p>
          <p className="text-xs text-gray-500">
            Redirecting to login in a moment
          </p>
        </motion.div>
      </motion.div>

      {/* Skip Button */}
      <motion.button
        onClick={() => navigate('/login')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 px-6 py-2 text-sm text-[#00d9ff] border border-[#00d9ff]/30 rounded-lg hover:bg-[#00d9ff]/10 transition-all z-20"
      >
        Skip
      </motion.button>
    </div>
  );
}
