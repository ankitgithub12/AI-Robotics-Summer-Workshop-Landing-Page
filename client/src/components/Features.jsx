import { motion } from 'framer-motion';
import { FaCogs, FaChalkboardTeacher, FaLaptopCode, FaAward } from 'react-icons/fa';

export default function Features() {
  const features = [
    {
      icon: <FaCogs />,
      title: 'Hands-on Projects',
      description: 'Children learn by doing, building real interactive AI applications and programming virtual robots.',
      color: 'from-blue-500 to-indigo-500 shadow-blue-100',
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Industry Mentors',
      description: 'Sessions are led by experienced robotics educators and software developers who love teaching kids.',
      color: 'from-purple-500 to-indigo-500 shadow-purple-100',
    },
    {
      icon: <FaLaptopCode />,
      title: 'Interactive Learning',
      description: 'Fully live classes with real-time peer collaborations, coding challenges, and regular debug sessions.',
      color: 'from-orange-500 to-amber-500 shadow-orange-100',
    },
    {
      icon: <FaAward />,
      title: 'Certificate of Completion',
      description: 'Successful participants receive a verified digital certificate to showcase their accomplishments.',
      color: 'from-pink-500 to-rose-500 shadow-pink-100',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
  };

  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute right-[-10%] top-[10%] h-[300px] w-[300px] rounded-full bg-indigo-100/30 blur-3xl" />
      <div className="absolute left-[-10%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-purple-100/30 blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Why Choose This Workshop?
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-semibold max-w-lg mx-auto">
            We provide a premium educational experience designed to foster critical thinking, coding skills, and technological literacy in young minds.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.01 }}
              className="group bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 flex flex-col h-full text-left relative overflow-hidden"
            >
              {/* Subtle top stripe gradient indicator */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feat.color.split(' ')[0]} ${feat.color.split(' ')[1]}`} />
              
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white text-2xl shadow-lg mb-8 group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
                {feat.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium flex-grow">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
