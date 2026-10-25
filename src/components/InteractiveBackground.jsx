import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function InteractiveBackground() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (!spotlightRef.current) return;

    // Use gsap.quickTo for fluid 60fps cursor tracking with slight spring inertia
    const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e) => {
      // Center the 600px glow on the cursor
      xTo(e.clientX - 300);
      yTo(e.clientY - 300);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Architectural Grid Lines (Driezie Studio signature style) */}
      <div className="absolute inset-0 grid-bg opacity-70"></div>

      {/* Mouse-interactive floating ambient light */}
      <div 
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-terracotta/[0.07] via-[#EDE4D8]/30 to-transparent blur-[120px] pointer-events-none will-change-transform"
        style={{ transform: 'translate(-300px, -300px)' }}
      />
    </div>
  );
}
