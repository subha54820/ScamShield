import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/app/components/Navigation';
import { Home } from '@/app/components/Home';
import { MessageAnalyzer } from '@/app/components/MessageAnalyzer';
import { MessageResult } from '@/app/components/MessageResult';
import { LinkChecker } from '@/app/components/LinkChecker';
import { LinkResult } from '@/app/components/LinkResult';
import { ReportScam } from '@/app/components/ReportScam';
import { Profile } from '@/app/components/Profile';
import { LoginForm } from '@/app/components/LoginForm';
import { SignUpForm } from '@/app/components/SignUpForm';
import { RecoveryForm } from '@/app/components/RecoveryForm';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0e27]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/message-analyzer" element={<MessageAnalyzer />} />
          <Route path="/message-result" element={<MessageResult />} />
          <Route path="/link-checker" element={<LinkChecker />} />
          <Route path="/link-result" element={<LinkResult />} />
          <Route path="/report" element={<ReportScam />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/recovery" element={<RecoveryForm />} />
        </Routes>
      </div>
    </Router>
  );
}
