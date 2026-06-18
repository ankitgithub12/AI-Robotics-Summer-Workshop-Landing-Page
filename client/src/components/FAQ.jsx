import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export default function FAQ() {
  const faqs = [
    {
      question: 'Do children need prior coding knowledge?',
      answer: 'No, the workshop is designed to be completely beginner-friendly. We start from the absolute basics of logic, programming block simulations, and robotics foundations.',
    },
    {
      question: 'Will participants receive a certificate?',
      answer: 'Yes, all successful participants will receive a verified digital "AI & Robotics Summer Graduate" Certificate of Completion at the end of the workshop.',
    },
    {
      question: 'Are classes recorded?',
      answer: 'Yes, all live classes are recorded. If a student misses a session or wants to review the concepts, recordings and worksheets will be available on the student portal.',
    },
    {
      question: 'What equipment is required?',
      answer: 'A laptop or desktop computer (Windows, macOS, or ChromeOS) with a functioning webcam, microphone, and a stable internet connection. No special physical kit needs to be purchased since we use advanced virtual simulator software.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600">
            Have questions about the workshop? Here are answers to the most common queries we receive.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`ml-4 text-indigo-600 flex-shrink-0`}
                  >
                    <FaChevronDown className="text-sm" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
