import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import WorkshopDetails from '../components/WorkshopDetails';
import Features from '../components/Features';
import LearningOutcomes from '../components/LearningOutcomes';
import Curriculum from '../components/Curriculum';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import RegistrationForm from '../components/RegistrationForm';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [userToken, setUserToken] = useState('');

  // Check for stored session on load
  useEffect(() => {
    const tokenAdmin = localStorage.getItem('adminToken');
    if (tokenAdmin) {
      setAdminToken(tokenAdmin);
    }
    const tokenUser = localStorage.getItem('userToken');
    if (tokenUser) {
      setUserToken(tokenUser);
    }
  }, []);

  const handleLoginSuccess = (role, token) => {
    if (role === 'admin') {
      setAdminToken(token);
    } else {
      setUserToken(token);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userUser');
    setAdminToken('');
    setUserToken('');
  };

  // Switch between Landing Page, Admin Dashboard, and User Dashboard
  if (adminToken) {
    return <AdminDashboard token={adminToken} onLogout={handleLogout} />;
  }

  if (userToken) {
    return <UserDashboard token={userToken} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero onOpenAuth={() => setIsAuthOpen(true)} />
        <WorkshopDetails />
        <Features />
        <LearningOutcomes />
        <Curriculum />
        <Testimonials />
        <FAQ />
        <RegistrationForm />
      </main>
      <Footer />

      {/* Authentication Modal Popup */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
