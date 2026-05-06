import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

  const handleNavClick = (e, sectionId) => {
    setIsMobileMenuOpen(false);

    if (sectionId === 'home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    } else if (location.pathname !== '/') {
      // Allow browser to handle navigation to main page + hash
    }
  };

  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'what-sakhi-does', name: 'What Sakhi Does' },
    { id: 'dr-pratap', name: 'Dr Pratap' },
    { id: 'a-day-with-sakhi', name: 'Day with Sakhi' },
    { id: 'sakhi-circles', name: 'Sakhi Circles' },
    { id: 'testimonials', name: 'Voices' },
    
    { id: 'pricing', name: 'Pricing', sectionId: 'pricing' },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-transparent overflow-x-hidden font-sans text-earth-dark">
      {/* ... Navbar (omitted for brevity in instruction, but kept in code) ... */}
      {/* Responsive Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'h-20 sm:h-24 bg-white/90 backdrop-blur-2xl border-b shadow-md' : 'h-24 sm:h-28 bg-transparent'
          }`}
        style={{ borderColor: isScrolled ? 'var(--color-turmeric-amber)20' : 'transparent' }}
      >
        <div className="w-full h-full flex items-center justify-between gap-2 px-4 sm:px-[5%] lg:px-[8%]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center overflow-hidden">
              <img
                src="/Images/WhatsApp Image 2026-05-04 at 6.32.54 PM.jpeg"
                alt="HealthSakhi Logo"
                className="w-full h-full object-contain mix-blend-multiply contrast-[1.1] brightness-[1.05]"
              />
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-earth-dark group-hover:opacity-80 transition-opacity hidden sm:block">HealthSakhi</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-10 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.sectionId || link.id)}
                className="text-sm xl:text-base font-bold text-earth-muted hover:text-turmeric-amber transition-colors tracking-tight whitespace-nowrap"
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
                to={`/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.sectionId || link.id)}
                className="text-xs font-bold text-earth-muted hover:text-turmeric-amber transition-colors tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Button & Menu */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 justify-end">
            {/* Responsive Button Removed based on feedback */}

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-earth-dark hover:opacity-70 transition-opacity"
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
                    to={`/#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.sectionId || link.id)}
                    className="block px-4 py-3 sm:py-4 bg-gradient-to-r from-turmeric-soft/50 to-lotus-soft/50 rounded-xl text-sm sm:text-base font-medium text-earth-dark hover:from-turmeric-soft hover:to-lotus-soft transition-all active:scale-95"
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Mobile login button removed based on feedback */}              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-24 sm:pt-28 md:pt-28 lg:pt-28">
        <Outlet />
      </main>

      {/* Responsive Premium Footer */}
      <footer className="bg-charcoal py-8 sm:py-10 text-white w-full border-t border-white/5">
        <div className="w-full px-4 sm:px-[5%] lg:px-[8%]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
            {/* Left Line */}
            <div className="text-center md:text-left">
              <p className="text-[10px] sm:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">
                © 2026 HealthSakhi · Dr Pratap · Bangalore & Fujairah
              </p>
            </div>

            {/* Right Line */}
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-3 text-[10px] sm:text-[11px] font-bold text-white/60 uppercase tracking-[0.15em]">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <span className="text-white/30 hidden sm:inline">|</span>
              <a href="tel:+918001234567" className="text-turmeric-amber hover:text-white transition-colors">
                +91 800-123-4567
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;

