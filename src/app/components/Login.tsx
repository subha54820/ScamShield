import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Lock, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone || phone.length < 10) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
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
      setError('Enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const username = 'user_' + phone.slice(-4);
      // Clear aiIntroShown flag so new login will show intro again
      sessionStorage.removeItem('aiIntroShown');
      sessionStorage.setItem('user', JSON.stringify({ 
        phone, 
        username,
        isNewUser: true,
        loginTime: new Date().toISOString()
      }));
      navigate('/profile-setup');
    }, 1500);
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] overflow-hidden relative">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px', position: 'absolute', inset: 0}} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="rounded-3xl border bg-gradient-to-br from-[#0a0e27]/90 via-[#1a1f3a]/90 to-[#0a0e27]/90 backdrop-blur-2xl border-[#00d9ff]/20 p-8 shadow-2xl overflow-hidden relative"
               style={{boxShadow: '0 0 60px rgba(0, 217, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-50"></div>
            
            <div className="relative z-10">
              <motion.div className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff41] bg-clip-text text-transparent mb-2">
                  Enter OTP
                </h2>
                <p className="text-gray-400 text-sm">Sent to +91 {phone.slice(-4)}</p>
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
                      className="w-14 h-14 text-center text-2xl font-bold bg-[#0a0e27]/50 border-2 border-[#00d9ff]/30 text-[#00d9ff] rounded-lg focus:border-[#00d9ff] focus:outline-none focus:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all"
                    />
                  ))}
                </div>

                {error && (
                  <motion.div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}>
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading || otp.join('').length !== 6}
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00d9ff]/50 disabled:opacity-50 transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div className="w-4 h-4 border-2 border-transparent border-t-[#0a0e27] rounded-full"
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
                    setStep('phone');
                    setOtp(['', '', '', '', '', '']);
                    setError('');
                  }}
                  className="w-full py-2 px-6 border border-[#00d9ff]/30 text-[#00d9ff] rounded-lg hover:bg-[#00d9ff]/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  Change Number
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.1) 25%, rgba(0, 217, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.1) 75%, rgba(0, 217, 255, 0.1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px', position: 'absolute', inset: 0}} />
      </div>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-3xl border bg-gradient-to-br from-[#0a0e27]/90 via-[#1a1f3a]/90 to-[#0a0e27]/90 backdrop-blur-2xl border-[#00d9ff]/20 p-8 shadow-2xl overflow-hidden relative"
             style={{boxShadow: '0 0 60px rgba(0, 217, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-50"></div>
          
          <div className="p-0 relative z-10">
            <motion.div className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/10 flex items-center justify-center mb-4 border border-[#00d9ff]/40 relative overflow-hidden group">
                <motion.div className="absolute inset-0 border border-[#00d9ff]/40 rounded-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <Lock className="w-10 h-10 text-[#00d9ff] relative z-10 group-hover:animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ff41] bg-clip-text text-transparent mb-2">
                Secure Login
              </h2>
              <p className="text-gray-400 text-sm">One-Time Password verification</p>
            </motion.div>

            <form onSubmit={handleSendOTP} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}>
                <label className="block text-[#00d9ff] text-xs font-bold mb-2 uppercase tracking-widest">Mobile Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d9ff]/60 group-focus-within:text-[#00d9ff]" />
                  <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm">+91</span>
                  <input
                    type="tel"
                    placeholder="1234567890"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-28 pr-4 py-3 bg-[#0a0e27]/50 border-2 border-[#00d9ff]/20 text-white placeholder:text-gray-600 rounded-lg focus:border-[#00d9ff] focus:outline-none focus:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-2">10-digit Indian mobile number</p>
              </motion.div>

              {error && (
                <motion.div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 mt-6 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00d9ff]/50 disabled:opacity-50 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.div className="w-4 h-4 border-2 border-transparent border-t-[#0a0e27] rounded-full"
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
                  OTP-based authentication for maximum security
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
