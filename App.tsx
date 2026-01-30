
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';


import SmartPathAI from './components/SmartPathAI';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen relative">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

          </Routes>
        </main>

        <Footer />

        {/* Floating AI Assistant Toggle */}
        <button
          onClick={() => setIsChatOpen(prev => !prev)}
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center group ${isChatOpen ? 'bg-[#1A1A1B] text-white' : 'bg-[#76BC21] text-white'
            }`}
          title="Ask Seyone SmartPath AI"
        >
          {isChatOpen ? (
            <i className="fas fa-times text-xl"></i>
          ) : (
            <>
              <i className="fas fa-robot text-xl"></i>
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap ml-0 group-hover:ml-2 font-bold text-sm">
                Ask Advisor
              </span>
            </>
          )}
        </button>

        {/* AI Sidebar/Modal */}
        {isChatOpen && (
          <div className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
            <SmartPathAI onClose={() => setIsChatOpen(false)} />
          </div>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
