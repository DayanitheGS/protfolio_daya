'use client';
import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cx = -500, cy = -500;
    const handleMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
    };
    window.addEventListener('mousemove', handleMove);

    let raf: number;
    let gx = -500, gy = -500;
    const animate = () => {
      gx += (cx - gx) * 0.06;
      gy += (cy - gy) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.left = gx + 'px';
        glowRef.current.style.top = gy + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, rgba(124,58,237,0.02) 40%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'none',
      }}
    />
  );
}
