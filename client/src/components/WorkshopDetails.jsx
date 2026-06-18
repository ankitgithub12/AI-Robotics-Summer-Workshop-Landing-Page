import { motion } from 'framer-motion';
import { FaChild, FaClock, FaLaptop, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';

export default function WorkshopDetails() {
  const details = [
    {
      icon: <FaChild className="text-2xl text-indigo-600" />,
      label: 'Age Group',
      value: '8–14 Years',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50/50 border-indigo-100/80',
      shadowColor: 'shadow-indigo-100',
    },
    {
      icon: <FaClock className="text-2xl text-purple-600" />,
      label: 'Duration',
      value: '4 Weeks',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50/50 border-purple-100/80',
      shadowColor: 'shadow-purple-100',
    },
    {
      icon: <FaLaptop className="text-2xl text-teal-600" />,
      label: 'Mode',
      value: 'Online (Live)',
      color: 'from-teal-500 to-emerald-500',
      bgColor: 'bg-teal-50/50 border-teal-100/80',
      shadowColor: 'shadow-teal-100',
    },
    {
      icon: <FaRupeeSign className="text-2xl text-orange-600" />,
      label: 'Fee',
      value: '₹2,999',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50/50 border-orange-100/80',
      shadowColor: 'shadow-orange-100',
    },
    {
      icon: <FaCalendarAlt className="text-2xl text-pink-600" />,
      label: 'Start Date',
      value: '15 July 2026',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50/50 border-pink-100/80',
      shadowColor: 'shadow-pink-100',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section id="overview" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute right-[-10%] top-[-20%] h-[350px] w-[350px] rounded-full bg-slate-50 blur-2xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Workshop Quick Overview
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-semibold max-w-lg mx-auto">
            Everything you need to know about our upcoming live sessions. Designed to accommodate young learners with zero prior knowledge.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {details.map((detail, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)' }}
              className={`p-6 rounded-2xl border text-center flex flex-col items-center justify-center transition-all duration-300 bg-white relative overflow-hidden shadow-sm hover:border-slate-200/80 border-slate-100`}
            >
              {/* Highlight background glow */}
              <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-5 filter blur-xl bg-gradient-to-tr ${detail.color}`} />
              
              {/* Icon Container with glowing ring */}
              <div className={`p-4 rounded-full mb-4 border ${detail.bgColor} flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner`}>
                {detail.icon}
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">
                {detail.label}
              </span>
              <span className="text-lg font-black text-slate-800 tracking-tight">
                {detail.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
