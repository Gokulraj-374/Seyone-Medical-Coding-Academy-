
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-8">Our Mission at <span className="text-blue-600">Seyone</span></h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10">
            Founded in 2015, Seyone Medical Coding Academy was built with a single goal: to bridge the gap between healthcare documentation and financial success through expert education.
          </p>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16">
            <img src="https://picsum.photos/1200/600?classroom" alt="Academy Life" className="w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-800 mb-6">Bridging the Talent Gap</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                The healthcare industry is evolving rapidly. With the transition to complex coding systems and the rise of telehealth, the demand for certified medical coders has never been higher. 
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We don't just teach you how to read a code book; we teach you the clinical reasoning behind every diagnosis and procedure. Our graduates are recognized by major hospitals and billing companies for their accuracy and ethical standards.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-slate-800 font-bold">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 text-xs">
                    <i className="fas fa-check"></i>
                  </div>
                  AAPC & AHIMA Aligned Curriculum
                </div>
                <div className="flex items-center text-slate-800 font-bold">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 text-xs">
                    <i className="fas fa-check"></i>
                  </div>
                  Global Alumni Network
                </div>
                <div className="flex items-center text-slate-800 font-bold">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 text-xs">
                    <i className="fas fa-check"></i>
                  </div>
                  Hands-on Electronic Health Records (EHR) Training
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <img src="https://picsum.photos/400/500?study1" className="rounded-2xl shadow-lg" alt="Student" />
               <img src="https://picsum.photos/400/500?study2" className="rounded-2xl shadow-lg mt-8" alt="Instructor" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-16">Meet Our Visionaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Dr. Sarah Chen", role: "Founder & Lead Mentor", img: "https://picsum.photos/200/200?person1" },
              { name: "Marcus Thompson", role: "Head of Placement", img: "https://picsum.photos/200/200?person2" },
              { name: "Elena Rodriguez", role: "Director of Curriculum", img: "https://picsum.photos/200/200?person3" }
            ].map((leader, i) => (
              <div key={i} className="group">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-blue-800 transition-all group-hover:border-blue-400 group-hover:scale-110">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold mb-1">{leader.name}</h4>
                <p className="text-blue-300 text-sm">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
