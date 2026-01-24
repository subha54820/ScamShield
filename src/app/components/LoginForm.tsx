import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, User, Mail, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    if (!username.trim()) {
      setValidationError('Username is required');
      return;
    }
    if (!email.includes('@')) {
      setValidationError('Valid email is required');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.querySelector(`input[data-otp="${index + 1}"]`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setValidationError('Enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('user', JSON.stringify({ username, email }));
      sessionStorage.setItem('showIntro', 'true');
      navigate('/profile');
    }, 1500);
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0e27] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff] to-[#0a0e27] animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d9ff] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff41] rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="w-full max-w-md relative z-10"
        >
          <div className="rounded-2xl border bg-gradient-to-br from-[#0a0e27]/80 via-[#1a1f3a]/80 to-[#0a0e27]/80 backdrop-blur-2xl border-[#00d9ff]/20 shadow-2xl overflow-hidden relative"
               style={{boxShadow: '0 0 50px rgba(0, 217, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
            
            <div className="p-8 relative z-10">
              <motion.div className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/10 flex items-center justify-center mb-4 border border-[#00d9ff]/40 relative overflow-hidden">
                  <motion.div className="absolute inset-0 border border-[#00d9ff]/40 rounded-2xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                  <Zap className="w-10 h-10 text-[#00d9ff] relative z-10" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff41] bg-clip-text text-transparent mb-2">
                  Verification
                </h2>
                <p className="text-gray-400">Enter the 6-digit code sent to {email}</p>
              </motion.div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <motion.div className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}>
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <motion.input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        data-otp={index}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-14 text-center text-2xl font-bold bg-[#0a0e27] border-2 border-[#00d9ff]/30 text-[#00d9ff] rounded-lg focus:border-[#00d9ff] focus:outline-none focus:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all"
                        whileFocus={{ scale: 1.1, boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)' }}
                        whileHover={{ borderColor: '#00d9ff' }}
                      />
                    ))}
                  </div>
                </motion.div>

                {validationError && (
                  <motion.div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}>
                    <AlertCircle className="w-4 h-4" />
                    {validationError}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#00d9ff]/50 disabled:opacity-50 transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-[#00ff41] to-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ x: isLoading ? ['0%', '100%'] : '0%' }}
                    transition={{ duration: 0.5, repeat: isLoading ? Infinity : 0 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div className="w-4 h-4 border-2 border-transparent border-t-black rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Verify OTP
                      </>
                    )}
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => {
                    setStep('credentials');
                    setOtp(['', '', '', '', '', '']);
                    setValidationError('');
                  }}
                  className="w-full py-2 px-6 border border-[#00d9ff]/30 text-[#00d9ff] rounded-lg hover:bg-[#00d9ff]/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  Back to Login
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0e27] overflow-hidden relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff] to-[#0a0e27]" 
             style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px'}}></div>
      </div>

      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00d9ff] rounded-full blur-3xl opacity-20"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#00ff41] rounded-full blur-3xl opacity-10"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-2xl border bg-gradient-to-br from-[#0a0e27]/80 via-[#1a1f3a]/80 to-[#0a0e27]/80 backdrop-blur-2xl border-[#00d9ff]/20 shadow-2xl overflow-hidden relative"
             style={{boxShadow: '0 0 50px rgba(0, 217, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-75"></div>
          
          <div className="p-8 relative z-10">
            <motion.div className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/10 flex items-center justify-center mb-4 border border-[#00d9ff]/40 relative overflow-hidden group">
                <motion.div className="absolute inset-0 border border-[#00d9ff]/40 rounded-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <ShieldCheck className="w-10 h-10 text-[#00d9ff] relative z-10 group-hover:animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff41] bg-clip-text text-transparent mb-2">
                SCAMSHIELD
              </h2>
              <p className="text-gray-400 text-sm">Secure Authentication Protocol</p>
            </motion.div>

            <form onSubmit={handleSendOTP} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}>
                <label className="block text-[#00d9ff] text-xs font-bold mb-2 uppercase tracking-widest">Username</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d9ff]/60 group-focus-within:text-[#00d9ff]" />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#0a0e27] border-2 border-[#00d9ff]/20 text-white placeholder:text-gray-600 rounded-lg focus:border-[#00d9ff] focus:outline-none focus:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}>
                <label className="block text-[#00d9ff] text-xs font-bold mb-2 uppercase tracking-widest">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d9ff]/60 group-focus-within:text-[#00d9ff]" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#0a0e27] border-2 border-[#00d9ff]/20 text-white placeholder:text-gray-600 rounded-lg focus:border-[#00d9ff] focus:outline-none focus:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all"
                  />
                </div>
              </motion.div>

              {validationError && (
                <motion.div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {validationError}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 mt-6 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#00d9ff]/50 disabled:opacity-50 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-[#00ff41] to-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={{ x: isLoading ? ['0%', '100%'] : '0%' }}
                  transition={{ duration: 0.5, repeat: isLoading ? Infinity : 0 }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.div className="w-4 h-4 border-2 border-transparent border-t-black rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Send OTP to Email
                    </>
                  )}
                </span>
              </motion.button>

              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm">
                  No account yet?{' '}
                  <a href="/signup" className="text-[#00d9ff] hover:text-[#00ff41] font-semibold transition-colors">
                    Create one now
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
