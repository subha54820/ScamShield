import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, Lock, Activity, BarChart3 } from 'lucide-react';
import { IntroAnimation } from './IntroAnimation';

interface UserData {
  username: string;
  email: string;
}

export function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    const intro = sessionStorage.getItem('showIntro');
    
    if (user) {
      setUserData(JSON.parse(user));
    }
    
    if (intro === 'true') {
      setShowIntro(true);
      sessionStorage.removeItem('showIntro');
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('showIntro');
    navigate('/login');
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

  const userInitials = userData.username
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <>
      {showIntro && <IntroAnimation />}
      
      <div className="min-h-screen bg-[#0a0e27] pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#00d9ff] via-[#00ff41] to-[#00d9ff] bg-clip-text text-transparent mb-2">
              Welcome back, {userData.username}!
            </h1>
            <p className="text-gray-400 text-lg">Your cybersecurity dashboard</p>
          </motion.div>

          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8">
            <div className="rounded-2xl border bg-gradient-to-br from-[#0a0e27]/80 via-[#1a1f3a]/80 to-[#0a0e27]/80 backdrop-blur-2xl border-[#00d9ff]/20 p-8 overflow-hidden relative group"
                 style={{boxShadow: '0 0 50px rgba(0, 217, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-50"></div>
              
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff41]/10 flex items-center justify-center border border-[#00d9ff]/40 relative overflow-hidden">
                  <motion.div className="absolute inset-0 border border-[#00d9ff]/40 rounded-2xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="text-3xl font-bold text-[#00d9ff] relative z-10">{userInitials}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-[#00d9ff]" />
                    <div>
                      <p className="text-gray-400 text-sm">Username</p>
                      <p className="text-xl font-bold text-white">{userData.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#00ff41]" />
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-xl font-bold text-white">{userData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Messages Analyzed', value: '127', icon: Activity, color: '#00d9ff' },
              { label: 'Links Checked', value: '89', icon: BarChart3, color: '#00ff41' },
              { label: 'Scams Reported', value: '15', icon: Lock, color: '#ff6b6b' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border bg-gradient-to-br from-[#0a0e27]/80 via-[#1a1f3a]/80 to-[#0a0e27]/80 backdrop-blur-2xl border-[#00d9ff]/20 p-6 hover:border-[#00d9ff]/40 transition-all group"
                style={{boxShadow: '0 0 30px rgba(0, 217, 255, 0.05)'}}>
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-6 h-6" style={{color: stat.color}} />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">+12%</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Security Access Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8">
            <div className="rounded-2xl border bg-gradient-to-br from-[#0a0e27]/80 via-[#1a1f3a]/80 to-[#0a0e27]/80 backdrop-blur-2xl border-[#00ff41]/20 p-8 overflow-hidden relative group"
                 style={{boxShadow: '0 0 50px rgba(0, 255, 65, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'}}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-50"></div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="w-6 h-6 text-[#00ff41]" />
                    <h3 className="text-2xl font-bold text-white">Security Access</h3>
                  </div>
                  <p className="text-gray-400">Manage your authentication settings and security options</p>
                </div>
                <motion.button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 bg-gradient-to-r from-[#00ff41] to-[#00d9ff] text-black font-bold rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  Access Settings
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { time: '2 hours ago', action: 'Message analyzed', risk: 'Safe' },
                { time: '5 hours ago', action: 'Link checked', risk: 'Warning' },
                { time: '1 day ago', action: 'Scam reported', risk: 'High Risk' },
              ].map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
                  className="rounded-lg border bg-[#0a0e27]/40 border-[#00d9ff]/10 p-4 flex items-center justify-between hover:border-[#00d9ff]/30 transition-all">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    activity.risk === 'Safe' ? 'bg-[#00ff41]/10 text-[#00ff41]' :
                    activity.risk === 'Warning' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {activity.risk}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Account Settings & Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              className="px-8 py-4 rounded-lg border border-[#00d9ff]/20 text-[#00d9ff] font-bold hover:border-[#00d9ff]/40 hover:bg-[#00d9ff]/5 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              Account Settings
            </motion.button>
            
            <motion.button
              onClick={handleLogout}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
