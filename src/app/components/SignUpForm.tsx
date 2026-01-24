import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Zap, CheckCircle2, AlertCircle, Lock as LockIcon } from 'lucide-react';

export function SignUpForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isGmailAddress = (email: string): boolean => {
    return email.toLowerCase().endsWith('@gmail.com');
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setSuccessMessage('');

    if (!email) {
      setValidationError('Email is required');
      return;
    }

    if (!isGmailAddress(email)) {
      setValidationError('Only Gmail accounts are allowed for security reasons');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('OTP sent to ' + email);
      setStep('otp');
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
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
      const username = email.split('@')[0];
      sessionStorage.setItem('user', JSON.stringify({ username, email }));
      sessionStorage.setItem('showIntro', 'true');
      navigate('/profile');
    }, 1500);
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#0a0e27] overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41] to-[#0a0e27]" 
               style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 65, 0.1) 25%, rgba(0, 255, 65, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.1) 75%, rgba(0, 255, 65, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 65, 0.1) 25%, rgba(0, 255, 65, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.1) 75%, rgba(0, 255, 65, 0.1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px'}}></div>
        </div>

        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00ff41] rounded-full blur-3xl opacity-20"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#00d9ff] rounded-full blur-3xl opacity-10"
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="rounded-2xl border bg-gradient-to-br from-[#0a0e27]/80 via-[#1a1f3a]/80 to-[#0a0e27]/80 backdrop-blur-2xl border-[#00ff41]/20 shadow-2xl overflow-hidden relative"
               style={{boxShadow: '0 0 50px rgba(0, 255, 65, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-75"></div>
            
            <div className="p-8 relative z-10">
              <motion.div className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00ff41] to-[#00d9ff] bg-clip-text text-transparent mb-2">
                  Enter OTP
                </h2>
                <p className="text-gray-400 text-sm">Sent to {email}</p>
              </motion.div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <motion.input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      autoFocus={index === 0}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-12 h-12 text-center text-2xl font-bold bg-[#0a0e27] border-2 border-[#00ff41]/30 text-[#00ff41] rounded-lg focus:border-[#00ff41] focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all"
                    />
                  ))}
                </div>

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
                  disabled={isLoading || otp.join('').length !== 6}
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#00ff41] to-[#00d9ff] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#00ff41]/50 disabled:opacity-50 transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity"
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
                    setStep('email');
                    setOtp(['', '', '', '', '', '']);
                    setValidationError('');
                  }}
                  className="w-full py-2 px-6 border border-[#00ff41]/30 text-[#00ff41] rounded-lg hover:bg-[#00ff41]/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  Back to Email
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41] to-[#0a0e27]" 
             style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 65, 0.1) 25%, rgba(0, 255, 65, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.1) 75%, rgba(0, 255, 65, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 65, 0.1) 25%, rgba(0, 255, 65, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.1) 75%, rgba(0, 255, 65, 0.1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px'}}></div>
      </div>

      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00ff41] rounded-full blur-3xl opacity-20"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#00d9ff] rounded-full blur-3xl opacity-10"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-2xl border bg-gradient-to-br from-[#0a0e27]/80 via-[#1a1f3a]/80 to-[#0a0e27]/80 backdrop-blur-2xl border-[#00ff41]/20 shadow-2xl overflow-hidden relative"
             style={{boxShadow: '0 0 50px rgba(0, 255, 65, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-75"></div>
          
          <div className="p-8 relative z-10">
            <motion.div className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00ff41]/20 to-[#00d9ff]/10 flex items-center justify-center mb-4 border border-[#00ff41]/40 relative overflow-hidden group">
                <motion.div className="absolute inset-0 border border-[#00ff41]/40 rounded-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <LockIcon className="w-10 h-10 text-[#00ff41] relative z-10 group-hover:animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00ff41] to-[#00d9ff] bg-clip-text text-transparent mb-2">
                Create Account
              </h2>
              <p className="text-gray-400 text-sm">Secure signup with Gmail verification</p>
            </motion.div>

            <form onSubmit={handleSendOTP} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}>
                <label className="block text-[#00ff41] text-xs font-bold mb-2 uppercase tracking-widest">Gmail Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff41]/60 group-focus-within:text-[#00ff41]" />
                  <input
                    type="email"
                    placeholder="your.email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#0a0e27] border-2 border-[#00ff41]/20 text-white placeholder:text-gray-600 rounded-lg focus:border-[#00ff41] focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-2">Only Gmail accounts are allowed for security reasons</p>
              </motion.div>

              {validationError && (
                <motion.div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {validationError}
                </motion.div>
              )}

              {successMessage && (
                <motion.div className="flex items-center gap-2 p-3 bg-green-500/10 border border-[#00ff41]/30 rounded-lg text-[#00ff41] text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  {successMessage}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 mt-6 bg-gradient-to-r from-[#00ff41] to-[#00d9ff] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#00ff41]/50 disabled:opacity-50 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity"
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
                      Send OTP
                    </>
                  )}
                </span>
              </motion.button>

              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <a href="/login" className="text-[#00ff41] hover:text-[#00d9ff] font-semibold transition-colors">
                    Sign in here
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
