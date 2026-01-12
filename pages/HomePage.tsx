
import React from 'react';
import { Link } from 'react-router-dom';
import TestimonialSection from '../components/TestimonialSection';

const HomePage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative bg-[#1A1A1B] py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#76BC21]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-white mb-12 lg:mb-0">
            <div className="inline-block bg-[#76BC21]/20 text-[#76BC21] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm border border-[#76BC21]/30">
              Dream, Learn, Achieve
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Professional <span className="text-[#76BC21]">Medical Coding</span> Academy
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
              Become a certified coding expert with Seyone. Our industry-leading curriculum and expert mentorship turn students into high-earning professionals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/courses" className="bg-[#76BC21] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#65a11c] transition-all text-center shadow-xl hover:shadow-[#76BC21]/20 hover:-translate-y-1">
                View Programs
              </Link>
              <Link to="/contact" className="border-2 border-white/20 hover:border-[#76BC21] text-white px-8 py-4 rounded-xl font-bold transition-all text-center backdrop-blur-sm">
                Inquire Now
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5 group">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200" alt="Medical Professional" className="w-full h-[450px] object-cover transform transition-transform group-hover:scale-105 duration-700" />
              <div className="absolute inset-0 bg-[#76BC21]/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#76BC21] rounded-2xl -z-0 opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Certified Professionals', value: '5,000+' },
              { label: 'Employment Rate', value: '98%' },
              { label: 'Specialized Courses', value: '15+' },
              { label: 'Expert Mentors', value: '25+' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-[#1A1A1B] mb-1">{stat.value}</div>
                <div className="text-[#76BC21] text-xs font-black uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Seyone? */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">The Seyone Edge</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">We provide a premium educational experience focused on real-world results.</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Expert Mentorship",
              desc: "Learn from instructors with decades of experience in clinical documentation and billing.",
              icon: "fa-user-tie",
              color: "text-[#76BC21]",
              bg: "bg-[#76BC21]/10"
            },
            {
              title: "SmartPath AI Support",
              desc: "Our proprietary AI assistant helps you navigate complex CPT and ICD-10 guidelines 24/7.",
              icon: "fa-bolt",
              color: "text-[#76BC21]",
              bg: "bg-[#76BC21]/10"
            },
            {
              title: "Career Placement",
              desc: "Extensive network of healthcare provider partners looking for Seyone-certified talent.",
              icon: "fa-rocket",
              color: "text-[#76BC21]",
              bg: "bg-[#76BC21]/10"
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className={`${item.bg} ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Call to Action */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-[#1A1A1B] rounded-[3rem] p-12 text-center text-white relative overflow-hidden border-b-8 border-[#76BC21]">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#76BC21]/5 rounded-full -ml-32 -mt-32"></div>
            <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10">Start Your Coding Journey Today</h2>
            <p className="text-slate-300 mb-10 text-lg max-w-2xl mx-auto relative z-10">
              Join thousands of successful alumni who are now working at top-tier healthcare organizations globally.
            </p>
            <div className="relative z-10">
              <Link to="/contact" className="bg-[#76BC21] text-white px-10 py-4 rounded-full font-black hover:bg-[#65a11c] transition-all inline-block shadow-2xl">
                Apply for Admission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
