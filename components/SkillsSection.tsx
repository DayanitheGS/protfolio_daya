'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const skills = [
  { name: 'Prompt Engineering', level: 95, color: '#e91d22' },
  { name: 'React.js',           level: 95, color: '#61DAFB' },
  { name: 'AI Development',     level: 92, color: '#ff6b6b' },
  { name: 'JavaScript',         level: 92, color: '#F7DF1E' },
  { name: 'Node.js',            level: 90, color: '#68A063' },
  { name: 'Git & GitHub',       level: 90, color: '#F05032' },
  { name: 'MongoDB',            level: 88, color: '#47A248' },
  { name: 'REST APIs',          level: 88, color: '#e91d22' },
  { name: 'Meta Pixel',         level: 82, color: '#1877F2' },
  { name: 'Python',             level: 80, color: '#3776AB' },
];

function XpBar({ level, color, animated }: { level: number; color: string; animated: boolean }) {
  return (
    <div className="h-1.5 w-full rounded-full overflow-hidden flex-1"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(233,29,34,0.08)' }}>
      <div className="h-full rounded-full" style={{
        width: animated ? `${level}%` : '0%',
        background: `linear-gradient(90deg, ${color}aa, ${color})`,
        transition: 'width 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: `0 0 6px ${color}50`,
      }} />
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView) setTimeout(() => setAnimated(true), 200);
  }, [inView]);

  return (
    <section id="skills" className="relative py-20 sm:py-32 overflow-hidden" ref={ref}
      style={{ borderTop: '1px solid rgba(233,29,34,0.1)' }}>

      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(233,29,34,0.05) 0%, transparent 70%)' }} />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hallmark-grid">

          {/* Header */}
          <div className="hallmark-sidebar">
            <div className="section-label mb-3">03 / SKILLS</div>
            <h2 className="section-title mb-4">PLAYER STATS</h2>
            <p className="section-desc">RPG-style skill attributes — each point earned through real-world implementation and delivery.</p>
          </div>

          {/* Content */}
          <div className="hallmark-content">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* Skill bars */}
              <div className="lg:col-span-7 space-y-4">
                <div className="font-mono-tech text-[10px] tracking-[0.25em] mb-4" style={{ color: 'rgba(233,29,34,0.6)' }}>ATTRIBUTE POINTS</div>
                {skills.map(skill => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono-tech">
                      <span className="text-white/80">{skill.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="font-bold" style={{ color: skill.color }}>{skill.level}</span>
                        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>XP</span>
                      </div>
                    </div>
                    <XpBar level={skill.level} color={skill.color} animated={animated} />
                  </div>
                ))}
              </div>

              {/* Specializations */}
              <div className="lg:col-span-5 space-y-5">

                <div className="p-4 sm:p-5 rounded hallmark-card">
                  <div className="font-mono-tech text-[9px] tracking-[0.25em] mb-4" style={{ color: 'rgba(233,29,34,0.6)' }}>SPECIALIZATIONS</div>
                  <div className="flex flex-wrap gap-2">
                    {['Full Stack', 'AI Development', 'MERN Stack', 'Automation', 'Prompt Engineering', 'REST APIs', 'Web Apps', 'Meta Pixel'].map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded font-mono-tech text-[9px] tracking-wider"
                        style={{ background: 'rgba(233,29,34,0.06)', border: '1px solid rgba(233,29,34,0.2)', color: '#e91d22' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded hallmark-card">
                  <div className="font-mono-tech text-[9px] tracking-[0.25em] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>CHARACTER CLASS</div>
                  <div className="space-y-3">
                    {[
                      { label: 'Rare',      text: 'Web Developer',        color: '#61DAFB' },
                      { label: 'Epic',      text: 'Full Stack Developer',  color: '#ff6b6b' },
                      { label: 'Legendary', text: 'AI Developer',          color: '#e91d22' },
                    ].map(cls => (
                      <div key={cls.label} className="flex items-center gap-2.5 text-xs">
                        <span className="font-mono-tech text-[8px] px-2 py-0.5 rounded shrink-0"
                          style={{ background: `${cls.color}0f`, color: cls.color, border: `1px solid ${cls.color}28` }}>
                          {cls.label}
                        </span>
                        <span className="font-rajdhani" style={{ color: 'rgba(255,255,255,0.7)' }}>{cls.text}</span>
                        <span className="ml-auto font-mono-tech text-[9px] tracking-widest" style={{ color: '#4ade80' }}>✓ UNLOCKED</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
