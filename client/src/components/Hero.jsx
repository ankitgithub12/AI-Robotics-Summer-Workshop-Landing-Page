import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaUsers, FaFire, FaBars, FaTimes } from 'react-icons/fa';

export default function Hero({ onOpenAuth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 pb-24 pt-8">
      {/* Background glowing mesh */}
      <div className="absolute top-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-300/30 blur-[120px] animate-pulse duration-[8s]" />
      <div className="absolute right-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-purple-300/20 blur-[100px] animate-pulse duration-[10s]" />
      <div className="absolute left-[20%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-orange-200/20 blur-[100px]" />

      <header className="container mx-auto px-6 mb-16 relative z-30">
        <div className="flex items-center justify-between py-4 border border-white/40 backdrop-blur-md bg-white/40 px-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200">
              K
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent">
              Kidrove
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollToSection('overview')} className="hover:text-indigo-600 transition-colors">Overview</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-indigo-600 transition-colors">Why Us</button>
            <button onClick={() => scrollToSection('curriculum')} className="hover:text-indigo-600 transition-colors">Curriculum</button>
            <button onClick={() => scrollToSection('faqs')} className="hover:text-indigo-600 transition-colors">FAQs</button>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={onOpenAuth}
              className="text-slate-600 hover:text-indigo-600 font-extrabold text-sm px-4 py-2.5 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => scrollToSection('register')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg shadow-indigo-100 hover:-translate-y-0.5"
            >
              Enroll Now
            </button>
          </div>
          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={onOpenAuth}
              className="text-slate-600 hover:text-indigo-600 font-extrabold text-xs px-3 py-2 transition-colors mr-1"
            >
              Login
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-indigo-600 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden mt-3 border border-white/40 backdrop-blur-lg bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col p-6 space-y-4 text-left relative z-40"
            >
              <button 
                onClick={() => { scrollToSection('overview'); setMobileMenuOpen(false); }} 
                className="text-slate-700 hover:text-indigo-600 font-extrabold py-2 border-b border-slate-100 text-left transition-colors text-sm"
              >
                Overview
              </button>
              <button 
                onClick={() => { scrollToSection('features'); setMobileMenuOpen(false); }} 
                className="text-slate-700 hover:text-indigo-600 font-extrabold py-2 border-b border-slate-100 text-left transition-colors text-sm"
              >
                Why Us
              </button>
              <button 
                onClick={() => { scrollToSection('curriculum'); setMobileMenuOpen(false); }} 
                className="text-slate-700 hover:text-indigo-600 font-extrabold py-2 border-b border-slate-100 text-left transition-colors text-sm"
              >
                Curriculum
              </button>
              <button 
                onClick={() => { scrollToSection('faqs'); setMobileMenuOpen(false); }} 
                className="text-slate-700 hover:text-indigo-600 font-extrabold py-2 border-b border-slate-100 text-left transition-colors text-sm"
              >
                FAQs
              </button>
              <div className="pt-2">
                <button 
                  onClick={() => { scrollToSection('register'); setMobileMenuOpen(false); }} 
                  className="w-full text-center py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-sm transition-all shadow-md shadow-indigo-100"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Text Area */}
        <motion.div 
          className="lg:col-span-7 text-left space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Summer 2026 Batch Starting Soon
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] select-none">
            Unlock the Future <br />
            with{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              AI & Robotics
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
            Join our exciting 4-week online workshop where children learn Artificial Intelligence, 
            Robotics fundamentals, coding, and problem-solving through interactive, hands-on projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              onClick={() => scrollToSection('register')}
              className="relative group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-xl hover:shadow-2xl shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
              Enroll Now
            </button>
            <button 
              onClick={() => scrollToSection('overview')}
              className="bg-white hover:bg-slate-50 text-slate-700 font-extrabold px-10 py-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              Learn More
            </button>
          </div>

          {/* Trust Indicators / Stats */}
          <div className="pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-6 max-w-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-black text-xl">
                <FaUsers className="text-indigo-600" /> 10k+
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Students Joined</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-black text-xl">
                <FaStar className="text-amber-500" /> 4.9/5
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Parent Rating</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-black text-xl">
                <FaFire className="text-orange-500 animate-bounce" /> 15
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Seats Left</p>
            </div>
          </div>
        </motion.div>

        {/* Illustration Area */}
        <motion.div 
          className="lg:col-span-5 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative shapes behind image */}
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-orange-400/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl" />
          
          <div className="relative w-full max-w-[480px] aspect-square rounded-[32px] overflow-hidden shadow-2xl border-8 border-white/80 bg-white/50 backdrop-blur-sm shadow-indigo-900/10">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/5 via-purple-600/5 to-orange-500/5 mix-blend-overlay" />
            <img 
              src="/hero_illustration.png" 
              alt="AI and Robotics Coding Workshop for Kids" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
