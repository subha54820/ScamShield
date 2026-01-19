import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Link as LinkIcon, Search, Clock, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Input } from '@/app/components/ui/input';

export function LinkChecker() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const recentScans = [
    { url: 'https://legitimate-bank.com', status: 'safe', time: '2 min ago' },
    { url: 'http://scam-phishing-site.xyz', status: 'dangerous', time: '5 min ago' },
    { url: 'https://suspicious-offer.net', status: 'suspicious', time: '12 min ago' },
    { url: 'https://official-government.gov', status: 'safe', time: '18 min ago' },
    { url: 'http://fake-verification.tk', status: 'dangerous', time: '25 min ago' },
  ];

  const handleScan = () => {
    if (url.trim()) {
      setIsScanning(true);
      setTimeout(() => {
        navigate('/link-result', { state: { url } });
      }, 1500);
    }
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      safe: { icon: CheckCircle2, color: 'text-[#00ff41]', bg: 'bg-[#00ff41]/10', border: 'border-[#00ff41]/30' },
      suspicious: { icon: AlertTriangle, color: 'text-[#ffd93d]', bg: 'bg-[#ffd93d]/10', border: 'border-[#ffd93d]/30' },
      dangerous: { icon: XCircle, color: 'text-[#ff3b3b]', bg: 'bg-[#ff3b3b]/10', border: 'border-[#ff3b3b]/30' },
    };
    const config = configs[status as keyof typeof configs];
    const Icon = config.icon;
    
    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} border ${config.border}`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className={`text-xs font-semibold uppercase ${config.color}`}>{status}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/20 mb-6">
              <Search className="w-10 h-10 text-[#00d9ff]" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Link Safety <span className="text-[#00d9ff]">Checker</span>
            </h1>
            <p className="text-xl text-gray-400">
              Verify before you visit
            </p>
          </div>

          {/* Main Input Card */}
          <div className="p-8 rounded-2xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20 shadow-[0_0_30px_rgba(0,217,255,0.1)] mb-12">
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                    className="pl-12 h-14 bg-[#0a0e27] border-[#00d9ff]/30 text-white placeholder:text-gray-500 focus:border-[#00d9ff] focus:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all"
                  />
                </div>
              </div>
              <button
                onClick={handleScan}
                disabled={!url.trim() || isScanning}
                className="px-8 h-14 bg-gradient-to-r from-[#00d9ff] to-[#00a3cc] text-[#0a0e27] rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold whitespace-nowrap"
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#0a0e27]/30 border-t-[#0a0e27] rounded-full animate-spin"></div>
                    Scanning...
                  </span>
                ) : (
                  'Scan Link'
                )}
              </button>
            </div>
          </div>

          {/* Recent Scans */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#00d9ff]" />
              Recent Scans
            </h2>
            <div className="space-y-3">
              {recentScans.map((scan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group p-5 rounded-xl bg-[#1a1f3a]/30 border border-[#00d9ff]/10 hover:border-[#00d9ff]/30 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(0,217,255,0.1)]"
                  onClick={() => navigate('/link-result', { state: { url: scan.url } })}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <LinkIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-white truncate font-mono text-sm">{scan.url}</span>
                      </div>
                      <span className="text-xs text-gray-500">{scan.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(scan.status)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
