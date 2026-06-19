'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: '⌂', title: 'HOME' },
  { id: 'about', label: '👤', title: 'PROFILE' },
  { id: 'skills', label: '⚡', title: 'STATS' },
  { id: 'journey', label: '🗺', title: 'QUESTS' },
  { id: 'projects', label: '🚀', title: 'PROJECTS' },
  { id: 'ailab', label: '🤖', title: 'AI LAB' },
  { id: 'achievements', label: '🏅', title: 'AWARDS' },
  { id: 'contact', label: '✉', title: 'CONTACT' },
];

export default function QuickNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  if (!scrolled) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex flex-col gap-2 mb-2"
          >
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(s.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-orbitron font-bold tracking-wider"
                style={{
                  background: 'rgba(5,8,22,0.95)',
                  border: '1px solid rgba(0,229,255,0.3)',
                  color: '#00E5FF',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 15px rgba(0,229,255,0.1)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{s.label}</span>
                <span>{s.title}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full flex items-center justify-center font-orbitron text-lg font-black"
        style={{
          background: open
            ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,229,255,0.2))'
            : 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,229,255,0.05))',
          border: '1px solid rgba(0,229,255,0.5)',
          color: '#00E5FF',
          boxShadow: '0 0 20px rgba(0,229,255,0.3), 0 0 40px rgba(0,229,255,0.1)',
          backdropFilter: 'blur(10px)',
        }}
        animate={{
          boxShadow: open
            ? ['0 0 20px rgba(124,58,237,0.5)', '0 0 40px rgba(124,58,237,0.3)']
            : ['0 0 20px rgba(0,229,255,0.3)', '0 0 40px rgba(0,229,255,0.15)', '0 0 20px rgba(0,229,255,0.3)'],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {open ? '✕' : '≡'}
      </motion.button>
    </div>
  );
}
