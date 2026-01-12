
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { authService, User } from '../services/authService';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const location = useLocation();

  const navLinks = [
    { name: 'Courses', path: '/courses', icon: 'fa-book-open' },
    { name: 'Stories', path: '/#success-stories', icon: 'fa-star' },
    { name: 'Dashboard', path: '/dashboard', icon: 'fa-user-graduate' },
    { name: 'About', path: '/about', icon: 'fa-users' },
    { name: 'Contact', path: '/contact', icon: 'fa-paper-plane' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(authService.getCurrentUser());
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 pointer-events-auto">
      {/* Mobile Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 md:hidden pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      <header
        className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] w-full ${isScrolled
          ? 'bg-white/80 backdrop-blur-3xl py-3 px-6 shadow-md border-b border-white/40'
          : 'bg-white/95 backdrop-blur-sm py-4 px-6 shadow-sm border-b border-slate-100'
          }`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-full">
          <div className="flex items-center h-full">
            <Link to="/" className="flex items-center group shrink-0" onClick={() => setIsOpen(false)}>
              <Logo
                className={`transition-all duration-500 ${isScrolled ? 'h-9 md:h-10' : 'h-12 md:h-16'}`}
                showSubtext={!isScrolled}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  if (link.path.startsWith('/#')) {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const id = link.path.split('#')[1];
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.1em] transition-all rounded-full relative group flex items-center h-10 ${isActive(link.path)
                  ? 'text-[#76BC21] bg-[#76BC21]/5'
                  : 'text-slate-600 hover:text-[#1A1A1B] hover:bg-slate-50'
                  }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive(link.path) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#76BC21] rounded-full animate-pulse"></span>
                )}
              </Link>
            ))}

            <div className="ml-4 pl-4 border-l border-slate-200 flex items-center h-10 gap-2">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end hidden lg:flex">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1B]">{currentUser.name}</span>
                    <button
                      onClick={() => {
                        authService.logout();
                      }}
                      className="text-[9px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                    >
                      Log Out
                    </button>
                  </div>
                  <Link to="/dashboard" className="w-9 h-9 bg-[#76BC21] rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform">
                    <span className="font-black text-xs">{currentUser.name.charAt(0).toUpperCase()}</span>
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all text-slate-600 hover:text-[#1A1A1B] hover:bg-slate-50"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 whitespace-nowrap ${isScrolled
                      ? 'bg-[#1A1A1B] text-white hover:bg-[#76BC21] hover:shadow-[#76BC21]/20'
                      : 'bg-[#76BC21] text-white hover:bg-[#1A1A1B] hover:shadow-black/20'
                      }`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 z-[120] ${isOpen ? 'bg-[#1A1A1B] text-white rotate-90 shadow-lg' : 'bg-slate-100 text-slate-600'
              }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars-staggered'} text-lg`}></i>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden fixed inset-x-4 top-[90px] bg-white rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.25)] border border-slate-100 p-6 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-[110] ${isOpen
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : '-translate-y-8 opacity-0 scale-95 pointer-events-none'
            }`}
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  if (link.path.startsWith('/#')) {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const id = link.path.split('#')[1];
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }
                  } else {
                    setIsOpen(false);
                  }
                }}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all active:scale-[0.98] ${isActive(link.path) ? 'bg-[#76BC21] text-white shadow-lg shadow-[#76BC21]/30' : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive(link.path) ? 'bg-white/20' : 'bg-slate-100'}`}>
                    <i className={`fas ${link.icon} text-xs`}></i>
                  </div>
                  <span className="font-black text-[11px] uppercase tracking-[0.15em]">{link.name}</span>
                </div>
                <i className="fas fa-chevron-right text-[10px] opacity-40"></i>
              </Link>
            ))}

            <div className="pt-6 border-t border-slate-100 mt-4">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 bg-[#76BC21] rounded-full flex items-center justify-center text-white shadow-md">
                      <span className="font-black text-sm">{currentUser.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1A1A1B]">{currentUser.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{currentUser.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center gap-3 bg-[#1A1A1B] text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-black/10 active:scale-95 transition-transform mb-3"
                  >
                    <i className="fas fa-user-graduate"></i>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      authService.logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-red-50 text-red-500 p-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] active:scale-95 transition-transform"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-3 bg-slate-100 text-[#1A1A1B] p-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] mb-3 active:scale-95 transition-transform"
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center gap-3 bg-[#1A1A1B] text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-black/10 active:scale-95 transition-transform"
                  >
                    <i className="fas fa-user-plus"></i>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
