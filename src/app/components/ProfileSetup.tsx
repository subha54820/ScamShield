import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Camera, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ProfileSetupData {
  fullName: string;
  email: string;
  profilePhoto: string | null;
  language: string;
}

export function ProfileSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileSetupData>({
    fullName: '',
    email: '',
    profilePhoto: null,
    language: 'English'
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFormData(prev => ({ ...prev, profilePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email: string) => {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid Gmail address (example@gmail.com)');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      user.fullName = formData.fullName;
      user.email = formData.email;
      user.profilePhoto = formData.profilePhoto;
      user.language = formData.language;
      user.isNewUser = false;
      
      sessionStorage.setItem('user', JSON.stringify(user));
      setIsLoading(false);
      // Redirect to home which will show AIIntro
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 65, 0.1) 25%, rgba(0, 255, 65, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.1) 75%, rgba(0, 255, 65, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 65, 0.1) 25%, rgba(0, 255, 65, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.1) 75%, rgba(0, 255, 65, 0.1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px', position: 'absolute', inset: 0}} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-3xl border bg-gradient-to-br from-[#0a0e27]/90 via-[#1a1f3a]/90 to-[#0a0e27]/90 backdrop-blur-2xl border-[#00ff41]/20 p-8 shadow-2xl overflow-hidden relative"
             style={{boxShadow: '0 0 60px rgba(0, 255, 65, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            <motion.div className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00ff41] to-[#00d9ff] bg-clip-text text-transparent mb-2">
                Complete Your Profile
              </h2>
              <p className="text-gray-400 text-sm">Set up your account to get started</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}>
                <label className="block text-[#00ff41] text-xs font-bold mb-3 uppercase tracking-widest">Profile Photo <span className="text-gray-500">(Optional)</span></label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-[#00ff41]/10 to-[#00d9ff]/10 border-2 border-dashed border-[#00ff41]/30 flex items-center justify-center overflow-hidden group hover:border-[#00ff41]/60 transition-all">
                      {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center">
                          <Camera className="w-8 h-8 text-[#00ff41]/60 mx-auto mb-2" />
                          <p className="text-xs text-gray-400">Upload Photo</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </motion.div>

              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}>
                <label className="block text-[#00ff41] text-xs font-bold mb-2 uppercase tracking-widest">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff41]/60 group-focus-within:text-[#00ff41]" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full pl-12 pr-4 py-2.5 bg-[#0a0e27]/50 border-2 border-[#00ff41]/20 text-white placeholder:text-gray-600 rounded-lg focus:border-[#00ff41] focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all text-sm"
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}>
                <label className="block text-[#00ff41] text-xs font-bold mb-2 uppercase tracking-widest">Gmail Address <span className="text-red-400">*</span></label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff41]/60 group-focus-within:text-[#00ff41]" />
                  <input
                    type="email"
                    placeholder="your@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-12 pr-4 py-2.5 bg-[#0a0e27]/50 border-2 border-[#00ff41]/20 text-white placeholder:text-gray-600 rounded-lg focus:border-[#00ff41] focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all text-sm"
                  />
                </div>
              </motion.div>

              {/* Language */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}>
                <label className="block text-[#00ff41] text-xs font-bold mb-2 uppercase tracking-widest">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-[#0a0e27]/50 border-2 border-[#00ff41]/20 text-white rounded-lg focus:border-[#00ff41] focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all text-sm cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Odia">Odia</option>
                </select>
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
                className="w-full py-3 px-6 mt-6 bg-gradient-to-r from-[#00ff41] to-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00ff41]/50 disabled:opacity-50 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.div className="w-4 h-4 border-2 border-transparent border-t-[#0a0e27] rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Completing Profile...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Complete Profile
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
