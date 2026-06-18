import { motion } from 'framer-motion';

export default function Curriculum() {
  const weeks = [
    {
      week: 'Week 1',
      title: 'Introduction to AI',
      description: 'Demystify artificial intelligence. Learn how computers recognize objects, read text, and make decisions.',
      topics: ['What is Artificial Intelligence?', 'Machine Learning & Neural Networks', 'Interactive Object & Gesture Recognition', 'Building a simple AI Classifier'],
      color: 'indigo',
    },
    {
      week: 'Week 2',
      title: 'Robotics Basics',
      description: 'Get acquainted with physical and virtual robotics systems. Understand the sensory inputs and outputs of machines.',
      topics: ['Key Elements of a Robot (Sensors, Controllers, Actuators)', 'How Robots Navigate & Detect Obstacles', 'Simulating Robots in Virtual Environments', 'Understanding Motor Controls'],
      color: 'purple',
    },
    {
      week: 'Week 3',
      title: 'Coding & Automation',
      description: 'Build logic pathways. Program your virtual systems to perform operations autonomously.',
      topics: ['Visual Coding Logic & Logic Statements', 'Variables, Conditions (If/Else), & Loops', 'Programming Path Navigation', 'Automating Virtual Smart Home Devices'],
      color: 'orange',
    },
    {
      week: 'Week 4',
      title: 'Final Project & Showcase',
      description: 'Unleash your creativity. Build your own intelligent robot simulation and present it to peers.',
      topics: ['Obstacle Avoiding & Autonomous Parking Bot', 'Testing, Debugging & Optimization', 'Live Presentation & Graduation Ceremony', 'Career and Future Pathways in Tech'],
      color: 'pink',
    },
  ];

  const colorStyles = {
    indigo: {
      bg: 'bg-indigo-50/50 border-indigo-100/80',
      text: 'text-indigo-700',
      dot: 'bg-indigo-600 ring-indigo-200',
      badge: 'bg-indigo-600 text-white',
      borderGlow: 'hover:border-indigo-300',
    },
    purple: {
      bg: 'bg-purple-50/50 border-purple-100/80',
      text: 'text-purple-700',
      dot: 'bg-purple-600 ring-purple-200',
      badge: 'bg-purple-600 text-white',
      borderGlow: 'hover:border-purple-300',
    },
    orange: {
      bg: 'bg-orange-50/50 border-orange-100/80',
      text: 'text-orange-700',
      dot: 'bg-orange-600 ring-orange-200',
      badge: 'bg-orange-600 text-white',
      borderGlow: 'hover:border-orange-300',
    },
    pink: {
      bg: 'bg-pink-50/50 border-pink-100/80',
      text: 'text-pink-700',
      dot: 'bg-pink-600 ring-pink-200',
      badge: 'bg-pink-600 text-white',
      borderGlow: 'hover:border-pink-300',
    },
  };

  return (
    <section id="curriculum" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute left-[5%] top-[30%] h-[400px] w-[400px] rounded-full bg-purple-100/30 blur-[120px]" />
      <div className="absolute right-[5%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-indigo-100/20 blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Workshop Curriculum
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-semibold max-w-lg mx-auto">
            A comprehensive, step-by-step 4-week roadmap designed to take young minds from curious observers to builders of technology.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line centered (desktop) or left (mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200/80 -translate-x-1/2" />

          <div className="space-y-16">
            {weeks.map((item, index) => {
              const styles = colorStyles[item.color];
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row items-start md:items-center relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Outer circle dot with pulse ring */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-slate-100 shadow flex items-center justify-center -translate-x-1/2 z-20">
                    <span className={`w-3.5 h-3.5 rounded-full ${styles.dot.split(' ')[0]} ring-4 ${styles.dot.split(' ')[1]}`} />
                  </div>

                  {/* Left/Right Card Spacer */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className={`bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 text-left relative hover:shadow-lg transition-all duration-300 ${styles.borderGlow}`}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${styles.badge}`}>
                          {item.week}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 text-sm font-semibold leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="border-t border-slate-100 pt-5">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                          Key Learning Modules:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-semibold">
                          {item.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className={`w-2 h-2 rounded-full mt-1 ${styles.dot.split(' ')[0]}`} />
                              <span className="leading-snug">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Side */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
