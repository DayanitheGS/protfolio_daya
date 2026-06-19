'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for client-only components
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });
const MouseGlow = dynamic(() => import('@/components/MouseGlow'), { ssr: false });
const QuickNav = dynamic(() => import('@/components/QuickNav'), { ssr: false });

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import JourneySection from '@/components/JourneySection';
import ProjectsSection from '@/components/ProjectsSection';
import AILabSection from '@/components/AILabSection';
import AchievementsSection from '@/components/AchievementsSection';
import WhyHireSection from '@/components/WhyHireSection';
import ContactSection from '@/components/ContactSection';

function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5 bg-[#030306]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-orbitron text-sm font-bold" style={{ color: '#00E5FF' }}>
            DGS<span style={{ color: '#7C3AED' }}>://</span>DAYANITHE
          </div>
          <div className="font-mono text-[10px] tracking-wider text-white/30 text-center">
            © 2026 Dayanithe G S • Built with Next.js 16 + Framer Motion
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:dayanithe11@gmail.com" className="font-mono text-[10px] tracking-wider text-white/30 hover:text-cyan-400 transition-colors">EMAIL</a>
            <a href="https://github.com/DayanitheGS" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-wider text-white/30 hover:text-cyan-400 transition-colors">GITHUB</a>
            <a href="https://linkedin.com/in/dayanithe" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-wider text-white/30 hover:text-cyan-400 transition-colors">LINKEDIN</a>
          </div>
        </div>

        {/* Easter egg hint */}
        <div className="mt-6 text-center">
          <span className="font-mono text-[9px] text-white/15 tracking-widest">
            💡 Try typing: /hire • /developer • /ai
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <main style={{ background: '#030306', minHeight: '100vh' }}>
          <ParticleBackground />
          <CustomCursor />
          <MouseGlow />
          <EasterEggs />
          <QuickNav />
          <Navbar />

          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <JourneySection />
            <ProjectsSection />
            <AILabSection />
            <AchievementsSection />
            <WhyHireSection />
            <ContactSection />
            <Footer />
          </div>
        </main>
      )}
    </>
  );
}
