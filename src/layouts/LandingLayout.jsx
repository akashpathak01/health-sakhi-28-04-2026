import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ArrowRight, Mail, Phone, MapPin, Globe, Send, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Close mobile menu when scrolling
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, id) => {
    setIsMobileMenuOpen(false);

    if (id === 'home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      return;
    }

    if (id === 'demo') {
      // Just let the Link or a tag handle navigation to the new page
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    } else if (location.pathname !== '/') {
      // Allow browser to handle navigation to main page + hash
    }
  };

  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'features', name: 'Features' },
    { id: 'how-it-works', name: 'Journey' },
    { id: 'demo', name: 'Demo' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'testimonials', name: 'Stories' },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#FFF7F8] overflow-x-hidden font-sans">
      {/* ... Navbar (omitted for brevity in instruction, but kept in code) ... */}
      {/* Responsive Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'h-14 sm:h-16 md:h-16 lg:h-16 bg-white/90 backdrop-blur-2xl border-b shadow-md' : 'h-16 sm:h-20 md:h-20 lg:h-20 bg-transparent'
          }`}
        style={{ borderColor: isScrolled ? '#F3E7ED' : 'transparent' }}
      >
        <div className="w-full h-full flex items-center justify-between gap-2 px-4 sm:px-[5%] lg:px-[8%]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 group shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center overflow-hidden">
              <img src="/Images/logo.png" alt="HealthSakhi Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#2D1520] group-hover:opacity-80 transition-opacity hidden sm:block">HealthSakhi</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-10 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.id === 'demo' ? '/how-to-use' : `/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-xs xl:text-sm font-bold text-[#6B5E63] hover:text-[#A98DA4] transition-colors tracking-tight whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Tablet Navigation - Compact Version */}
          <div className="hidden md:flex lg:hidden items-center gap-3 flex-1 justify-center">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.id}
                to={link.id === 'demo' ? '/how-to-use' : `/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-xs font-bold text-[#6B5E63] hover:text-[#A98DA4] transition-colors tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Button & Menu */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 justify-end">
            {/* Responsive Button */}
            <Link
              to="/login"
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-white text-[10px] sm:text-xs md:text-sm font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all shadow-[#B197B0]/20 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, rgb(216, 167, 177), rgb(156, 123, 184))' }}
            >
              <span className="hidden sm:inline">Start Your Journey</span>
              <span className="sm:hidden">Login</span>
            </Link>

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#2D1520] hover:opacity-70 transition-opacity"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} className="sm:w-6 sm:h-6" /> : <Menu size={24} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Responsive Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 sm:top-20 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-xl lg:hidden"
            >
              <div className="w-full px-4 sm:px-[5%] lg:px-[8%] py-4 sm:py-6 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.id === 'demo' ? '/how-to-use' : `/#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="block px-4 py-3 sm:py-4 bg-gradient-to-r from-rose-50/50 to-purple-50/50 rounded-xl text-sm sm:text-base font-bold text-[#2D1520] hover:from-rose-100 hover:to-purple-100 transition-all active:scale-95"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 sm:py-4 bg-gradient-to-r from-[#ff69b4] to-[#9C7BB8] text-white rounded-xl text-sm sm:text-base font-bold text-center hover:shadow-lg transition-all active:scale-95"
                >
                  Portal Login
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-16 sm:pt-20 md:pt-20 lg:pt-20">
        <Outlet />
      </main>

      {/* Responsive Premium Footer */}
      <footer className="bg-[#120911] pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 sm:pb-8 md:pb-10 text-white overflow-hidden w-full">
        <div className="w-full px-4 sm:px-[5%] lg:px-[8%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 md:gap-6 lg:gap-8 mb-12 md:mb-20">
            {/* Column 1: Brand */}
            <div className="sm:col-span-2 md:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 sm:w-10 md:w-10 h-9 sm:h-10 md:h-10 flex items-center justify-center overflow-hidden">
                  <img src="/Images/logo.png" alt="HealthSakhi Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter text-white">HealthSakhi</span>
              </div>
              <p className="text-white/40 text-xs sm:text-sm md:text-[14px] leading-relaxed font-bold max-w-xs">
                India's most trusted women wellness portal. A safe, beautiful, and healing space built with love.
              </p>
              <div className="flex gap-3 sm:gap-4">
                {[Share2, Send, Globe, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#B197B0] hover:text-white transition-all duration-300">
                    <Icon size={14} className="sm:w-4 sm:h-4 md:w-[16px] md:h-[16px]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="sm:col-span-1 md:col-span-2 space-y-4 sm:space-y-8">
              <h4 className="text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/30">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-4 text-xs sm:text-sm md:text-[14px] font-bold text-white/50">
                {navLinks.map(link => (
                  <li key={link.id}><a href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)} className="hover:text-[#B197B0] transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="sm:col-span-1 md:col-span-3 space-y-4 sm:space-y-8">
              <h4 className="text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/30">Contact</h4>
              <ul className="space-y-3 sm:space-y-6">
                <li className="flex gap-2 sm:gap-3 text-xs sm:text-sm md:text-[14px] font-bold text-white/50">
                  <MapPin size={16} className="sm:w-5 sm:h-5 md:w-[18px] md:h-[18px] shrink-0 text-[#B197B0]" />
                  <span>Koramangala, Bangalore <br /> Karnataka, India 560034</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-[14px] font-bold text-white/50">
                  <Phone size={16} className="sm:w-5 sm:h-5 md:w-[18px] md:h-[18px] shrink-0 text-[#B197B0]" />
                  <span>+91 800-123-4567</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-[14px] font-bold text-white/50">
                  <Mail size={16} className="sm:w-5 sm:h-5 md:w-[18px] md:h-[18px] shrink-0 text-[#B197B0]" />
                  <span>care@healthsakhi.in</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="sm:col-span-2 md:col-span-3 space-y-4 sm:space-y-6">
              <h4 className="text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/30">Daily Healing Tips</h4>
              <p className="text-xs sm:text-sm md:text-[14px] font-medium text-white/40 leading-relaxed">
                Get gentle wellness tips, healing insights, and love in your inbox.
              </p>
              <div className="space-y-2 sm:space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full h-10 sm:h-12 md:h-14 px-3 sm:px-4 md:px-6 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl outline-none focus:border-[#B197B0] text-xs sm:text-sm font-bold text-white placeholder:text-white/20"
                />
                <button className="w-full h-10 sm:h-12 md:h-14 bg-gradient-to-r from-[#B197B0] to-[#9079C1] text-white rounded-lg sm:rounded-xl md:rounded-2xl font-black text-[8px] sm:text-xs md:text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-[8px] sm:text-[9px] md:text-[11px] font-bold text-white/20 uppercase tracking-widest text-center md:text-left">© 2026 HealthSakhi. Made with love for every woman.</p>
            <div className="flex gap-4 sm:gap-6 md:gap-8 text-[8px] sm:text-[9px] md:text-[11px] font-bold text-white/30 uppercase tracking-widest text-center md:text-left">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
              <span className="hover:text-white cursor-pointer transition-colors">Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;

