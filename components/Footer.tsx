
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  const MAPS_URL = "https://maps.app.goo.gl/gK8Mbww8KQfa2wDH8?g_st=aw";
  const GITHUB_URL = "https://github.com/Gokulraj-374/Seyone-Medical-Coding-Academy-";
  const DOMAIN_URL = "https://seyone.in";

  return (
    <footer className="bg-[#1A1A1B] text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="mb-6 block">
            <Logo light className="h-10" />
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Empowering healthcare professionals through world-class medical coding education and career placement. Dream, Learn, Achieve.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#76BC21] transition-colors" title="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.linkedin.com/in/seyone-medical-coding-academy-34aa313a1" target="_blank" rel="noopener noreferrer" className="hover:text-[#76BC21] transition-colors" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#76BC21] transition-colors" title="GitHub Repository">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="hover:text-[#76BC21] transition-colors" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-[#76BC21] transition-colors" title="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-[#76BC21]">Home</Link></li>
            <li><Link to="/courses" className="hover:text-[#76BC21]">Courses</Link></li>
            <li><Link to="/about" className="hover:text-[#76BC21]">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#76BC21]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Our Courses</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/courses" className="hover:text-[#76BC21]">Basic Medical Coding</Link></li>
            <li><Link to="/courses" className="hover:text-[#76BC21]">Advance Medical Coding</Link></li>
            <li><Link to="/courses" className="hover:text-[#76BC21]">CPC Training</Link></li>
            <li><Link to="/courses" className="hover:text-[#76BC21]">CRC Training</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3 group">
              <i className="fas fa-map-marker-alt mt-1 text-[#76BC21]"></i>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#76BC21] transition-colors leading-snug"
              >
                622/2B1, Muthu Nagar, KPM Opp, Eachanari, Coimbatore, Tamil Nadu
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <i className="fas fa-phone text-[#76BC21]"></i>
              <a href="tel:+918608417396" className="hover:text-[#76BC21] transition-colors">+91 86084 17396</a>
            </li>
            <li className="flex items-start space-x-3">
              <i className="fas fa-envelope mt-1 text-[#76BC21]"></i>
              <a
                href="mailto:seyonecodingtech@gmail.com"
                className="hover:text-[#76BC21] transition-colors break-all max-w-full"
              >
                seyonecodingtech@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Seyone Medical Coding Academy. Hosted at <a href={DOMAIN_URL} className="text-[#76BC21] hover:underline">seyone.in</a></p>
        <div className="mt-4 flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#76BC21] inline-flex items-center">
            <i className="fab fa-github mr-2"></i> View Project on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
