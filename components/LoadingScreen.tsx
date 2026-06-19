'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SPIDER-MAN SVG LOGO (Miles Morales Spider) ─────────────────────
const SpiderLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Spider body */}
    <ellipse cx="50" cy="48" rx="10" ry="14" fill="#e91d22" stroke="#fff" strokeWidth="0.5" />
    {/* Spider head */}
    <circle cx="50" cy="30" r="8" fill="#e91d22" stroke="#fff" strokeWidth="0.5" />
    {/* Eyes */}
    <ellipse cx="46" cy="28" rx="3.5" ry="2.5" fill="white" transform="rotate(-15 46 28)" />
    <ellipse cx="54" cy="28" rx="3.5" ry="2.5" fill="white" transform="rotate(15 54 28)" />
    {/* Legs left */}
    <line x1="40" y1="44" x2="18" y2="32" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="40" y1="48" x2="14" y2="46" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="40" y1="52" x2="18" y2="64" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="40" y1="56" x2="22" y2="72" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
    {/* Legs right */}
    <line x1="60" y1="44" x2="82" y2="32" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="60" y1="48" x2="86" y2="46" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="60" y1="52" x2="82" y2="64" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="60" y1="56" x2="78" y2="72" stroke="#e91d22" strokeWidth="2.5" strokeLinecap="round" />
    {/* Web line from top */}
    <line x1="50" y1="0" x2="50" y2="22" stroke="white" strokeWidth="1" strokeDasharray="3 2" />
  </svg>
);

// ─── ANIMATED WEB CANVAS ─────────────────────────────────────────────
function WebCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let progress = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!active) { raf = requestAnimationFrame(draw); return; }

      progress = Math.min(progress + 0.008, 1);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxR = Math.sqrt(cx * cx + cy * cy);
      const spokes = 14;
      const rings = 10;

      ctx.strokeStyle = `rgba(233, 29, 34, ${0.5 * progress})`;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = '#e91d22';
      ctx.shadowBlur = 8;

      // Spokes
      const spokeP = Math.min(progress * 2, 1);
      for (let i = 0; i < spokes; i++) {
        const angle = (i * 2 * Math.PI) / spokes;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR * spokeP, cy + Math.sin(angle) * maxR * spokeP);
        ctx.stroke();
      }

      // Rings
      const ringP = Math.max(0, (progress - 0.2) / 0.8);
      for (let r = 1; r <= rings; r++) {
        const rr = (r / rings) * maxR;
        if (rr > maxR * ringP) break;
        ctx.beginPath();
        for (let i = 0; i <= spokes; i++) {
          const a = (i * 2 * Math.PI) / spokes;
          const pa = a - (2 * Math.PI) / spokes;
          const ma = a - Math.PI / spokes;
          const sag = rr * 0.91;
          const x1 = cx + Math.cos(pa) * rr, y1 = cy + Math.sin(pa) * rr;
          const x2 = cx + Math.cos(a) * rr, y2 = cy + Math.sin(a) * rr;
          const qx = cx + Math.cos(ma) * sag, qy = cy + Math.sin(ma) * sag;
          if (i === 0) ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(qx, qy, x2, y2);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}

// ─── GLITCH TEXT ─────────────────────────────────────────────────────
function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`} style={{ fontFamily: 'inherit' }}>
      <span className="relative z-10">{text}</span>
      <span
        aria-hidden
        className="absolute inset-0 text-red-400"
        style={{
          clipPath: 'polygon(0 30%, 100% 30%, 100% 50%, 0 50%)',
          transform: 'translate(-2px, 0)',
          animation: 'glitch1 3s infinite',
          opacity: 0.7,
        }}
      >{text}</span>
      <span
        aria-hidden
        className="absolute inset-0 text-white"
        style={{
          clipPath: 'polygon(0 65%, 100% 65%, 100% 75%, 0 75%)',
          transform: 'translate(2px, 0)',
          animation: 'glitch2 2.5s infinite',
          opacity: 0.6,
        }}
      >{text}</span>
    </span>
  );
}

// ─── MAIN LOADING SCREEN ─────────────────────────────────────────────
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'loader' | 'reveal' | 'web' | 'exit'>('loader');
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [webActive, setWebActive] = useState(false);

  // Progress bar animation
  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  // Phase timeline
  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 300);
    const t2 = setTimeout(() => setShowSub(true), 900);
    const t3 = setTimeout(() => { setPhase('reveal'); setWebActive(true); }, 2600);
    const t4 = setTimeout(() => setPhase('web'), 4200);
    const t5 = setTimeout(() => setPhase('exit'), 5800);
    const t6 = setTimeout(() => onComplete(), 6600);
    return () => { [t1,t2,t3,t4,t5,t6].forEach(clearTimeout); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="spiderman-loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 overflow-hidden select-none"
        style={{ zIndex: 9999, background: '#0a0c10' }}
      >
        {/* ── Red gradient background panel ── */}
        <motion.div
          className="absolute inset-0"
          initial={{ scaleY: 1, originY: 0 }}
          animate={phase === 'exit' ? { scaleY: 0, originY: 0 } : { scaleY: 1 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            background: 'linear-gradient(225deg, #ea1d22 0%, #6b0d0f 60%, #0a0c10 100%)',
            zIndex: 2,
          }}
        />

        {/* ── Dark overlay texture ── */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)`,
          }}
        />

        {/* ── Spider web canvas ── */}
        <div className="absolute inset-0" style={{ zIndex: 4 }}>
          <WebCanvas active={webActive} />
        </div>

        {/* ── City skyline silhouette ── */}
        <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 6 }}>
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ width: '100%', height: '140px', display: 'block' }}>
            <path
              d="M0,200 L0,120 L30,120 L30,80 L50,80 L50,60 L70,60 L70,80 L90,80 L90,40 L110,40 L110,80 L130,80 L130,100 L160,100 L160,50 L180,50 L180,30 L200,30 L200,50 L220,50 L220,100 L250,100 L250,70 L270,70 L270,45 L285,45 L285,70 L300,70 L300,100 L330,100 L330,55 L350,55 L350,35 L370,35 L370,55 L390,55 L390,100 L420,100 L420,65 L440,65 L440,40 L460,40 L460,65 L480,65 L480,85 L510,85 L510,45 L530,45 L530,20 L550,20 L550,45 L570,45 L570,85 L600,85 L600,60 L620,60 L620,40 L640,40 L640,60 L660,60 L660,85 L690,85 L690,50 L710,50 L710,30 L730,30 L730,50 L750,50 L750,85 L780,85 L780,100 L810,100 L810,55 L830,55 L830,35 L850,35 L850,55 L870,55 L870,100 L900,100 L900,70 L920,70 L920,48 L940,48 L940,70 L960,70 L960,100 L990,100 L990,60 L1010,60 L1010,38 L1030,38 L1030,60 L1050,60 L1050,100 L1080,100 L1080,75 L1100,75 L1100,50 L1120,50 L1120,75 L1140,75 L1140,100 L1170,100 L1170,55 L1190,55 L1190,32 L1210,32 L1210,55 L1230,55 L1230,100 L1260,100 L1260,68 L1280,68 L1280,45 L1300,45 L1300,68 L1320,68 L1320,100 L1350,100 L1350,80 L1380,80 L1380,120 L1440,120 L1440,200 Z"
              fill="#0a0c10"
              opacity="0.95"
            />
            {/* Windows */}
            {[110,180,270,370,460,550,640,730,830,940,1030,1120,1210,1300].map((x, i) => (
              <g key={i}>
                <rect x={x+2} y={i%2===0?42:25} width="6" height="5" fill="#e91d22" opacity="0.6" />
                <rect x={x+12} y={i%2===0?52:35} width="6" height="5" fill="#e91d22" opacity="0.4" />
                <rect x={x+2} y={i%2===0?60:42} width="6" height="5" fill="white" opacity="0.15" />
              </g>
            ))}
          </svg>
        </div>

        {/* ── Main content ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 10 }}>

          {/* Spider logo */}
          <motion.div
            initial={{ y: -80, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
            className="mb-6"
            style={{ filter: 'drop-shadow(0 0 20px rgba(233,29,34,0.9))' }}
          >
            <SpiderLogo className="w-20 h-20" />
          </motion.div>

          {/* Main title */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: '100%' }}
              animate={showText ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="text-center"
              style={{
                fontFamily: '"Bebas Neue", "Anton", "Impact", sans-serif',
                fontSize: 'clamp(48px, 10vw, 96px)',
                color: '#ffffff',
                letterSpacing: '0.05em',
                lineHeight: 1,
                textShadow: '4px 4px 0 #e91d22, -2px -2px 0 #b31317',
              }}
            >
              <GlitchText text="DAYANITHE G S" />
            </motion.h1>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: '100%' }}
              animate={showSub ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="text-center"
            >
              <span style={{
                fontFamily: '"Mukta", "Inter", sans-serif',
                fontSize: 'clamp(11px, 2vw, 14px)',
                color: '#959698',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
              }}>
                Full Stack &nbsp;·&nbsp; AI Developer &nbsp;·&nbsp; Web Developer
              </span>
            </motion.div>
          </div>

          {/* Spider web decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={showSub ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="mb-8"
            style={{
              width: 'min(340px, 80vw)',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #e91d22, #ff4444, #e91d22, transparent)',
              transformOrigin: 'center',
            }}
          />

          {/* Progress bar */}
          <div
            style={{
              width: 'min(340px, 80vw)',
              height: '3px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #b31317, #e91d22, #f04040)',
                borderRadius: '2px',
                boxShadow: '0 0 12px rgba(233,29,34,0.8)',
                scaleX: progress,
                transformOrigin: 'left',
              }}
            />
          </div>

          {/* Loading label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3"
            style={{
              fontFamily: '"Mukta", monospace',
              fontSize: '10px',
              color: '#e91d22',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            {phase === 'loader' ? 'LOADING...' : phase === 'reveal' ? 'INITIALIZING...' : phase === 'web' ? 'ALMOST READY...' : 'ENTERING...'}
          </motion.div>
        </div>

        {/* ── Corner web decorations ── */}
        <svg className="absolute top-0 left-0 pointer-events-none" style={{ zIndex: 7, width: 160, height: 160 }} viewBox="0 0 160 160">
          <motion.path
            d="M0,0 L160,0 M0,0 L0,160 M0,0 L80,80 M0,0 L40,120 M0,0 L120,40"
            stroke="#e91d22" strokeWidth="0.8" strokeOpacity="0.3" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M20,0 Q10,10 0,20 M40,0 Q20,20 0,40 M80,0 Q40,40 0,80 M120,0 Q60,60 0,120"
            stroke="#e91d22" strokeWidth="0.6" strokeOpacity="0.2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </svg>

        <svg className="absolute top-0 right-0 pointer-events-none" style={{ zIndex: 7, width: 160, height: 160, transform: 'scaleX(-1)' }} viewBox="0 0 160 160">
          <motion.path
            d="M0,0 L160,0 M0,0 L0,160 M0,0 L80,80 M0,0 L40,120 M0,0 L120,40"
            stroke="#e91d22" strokeWidth="0.8" strokeOpacity="0.3" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </svg>

        {/* ── Miles Morales quote flash ── */}
        <AnimatePresence>
          {phase === 'web' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-24 left-0 right-0 text-center"
              style={{ zIndex: 15 }}
            >
              <p style={{
                fontFamily: '"Mukta", "Inter", sans-serif',
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.1em',
                fontStyle: 'italic',
              }}>
                "Anyone can wear the mask."
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Exit flash overlay ── */}
        <AnimatePresence>
          {phase === 'exit' && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, times: [0, 0.3, 1] }}
              style={{ background: '#e91d22', zIndex: 50 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Glitch keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Mukta:wght@200;400;700&display=swap');

        @keyframes glitch1 {
          0%,100% { transform: translate(-2px,0); opacity: 0.7; }
          20% { transform: translate(2px,-1px); opacity: 0.5; }
          40% { transform: translate(-1px,1px); opacity: 0.8; }
          60% { transform: translate(3px,0); opacity: 0.3; }
          80% { transform: translate(-2px,1px); opacity: 0.6; }
        }
        @keyframes glitch2 {
          0%,100% { transform: translate(2px,0); opacity: 0.6; }
          25% { transform: translate(-3px,1px); opacity: 0.4; }
          50% { transform: translate(1px,-1px); opacity: 0.7; }
          75% { transform: translate(-1px,0); opacity: 0.3; }
        }
      `}</style>
    </AnimatePresence>
  );
}
