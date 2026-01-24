import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle2, AlertCircle, Upload, X } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function ReportScam() {
  const [reporterName, setReporterName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [scamContent, setScamContent] = useState('');
  const [scamType, setScamType] = useState('');
  const [platform, setPlatform] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const scamTypes = [
    'Phishing',
    'Fake Payment Request',
    'OTP Scam',
    'Romance Scam',
    'Investment Fraud',
    'Fake Tech Support',
    'Malware/Virus',
    'Lottery Scam',
    'Banking Fraud',
    'E-commerce Fraud',
    'Job Offer Scam',
    'Credential Harvesting',
    'Other',
  ];

  const platforms = ['SMS', 'WhatsApp', 'Email', 'Website', 'Phone Call', 'Social Media', 'Other'];

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Screenshot must be less than 5MB');
        return;
      }
      setScreenshot(file);
      setError('');
    }
  };

  const removeScreenshot = () => {
    setScreenshot(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!scamContent.trim() || !scamType || !platform) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('reporter_name', reporterName);
      formData.append('email', email);
      formData.append('mobile_number', mobileNumber);
      formData.append('scam_content', scamContent);
      formData.append('scam_type', scamType);
      formData.append('platform', platform);
      if (screenshot) {
        formData.append('screenshot', screenshot);
      }

      const response = await fetch('http://localhost:8002/api/report-scam/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit report');
      }

      const data = await response.json();
      setReportId(data.report_id);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setReporterName('');
        setEmail('');
        setMobileNumber('');
        setScamContent('');
        setScamType('');
        setPlatform('');
        setScreenshot(null);
        setReportId('');
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#ff3b3b]/20 to-[#ffd93d]/20 mb-6">
              <FileText className="w-10 h-10 text-[#ff3b3b]" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Report a <span className="text-[#ff3b3b]">Scam</span>
            </h1>
            <p className="text-xl text-gray-400">
              Help protect others by reporting suspicious activity
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 rounded-2xl bg-[#00ff41]/10 border-2 border-[#00ff41]/50 text-center"
            >
              <CheckCircle2 className="w-20 h-20 text-[#00ff41] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Report Submitted Successfully!</h2>
              <p className="text-gray-300 text-lg mb-2">
                Thank you for helping keep others safe.
              </p>
              <p className="text-[#00d9ff] font-mono text-sm mb-4">
                Report ID: <strong>{reportId}</strong>
              </p>
              <p className="text-gray-400">
                Our team will review your report shortly. You can track this report using the ID above.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20 shadow-[0_0_30px_rgba(0,217,255,0.1)]">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300">{error}</p>
                </motion.div>
              )}

              <div className="space-y-6">
                {/* Reporter Name */}
                <div>
                  <label className="block text-white mb-3">Reporter Name (Optional)</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={reporterName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReporterName(e.target.value)}
                    className="h-12 bg-[#0a0e27] border-[#00d9ff]/30 text-white placeholder:text-gray-500 focus:border-[#00d9ff] focus:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white mb-3">Email Address (Optional)</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="h-12 bg-[#0a0e27] border-[#00d9ff]/30 text-white placeholder:text-gray-500 focus:border-[#00d9ff] focus:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    We may contact you if we need more information
                  </p>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-white mb-3">Mobile Number (Optional)</label>
                  <Input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={mobileNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobileNumber(e.target.value)}
                    className="h-12 bg-[#0a0e27] border-[#00d9ff]/30 text-white placeholder:text-gray-500 focus:border-[#00d9ff] focus:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all"
                  />
                </div>

                {/* Scam Type */}
                <div>
                  <label className="block text-white mb-3">Scam Type *</label>
                  <Select value={scamType} onValueChange={setScamType}>
                    <SelectTrigger className="w-full h-12 bg-[#0a0e27] border-[#00d9ff]/30 text-white">
                      <SelectValue placeholder="Select scam type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f3a] border-[#00d9ff]/30">
                      {scamTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="text-white hover:bg-[#00d9ff]/10 focus:bg-[#00d9ff]/10"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Platform */}
                <div>
                  <label className="block text-white mb-3">Platform *</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="w-full h-12 bg-[#0a0e27] border-[#00d9ff]/30 text-white">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f3a] border-[#00d9ff]/30">
                      {platforms.map((plat) => (
                        <SelectItem
                          key={plat}
                          value={plat}
                          className="text-white hover:bg-[#00d9ff]/10 focus:bg-[#00d9ff]/10"
                        >
                          {plat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Scam Message or Link */}
                <div>
                  <label className="block text-white mb-3">Scam Message or Link *</label>
                  <Textarea
                    placeholder="Paste the scam message, link, or phone number here..."
                    value={scamContent}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setScamContent(e.target.value)}
                    required
                    className="min-h-[150px] bg-[#0a0e27] border-[#00d9ff]/30 text-white placeholder:text-gray-500 focus:border-[#00d9ff] focus:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all resize-none"
                  />
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="block text-white mb-3">Upload Screenshot (Optional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label
                      htmlFor="screenshot-upload"
                      className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-[#00d9ff]/30 rounded-lg cursor-pointer hover:border-[#00d9ff]/50 transition-all bg-[#0a0e27]/50"
                    >
                      <Upload className="w-5 h-5 text-[#00d9ff]" />
                      <span className="text-gray-400">
                        {screenshot ? 'Change file' : 'Click to upload or drag and drop'}
                      </span>
                    </label>
                    {screenshot && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 rounded-lg bg-[#00d9ff]/10 border border-[#00d9ff]/20 flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-300 truncate">{screenshot.name}</span>
                        <button
                          type="button"
                          onClick={removeScreenshot}
                          className="p-1 hover:bg-red-500/20 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </motion.div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Max file size: 5MB. Supported formats: JPG, PNG, GIF
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!scamType || !platform || !scamContent.trim() || isLoading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#00ff41] to-[#00cc34] text-[#0a0e27] rounded-lg hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold text-lg"
                >
                  {isLoading ? 'Submitting...' : 'Submit Scam Report'}
                </button>
              </div>
            </form>
          )}

          {/* Info Box */}
          <div className="mt-8 p-6 rounded-xl bg-[#00d9ff]/10 border border-[#00d9ff]/20">
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-[#00d9ff]">Note:</strong> All reports are reviewed manually by our team. 
              We take your privacy seriously and will never share your personal information. 
              By submitting this report, you help protect the entire community from scams.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
