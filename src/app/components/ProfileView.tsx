import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, LogOut, Lock, Clock, CheckCircle2, Edit3, Save, X } from 'lucide-react';

interface UserData {
  phone: string;
  username: string;
  fullName?: string;
  email?: string;
  profilePhoto?: string | null;
  language?: string;
  loginTime?: string;
}

export function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('aiIntroShown');
    sessionStorage.removeItem('showIntroOnce');
    navigate('/intro');
  };

  const handleSaveProfile = () => {
    if (!formData) return;
    setIsSaving(true);
    setTimeout(() => {
      setUserData(formData);
      sessionStorage.setItem('user', JSON.stringify(formData));
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e27]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-[#00d9ff]/30 border-t-[#00d9ff] rounded-full"
        />
      </div>
    );
  }

  const userInitials = (userData.fullName || userData.username)
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  const getLastLoginTime = () => {
    if (!userData.loginTime) return 'Just now';
    const date = new Date(userData.loginTime);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' minutes ago';
    if (diff < 86400) return Math.floor(diff / 3600) + ' hours ago';
    return Math.floor(diff / 86400) + ' days ago';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00d9ff] via-[#00ff41] to-[#00d9ff] bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-400">Manage your account and security settings</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border bg-gradient-to-br from-[#0a0e27]/80 via-[#1a1f3a]/80 to-[#0a0e27]/80 backdrop-blur-2xl border-[#00d9ff]/20 overflow-hidden relative mb-8"
          style={{boxShadow: '0 0 60px rgba(0, 217, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-50"></div>
          
          <div className="p-8">
            {isEditing ? (
              /* Edit Mode */
              <div className="space-y-6">
                {/* Edit Profile Photo */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/10 flex items-center justify-center border-2 border-[#00d9ff]/40 overflow-hidden">
                      {formData?.profilePhoto ? (
                        <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl font-bold text-[#00d9ff]">{userInitials}</span>
                      )}
                    </div>
                    <label htmlFor="edit-photo" className="absolute bottom-2 right-2 bg-[#00ff41] text-[#0a0e27] p-2 rounded-full cursor-pointer hover:shadow-lg transition-all">
                      <Edit3 className="w-4 h-4" />
                    </label>
                    <input type="file" id="edit-photo" className="hidden" accept="image/*" />
                  </div>
                </div>

                {/* Edit Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#00d9ff] text-xs font-bold mb-2 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={formData?.fullName || ''}
                      onChange={(e) => setFormData(prev => prev ? { ...prev, fullName: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-[#0a0e27]/50 border-2 border-[#00d9ff]/20 text-white rounded-lg focus:border-[#00d9ff] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[#00d9ff] text-xs font-bold mb-2 uppercase">Email</label>
                    <input
                      type="email"
                      value={formData?.email || ''}
                      onChange={(e) => setFormData(prev => prev ? { ...prev, email: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-[#0a0e27]/50 border-2 border-[#00d9ff]/20 text-white rounded-lg focus:border-[#00d9ff] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[#00d9ff] text-xs font-bold mb-2 uppercase">Language</label>
                    <select
                      value={formData?.language || 'English'}
                      onChange={(e) => setFormData(prev => prev ? { ...prev, language: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-[#0a0e27]/50 border-2 border-[#00d9ff]/20 text-white rounded-lg focus:border-[#00d9ff] focus:outline-none text-sm cursor-pointer">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Odia</option>
                    </select>
                  </div>
                </div>

                {/* Edit Mode Buttons */}
                <div className="flex gap-4 pt-4">
                  <motion.button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-[#00ff41] to-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    {isSaving ? (
                      <>
                        <motion.div className="w-4 h-4 border-2 border-transparent border-t-[#0a0e27] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 px-6 border-2 border-[#00d9ff]/30 text-[#00d9ff] font-bold rounded-lg hover:bg-[#00d9ff]/5 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <X className="w-5 h-5" />
                    Cancel
                  </motion.button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="space-y-8">
                {/* Profile Section */}
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/10 flex items-center justify-center border-2 border-[#00d9ff]/40 overflow-hidden mx-auto mb-6">
                    {userData.profilePhoto ? (
                      <img src={userData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl font-bold text-[#00d9ff]">{userInitials}</span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-1">{userData.fullName || 'User'}</h2>
                </div>

                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#00d9ff]" />
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-[#0a0e27]/50 rounded-lg border border-[#00d9ff]/10">
                      <User className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase">Full Name</p>
                        <p className="text-white font-medium">{userData.fullName || 'Not set'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#0a0e27]/50 rounded-lg border border-[#00d9ff]/10">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase">Email</p>
                        <p className="text-white font-medium">{userData.email || 'Not set'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#0a0e27]/50 rounded-lg border border-[#00d9ff]/10">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase">Mobile</p>
                        <p className="text-white font-medium">+91 {userData.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#00ff41]" />
                    Security Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-[#0a0e27]/50 rounded-lg border border-[#00ff41]/10">
                      <CheckCircle2 className="w-5 h-5 text-[#00ff41]" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase">Account Status</p>
                        <p className="text-[#00ff41] font-medium flex items-center gap-2">
                          ✔ Verified
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#0a0e27]/50 rounded-lg border border-[#00ff41]/10">
                      <Lock className="w-5 h-5 text-[#00ff41]" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase">Login Method</p>
                        <p className="text-white font-medium">OTP via SMS</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#0a0e27]/50 rounded-lg border border-[#00ff41]/10">
                      <Clock className="w-5 h-5 text-[#00ff41]" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase">Last Login</p>
                        <p className="text-white font-medium">{getLastLoginTime()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Preferences</h3>
                  <div className="p-4 bg-[#0a0e27]/50 rounded-lg border border-[#00d9ff]/10">
                    <p className="text-xs text-gray-500 uppercase mb-2">Language</p>
                    <p className="text-white font-medium">{userData.language || 'English'}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <Edit3 className="w-5 h-5" />
                    Edit Profile
                  </motion.button>
                  <motion.button
                    onClick={handleLogout}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <LogOut className="w-5 h-5" />
                    Logout
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
