import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

export default function LearningOutcomes() {
  const outcomes = [
    {
      title: 'Understand AI Fundamentals',
      desc: 'Discover how artificial intelligence works behind the scenes, from basic models to neural networks, explained simply.'
    },
    {
      title: 'Learn Robotics Concepts',
      desc: 'Understand key mechanical, electrical, and programming components that enable robots to interact with their environment.'
    },
    {
      title: 'Build Beginner Robotics Projects',
      desc: 'Create simulation projects, virtual sensors, and motors, and see logic in action.'
    },
    {
      title: 'Develop Logical Thinking Skills',
      desc: 'Enhance cognitive debugging skills and step-by-step thinking by translating design ideas into code structure.'
    },
    {
      title: 'Gain Coding Experience Using Modern Tools',
      desc: 'Use industry-grade educational interfaces and visual block-based or text programming tools designed for youth.'
    },
    {
      title: 'Improve Creativity & Innovation',
      desc: 'Boost creative problem-solving by brainstorming, prototyping, and iterating on their final project concepts.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute right-[-10%] bottom-[-10%] h-[450px] w-[450px] rounded-full bg-orange-100/20 blur-[120px] animate-pulse duration-[8s]" />
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-100/25 blur-[120px] animate-pulse duration-[10s]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            What Your Child Will Learn
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-semibold max-w-lg mx-auto">
            By the end of this 4-week program, students will have built a strong conceptual foundation and hands-on coding confidence.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5, boxShadow: '0 25px 30px -10px rgba(79, 70, 229, 0.08)' }}
              className="bg-white border border-slate-100 rounded-3xl p-8 flex gap-6 items-start transition-all duration-300 hover:border-indigo-100"
            >
              {/* Checkbox badge with gradient background */}
              <div className="flex-shrink-0 mt-1 h-8 w-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <FaCheck className="text-xs" />
              </div>
              <div className="text-left space-y-2">
                <h3 className="text-lg font-black text-slate-900 leading-snug tracking-tight">
                  {outcome.title}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {outcome.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
