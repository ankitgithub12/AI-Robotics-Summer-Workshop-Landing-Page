import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Mother of Aarav (Age 10)',
      feedback: 'My 10-year-old son absolutely loved the AI & Robotics workshop! The mentors made complex coding concepts so simple and visual. He was excited for every single session.',
      rating: 5,
      initials: 'PS',
      color: 'bg-indigo-600',
    },
    {
      name: 'Rajesh Patel',
      role: 'Father of Diya (Age 12)',
      feedback: 'Excellent curriculum and execution! I was skeptical about how robotics would work online, but the interactive simulator and step-by-step guidance kept my daughter engaged and coding independently.',
      rating: 5,
      initials: 'RP',
      color: 'bg-purple-600',
    },
    {
      name: 'Anjali Gupta',
      role: 'Mother of Kabir (Age 9)',
      feedback: 'Seeing my kid present a virtual obstacle-avoiding car project during the final showcase was amazing! The coding foundation they built in just 4 weeks is incredible. Absolute value for money.',
      rating: 5,
      initials: 'AG',
      color: 'bg-orange-600',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-[10%] right-[5%] h-[350px] w-[350px] rounded-full bg-pink-100/30 blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Loved by Parents & Students
          </h2>
          <p className="text-slate-505 text-sm md:text-base font-semibold max-w-md mx-auto">
            Hear from some of our graduates parents who have seen their children build confidence and learn real tech skills.
          </p>
        </div>

        {/* Carousel Frame */}
        <div className="relative min-h-[360px] md:min-h-[300px] flex items-center justify-center">
          
          {/* Slide Window */}
          <div className="w-full overflow-hidden px-4 md:px-12 py-4">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="bg-slate-50 border border-slate-100 rounded-[32px] p-8 md:p-12 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="absolute right-8 top-8 text-5xl text-indigo-600/5 pointer-events-none" />

                <div className="space-y-6">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400 text-lg" />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-slate-600 leading-relaxed italic text-base md:text-lg text-left">
                    "{current.feedback}"
                  </p>
                </div>

                {/* Author Credentials */}
                <div className="flex items-center gap-4 mt-8 border-t border-slate-200/50 pt-6">
                  <div className={`h-12 w-12 rounded-full ${current.color} flex items-center justify-center text-white text-sm font-black shadow-md`}>
                    {current.initials}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-slate-950 text-sm">{current.name}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-[-16px] md:left-[-24px] z-20 h-12 w-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-indigo-600 shadow-md hover:shadow-lg hover:-translate-x-0.5 active:translate-x-0 transition-all"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-16px] md:right-[-24px] z-20 h-12 w-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-indigo-600 shadow-md hover:shadow-lg hover:translate-x-0.5 active:translate-x-0 transition-all"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>

        {/* Index Dots */}
        <div className="flex justify-center gap-2.5 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
