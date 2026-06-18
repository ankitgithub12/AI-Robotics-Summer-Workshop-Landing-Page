import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaExclamationCircle, FaLock } from 'react-icons/fa';
import { submitEnquiry } from '../services/api';

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  });

  const [notification, setNotification] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await submitEnquiry(data);
      if (res.success) {
        setNotification({
          type: 'success',
          message: res.message || 'Registration submitted successfully!',
        });
        reset(); // Clear form
      } else {
        setNotification({
          type: 'error',
          message: res.message || 'Registration failed.',
        });
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message || 'Server connection failed. Please try again.',
      });
    }

    // Auto close toast after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <section id="register" className="py-24 bg-white relative overflow-hidden">
      {/* Background glowing mesh */}
      <div className="absolute right-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-indigo-100/40 blur-[100px] animate-pulse" />
      <div className="absolute left-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-orange-100/30 blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-100 rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 shadow-indigo-900/5">
          
          {/* Information Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-8 md:p-12 flex flex-col justify-between text-left relative overflow-hidden">
            {/* Ambient decorative glowing circle */}
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 blur-2xl" />
            
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-black tracking-widest text-orange-200 bg-orange-950/30 border border-orange-500/20 px-3.5 py-2 rounded-full inline-block mb-8 shadow-sm">
                🔥 Limited Seats Remaining
              </span>
              <h3 className="text-3xl font-black mb-4 leading-[1.15] tracking-tight">
                Reserve Your Child's Spot Today
              </h3>
              <p className="text-indigo-100/90 text-sm leading-relaxed mb-10 font-medium">
                Sign up now to lock in the special introductory price of ₹2,999. Our live classes have capped batch sizes to ensure individual attention.
              </p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex gap-4 items-start bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <FaCheckCircle className="text-xl text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight">Instant Confirmation</h4>
                  <p className="text-xs text-indigo-200 font-semibold mt-0.5">Session link and portal guide sent instantly via email.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <FaCheckCircle className="text-xl text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight">100% Refund Policy</h4>
                  <p className="text-xs text-indigo-200 font-semibold mt-0.5">No-questions-asked refund if cancelled before session 1.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-[10px] font-bold tracking-wide text-indigo-200/80 relative z-10 flex items-center gap-2">
              <FaLock className="text-indigo-300" /> Secure checkout & data protection
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center text-left">
            <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              Registration Form
            </h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-8">
              Please enter parent/guardian details below.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Parent / Guardian Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <FaUser className="text-sm" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full pl-11 pr-4 py-4 bg-slate-50 hover:bg-slate-100/30 focus:bg-white border ${
                      errors.name ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : 'border-slate-200/80 focus:ring-indigo-100 focus:border-indigo-600'
                    } rounded-2xl outline-none focus:ring-4 transition-all duration-200 text-sm font-semibold`}
                    {...register('name', {
                      required: 'Full name is required',
                      minLength: { value: 3, message: 'Name must be at least 3 characters long' },
                    })}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="text-xs font-bold text-red-500 flex items-center gap-1.5"
                    >
                      <FaExclamationCircle /> {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@domain.com"
                    className={`w-full pl-11 pr-4 py-4 bg-slate-50 hover:bg-slate-100/30 focus:bg-white border ${
                      errors.email ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : 'border-slate-200/80 focus:ring-indigo-100 focus:border-indigo-600'
                    } rounded-2xl outline-none focus:ring-4 transition-all duration-200 text-sm font-semibold`}
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="text-xs font-bold text-red-500 flex items-center gap-1.5"
                    >
                      <FaExclamationCircle /> {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-xs border-r border-slate-200 pr-3 mr-3">
                    <span className="flex items-center gap-1.5 pl-0.5">
                      <FaPhone className="text-xs rotate-90" />
                      +91
                    </span>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    className={`w-full pl-20 pr-4 py-4 bg-slate-50 hover:bg-slate-100/30 focus:bg-white border ${
                      errors.phone ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : 'border-slate-200/80 focus:ring-indigo-100 focus:border-indigo-600'
                    } rounded-2xl outline-none focus:ring-4 transition-all duration-200 text-sm font-semibold`}
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Please enter a valid 10-digit Indian mobile number starting with 6-9',
                      },
                    })}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                </div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="text-xs font-bold text-red-500 flex items-center gap-1.5"
                    >
                      <FaExclamationCircle /> {errors.phone.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button with Gradient Animation */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-black text-sm uppercase tracking-wider py-5 px-6 rounded-2xl text-white shadow-xl transition-all duration-500 overflow-hidden relative select-none ${
                  isSubmitting 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[right_center] active:scale-[0.99] shadow-indigo-100 hover:shadow-indigo-200/70 hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2.5">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing Details...</span>
                  </div>
                ) : (
                  'Reserve My Seat'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Animated Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className={`p-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm pointer-events-auto border bg-white ${
                notification.type === 'success' ? 'border-emerald-100 shadow-emerald-500/5' : 'border-rose-100 shadow-rose-500/5'
              }`}
            >
              {notification.type === 'success' ? (
                <FaCheckCircle className="text-emerald-500 text-xl flex-shrink-0" />
              ) : (
                <FaExclamationCircle className="text-rose-500 text-xl flex-shrink-0" />
              )}
              <div className="text-left">
                <h5 className="font-black text-slate-900 text-xs uppercase tracking-wider mb-0.5">
                  {notification.type === 'success' ? 'Success' : 'Error'}
                </h5>
                <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-slate-600 text-xs ml-auto font-black pl-2"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
