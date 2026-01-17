import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertTriangle, Clock, CreditCard, Phone, Link as LinkIcon, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';
import { useState, useEffect } from 'react';

export function MessageResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || '';
  
  const [riskScore, setRiskScore] = useState(0);
  const targetScore = 87; // High risk score for demo

  useEffect(() => {
    // Animate risk score
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setRiskScore(Math.floor(targetScore * progress));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!message) {
    navigate('/message-analyzer');
    return null;
  }

  const redFlags = [
    {
      icon: Clock,
      title: 'Urgent language detected',
      description: 'Creates artificial time pressure to rush decisions',
      severity: 'high',
    },
    {
      icon: LinkIcon,
      title: 'Suspicious link found',
      description: 'URL leads to an unverified domain',
      severity: 'high',
    },
    {
      icon: CreditCard,
      title: 'Payment request',
      description: 'Asks for financial information',
      severity: 'critical',
    },
    {
      icon: Phone,
      title: 'Phone number collection',
      description: 'Requests personal contact details',
      severity: 'medium',
    },
  ];

  const recommendations = [
    'Do not click on any links in this message',
    'Do not provide any personal or financial information',
    'Verify the sender through official channels',
    'Report this message to the appropriate authorities',
    'Delete this message immediately',
  ];

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'High Risk', color: '#ff3b3b', bgColor: 'bg-[#ff3b3b]/20' };
    if (score >= 40) return { level: 'Suspicious', color: '#ffd93d', bgColor: 'bg-[#ffd93d]/20' };
    return { level: 'Safe', color: '#00ff41', bgColor: 'bg-[#00ff41]/20' };
  };

  const risk = getRiskLevel(riskScore);

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
                        animate={{ strokeDasharray: `${(riskScore / 100) * 2 * Math.PI * 110}, ${2 * Math.PI * 110}` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        style={{
                          filter: `drop-shadow(0 0 10px ${risk.color})`,
                        }}
                      />
                    </svg>
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Shield className="w-20 h-20 text-white mb-2 opacity-20" />
                      <div className="text-6xl font-bold text-white">{riskScore}</div>
                      <div className="text-gray-400">Risk Score</div>
                    </div>
                  </motion.div>

                  <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${risk.bgColor} border-2`}
                    style={{ borderColor: risk.color }}
                  >
                    {riskScore >= 70 ? <AlertTriangle className="w-5 h-5" style={{ color: risk.color }} /> : <CheckCircle2 className="w-5 h-5" style={{ color: risk.color }} />}
                    <span className="font-bold" style={{ color: risk.color }}>{risk.level}</span>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="mt-8 p-4 rounded-lg bg-[#0a0e27]/50 border border-[#00d9ff]/10">
                  <div className="text-xs text-gray-500 mb-2">Analyzed Message:</div>
                  <div className="text-sm text-gray-300 line-clamp-4">{message}</div>
                </div>
              </div>
            </div>

            {/* Right Panel - Details */}
            <div className="lg:col-span-3 space-y-8">
              {/* Red Flags */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Why This Message is Risky</h2>
                <div className="space-y-4">
                  {redFlags.map((flag, index) => {
                    const Icon = flag.icon;
                    const severityColors = {
                      critical: { bg: 'bg-[#ff3b3b]/10', border: 'border-[#ff3b3b]/30', text: 'text-[#ff3b3b]' },
                      high: { bg: 'bg-[#ff3b3b]/10', border: 'border-[#ff3b3b]/30', text: 'text-[#ff3b3b]' },
                      medium: { bg: 'bg-[#ffd93d]/10', border: 'border-[#ffd93d]/30', text: 'text-[#ffd93d]' },
                    };
                    const colors = severityColors[flag.severity as keyof typeof severityColors];

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className={`p-6 rounded-xl ${colors.bg} border ${colors.border} hover:shadow-[0_0_20px_rgba(255,59,59,0.2)] transition-all`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                            <Icon className={`w-6 h-6 ${colors.text}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-bold mb-1 ${colors.text}`}>{flag.title}</h3>
                            <p className="text-sm text-gray-400">{flag.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">Safety Recommendations</h2>
                <div className="p-8 rounded-xl bg-[#1a1f3a]/50 border border-[#00ff41]/20">
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#00ff41] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

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
