import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, XCircle, AlertTriangle, Globe, Lock, Server, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LinkResult() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const url = location.state?.url || '';
  const riskLevel = location.state?.riskLevel || 'SAFE';
  const scamScore = location.state?.scamScore || 0;
  const detectedKeywords = location.state?.detectedKeywords || [];
  const detectedThreats = location.state?.detectedThreats || [];
  const safetyAdvice = location.state?.safetyAdvice || [];
  
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
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

  if (!url) {
    navigate('/link-checker');
    return null;
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'SAFE':
        return { color: '#00ff41', bgColor: 'bg-[#00ff41]/20', icon: '✅' };
      case 'SUSPICIOUS':
        return { color: '#ffd93d', bgColor: 'bg-[#ffd93d]/20', icon: '⚠️' };
      case 'SCAM':
        return { color: '#ff3b3b', bgColor: 'bg-[#ff3b3b]/20', icon: '🚨' };
      default:
        return { color: '#00d9ff', bgColor: 'bg-[#00d9ff]/20', icon: '❓' };
    }
  };

  const risk = getRiskColor(riskLevel);

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8 p-6 rounded-xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20">
            <div className="flex items-center gap-4">
              <Globe className="w-8 h-8 text-[#00d9ff]" />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-400 mb-1">Scanned URL</div>
                <div className="text-white font-mono text-sm truncate">{url}</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Risk Score */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="p-8 rounded-xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20 shadow-[0_0_30px_rgba(0,217,255,0.1)]"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Link Risk Score</h2>
                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-4">
                    <div className="text-5xl font-bold text-white">{animatedScore}</div>
                    <div className="text-gray-400 mb-2">/100</div>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${risk.bgColor} border-2`} style={{ borderColor: risk.color }}>
                    <span className="text-2xl">{risk.icon}</span>
                    <span className="font-bold text-white">{riskLevel}</span>
                  </div>
                </div>
              </motion.div>

              {/* Detected Keywords */}
              {detectedKeywords.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="p-6 rounded-xl bg-[#1a1f3a]/50 border border-[#ff3b3b]/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4">🔍 Detected Indicators</h3>
                  <div className="flex flex-wrap gap-2">
                    {detectedKeywords.map((keyword: string, index: number) => (
                      <div key={index} className="px-3 py-1 bg-[#ff3b3b]/20 text-[#ff3b3b] rounded-full text-sm font-semibold">
                        {keyword}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Threats Detected */}
              {detectedThreats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="p-6 rounded-xl bg-[#1a1f3a]/50 border border-[#ff3b3b]/20"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">⚠️ Why This Link is Risky</h2>
                  <div className="space-y-3">
                    {detectedThreats.map((threat: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-[#ff3b3b]/10 border border-[#ff3b3b]/20">
                        <span className="text-xl flex-shrink-0 mt-0.5">🚨</span>
                        <p className="text-gray-200">{threat}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Safety Advice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="p-6 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#00a3cc]/10 border border-[#00d9ff]/30"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>🛡️</span> Safety Advice
                </h3>
                <ul className="space-y-2">
                  {safetyAdvice.map((advice: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-200">
                      <span className="text-[#00d9ff] font-bold">•</span>
                      <span>{advice}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Risk Level Alert */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className={`p-6 rounded-xl border-2 ${risk.bgColor}`}
                style={{ borderColor: risk.color }}
              >
                <h3 className="text-lg font-bold text-white mb-2">Overall Assessment</h3>
                {riskLevel === 'SCAM' && (
                  <p className="text-red-300 font-semibold">🛑 DO NOT click this link. It appears to be a scam.</p>
                )}
                {riskLevel === 'SUSPICIOUS' && (
                  <p className="text-yellow-300 font-semibold">⚠️ Be cautious. This link has suspicious characteristics.</p>
                )}
                {riskLevel === 'SAFE' && (
                  <p className="text-green-300 font-semibold">✅ This link appears safe, but always verify before entering sensitive information.</p>
                )}
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate('/link-checker')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#00d9ff] to-[#00a3cc] text-[#0a0e27] rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 font-semibold"
                >
                  Check Another Link
                </button>
                <button
                  onClick={() => navigate('/report')}
                  className="w-full px-6 py-3 bg-[#ff3b3b]/20 text-[#ff3b3b] border border-[#ff3b3b]/30 rounded-lg hover:bg-[#ff3b3b]/30 transition-all duration-300 hover:-translate-y-0.5 font-semibold"
                >
                  Report Malicious Link
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
