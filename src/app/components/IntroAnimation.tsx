import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

export function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!showIntro) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px',
            animation: 'slideDown 20s linear infinite',
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00d9ff] rounded-full"
          animate={{
            y: [0, -500],
            x: Math.sin(i) * 200,
            opacity: [1, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: '100%',
          }}
        />
      ))}

      <div className="relative z-10 text-center">
        {/* Main logo animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="mx-auto w-32 h-32 rounded-3xl bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/10 flex items-center justify-center mb-8 border border-[#00d9ff]/40 relative overflow-hidden"
        >
          {/* Rotating border */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-[#00d9ff] border-r-[#00ff41] rounded-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Shield icon with pulse */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShieldCheck className="w-16 h-16 text-[#00d9ff] relative z-10" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-[#00d9ff] to-[#00ff41] bg-clip-text text-transparent">
            SCAMSHIELD
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl text-gray-400 mb-12 font-mono"
        >
          Cybersecurity Authentication System
        </motion.p>

        {/* Status messages with animations */}
        <motion.div className="space-y-4">
          {[
            { text: 'Initializing security protocols...', delay: 1.1 },
            { text: 'Verifying credentials...', delay: 1.5 },
            { text: 'System ready', delay: 1.9, success: true },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay, duration: 0.6 }}
              className="flex items-center justify-center gap-3"
            >
              {item.success ? (
                <CheckCircle2 className="w-5 h-5 text-[#00ff41]" />
              ) : (
                <motion.div
                  className="w-5 h-5 border-2 border-transparent border-t-[#00d9ff] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              <span
                className={`font-mono text-sm ${
                  item.success ? 'text-[#00ff41]' : 'text-[#00d9ff]'
                }`}
              >
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mt-8"
        >
          <div className="w-48 h-1 bg-[#00d9ff]/20 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00d9ff] to-[#00ff41]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="text-gray-500 text-xs mt-8 font-mono"
        >
          Redirecting to dashboard...
        </motion.p>
      </div>

      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </motion.div>
  );
}
