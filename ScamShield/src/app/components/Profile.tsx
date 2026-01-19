import { motion } from 'motion/react';
import { User, Mail, Calendar, Shield, MessageSquare, Link as LinkIcon, FileText, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';

export function Profile() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: 'January 2026',
    avatar: 'JD',
  };

  const stats = [
    { label: 'Messages Analyzed', value: '127', icon: MessageSquare, color: '#00d9ff' },
    { label: 'Links Checked', value: '89', icon: LinkIcon, color: '#00ff41' },
    { label: 'Scams Reported', value: '15', icon: FileText, color: '#ffd93d' },
  ];

  const recentActivity = [
    { type: 'message', title: 'Analyzed suspicious email', result: 'High Risk', time: '2 hours ago', riskLevel: 'high' },
    { type: 'link', title: 'Checked URL safety', result: 'Safe', time: '5 hours ago', riskLevel: 'safe' },
    { type: 'report', title: 'Reported phishing attempt', result: 'Submitted', time: '1 day ago', riskLevel: 'medium' },
    { type: 'link', title: 'Scanned website link', result: 'Suspicious', time: '2 days ago', riskLevel: 'medium' },
    { type: 'message', title: 'Analyzed SMS message', result: 'High Risk', time: '3 days ago', riskLevel: 'high' },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return { text: 'text-[#ff3b3b]', bg: 'bg-[#ff3b3b]/10', border: 'border-[#ff3b3b]/30' };
      case 'medium': return { text: 'text-[#ffd93d]', bg: 'bg-[#ffd93d]/10', border: 'border-[#ffd93d]/30' };
      case 'safe': return { text: 'text-[#00ff41]', bg: 'bg-[#00ff41]/10', border: 'border-[#00ff41]/30' };
      default: return { text: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/30' };
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-2">
              Your <span className="text-[#00d9ff]">Profile</span>
            </h1>
            <p className="text-xl text-gray-400">Manage your account and view your activity</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Card */}
              <div className="p-8 rounded-2xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20 shadow-[0_0_30px_rgba(0,217,255,0.1)]">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-[#00d9ff] shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                    <AvatarFallback className="bg-gradient-to-br from-[#00d9ff] to-[#00a3cc] text-[#0a0e27] text-2xl font-bold">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                  <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Member since {user.memberSince}</span>
                  </div>
                </div>
                <button className="w-full mt-6 px-6 py-3 bg-[#00d9ff]/10 text-[#00d9ff] border border-[#00d9ff]/30 rounded-lg hover:bg-[#00d9ff]/20 transition-all duration-300 hover:-translate-y-0.5 font-semibold flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" />
                  Edit Profile
                </button>
              </div>

              {/* Stats Cards */}
              <div className="space-y-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20 hover:border-[#00d9ff]/50 transition-all hover:shadow-[0_0_20px_rgba(0,217,255,0.2)]"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${stat.color}20`, border: `1px solid ${stat.color}40` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: stat.color }} />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-white">{stat.value}</div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Recent Activity */}
            <div className="lg:col-span-2">
              <div className="p-8 rounded-2xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20 shadow-[0_0_30px_rgba(0,217,255,0.1)]">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#00d9ff]" />
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => {
                    const colors = getRiskColor(activity.riskLevel);
                    const getIcon = () => {
                      switch (activity.type) {
                        case 'message': return MessageSquare;
                        case 'link': return LinkIcon;
                        case 'report': return FileText;
                        default: return Shield;
                      }
                    };
                    const Icon = getIcon();

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="p-5 rounded-xl bg-[#0a0e27]/50 border border-[#00d9ff]/10 hover:border-[#00d9ff]/30 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(0,217,255,0.1)]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-[#00d9ff]/10 border border-[#00d9ff]/20">
                            <Icon className="w-5 h-5 text-[#00d9ff]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold mb-1">{activity.title}</h3>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                          <div className={`px-4 py-2 rounded-full ${colors.bg} border ${colors.border}`}>
                            <span className={`text-sm font-semibold ${colors.text}`}>{activity.result}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Account Settings */}
              <div className="mt-8 p-8 rounded-2xl bg-[#1a1f3a]/50 border border-[#00d9ff]/20">
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 rounded-lg bg-[#0a0e27]/50 border border-[#00d9ff]/10 hover:border-[#00d9ff]/30 transition-all text-left">
                    <span className="text-white">Notifications</span>
                    <span className="text-gray-400 text-sm">Configure alerts</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-lg bg-[#0a0e27]/50 border border-[#00d9ff]/10 hover:border-[#00d9ff]/30 transition-all text-left">
                    <span className="text-white">Privacy Settings</span>
                    <span className="text-gray-400 text-sm">Manage your data</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-lg bg-[#0a0e27]/50 border border-[#00d9ff]/10 hover:border-[#00d9ff]/30 transition-all text-left">
                    <span className="text-white">Security</span>
                    <span className="text-gray-400 text-sm">Password & 2FA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
