'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const missions = [
  {
    id: '01',
    title: 'Velammal Engineering College',
    role: 'B.E Computer Science Engineering',
    period: '2023 – 2027',
    status: 'IN PROGRESS',
    statusColor: '#00E5FF',
    achievements: ['Current CGPA: 7.0', 'Core CS Fundamentals', 'Project-based learning', 'Team collaboration'],
    note: 'Current Active Mission',
    icon: '🎓',
    color: '#00E5FF',
  },
  {
    id: '02',
    title: 'DAKH EDU SOLUTIONS',
    role: 'Web Development Intern',
    period: 'Nov 2025 – Dec 2025',
    status: 'COMPLETED',
    statusColor: '#00FFB3',
    achievements: ['Developed responsive websites', 'Worked on real-world projects', 'Improved web performance', 'Learned professional workflows'],
    note: 'Mission Complete',
    icon: '💻',
    color: '#00FFB3',
  },
  {
    id: '03',
    title: 'StackTech',
    role: 'Web Developer Intern',
    period: '2025',
    status: 'COMPLETED',
    statusColor: '#00FFB3',
    achievements: ['Developed application features', 'Collaborated with developers', 'Enhanced UI experiences'],
    note: 'Mission Complete',
    icon: '⚡',
    color: '#7C3AED',
  },
  {
    id: '04',
    title: 'Hinisys Software Ltd',
    role: 'AI Developer Intern',
    period: 'May 2026 – Present',
    status: 'ACTIVE',
    statusColor: '#FF6B35',
    achievements: ['Building AI applications', 'Workflow automation', 'Intelligent system development', 'Testing and deployment'],
    note: '🔥 Current Active Mission',
    icon: '🤖',
    color: '#FF6B35',
  },
];

export default function JourneySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="journey" className="relative py-20 sm:py-32 overflow-hidden border-t border-white/5" ref={ref}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hallmark-grid">
          
          {/* Centered Header */}
          <div className="hallmark-sidebar">
            <div className="font-mono text-[10px] tracking-[0.3em] text-purple-400 mb-2">04⁄QUESTS</div>
            <h2 className="font-orbitron text-xl sm:text-2xl font-black text-white mb-4">QUEST JOURNEY</h2>
            <p className="font-rajdhani text-sm text-white/50 leading-relaxed max-w-md mx-auto text-center">
              Milestones unlocked through dedication, academic growth, and corporate internships.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="hallmark-content">
            <div className="space-y-5 sm:space-y-6">
              {missions.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="hallmark-card p-4 sm:p-5 rounded"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded flex items-center justify-center text-lg shrink-0" style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--color-border)',
                      }}>
                        {m.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[9px] tracking-widest text-cyan-400/70 mb-0.5">MISSION {m.id}</div>
                        <h3 className="font-orbitron text-xs sm:text-sm font-bold text-white leading-tight break-words">{m.title}</h3>
                        <div className="font-rajdhani text-xs sm:text-sm text-white/50 mt-0.5">{m.role}</div>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0 text-right">
                      <span className="font-orbitron text-[8px] px-2 py-0.5 rounded border tracking-wider" style={{
                        color: m.statusColor, borderColor: `${m.statusColor}30`, background: `${m.statusColor}08`
                      }}>{m.status}</span>
                      <span className="font-mono text-[9px] sm:text-[10px] text-white/30">{m.period}</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/[0.04] mb-3.5" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {m.achievements.map(a => (
                      <div key={a} className="flex items-start gap-2">
                        <span className="text-[10px] text-cyan-400 mt-0.5 shrink-0">▸</span>
                        <span className="font-rajdhani text-xs sm:text-sm text-white/65 leading-snug">{a}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
