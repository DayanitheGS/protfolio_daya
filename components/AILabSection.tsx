'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const aiSkills = [
  { label: 'Prompt Engineering',  icon: '💬', color: '#00E5FF', desc: 'Advanced prompt design & optimization' },
  { label: 'AI Development',      icon: '🤖', color: '#7C3AED', desc: 'Building AI-powered applications' },
  { label: 'AI Automation',       icon: '⚙️', color: '#00FFB3', desc: 'Workflow automation systems' },
  { label: 'Meta Pixel',          icon: '📊', color: '#1877F2', desc: 'Marketing analytics & tracking' },
  { label: 'Google Apps Script',  icon: '📋', color: '#34A853', desc: 'Google workspace automation' },
  { label: 'Workflow Automation', icon: '🔄', color: '#FF6B35', desc: 'Business process automation' },
  { label: 'AI Agents',           icon: '🧠', color: '#00E5FF', desc: 'Autonomous AI agent development' },
  { label: 'Chatbots',            icon: '💬', color: '#7C3AED', desc: 'Conversational AI interfaces' },
  { label: 'Business Automation', icon: '🏢', color: '#00FFB3', desc: 'Enterprise automation solutions' },
];

const techStack = [
  { category: 'Frontend',  color: '#00E5FF', items: ['React.js','Next.js','HTML5','CSS3','JavaScript','Bootstrap','Tailwind CSS'] },
  { category: 'Backend',   color: '#7C3AED', items: ['Node.js','Express.js','Python'] },
  { category: 'Database',  color: '#00FFB3', items: ['MongoDB','SQL'] },
  { category: 'Tools',     color: '#FF6B35', items: ['Git','GitHub','VS Code','Figma'] },
  { category: 'Marketing', color: '#1877F2', items: ['Meta Pixel'] },
];

export default function AILabSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ailab" className="relative py-20 sm:py-32 overflow-hidden border-t border-white/5" ref={ref}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hallmark-grid">
          
          {/* Centered Header */}
          <div className="hallmark-sidebar">
            <div className="font-mono text-[10px] tracking-[0.3em] text-purple-400 mb-2">06⁄AILAB</div>
            <h2 className="font-orbitron text-xl sm:text-2xl font-black text-white mb-4">AI LABORATORY</h2>
            <p className="font-rajdhani text-sm text-white/50 leading-relaxed max-w-md mx-auto text-center">
              Where artificial intelligence meets automated workflows to build scalable software.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="hallmark-content space-y-12">
            
            {/* AI Skill Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {aiSkills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="hallmark-card p-4 rounded cursor-pointer relative"
                >
                  <div className="text-xl sm:text-2xl mb-2">{skill.icon}</div>
                  <div className="font-orbitron text-[10px] sm:text-xs font-bold mb-1" style={{ color: skill.color }}>{skill.label}</div>
                  <div className="font-rajdhani text-xs text-white/40 leading-snug hidden sm:block">{skill.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack Arsenal */}
            <div className="space-y-6">
              <div className="text-center sm:text-left">
                <div className="font-orbitron text-[9px] tracking-[0.4em] text-cyan-400/60 mb-1">ARSENAL</div>
                <h3 className="font-orbitron text-base sm:text-lg font-bold text-white">TECH STACK</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {techStack.map((cat, ci) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: ci * 0.05 }}
                    className="p-3.5 rounded border border-white/5 bg-white/[0.005]"
                  >
                    <div className="font-orbitron text-[9px] tracking-widest mb-2.5 pb-1.5 border-b border-white/5" style={{ color: cat.color }}>
                      {cat.category}
                    </div>
                    <div className="space-y-1.5">
                      {cat.items.map(item => (
                        <div key={item} className="font-mono text-[10px] text-white/50 flex items-center gap-1.5">
                          <span style={{ color: cat.color }}>▸</span>
                          {item}
                        </div>
                      ))}
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
