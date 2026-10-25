import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function SlicedDeviceMockup({ image, title, liveUrl }) {
  const containerRef = useRef(null);
  const sliceTopRef = useRef(null);
  const sliceMidRef = useRef(null);
  const sliceBotRef = useRef(null);
  const shadowRef = useRef(null);

  useGSAP(() => {
    // ScrollTrigger: Expands slices outward on scroll approach, then snaps together when centered
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.2,
      }
    });

    // Expand slices outward
    tl.fromTo(sliceTopRef.current, 
      { y: -36, rotateX: 12, rotateY: -8, z: 20 },
      { y: 0, rotateX: 0, rotateY: 0, z: 0, ease: 'power2.inOut' }
    )
    .fromTo(sliceBotRef.current,
      { y: 36, rotateX: -10, rotateY: -6, z: -20 },
      { y: 0, rotateX: 0, rotateY: 0, z: 0, ease: 'power2.inOut' },
      0
    )
    .fromTo(shadowRef.current,
      { scaleX: 1.2, opacity: 0.15, filter: 'blur(16px)' },
      { scaleX: 0.95, opacity: 0.35, filter: 'blur(8px)', ease: 'power2.inOut' },
      0
    );

  }, { scope: containerRef });

  // Interactive mouse 3D tilt on hover
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(sliceTopRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15 - 4,
      y: -10,
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(sliceMidRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(sliceBotRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15 + 4,
      y: 10,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to([sliceTopRef.current, sliceMidRef.current, sliceBotRef.current], {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[460px] aspect-[16/13] flex flex-col items-center justify-center select-none group perspective-[1000px]"
    >
      {/* Sliced Stack Container with 3D Perspective */}
      <div className="relative w-full h-[320px] flex flex-col justify-between items-center transform-gpu">
        
        {/* Slice 1: Top Dome / Screen Arc */}
        <div 
          ref={sliceTopRef}
          className="relative w-[85%] h-[90px] rounded-t-[50px] rounded-b-xl overflow-hidden bg-[#18181C] border-2 border-[#2C2C32] shadow-xl will-change-transform transform-gpu"
        >
          {/* Internal preview slice */}
          <div className="absolute inset-0 bg-[#0C0C0E]">
            <img 
              src={image} 
              alt={`${title} top preview`}
              className="w-full h-[280px] object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Glossy bezel reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/60 pointer-events-none" />
          </div>
          {/* Subtle slice edge trim */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-[#32323A] border-t border-white/20" />
        </div>

        {/* Slice 2: Middle Workspace Segment */}
        <div 
          ref={sliceMidRef}
          className="relative w-[95%] h-[105px] rounded-2xl overflow-hidden bg-[#18181C] border-2 border-[#2C2C32] shadow-2xl will-change-transform transform-gpu my-1.5"
        >
          <div className="absolute inset-0 bg-[#0C0C0E]">
            <img 
              src={image} 
              alt={`${title} mid preview`}
              className="w-full h-[280px] object-cover object-center -translate-y-[85px] opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 pointer-events-none" />
          </div>
          {/* Slice edge highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/10" />
          <div className="absolute bottom-0 inset-x-0 h-1 bg-[#32323A] border-t border-white/10" />
        </div>

        {/* Slice 3: Bottom Wedge Base */}
        <div 
          ref={sliceBotRef}
          className="relative w-[88%] h-[85px] rounded-t-xl rounded-b-[40px] overflow-hidden bg-[#18181C] border-2 border-[#2C2C32] shadow-xl will-change-transform transform-gpu"
        >
          <div className="absolute inset-0 bg-[#0C0C0E]">
            <img 
              src={image} 
              alt={`${title} base preview`}
              className="w-full h-[280px] object-cover object-bottom -translate-y-[190px] opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
          {/* Beveled base rim */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/15" />
        </div>

      </div>

      {/* Ground ambient shadow (reacts dynamically to slice expansion) */}
      <div 
        ref={shadowRef}
        className="w-[80%] h-6 bg-black/25 rounded-full mt-2 will-change-transform"
      />
    </div>
  );
}
