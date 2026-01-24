import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function MessageResult() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const apiData = location.state || {};
  const message = apiData.input_message || '';
  const riskLevel = apiData.risk_level || 'Safe';
  const scamScore = apiData.scam_score || 0;
  const scamType = apiData.scam_type || 'Suspicious Message';
  const explanationForUser = apiData.explanation_for_user || '';
  const detailedReasons = apiData.detailed_reasons || [];
  const safetyTips = apiData.safety_tips || [];
  const languageDetected = apiData.language_detected || 'english';
  const odiaReasons = apiData.odia_reasons || [];
  const englishReasons = apiData.english_reasons || [];
  
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Animate scam score
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedScore(Math.floor(scamScore * progress));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [scamScore]);

  if (!message) {
    navigate('/message-analyzer');
    return null;
  }

  const getRiskColor = (score: number) => {
    if (score >= 60) return { level: 'High Risk Scam', color: '#ff3b3b', bgColor: 'bg-[#ff3b3b]/20', icon: '🚨' };
    if (score >= 30) return { level: 'Suspicious', color: '#ffd93d', bgColor: 'bg-[#ffd93d]/20', icon: '⚠️' };
    return { level: 'Safe', color: '#00ff41', bgColor: 'bg-[#00ff41]/20', icon: '✅' };
  };

  const risk = getRiskColor(animatedScore);

  // Voice Assistant Handler
  const handleVoiceAssistant = () => {
    // Stop if already speaking
    if (isVoiceActive) {
      window.speechSynthesis.cancel();
      setIsVoiceActive(false);
      return;
    }

    // Build voice script from scam data
    const voiceScript = buildVoiceScript();
    
    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(voiceScript);
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.1; // Slightly higher for friendly tone
    utterance.volume = 1;

    // Try to use female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) => voice.name.toLowerCase().includes('female') || 
                 voice.name.toLowerCase().includes('woman') ||
                 voice.name.toLowerCase().includes('samantha') ||
                 voice.name.toLowerCase().includes('victoria')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Handle speech events
    utterance.onstart = () => {
      setIsVoiceActive(true);
    };

    utterance.onend = () => {
      setIsVoiceActive(false);
    };

    utterance.onerror = () => {
      setIsVoiceActive(false);
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Build comprehensive voice script
  const buildVoiceScript = (): string => {
    let script = `Warning. `;
    
    // Risk level
    script += `This message is a ${risk.level}. `;
    script += `Scam risk score: ${animatedScore} out of 100. `;
    
    // Scam type
    script += `Detected scam type: ${scamType}. `;
    
    // Main reasons
    if (detailedReasons.length > 0) {
      script += `Red flags detected: `;
      detailedReasons.forEach((reason: string, index: number) => {
        // Remove emoji and clean text for voice
        const cleanReason = reason.replace(/[^\w\s]/g, '').trim();
        script += cleanReason;
        if (index < detailedReasons.length - 1) {
          script += `. `;
        }
      });
      script += `. `;
    }
    
    // Safety advice summary
    script += `Safety advice: `;
    script += `Do not click any links in this message. `;
    script += `Never share OTP, PIN, or passwords with anyone. `;
    script += `Verify information using official apps or websites directly. `;
    script += `Report this message as a scam to the relevant platform.`;
    
    return script;
  };

  // Stop voice on unmount
  useEffect(() => {
    return () => {
      if (isVoiceActive) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isVoiceActive]);

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Panel - Risk Gauge */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 p-8 rounded-2xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20 shadow-[0_0_30px_rgba(0,217,255,0.1)]">
                {/* Risk Gauge */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-64 h-64 mx-auto mb-6"
                  >
                    <svg className="w-full h-full -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="128"
                        cy="128"
                        r="110"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="20"
                      />
                      {/* Progress circle */}
                      <motion.circle
                        cx="128"
                        cy="128"
                        r="110"
                        fill="none"
                        stroke={risk.color}
                        strokeWidth="20"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: `0, ${2 * Math.PI * 110}` }}
                        animate={{ strokeDasharray: `${(scamScore / 100) * 2 * Math.PI * 110}, ${2 * Math.PI * 110}` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        style={{
                          filter: `drop-shadow(0 0 10px ${risk.color})`,
                        }}
                      />
                    </svg>
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Shield className="w-20 h-20 text-white mb-2 opacity-20" />
                      <div className="text-6xl font-bold text-white">{animatedScore}</div>
                      <div className="text-gray-400">Scam Score</div>
                    </div>
                  </motion.div>

                  <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${risk.bgColor} border-2`}
                    style={{ borderColor: risk.color }}
                  >
                    <span className="text-2xl">{risk.icon}</span>
                    <span className="font-bold" style={{ color: risk.color }}>{risk.level}</span>
                  </div>
                </div>

                {/* Scam Type */}
                <div className="mt-6 p-4 rounded-lg bg-[#1a1f3a] border border-[#00d9ff]/20">
                  <div className="text-xs text-gray-500 mb-2">Scam Type Detected:</div>
                  <div className="text-lg font-semibold text-[#00d9ff]">{scamType}</div>
                </div>

                {/* Message Preview */}
                <div className="mt-4 p-4 rounded-lg bg-[#0a0e27]/50 border border-[#00d9ff]/10">
                  <div className="text-xs text-gray-500 mb-2">Analyzed Message:</div>
                  <div className="text-sm text-gray-300 line-clamp-4">{message}</div>
                </div>
              </div>
            </div>

            {/* Right Panel - Details */}
            <div className="lg:col-span-3 space-y-8">
              {/* User-Friendly Explanation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 rounded-xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20"
              >
                <h2 className="text-2xl font-bold text-white mb-4">⚠️ Analysis Summary</h2>
                <div className="text-gray-200 whitespace-pre-wrap font-medium leading-relaxed">
                  {explanationForUser}
                </div>
              </motion.div>

              {/* Why This Message Is a Scam - Cybersecurity Focus */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#0a0e27]/60 border border-[#ff3b3b]/30 shadow-[0_0_30px_rgba(255,59,59,0.1)]"
              >
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">🛑 Why Scam ?</h2>
                    <p className="text-gray-400">Our system detected multiple red flags commonly used in online scams.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVoiceAssistant}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      isVoiceActive
                        ? 'bg-[#ff3b3b]/30 text-[#ff3b3b] border border-[#ff3b3b]/50 shadow-[0_0_15px_rgba(255,59,59,0.4)]'
                        : 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30 hover:bg-[#00d9ff]/30 hover:shadow-[0_0_15px_rgba(0,217,255,0.3)]'
                    }`}
                    title={isVoiceActive ? 'Stop listening' : 'Listen explanation with voice'}
                  >
                    {isVoiceActive ? (
                      <>
                        <VolumeX className="w-5 h-5" />
                        <span className="text-sm">Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-5 h-5" />
                        <span className="text-sm">🔊 Listen</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Scam Score Section */}
                <div className="mb-8 p-6 rounded-xl bg-[#0a0e27]/50 border border-[#ff3b3b]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Scam Risk Score</p>
                      <p className="text-4xl font-bold text-white">{animatedScore} / 100</p>
                    </div>
                    <div className={`text-center px-6 py-4 rounded-lg ${risk.bgColor} border-2`} style={{ borderColor: risk.color }}>
                      <p className="text-3xl mb-2">{risk.icon}</p>
                      <p className="font-bold text-white">{risk.level}</p>
                    </div>
                  </div>
                </div>

                {/* Key Reasons */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">🔍 Key Red Flags Detected</h3>
                  <div className="space-y-3">
                    {detailedReasons.length > 0 ? (
                      detailedReasons.map((reason: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
                          className="flex items-start gap-3 p-4 rounded-lg bg-[#1a1f3a]/40 border border-[#ff3b3b]/20 hover:border-[#ff3b3b]/40 transition-all"
                        >
                          <span className="text-xl flex-shrink-0 mt-0.5">🚨</span>
                          <p className="text-gray-200 font-medium">{reason}</p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-4 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/30">
                        <p className="text-gray-200">✅ No significant red flags detected</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Scam Type Tag */}
                <div className="mb-8 p-6 rounded-lg bg-[#1a1f3a]/40 border border-[#ff3b3b]/20">
                  <p className="text-gray-400 text-sm mb-2">Detected Scam Type:</p>
                  <div className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-[#ff3b3b]/10 border border-[#ff3b3b]/30">
                    <span className="text-2xl">🏦</span>
                    <span className="text-lg font-bold text-[#ff3b3b]">{scamType}</span>
                  </div>
                  {languageDetected === 'odia' && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d9ff]/20 border border-[#00d9ff]/30">
                      <span>🇮🇳</span>
                      <span className="text-sm font-semibold text-[#00d9ff]">Odia Language Detected</span>
                    </div>
                  )}
                </div>

                {/* Multilingual Analysis (if Odia detected) */}
                {languageDetected === 'odia' && (odiaReasons.length > 0 || englishReasons.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {/* Odia Reasons */}
                    {odiaReasons.length > 0 && (
                      <div className="p-6 rounded-lg bg-[#1a3a2a]/30 border border-[#00ff41]/20">
                        <h4 className="text-lg font-bold text-[#00ff41] mb-3">🇮🇳 ଓଡ଼ିଆ ସମଝ (Odia)</h4>
                        <ul className="space-y-2">
                          {odiaReasons.map((reason: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-gray-200">
                              <span className="text-[#00ff41] font-bold">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* English Reasons */}
                    {englishReasons.length > 0 && (
                      <div className="p-6 rounded-lg bg-[#1a2a3a]/30 border border-[#00d9ff]/20">
                        <h4 className="text-lg font-bold text-[#00d9ff] mb-3">🇬🇧 English Summary</h4>
                        <ul className="space-y-2">
                          {englishReasons.map((reason: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-gray-200">
                              <span className="text-[#00d9ff] font-bold">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Plain Language Explanation */}
                <div className="mb-8 p-6 rounded-lg bg-[#1a1f3a]/40 border border-[#ffd93d]/20">
                  <h4 className="text-lg font-bold text-white mb-3">💡 Why This Matters</h4>
                  <p className="text-gray-200 leading-relaxed">
                    This message tries to scare you into acting quickly and asks for private information. 
                    Legitimate organizations never ask for OTPs, passwords, or payment details through messages or links. 
                    These are classic scam tactics designed to trick you.
                  </p>
                </div>

                {/* Safety Advice Box */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#00a3cc]/10 border border-[#00d9ff]/30">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span>🛡️</span> What You Should Do
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-200">
                      <span className="text-[#00d9ff] font-bold">✓</span>
                      <span>Do not click on any links in this message</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-200">
                      <span className="text-[#00d9ff] font-bold">✓</span>
                      <span>Never share OTP, PIN, or passwords with anyone</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-200">
                      <span className="text-[#00d9ff] font-bold">✓</span>
                      <span>Verify information using official apps or websites directly</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-200">
                      <span className="text-[#00d9ff] font-bold">✓</span>
                      <span>Report this message as a scam to the relevant platform</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Safety Tips */}
              {safetyTips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6">🛡️ Safety Tips</h2>
                  <div className="grid gap-3">
                    {safetyTips.map((tip: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                        className="p-4 rounded-lg bg-[#00d9ff]/10 border border-[#00d9ff]/30 hover:border-[#00d9ff]/60 transition-all"
                      >
                        <p className="text-gray-200 font-medium">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => navigate('/message-analyzer')}
                  className="px-6 py-3 bg-gradient-to-r from-[#00d9ff] to-[#00a3cc] text-[#0a0e27] rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 font-semibold"
                >
                  Analyze Another Message
                </button>
                <button
                  onClick={() => navigate('/report')}
                  className="px-6 py-3 bg-[#ff3b3b]/20 text-[#ff3b3b] border border-[#ff3b3b]/30 rounded-lg hover:bg-[#ff3b3b]/30 hover:shadow-[0_0_20px_rgba(255,59,59,0.3)] transition-all duration-300 hover:-translate-y-0.5 font-semibold"
                >
                  Report This Scam
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
