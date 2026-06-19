'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const achievements = [
  { icon: '🏅', label: 'Full Stack Python Cert.', color: '#00E5FF', rarity: 'EPIC' },
  { icon: '🤖', label: 'AI Developer Intern', color: '#FF6B35', rarity: 'LEGENDARY' },
  { icon: '💻', label: 'Web Dev Intern', color: '#00FFB3', rarity: 'RARE' },
  { icon: '⚡', label: 'MERN Stack Developer', color: '#7C3AED', rarity: 'EPIC' },
  { icon: '🧠', label: 'Prompt Engineering', color: '#00E5FF', rarity: 'LEGENDARY' },
  { icon: '⚛️', label: 'React Developer', color: '#61DAFB', rarity: 'EPIC' },
  { icon: '🏗️', label: 'AI Builder', color: '#00FFB3', rarity: 'EPIC' },
  { icon: '🔄', label: 'Automation Creator', color: '#FF6B35', rarity: 'RARE' },
];

const analyticsData = [
  { label: 'Projects Built', value: '10+', icon: '🚀', color: '#00E5FF' },
  { label: 'Internships', value: '3', icon: '💼', color: '#7C3AED' },
  { label: 'Technologies', value: '15+', icon: '🛠', color: '#00FFB3' },
  { label: 'GitHub Commits', value: '500+', icon: '⚡', color: '#00E5FF' },
  { label: 'Learning Exp.', value: '3+ Years', icon: '📚', color: '#7C3AED' },
  { label: 'Problem Solving', value: 'Elite', icon: '🧠', color: '#00FFB3' },
  { label: 'Coffee Consumed', value: '∞', icon: '☕', color: '#FF6B35' },
  { label: 'Lines of Code', value: '50K+', icon: '💻', color: '#00E5FF' },
];

function AchievementBadge({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  const [unlocked, setUnlocked] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      setTimeout(() => setUnlocked(true), index * 60 + 100);
    }
  }, [inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={unlocked ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
      className="hallmark-card flex flex-col items-center gap-3 p-4 text-center cursor-pointer rounded"
      style={{
        filter: unlocked ? 'none' : 'grayscale(1) opacity(0.3)',
      }}
    >
      <div className="relative">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl border border-white/10 bg-white/[0.02]">
          {achievement.icon}
        </div>
        {unlocked && (
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold bg-[#00FFB3] text-[#030306]">
            ✓
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="font-orbitron text-[9px] sm:text-[10px] font-bold text-white leading-tight truncate sm:whitespace-normal">{achievement.label}</div>
        <div className="font-mono text-[8px] mt-1 tracking-wider" style={{ color: achievement.color }}>{achievement.rarity}</div>
      </div>
    </motion.div>
  );
}

export default function AchievementsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" className="relative py-20 sm:py-32 overflow-hidden border-t border-white/5" ref={ref}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hallmark-grid">
          
          {/* Centered Header */}
          <div className="hallmark-sidebar">
            <div className="font-mono text-[10px] tracking-[0.3em] text-purple-400 mb-2">07⁄AWARDS</div>
            <h2 className="font-orbitron text-xl sm:text-2xl font-black text-white mb-4">ACHIEVEMENT ROOM</h2>
            <p className="font-rajdhani text-sm text-white/50 leading-relaxed max-w-md mx-auto text-center">
              Collectible badges and developer metrics unlocked through experience.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="hallmark-content space-y-12">
            
            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {achievements.map((a, i) => (
                <AchievementBadge key={a.label} achievement={a} index={i} />
              ))}
            </div>

            {/* Developer Analytics */}
            <div className="space-y-6">
              <div className="text-center sm:text-left">
                <div className="font-orbitron text-[9px] tracking-[0.4em] text-cyan-400/60 mb-1">DASHBOARD</div>
                <h3 className="font-orbitron text-base sm:text-lg font-bold text-white">DEVELOPER ANALYTICS</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {analyticsData.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded border border-white/5 bg-white/[0.01] text-center"
                  >
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="font-orbitron text-lg font-black mb-0.5" style={{ color: item.color }}>{item.value}</div>
                    <div className="font-mono text-[9px] tracking-widest text-white/30 uppercase">{item.label}</div>
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
