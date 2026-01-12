
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAPS_URL = "https://maps.app.goo.gl/gK8Mbww8KQfa2wDH8?g_st=aw";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setError(null);

    // User-provided EmailJS credentials
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setSubmitted(true);
      }, (error) => {
        console.error('Failed to send email:', error.text);
        setError("Failed to send your inquiry. Please try again or contact us via phone.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="pt-32 pb-20 bg-white animate-in fade-in duration-500">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">

          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-8">Ready to Level Up?</h1>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Have questions about our curriculum or career placement? Our admissions team is here to help you navigate your journey.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="bg-[#76BC21]/10 text-[#76BC21] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Phone Support</h4>
                  <p className="text-slate-500 text-sm">Mon-Sat: 9am - 7pm</p>
                  <a href="tel:+918608417396" className="text-[#76BC21] font-bold hover:underline">+91 86084 17396</a>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-[#76BC21]/10 text-[#76BC21] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Email Admissions</h4>
                  <p className="text-slate-500 text-sm">Typical response within 24h</p>
                  <a href="mailto:seyonecodingtech@gmail.com" className="text-[#76BC21] font-bold text-wrap break-all hover:underline">seyonecodingtech@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-[#76BC21]/10 text-[#76BC21] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Academy Campus</h4>
                  <p className="text-slate-500 text-sm text-wrap max-w-xs mb-2">
                    622/2B1, Muthu Nagar, KPM Opp, Eachanari, Coimbatore, Tamil Nadu
                  </p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1A1A1B] font-bold text-sm flex items-center hover:text-[#76BC21] transition-colors"
                  >
                    View on Google Maps <i className="fas fa-external-link-alt ml-2 text-[10px]"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative">
              {submitted ? (
                <div className="text-center py-12 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-[#76BC21] text-white rounded-full flex items-center justify-center mx-auto text-4xl mb-8 shadow-xl shadow-[#76BC21]/30">
                    <i className="fas fa-check"></i>
                  </div>
                  <h2 className="text-3xl font-black text-[#1A1A1B] mb-4">Message Received!</h2>
                  <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to Seyone Academy. One of our career advisors will review your inquiry and contact you within 24 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-white text-slate-600 border border-slate-200 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 animate-in slide-in-from-top-2">
                      <i className="fas fa-exclamation-circle mr-2"></i> {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="user_name"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#76BC21] outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="user_email"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#76BC21] outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">Interested Course</label>
                    <div className="relative">
                      <select
                        name="course_interest"
                        className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#76BC21] outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="Basic Medical Coding Training">Basic Medical Coding Training</option>
                        <option value="Advance Medical Coding Training">Advance Medical Coding Training</option>
                        <option value="CPC Training">CPC Training</option>
                        <option value="CRC Training">CRC Training</option>
                        <option value="Other / Inquiry">Other / Inquiry</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                        <i className="fas fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">Your Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#76BC21] outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-[#76BC21] text-white font-black py-5 rounded-xl hover:bg-[#65a11c] transition-all shadow-xl shadow-[#76BC21]/20 active:scale-95 text-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <i className="fas fa-circle-notch fa-spin mr-3"></i> Sending...
                      </>
                    ) : (
                      'Send Inquiry'
                    )}
                  </button>

                  <p className="text-center text-[10px] text-slate-400 font-medium">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
