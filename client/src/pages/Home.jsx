import { useState } from 'react';
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

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
