'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  { id: '01', name: 'VELNEXA', subtitle: 'AI Vulnerability Analysis Platform',
    description: 'AI-powered platform identifying software vulnerabilities with intelligent remediation suggestions.',
    tech: ['React', 'Node.js', 'MongoDB', 'AI'], difficulty: 5, xp: '+500 XP',
    demo: 'https://velnexa.vercel.app/', color: '#00E5FF', rarity: 'LEGENDARY', rarityColor: '#FFD700' },
  { id: '02', name: 'WEATHER APP', subtitle: 'Real-Time Weather Forecasting',
    description: 'City search, live weather data and clean responsive UI powered by external APIs.',
    tech: ['React', 'Weather API'], difficulty: 3, xp: '+250 XP',
    demo: 'https://weather-lac-xi-65.vercel.app/', color: '#7C3AED', rarity: 'RARE', rarityColor: '#7C3AED' },
  { id: '03', name: 'AI CHATBOT', subtitle: 'Intelligent Conversational AI',
    description: 'Intelligent chatbot responding to user queries using AI-powered interactions.',
    tech: ['React', 'AI APIs', 'JavaScript'], difficulty: 4, xp: '+350 XP',
    demo: 'https://chatbot-inten.vercel.app/', color: '#00FFB3', rarity: 'EPIC', rarityColor: '#A78BFA' },
  { id: '04', name: 'ATTENDANCE SYSTEM', subtitle: 'Student Attendance Management',
    description: 'Full MERN Stack app for student attendance tracking with admin dashboard.',
    tech: ['MongoDB', 'Express', 'React', 'Node'], difficulty: 4, xp: '+400 XP',
    demo: '#', color: '#FF6B35', rarity: 'EPIC', rarityColor: '#A78BFA' },
];

function Stars({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= level ? color : 'rgba(255,255,255,0.15)', fontSize: '10px' }}>★</span>
      ))}
    </div>
  );
}

function ProjectCard({ p, i }: { p: typeof projects[0]; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="hallmark-card p-4 sm:p-5 rounded flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <span className="font-mono text-[9px] tracking-widest text-white/30">PROJECT {p.id}</span>
          <span className="font-orbitron text-[8px] px-2 py-0.5 rounded border" style={{
            color: p.rarityColor, borderColor: `${p.rarityColor}30`, background: `${p.rarityColor}08`
          }}>{p.rarity}</span>
        </div>

        <h3 className="font-orbitron text-sm font-bold text-white mb-0.5">{p.name}</h3>
        <div className="font-mono text-[9px] tracking-wider mb-3" style={{ color: p.color }}>{p.subtitle}</div>

        <p className="font-rajdhani text-xs sm:text-sm text-white/65 leading-relaxed mb-4">{p.description}</p>
      </div>

      <div className="space-y-3.5">
        <div className="h-px w-full bg-white/[0.04]" />

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="font-mono text-[8px] text-white/30 mb-1">DIFFICULTY</div>
            <Stars level={p.difficulty} color={p.color} />
          </div>
          <div>
            <div className="font-mono text-[8px] text-white/30 mb-1 text-right">TECH</div>
            <div className="flex flex-wrap gap-1 justify-end">
              {p.tech.map(t => (
                <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 rounded border border-white/5 bg-white/[0.02] text-white/40">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {p.demo !== '#' && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
              <button className="btn-primary w-full py-1.5 text-[9px]">🔗 DEMO</button>
            </a>
          )}
          <a href="#" className="flex-1">
            <button className="btn-secondary w-full py-1.5 text-[9px]">GITHUB</button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="relative py-20 sm:py-32 overflow-hidden border-t border-white/5" ref={ref}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hallmark-grid">
          
          {/* Centered Header */}
          <div className="hallmark-sidebar">
            <div className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 mb-2">05⁄PROJECTS</div>
            <h2 className="font-orbitron text-xl sm:text-2xl font-black text-white mb-4">PROJECT KINGDOM</h2>
            <p className="font-rajdhani text-sm text-white/50 leading-relaxed max-w-md mx-auto text-center">
              Explore completed projects. Each represents a unique challenge solved.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="hallmark-content">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
            </div>

            <div className="mt-8 p-4 rounded border border-white/5 bg-white/[0.01] text-center">
              <div className="font-mono text-[9px] tracking-widest text-cyan-400/60 mb-0.5">TOTAL PROJECTS XP</div>
              <div className="font-orbitron text-2xl font-black text-white">+1,500 XP</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
