'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const strengths = [
  { icon: '⚔', label: 'Full Stack Dev', color: '#00E5FF', level: 95 },
  { icon: '🤖', label: 'AI Development', color: '#7C3AED', level: 92 },
  { icon: '🚀', label: 'Rapid Learning', color: '#00FFB3', level: 98 },
  { icon: '🧠', label: 'Problem Solving', color: '#00E5FF', level: 90 },
  { icon: '🤝', label: 'Collaboration', color: '#7C3AED', level: 88 },
  { icon: '🎨', label: 'Creative Thinking', color: '#00FFB3', level: 92 },
  { icon: '📦', label: 'Product Building', color: '#FF6B35', level: 85 },
  { icon: '⚙️', label: 'Automation Skills', color: '#00E5FF', level: 90 },
];

const testimonials = [
  {
    name: 'Mentor — Tech Lead',
    role: 'At Hinisys Software Ltd',
    quote: 'Dayanithe quickly grasped complex AI concepts and delivered production-quality automation systems. Highly dedicated and technically sharp.',
    avatar: 'T',
    color: '#00E5FF',
    stars: 5,
  },
  {
    name: 'Colleague — Developer',
    role: 'At DAKH EDU SOLUTIONS',
    quote: 'One of the most reliable developers I have worked with. Dayanithe brings both technical skill and creative problem-solving to every project.',
    avatar: 'D',
    color: '#7C3AED',
    stars: 5,
  },
  {
    name: 'Project Partner',
    role: 'Velammal Engineering College',
    quote: 'The VELNEXA project was outstanding. Dayanithe led the AI integration and built something truly impressive for a student portfolio.',
    avatar: 'P',
    color: '#00FFB3',
    stars: 5,
  },
];

export default function WhyHireSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="whyhire" className="relative py-20 sm:py-32 overflow-hidden border-t border-white/5" ref={ref}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hallmark-grid">
          
          {/* Centered Header */}
          <div className="hallmark-sidebar">
            <div className="font-mono text-[10px] tracking-[0.3em] text-orange-400 mb-2">08⁄CHALLENGE</div>
            <h2 className="font-orbitron text-xl sm:text-2xl font-black text-white mb-4">THE RECRUITER CHALLENGE</h2>
            <p className="font-rajdhani text-sm text-white/50 leading-relaxed max-w-md mx-auto text-center">
              Why choose Dayanithe? Review the skill values and partner feedback.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="hallmark-content space-y-12">
            
            {/* Power Cards Grid */}
            <div>
              <div className="font-orbitron text-[9px] tracking-[0.25em] text-cyan-400/60 mb-4">POWER CARDS</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {strengths.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.05 }}
                    className="hallmark-card p-4 text-center cursor-pointer rounded"
                  >
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <div className="font-orbitron text-[10px] font-bold mb-2 leading-tight truncate" style={{ color: s.color }}>{s.label}</div>
                    <div className="flex gap-px justify-center max-w-[70px] sm:max-w-none mx-auto">
                      {Array(10).fill(0).map((_, j) => (
                        <div key={j} className="h-0.5 flex-1 rounded-full" style={{
                          background: j < Math.floor(s.level / 10) ? s.color : 'rgba(255,255,255,0.08)',
                        }} />
                      ))}
                    </div>
                    <div className="font-mono text-[8px] mt-2 text-white/30">{s.level}/100</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              <div className="text-center sm:text-left">
                <div className="font-orbitron text-[9px] tracking-[0.4em] text-cyan-400/60 mb-1">REVIEWS</div>
                <h3 className="font-orbitron text-base sm:text-lg font-bold text-white">TESTIMONIALS</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08 }}
                    className="hallmark-card p-5 rounded flex flex-col justify-between"
                  >
                    <div>
                      {/* Stars */}
                      <div className="flex gap-0.5 mb-3.5">
                        {Array(t.stars).fill(0).map((_, j) => (
                          <span key={j} style={{ color: '#FFD700', fontSize: '11px' }}>★</span>
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="font-rajdhani text-xs sm:text-sm text-white/60 leading-relaxed mb-4 italic">
                        &quot;{t.quote}&quot;
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2.5 pt-3 border-t border-white/5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-orbitron font-black text-[10px] shrink-0" style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: `1.5px solid ${t.color}35`,
                        color: t.color,
                      }}>{t.avatar}</div>
                      <div className="min-w-0">
                        <div className="font-orbitron text-[10px] font-bold text-white truncate">{t.name}</div>
                        <div className="font-mono text-[8px] tracking-wider text-white/40 truncate">{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
