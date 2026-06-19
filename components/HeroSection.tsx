'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const typingTexts = [
  'Building AI-powered solutions',
  'Creating scalable web applications',
  'Automating business workflows',
  'Transforming ideas into products',
];

const techStack = [
  { label: 'React',       color: '#61DAFB' },
  { label: 'Node.js',     color: '#68A063' },
  { label: 'MongoDB',     color: '#47A248' },
  { label: 'JavaScript',  color: '#F7DF1E' },
  { label: 'Python',      color: '#3776AB' },
  { label: 'AI / LLMs',  color: '#e91d22' },
];

// ─── Spider Avatar ────────────────────────────────────────────────────
function SpiderAvatar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!ref.current) return;
      const r  = ref.current.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height / 2) / window.innerHeight) * 14;
      const ry = ((e.clientX - r.left - r.width  / 2) / window.innerWidth)  * -14;
      ref.current.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{ boxShadow: ['0 0 20px rgba(233,29,34,0.25)', '0 0 50px rgba(233,29,34,0.55)', '0 0 20px rgba(233,29,34,0.25)'] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="relative flex items-center justify-center"
      style={{
        width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(ellipse at 35% 35%, rgba(233,29,34,0.15), rgba(100,0,0,0.1), rgba(10,12,16,0.8))',
        border: '2px solid rgba(233,29,34,0.35)',
        transition: 'transform 0.12s ease',
        flexShrink: 0,
      }}
    >
      {/* Spider SVG */}
      <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
        {/* Web thread from top */}
        <line x1="50" y1="0" x2="50" y2="20" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3 2" />
        {/* Body */}
        <ellipse cx="50" cy="52" rx="11" ry="14" fill="#e91d22" />
        {/* Head */}
        <circle cx="50" cy="34" r="9" fill="#e91d22" />
        {/* Eyes */}
        <ellipse cx="46" cy="32" rx="3.5" ry="2.5" fill="white" transform="rotate(-15 46 32)" />
        <ellipse cx="54" cy="32" rx="3.5" ry="2.5" fill="white" transform="rotate(15 54 32)" />
        {/* Spider emblem on chest */}
        <line x1="50" y1="44" x2="50" y2="58" stroke="black" strokeWidth="1.5" />
        <line x1="44" y1="50" x2="56" y2="50" stroke="black" strokeWidth="1.5" />
        <line x1="45" y1="46" x2="55" y2="56" stroke="black" strokeWidth="1" />
        <line x1="55" y1="46" x2="45" y2="56" stroke="black" strokeWidth="1" />
        {/* Legs Left */}
        <line x1="40" y1="48" x2="18" y2="36" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="39" y1="53" x2="13" y2="51" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="58" x2="20" y2="70" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
        {/* Legs Right */}
        <line x1="60" y1="48" x2="82" y2="36" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="61" y1="53" x2="87" y2="51" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="58" x2="80" y2="70" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
        {/* Level badge */}
        <circle cx="76" cy="22" r="12" fill="rgba(233,29,34,0.15)" stroke="#e91d22" strokeWidth="1" />
        <text x="76" y="19" textAnchor="middle" fill="#e91d22" fontSize="5" fontFamily="monospace">LVL</text>
        <text x="76" y="28" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace">21</text>
      </svg>
    </motion.div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────
export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const full = typingTexts[textIndex];
    if (isTyping) {
      if (displayText.length < full.length) {
        timeout = setTimeout(() => setDisplayText(full.slice(0, displayText.length + 1)), 50);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 25);
      } else {
        setTextIndex((textIndex + 1) % typingTexts.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, textIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg w-full">

      {/* ── Ambient red glow top ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(233,29,34,0.08) 0%, transparent 70%)' }} />

      {/* ── City silhouette bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 1 }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,120 L0,70 L40,70 L40,45 L60,45 L60,30 L80,30 L80,45 L100,45 L100,70 L140,70 L140,35 L160,35 L160,18 L180,18 L180,35 L200,35 L200,70 L240,70 L240,50 L260,50 L260,32 L275,32 L275,50 L290,50 L290,70 L330,70 L330,40 L350,40 L350,22 L370,22 L370,40 L390,40 L390,70 L430,70 L430,48 L450,48 L450,28 L468,28 L468,48 L486,48 L486,70 L520,70 L520,38 L540,38 L540,18 L558,18 L558,38 L576,38 L576,70 L615,70 L615,45 L635,45 L635,27 L653,27 L653,45 L671,45 L671,70 L710,70 L710,52 L730,52 L730,35 L748,35 L748,52 L766,52 L766,70 L805,70 L805,42 L825,42 L825,24 L843,24 L843,42 L861,42 L861,70 L900,70 L900,55 L920,55 L920,38 L938,38 L938,55 L956,55 L956,70 L995,70 L995,44 L1015,44 L1015,26 L1033,26 L1033,44 L1051,44 L1051,70 L1090,70 L1090,58 L1110,58 L1110,40 L1128,40 L1128,58 L1146,58 L1146,70 L1185,70 L1185,46 L1205,46 L1205,28 L1223,28 L1223,46 L1241,46 L1241,70 L1280,70 L1280,52 L1310,52 L1340,52 L1340,70 L1440,70 L1440,120 Z"
            fill="rgba(10,12,16,0.9)" />
        </svg>
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center justify-center" style={{ zIndex: 2 }}>
        <div className="flex flex-col items-center gap-10 text-center">

          {/* ── Spider Avatar ── */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex flex-col items-center gap-5"
          >
            {/* Web thread above */}
            <div className="w-px h-12" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3))' }} />

            <div className="relative flex items-center justify-center" style={{ width: 210, height: 210 }}>
              {/* Rotating rings */}
              <motion.div className="absolute rounded-full"
                style={{ width: 200, height: 200, border: '1px solid rgba(233,29,34,0.12)' }}
                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="absolute rounded-full"
                style={{ width: 175, height: 175, border: '1px dashed rgba(233,29,34,0.08)' }}
                animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} />
              <SpiderAvatar />
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap justify-center gap-2 max-w-xs">
              {techStack.map((t, i) => (
                <motion.span
                  key={t.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="px-3 py-1 rounded-full font-mono-tech text-[10px] tracking-wider"
                  style={{ background: `${t.color}10`, border: `1px solid ${t.color}28`, color: t.color }}
                >
                  {t.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── Text Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col items-center gap-5 w-full max-w-2xl"
          >
            {/* Section tag */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: '#e91d22' }} />
              <span className="font-mono-tech text-[10px] tracking-[0.3em]" style={{ color: '#e91d22' }}>
                FULL STACK · AI DEVELOPER
              </span>
              <div className="h-px w-8" style={{ background: '#e91d22' }} />
            </div>

            <div className="leading-none">
              <h1 style={{ fontFamily: "'Bebas Neue','Orbitron',sans-serif", fontSize: 'clamp(2.5rem, 7.5vw, 5.5rem)', letterSpacing: '0.06em', color: '#ffffff', lineHeight: 1.05 }}>
                DAYANITHE <span className="gradient-text-primary">G S</span>
              </h1>
            </div>

            {/* Level badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 font-mono-tech text-[10px] tracking-widest"
              style={{ background: 'rgba(233,29,34,0.08)', border: '1px solid rgba(233,29,34,0.3)', color: '#e91d22', clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)' }}>
              🕷 LEVEL 21 DEVELOPER
            </span>

            {/* Roles */}
            <div className="flex flex-col items-center gap-1">
              {[
                { text: 'Full Stack Developer', color: '#e91d22' },
                { text: 'AI Developer',         color: '#ff6b6b' },
                { text: 'Web Developer',        color: '#ffffff' },
              ].map((role, i) => (
                <motion.div key={role.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2">
                  <span style={{ color: '#e91d22', fontSize: '10px' }}>▸</span>
                  <span className="font-rajdhani text-base sm:text-lg" style={{ color: role.color }}>{role.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Typing terminal */}
            <div className="flex items-center gap-2 px-4 py-3 w-full max-w-md font-mono-tech text-xs sm:text-sm justify-center"
              style={{ background: 'rgba(233,29,34,0.03)', border: '1px solid rgba(233,29,34,0.12)' }}>
              <span style={{ color: '#e91d22' }}>{'>'}</span>
              <span className="text-white/80 min-h-[1.2em]">{displayText}</span>
              <span className="animate-blink" style={{ color: '#e91d22' }}>_</span>
            </div>

            {/* Current mission */}
            <div className="px-4 py-3 w-full max-w-md text-center"
              style={{ background: 'rgba(233,29,34,0.03)', border: '1px solid rgba(233,29,34,0.1)' }}>
              <div className="font-mono-tech text-[9px] tracking-widest mb-1" style={{ color: '#e91d22' }}>CURRENT MISSION</div>
              <div className="font-rajdhani text-sm sm:text-base text-white">AI Developer Intern @ Hinisys Software Ltd</div>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap gap-2 justify-center">
              {['Open For Opportunities', 'Open For Freelance', 'Open For Internships'].map(s => (
                <span key={s} className="flex items-center gap-1.5 px-3 py-1 rounded-full font-mono-tech text-[10px]"
                  style={{ background: 'rgba(0,200,80,0.04)', border: '1px solid rgba(0,200,80,0.18)', color: '#4ade80' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  {s}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1 justify-center">
              {[
                { label: '🕷 Start Mission', href: '#projects',    cls: 'btn-primary'   },
                { label: '⚡ View Projects', href: '#projects',    cls: 'btn-secondary' },
                { label: '📥 Resume',         href: '/resume.pdf', cls: 'btn-accent', download: true },
                { label: '✉ Contact Me',      href: '#contact',    cls: 'btn-primary'  },
              ].map(btn => (
                <motion.a key={btn.label} href={btn.href} download={btn.download || undefined}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <button className={`${btn.cls} py-2.5 px-6 text-[10px] sm:text-xs`}>{btn.label}</button>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
        animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="font-mono-tech text-[9px] tracking-widest" style={{ color: 'rgba(233,29,34,0.5)' }}>SCROLL</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, #e91d22, transparent)' }} />
      </motion.div>
    </section>
  );
}
