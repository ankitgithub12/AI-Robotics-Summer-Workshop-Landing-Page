import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser, FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { adminLogin, userSignup, userLogin } from '../services/api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [authSuccess, setAuthSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    setApiError('');
    try {
      if (activeTab === 'login') {
        // If email is admin@workshop.com, attempt real login
        if (data.email === 'admin@workshop.com') {
          const res = await adminLogin(data.email, data.password);
          localStorage.setItem('adminToken', res.token);
          localStorage.setItem('adminUser', JSON.stringify(res.admin));
          setAuthSuccess(true);
          setTimeout(() => {
            setAuthSuccess(false);
            reset();
            onClose();
            if (onLoginSuccess) onLoginSuccess('admin', res.token);
          }, 1500);
          return;
        } else {
          // Attempt student login
          const res = await userLogin(data.email, data.password);
          localStorage.setItem('userToken', res.token);
          localStorage.setItem('userUser', JSON.stringify(res.user));
          setAuthSuccess(true);
          setTimeout(() => {
            setAuthSuccess(false);
            reset();
            onClose();
            if (onLoginSuccess) onLoginSuccess('user', res.token);
          }, 1500);
          return;
        }
      } else {
        // Student signup
        const res = await userSignup({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        });
        localStorage.setItem('userToken', res.token);
        localStorage.setItem('userUser', JSON.stringify(res.user));
        setAuthSuccess(true);
        setTimeout(() => {
          setAuthSuccess(false);
          reset();
          onClose();
          if (onLoginSuccess) onLoginSuccess('user', res.token);
        }, 1500);
      }
    } catch (err) {
      setApiError(err.message || 'Authentication failed');
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    reset();
    setAuthSuccess(false);
    setApiError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden z-10 p-8 text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors font-bold text-lg"
            >
              ✕
            </button>

            {authSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
              >
                <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-3xl shadow-inner border border-emerald-100">
                  <FaCheckCircle />
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                  Success!
                </h4>
                <p className="text-slate-600 text-sm font-semibold max-w-xs leading-relaxed">
                  {activeTab === 'login' ? 'Successfully logged in to your account.' : 'Successfully registered. Welcome to Kidrove!'}
                </p>
              </motion.div>
            ) : (
              <div>
                {/* Tabs */}
                <div className="flex border-b border-slate-100 mb-8 mt-2">
                  <button
                    onClick={() => switchTab('login')}
                    className={`pb-4 text-base font-extrabold tracking-tight transition-all relative flex-1 ${
                      activeTab === 'login' ? 'text-indigo-600 font-black' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Login
                    {activeTab === 'login' && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => switchTab('signup')}
                    className={`pb-4 text-base font-extrabold tracking-tight transition-all relative flex-1 ${
                      activeTab === 'signup' ? 'text-indigo-600 font-black' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Sign Up
                    {activeTab === 'signup' && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                      />
                    )}
                  </button>
                </div>

                <h3 className="text-2xl font-black text-slate-950 tracking-tight mb-2">
                  {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
                  {activeTab === 'login' ? 'Access your student dashboard' : 'Join as parent or student'}
                </p>

                {apiError && (
                  <div className="mb-4 p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <FaExclamationCircle className="flex-shrink-0 text-base text-red-500" />
                    <span>{apiError}</span>
                  </div>
                )}

                {activeTab === 'login' && (
                  <div className="mb-5 text-[11px] text-indigo-600 font-semibold bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-100/50 leading-relaxed">
                    💡 <strong>Admin Mode:</strong> Use <code className="bg-white px-1 py-0.5 rounded border border-indigo-200 text-indigo-700">admin@workshop.com</code> (Password is in README.md).
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {activeTab === 'signup' && (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <FaUser className="text-sm" />
                          </div>
                          <input
                            type="text"
                            placeholder="Your full name"
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-sm font-semibold"
                            {...register('name', { required: 'Name is required' })}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                            <FaExclamationCircle /> {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                            +91
                          </div>
                          <input
                            type="tel"
                            placeholder="9876543210"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-sm font-semibold"
                            {...register('phone', {
                              required: 'Phone number is required',
                              pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid 10-digit Indian number' },
                            })}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                            <FaExclamationCircle /> {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <FaEnvelope className="text-sm" />
                      </div>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-sm font-semibold"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                        <FaExclamationCircle /> {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <FaLock className="text-sm" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-sm font-semibold"
                        {...register('password', {
                          required: 'Password is required',
                          minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                        <FaExclamationCircle /> {errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-black text-sm py-4 rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all"
                  >
                    {isSubmitting ? 'Authenticating...' : activeTab === 'login' ? 'Login' : 'Create Account'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
