import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Textarea } from '@/app/components/ui/textarea';
import { AlertCircle } from 'lucide-react';

const exampleMessages = [
  {
    title: 'Urgent Payment Required',
    text: 'URGENT: Your account will be suspended in 24 hours! Click here immediately to verify your payment details: http://scam-link.xyz/verify',
  },
  {
    title: 'Prize Winner Notification',
    text: 'Congratulations! You have won $1,000,000 in our lottery. Send your bank details to claim your prize now!',
  },
  {
    title: 'Tax Refund Scam',
    text: 'IRS: You are eligible for a tax refund of $2,500. Click this link to claim within 48 hours or lose your refund.',
  },
];

export function MessageAnalyzer() {
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (message.trim()) {
      setIsAnalyzing(true);
      // Simulate analysis
      setTimeout(() => {
        navigate('/message-result', { state: { message } });
      }, 1500);
    }
  };

  const useExample = (text: string) => {
    setMessage(text);
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
            <h1 className="text-5xl font-bold text-white mb-4">
              Message <span className="text-[#00d9ff]">Analyzer</span>
            </h1>
            <p className="text-xl text-gray-400">
              Paste any suspicious message to analyze
            </p>
          </div>

          {/* Main Input Card */}
          <div className="p-8 rounded-2xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20 shadow-[0_0_30px_rgba(0,217,255,0.1)] mb-8">
            <Textarea
              placeholder="Paste your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[300px] bg-[#0a0e27] border-[#00d9ff]/30 text-white placeholder:text-gray-500 focus:border-[#00d9ff] focus:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all resize-none"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                {message.length} characters
              </div>
              <button
                onClick={handleAnalyze}
                disabled={!message.trim() || isAnalyzing}
                className="px-8 py-3 bg-gradient-to-r from-[#00d9ff] to-[#00a3cc] text-[#0a0e27] rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#0a0e27]/30 border-t-[#0a0e27] rounded-full animate-spin"></div>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Scam Risk'
                )}
              </button>
            </div>
          </div>

          {/* Example Messages */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[#ffd93d]" />
              Example Messages
            </h2>
            <div className="grid gap-4">
              {exampleMessages.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group p-6 rounded-xl bg-[#1a1f3a]/30 border border-[#ff3b3b]/20 hover:border-[#ff3b3b]/50 transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(255,59,59,0.2)]"
                  onClick={() => useExample(example.text)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{example.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{example.text}</p>
                    </div>
                    <button
                      className="px-4 py-2 text-sm bg-[#ff3b3b]/20 text-[#ff3b3b] rounded-lg hover:bg-[#ff3b3b]/30 transition-all group-hover:shadow-[0_0_10px_rgba(255,59,59,0.3)]"
                    >
                      Try Example
                    </button>
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
