import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { MessageAnalyzer } from './components/MessageAnalyzer';
import { MessageResult } from './components/MessageResult';
import { LinkChecker } from './components/LinkChecker';
import { LinkResult } from './components/LinkResult';
import { ReportScam } from './components/ReportScam';
import { Profile as ProfileView } from './components/ProfileView';
import { Intro } from './components/Intro';
import { Login } from './components/Login';
import { ProfileSetup } from './components/ProfileSetup';
import { RecoveryForm } from './components/RecoveryForm';
import { Terms } from './components/Terms';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { About } from './components/pages/About';
import { Blog } from './components/pages/Blog';
import { Careers } from './components/pages/Careers';
import { PressKit } from './components/pages/PressKit';
import { Security } from './components/pages/Security';
import { Disclaimer } from './components/pages/Disclaimer';
import { Documentation } from './components/pages/Documentation';
import { FAQ } from './components/pages/FAQ';
import { SupportCenter } from './components/pages/SupportCenter';
import { useEffect, useState } from 'react';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = sessionStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);
  const [shouldShowIntro, setShouldShowIntro] = useState(false);

  useEffect(() => {
    document.title = 'SCAMSHIELD - Cybersecurity Authentication System';
    const user = sessionStorage.getItem('user');
    const showIntro = sessionStorage.getItem('showIntroOnce');
    
    setIsAuthenticated(!!user);
    if (user && !showIntro) {
      setShouldShowIntro(true);
      sessionStorage.setItem('showIntroOnce', 'true');
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0e27] flex flex-col">
        {isAuthenticated && <Navigation />}
        <main className="flex-1">
          <Routes>
            {/* Auth Flow */}
            <Route path="/intro" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile-setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
            
            {/* Main App */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/message-analyzer" element={<ProtectedRoute><MessageAnalyzer /></ProtectedRoute>} />
            <Route path="/message-result" element={<ProtectedRoute><MessageResult /></ProtectedRoute>} />
            <Route path="/link-checker" element={<ProtectedRoute><LinkChecker /></ProtectedRoute>} />
            <Route path="/link-result" element={<ProtectedRoute><LinkResult /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><ReportScam /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
            
            {/* Public Pages */}
            <Route path="/recovery" element={<RecoveryForm />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<PressKit />} />
            <Route path="/security" element={<Security />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<SupportCenter />} />
            
            {/* Defaults - redirect to login if not authenticated */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}
