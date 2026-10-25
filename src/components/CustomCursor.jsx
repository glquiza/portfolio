import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorState, setCursorState] = useState('default'); // 'default', 'pointer', 'drag', 'view'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorDotRef.current;
    const follower = cursorFollowerRef.current;
    if (!dot || !follower) return;

    // High performance GSAP quickTo for zero-jank cursor tracking
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const followerXTo = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3.out' });
    const followerYTo = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      const { clientX: x, clientY: y } = e;
      dotXTo(x);
      dotYTo(y);
      followerXTo(x);
      followerYTo(y);

      // Detect hover target attributes or tags
      const target = e.target.closest('[data-cursor], a, button, input');
      if (target) {
        const customType = target.getAttribute('data-cursor');
        if (customType === 'drag') {
          setCursorState('drag');
          setCursorText('DRAG ↔');
        } else if (customType === 'view') {
          setCursorState('view');
          setCursorText('EXPLORE ↗');
        } else {
          setCursorState('pointer');
          setCursorText('');
        }
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Don't render on mobile touch viewports
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Fast Center Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-200 ${
          cursorState === 'default'
            ? 'w-2 h-2 bg-terracotta'
            : cursorState === 'pointer'
            ? 'w-2.5 h-2.5 bg-charcoal scale-125'
            : 'w-0 h-0 opacity-0'
        }`}
      />

      {/* 2. Dynamic Inertia Trailing Follower */}
      <div
        ref={cursorFollowerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-all duration-300 ease-out ${
          cursorState === 'default'
            ? 'w-8 h-8 rounded-full border border-charcoal/20 bg-charcoal/[0.02]'
            : cursorState === 'pointer'
            ? 'w-12 h-12 rounded-full border-2 border-terracotta bg-terracotta/10 scale-110 shadow-sm'
            : cursorState === 'drag'
            ? 'px-4 py-2 rounded-full bg-charcoal text-white font-mono text-[11px] tracking-widest font-semibold shadow-xl border border-white/20 scale-100'
            : cursorState === 'view'
            ? 'px-4 py-2 rounded-full bg-terracotta text-white font-mono text-[11px] tracking-widest font-semibold shadow-xl scale-105'
            : 'w-8 h-8 rounded-full border border-charcoal/20'
        }`}
      >
        {cursorText && (
          <span className="select-none animate-in fade-in duration-200 whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
