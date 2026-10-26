import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { personalInfo } from '../data/projectsData';

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Counter animation
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(interval);

        // GSAP smooth wipe reveal
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });

        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
        });

      } else {
        setCount(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <aside 
      ref={loaderRef} 
      className="fixed inset-0 z-[100] bg-[#F4F0EA] flex flex-col justify-between p-8 sm:p-14 select-none grid-bg border-b border-black/[0.08]"
      aria-label="Portfolio Loading Screen"
      aria-live="polite"
    >
      {/* Top Header */}
      <div ref={textRef} className="flex items-center justify-between font-mono text-xs text-charcoal-subtle uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
          <span className="text-charcoal font-semibold">{personalInfo.brandTitle || personalInfo.name}</span>
        </div>
        <span>INITIALIZING STUDIO V1</span>
      </div>

      {/* Center Counter */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="font-display font-extrabold text-7xl sm:text-9xl text-charcoal tracking-tighter">
          {count < 10 ? `0${count}` : count}
          <span className="text-terracotta text-4xl sm:text-6xl font-mono ml-2">%</span>
        </div>
        <p className="font-mono text-xs text-charcoal-muted uppercase tracking-widest">
          {personalInfo.eyebrow || 'Design. Development. Marketing.'}
        </p>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between font-mono text-[11px] text-charcoal-subtle uppercase tracking-widest border-t border-black/[0.07] pt-4">
        <span>{personalInfo.location}</span>
        <span>GSAP SCROLLTRIGGER READY</span>
      </div>
    </aside>
  );
}
