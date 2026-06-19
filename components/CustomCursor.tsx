'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let cx = 0, cy = 0, fx = 0, fy = 0;
    const handleMove = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY; };
    window.addEventListener('mousemove', handleMove);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = cx - 6 + 'px';
        cursorRef.current.style.top = cy - 6 + 'px';
      }
      fx += (cx - fx) * 0.12;
      fy += (cy - fy) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = fx - 18 + 'px';
        followerRef.current.style.top = fy - 18 + 'px';
      }
      requestAnimationFrame(animate);
    };
    animate();

    const addHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };
    addHover();

    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" style={{
        transform: isHovering ? 'scale(2)' : 'scale(1)',
        background: isHovering ? '#00FFB3' : '#00E5FF',
      }} />
      <div ref={followerRef} className="cursor-follower" style={{
        transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        borderColor: isHovering ? 'rgba(0,255,179,0.5)' : 'rgba(0,229,255,0.4)',
      }} />
    </>
  );
}
