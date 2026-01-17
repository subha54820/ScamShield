import { Link, useLocation } from 'react-router-dom';
import { Shield, MessageSquare, Link as LinkIcon, FileText, User, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navigation() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const authPages = ['/login', '/signup', '/recovery'];
  const isAuthPage = authPages.includes(location.pathname);
  
  useEffect(() => {
    const checkAuth = () => {
      const credentials = localStorage.getItem('userCredentials');
      const remembered = localStorage.getItem('rememberedDevice');
      setIsAuthenticated(!!(credentials || remembered));
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);
  
  if (isAuthPage) return null;
  
  const navItems = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/message-analyzer', label: 'Message Analyzer', icon: MessageSquare },
    { path: '/link-checker', label: 'Link Checker', icon: LinkIcon },
    { path: '/report', label: 'Report Scam', icon: FileText },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0a0e27]/80 border-b border-[#00d9ff]/20">
      <div className="max-w-screen-xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - positioned slightly left */}
          <Link to="/" className="flex items-center gap-3 group -ml-2">
            <div className="relative">
              <Shield className="w-10 h-10 text-[#00d9ff] drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]" />
              <div className="absolute inset-0 bg-[#00d9ff]/20 blur-xl group-hover:bg-[#00d9ff]/30 transition-all rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-white">
              Scam<span className="text-[#00d9ff]">Shield</span>
            </span>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'text-[#00d9ff] bg-[#00d9ff]/10 shadow-[0_0_12px_rgba(0,217,255,0.3)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Login/Profile Button - positioned slightly right */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="px-6 py-2 bg-gradient-to-r from-[#00d9ff] to-[#00a3cc] text-[#0a0e27] rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 -mr-2"
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3 -mr-2">
              <Link
                to="/signup"
                className="px-4 py-2 text-[#00d9ff] border border-[#00d9ff]/30 rounded-lg hover:bg-[#00d9ff]/10 transition-all"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-[#00d9ff] to-[#00a3cc] text-[#0a0e27] rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
