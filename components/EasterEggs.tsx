'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASTER_EGGS: Record<string, { title: string; desc: string; color: string; emoji: string }> = {
  '/hire': { title: 'RECRUITER MODE ACTIVATED', desc: 'You are viewing the portfolio as a potential employer. Welcome! Dayanithe is ready for new opportunities.', color: '#00FFB3', emoji: '🎯' },
  '/developer': { title: 'DEVELOPER MODE ACTIVATED', desc: 'Source code is clean. Architecture is solid. This portfolio was built with Next.js, Framer Motion, and pure CSS wizardry.', color: '#00E5FF', emoji: '💻' },
  '/ai': { title: 'AI SYSTEMS ONLINE', desc: 'Dayanithe AI Developer Mode: Active. All AI systems operational. Prompt Engineering: 95/100. AI Development: 92/100.', color: '#7C3AED', emoji: '🤖' },
};

export default function EasterEggs() {
  const [buffer, setBuffer] = useState('');
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const next = buffer + e.key;
      setBuffer(next.slice(-12)); // keep last 12 chars
      const match = Object.keys(EASTER_EGGS).find(k => next.endsWith(k));
      if (match) {
        setActive(match);
        setBuffer('');
        setTimeout(() => setActive(null), 5000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [buffer]);

  return (
    <AnimatePresence>
      {active && EASTER_EGGS[active] && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="easter-egg-notification"
          onClick={() => setActive(null)}
        >
          <div className="text-5xl mb-4">{EASTER_EGGS[active].emoji}</div>
          <div className="font-orbitron text-xl font-black mb-3 tracking-wider" style={{
            color: EASTER_EGGS[active].color,
            textShadow: `0 0 20px ${EASTER_EGGS[active].color}`,
          }}>
            {EASTER_EGGS[active].title}
          </div>
          <p className="font-rajdhani text-sm text-white/70 max-w-xs mx-auto leading-relaxed">
            {EASTER_EGGS[active].desc}
          </p>
          <div className="mt-4 font-mono text-[10px] text-white/30">Click anywhere to dismiss</div>

          {/* Animated border */}
          <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
            background: `linear-gradient(135deg, ${EASTER_EGGS[active].color}10, transparent, ${EASTER_EGGS[active].color}10)`,
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
