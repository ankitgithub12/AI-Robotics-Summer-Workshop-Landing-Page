import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        {/* Brand & Mission */}
        <div className="md:col-span-5 text-left space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Kidrove
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Empowering the next generation of innovators, developers, and makers with live, interactive, and project-based technology workshops.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
              <FaLinkedin />
            </a>
            <a href="#" className="h-9 w-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 text-left space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm font-semibold">
            <li>
              <button onClick={() => scrollToSection('overview')} className="hover:text-white transition-colors">Overview</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Why Choose Us</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('curriculum')} className="hover:text-white transition-colors">Curriculum</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('faqs')} className="hover:text-white transition-colors">FAQs</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('register')} className="hover:text-white transition-colors">Enroll Now</button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-4 text-left space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">
            Contact Information
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <FaEnvelope className="text-indigo-400 mt-1 flex-shrink-0" />
              <span>support@kidrove.com</span>
            </li>
            <li className="flex items-start gap-3">
              <FaPhone className="text-indigo-400 mt-1 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-indigo-400 mt-1 flex-shrink-0" />
              <span className="leading-relaxed">
                Kidrove Edu Labs, 4th Floor, Tech Hub Sector 62, Noida, UP - 201301
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright border */}
      <div className="container mx-auto px-6 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-medium flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} Kidrove Educational Platforms Private Limited. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
