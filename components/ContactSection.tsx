'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const terminalLines = [
  { prompt: '>', text: 'connect dayanithe', delay: 0.1 },
  { prompt: '#', text: 'INITIALIZING SECURE CONNECTION...', delay: 0.3, color: '#00E5FF' },
  { prompt: '#', text: 'CHANNEL ESTABLISHED', delay: 0.5, color: '#00FFB3' },
  { prompt: '>', text: 'display contact_info', delay: 0.7 },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden border-t border-white/5" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 mb-2">09⁄CONTACT</div>
          <h2 className="font-orbitron text-xl sm:text-2xl font-black text-white mb-4">CONTACT TERMINAL</h2>
          <p className="font-rajdhani text-sm text-white/50 leading-relaxed max-w-md mx-auto text-center">
            Open a secure connection. Let&apos;s talk engineering, opportunities, or systems.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 items-stretch mt-6">
          
          {/* Terminal Screen */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="w-full min-w-0 h-full"
          >
            <div className="hallmark-card rounded overflow-hidden flex flex-col h-full">
              {/* Top Bar */}
              <div className="px-6 py-3 lg:px-8 lg:py-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="text-[9px] text-white/30 font-mono">contact.sh — bash</span>
              </div>

              {/* Terminal Lines */}
              <div className="p-6 lg:p-8 space-y-2.5 font-mono text-xs min-w-0 overflow-x-auto flex-grow flex flex-col justify-between">
                <div>
                  {terminalLines.map((line, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1.5">
                      <span className="shrink-0 text-purple-400">{line.prompt}</span>
                      <span className="break-all" style={{ color: line.color || 'rgba(255,255,255,0.7)' }}>{line.text}</span>
                    </div>
                  ))}

                  {/* Output */}
                  <div className="mt-3.5 p-4 rounded border border-white/5 bg-white/[0.005] space-y-2">
                    {[
                      { label: 'EMAIL', value: 'dayanithe11@gmail.com', icon: '📧', href: 'mailto:dayanithe11@gmail.com' },
                      { label: 'GITHUB', value: 'DayanitheGS', icon: '🐙', href: 'https://github.com/DayanitheGS' },
                      { label: 'LINKEDIN', value: 'Dayanithe G S', icon: '💼', href: 'https://linkedin.com/in/dayanithe' },
                      { label: 'LOCATION', value: 'Chennai, TN, India', icon: '📍', href: '#' },
                    ].map(item => (
                      <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-[9px] tracking-widest w-14 shrink-0 text-white/30">{item.label}</span>
                        <span className="text-white/20 hidden sm:inline">→</span>
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline break-all">
                          {item.icon} {item.value}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text-cyan-400">{'>'}</span>
                  <span className="animate-blink text-cyan-400">█</span>
                </div>
              </div>

              {/* Quick actions inside card footer */}
              <div className="p-6 lg:p-8 border-t border-white/5 bg-white/[0.005]">
                <div className="flex flex-wrap gap-2.5">
                  <a href="mailto:dayanithe11@gmail.com" className="flex-1 min-w-[110px]">
                    <button className="btn-primary w-full py-2.5 text-[10px]">📧 EMAIL</button>
                  </a>
                  <a href="/resume.pdf" download className="flex-1 min-w-[110px]">
                    <button className="btn-secondary w-full py-2.5 text-[10px]">📥 RESUME</button>
                  </a>
                  <a href="https://linkedin.com/in/dayanithe" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[110px]">
                    <button className="btn-accent w-full py-2.5 text-[10px]">💼 LINKEDIN</button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="w-full h-full"
          >
            <div className="hallmark-card p-6 lg:p-8 rounded relative h-full flex flex-col justify-between">
              <div>
                <div className="font-orbitron text-xs font-bold text-white mb-5">SEND TRANSMISSION</div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: 'name', label: 'PLAYER NAME', type: 'text', placeholder: 'Enter your name...' },
                    { id: 'email', label: 'COMM CHANNEL', type: 'email', placeholder: 'Enter your email...' },
                  ].map(field => (
                    <div key={field.id}>
                      <label className="font-mono text-[9px] tracking-widest text-cyan-400/60 mb-1.5 block">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        value={formData[field.id as keyof typeof formData]}
                        onChange={e => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="w-full px-3 py-2 rounded font-mono text-xs text-white placeholder-white/20 bg-white/[0.01] border border-white/10 outline-none focus:border-cyan-400/50 transition-all"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-cyan-400/60 mb-1.5 block">MESSAGE DATA</label>
                    <textarea
                      rows={5}
                      placeholder="Type your message..."
                      required
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-3 py-2 rounded font-mono text-xs text-white placeholder-white/20 bg-white/[0.01] border border-white/10 outline-none resize-none focus:border-cyan-400/50 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3 text-xs tracking-wider"
                    disabled={sending || sent}
                  >
                    {sent ? '✓ TRANSMISSION SENT' : sending ? '⟳ TRANSMITTING...' : '⚡ SEND TRANSMISSION'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
