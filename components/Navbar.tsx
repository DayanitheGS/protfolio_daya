'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#hero',         label: 'HOME'     },
  { href: '#about',        label: 'PROFILE'  },
  { href: '#skills',       label: 'SKILLS'   },
  { href: '#journey',      label: 'JOURNEY'  },
  { href: '#projects',     label: 'PROJECTS' },
  { href: '#ailab',        label: 'AI LAB'   },
  { href: '#achievements', label: 'AWARDS'   },
  { href: '#contact',      label: 'CONTACT'  },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active,     setActive]     = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background:     scrolled ? 'rgba(10,12,16,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom:   scrolled ? '1px solid rgba(233,29,34,0.18)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <motion.a href="#hero" className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="50" rx="10" ry="13" fill="#e91d22" />
            <circle cx="50" cy="32" r="8" fill="#e91d22" />
            <ellipse cx="46" cy="30" rx="3" ry="2" fill="white" transform="rotate(-15 46 30)" />
            <ellipse cx="54" cy="30" rx="3" ry="2" fill="white" transform="rotate(15 54 30)" />
            <line x1="40" y1="46" x2="18" y2="34" stroke="#e91d22" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="50" x2="14" y2="48" stroke="#e91d22" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="54" x2="20" y2="66" stroke="#e91d22" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="46" x2="82" y2="34" stroke="#e91d22" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="50" x2="86" y2="48" stroke="#e91d22" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="54" x2="80" y2="66" stroke="#e91d22" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: "'Bebas Neue','Orbitron',sans-serif", fontSize: '1.3rem', letterSpacing: '0.08em', color: '#ffffff' }}>
            DGS<span style={{ color: '#e91d22' }}>://</span>
          </span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => {
            const isActive = active === link.href.slice(1);
            return (
              <a key={link.href} href={link.href}
                className="relative font-mono-tech text-[10px] tracking-[0.18em] transition-all duration-300"
                style={{ color: isActive ? '#e91d22' : 'rgba(255,255,255,0.45)' }}
                onClick={() => { setActive(link.href.slice(1)); setMobileOpen(false); }}
              >
                {link.label}
                {isActive && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: '#e91d22', boxShadow: '0 0 6px rgba(233,29,34,0.8)' }} />
                )}
              </a>
            );
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono-tech text-[9px] text-red-500 tracking-wider">ONLINE</span>
          </div>
          <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="hidden md:block btn-primary text-[9px] px-4 py-2"
            onClick={() => setActive('contact')}>
            HIRE ME
          </motion.a>
          <button className="lg:hidden flex flex-col gap-1.5 p-2 ml-1 shrink-0 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Navigation Menu">
            <motion.div animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} className="w-5 h-0.5" style={{ background: '#e91d22' }} />
            <motion.div animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-4 h-0.5" style={{ background: '#e91d22' }} />
            <motion.div animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className="w-5 h-0.5" style={{ background: '#e91d22' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="lg:hidden"
            style={{ background: 'rgba(10,12,16,0.99)', borderBottom: '1px solid rgba(233,29,34,0.2)' }}>
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <a key={link.href} href={link.href}
                  className="font-mono-tech text-xs tracking-widest py-3 px-3 border-b transition-colors"
                  style={{ color: active === link.href.slice(1) ? '#e91d22' : 'rgba(255,255,255,0.55)', borderColor: 'rgba(233,29,34,0.08)' }}
                  onClick={() => { setActive(link.href.slice(1)); setMobileOpen(false); }}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
