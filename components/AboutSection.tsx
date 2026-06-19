'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { label: 'Total XP',     value: '12,500+', color: '#e91d22' },
  { label: 'Technologies', value: '15+',     color: '#ff6b6b' },
  { label: 'Projects',     value: '10+',     color: '#ffffff' },
  { label: 'Internships',  value: '3',       color: '#e91d22' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden" ref={ref}
      style={{ borderTop: '1px solid rgba(233,29,34,0.1)' }}>

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(233,29,34,0.05) 0%, transparent 70%)' }} />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hallmark-grid">

          {/* Header */}
          <div className="hallmark-sidebar">
            <div className="section-label mb-3">02 / PROFILE</div>
            <h2 className="section-title mb-4">PLAYER PROFILE</h2>
            <p className="section-desc">Behind the mask — the developer's identity revealed.</p>

            {/* Quick specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-6">
              {[
                { label: 'CLASS',    value: 'Full Stack Dev' },
                { label: 'COLLEGE',  value: 'Velammal EC'    },
                { label: 'LOCATION', value: 'Chennai, TN'    },
                { label: 'STATUS',   value: 'Available'      },
              ].map(item => (
                <div key={item.label} className="p-3.5 text-center hallmark-card rounded">
                  <div className="font-mono-tech text-[9px] tracking-widest mb-1" style={{ color: 'rgba(233,29,34,0.7)' }}>{item.label}</div>
                  <div className="font-orbitron text-xs font-bold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="hallmark-content">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* Bio */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-orbitron text-lg font-black shrink-0"
                    style={{ border: '1px solid rgba(233,29,34,0.4)', background: 'rgba(233,29,34,0.06)', color: '#e91d22' }}>
                    D
                  </div>
                  <div>
                    <h3 className="font-orbitron text-base sm:text-lg font-bold text-white">Dayanithe G S</h3>
                    <div className="font-mono-tech text-[9px] sm:text-[10px] tracking-widest mt-0.5" style={{ color: '#e91d22' }}>
                      LEVEL 21 · FULL STACK & AI DEVELOPER
                    </div>
                  </div>
                </div>

                <div className="space-y-4 font-rajdhani text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>
                  <p>
                    Hello, I'm <span style={{ color: '#e91d22' }} className="font-semibold">Dayanithe G S</span>. A passionate{' '}
                    <span style={{ color: '#ff6b6b' }} className="font-semibold">Full Stack Developer</span> and{' '}
                    <span className="text-white font-semibold">AI Developer</span> currently pursuing{' '}
                    B.E Computer Science Engineering at{' '}
                    <span style={{ color: '#e91d22' }}>Velammal Engineering College</span>.
                  </p>
                  <p>I build modern web applications, AI-powered products, automation systems, and user-focused digital experiences.</p>
                  <p>My goal is to solve real-world problems using technology — continuously improving through projects, internships, and innovation.</p>
                </div>

                {/* Spider-web divider */}
                <div className="spider-divider" />
              </div>

              {/* Stats & Facts */}
              <div className="lg:col-span-5 space-y-5">

                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, i) => (
                    <motion.div key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 rounded text-center hallmark-card">
                      <div className="font-spider text-2xl sm:text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="font-mono-tech text-[9px] tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Facts */}
                <div className="space-y-2">
                  <div className="font-mono-tech text-[9px] tracking-widest mb-3" style={{ color: 'rgba(233,29,34,0.6)' }}>QUICK FACTS</div>
                  {[
                    { icon: '🎓', text: 'B.E CSE — Velammal Engineering College (2023–2027)' },
                    { icon: '💼', text: 'Currently: AI Developer Intern @ Hinisys Software Ltd' },
                    { icon: '🚀', text: '3 Internships Completed' },
                    { icon: '🕷', text: 'Specializes in AI + Full Stack + Automation' },
                  ].map((fact, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded hallmark-card">
                      <span className="text-sm shrink-0">{fact.icon}</span>
                      <span className="font-rajdhani text-xs sm:text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>{fact.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
