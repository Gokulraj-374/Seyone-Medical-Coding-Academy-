
import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';

// Updated data set with specific graduates and their achievements
const TESTIMONIALS = [
  {
    id: 1,
    name: "Shanmuga Priya",
    role: "Experienced Professional | Non-Life Science",
    achievement: "CPC – 76%",
    quote: "I am an experienced professional from a non–life science background. Seyone Coding Tech helped me understand medical coding concepts clearly from basics. The trainers were very supportive and exam-oriented. Because of their guidance, I successfully cleared CPC with 76%.",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Manivasan",
    role: "Psychotherapy Student",
    achievement: "CPC – 82%",
    quote: "I am an experienced psychotherapy student. The training at Seyone Coding Tech was excellent, with clear explanations and real-time examples. The CPC coaching was well structured, which helped me score 82%. Highly professional and knowledgeable trainers.",
    color: "bg-[#76BC21]"
  },
  {
    id: 3,
    name: "Priyadharshini",
    role: "Fresher | Non-Life Science",
    achievement: "CPC – 77%",
    quote: "I am a fresher from a non–life science background. Initially I was worried, but Seyone Coding Tech made learning medical coding very easy. The faculty explained everything patiently and guided me till exam completion. Happy to clear CPC with 77%.",
    color: "bg-purple-500"
  },
  {
    id: 4,
    name: "Lakshmi",
    role: "Diploma Student",
    achievement: "CPC – 76%",
    quote: "I am a diploma student and joined Seyone Coding Tech for CPC training. The teaching method was simple and effective. Regular practice and mock tests helped me gain confidence and clear CPC with 76%. Very good institute for medical coding.",
    color: "bg-orange-500"
  },
  {
    id: 5,
    name: "Surya Prakash",
    role: "Fresher | Engineering Student",
    achievement: "CPC – 83%",
    quote: "I am a fresher and engineering student. Seyone Coding Tech provided excellent medical coding training even for non-medical backgrounds. The trainers focus on guidelines and accuracy. With their support, I cleared CPC with 83%. Strongly recommended.",
    color: "bg-indigo-500"
  }
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 10000);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    startTimer();
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    startTimer();
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="success-stories" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">Success Stories</h2>
          <p className="text-[#76BC21] font-bold uppercase tracking-[0.2em] text-xs">Real Results from Our Graduates</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-xl relative z-10 transition-all duration-500 min-h-[500px] flex flex-col justify-center">
            <div className="absolute top-12 left-12 text-7xl text-[#76BC21]/10 pointer-events-none">
              <i className="fas fa-quote-left"></i>
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              {/* Star Rating */}
              <div className="flex space-x-1 mb-6 animate-in fade-in zoom-in duration-700">
                {[1, 2, 3, 4, 5].map((s) => (
                  <i key={s} className="fas fa-star text-amber-400 text-lg"></i>
                ))}
              </div>

              {/* Initial Avatar */}
              <div className={`w-24 h-24 rounded-[2rem] ${current.color} shadow-lg mb-8 flex items-center justify-center text-white text-4xl font-black transform transition-transform duration-500 hover:rotate-3`}>
                {current.name.charAt(0)}
              </div>

              {/* Achievement Badge */}
              <div className="inline-block bg-[#1A1A1B] text-[#76BC21] px-4 py-1.5 rounded-full text-sm font-black mb-6 shadow-md tracking-wide">
                {current.achievement}
              </div>

              <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-10 max-w-3xl animate-in slide-in-from-bottom-4 duration-500">
                "{current.quote}"
              </p>

              <div className="animate-in fade-in duration-1000">
                <h4 className="text-xl font-black text-[#1A1A1B] mb-1">{current.name}</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.15em]">{current.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#1A1A1B] hover:text-[#76BC21] transition-all hover:scale-110 active:scale-95 group"
            >
              <i className="fas fa-chevron-left group-hover:-translate-x-0.5 transition-transform"></i>
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20">
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#1A1A1B] hover:text-[#76BC21] transition-all hover:scale-110 active:scale-95 group"
            >
              <i className="fas fa-chevron-right group-hover:translate-x-0.5 transition-transform"></i>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-16 bg-[#76BC21] shadow-lg shadow-[#76BC21]/20' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
