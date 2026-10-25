import React from 'react';

export default function Marquee() {
  const items = [
    'CREATIVE FRONTEND',
    'GSAP SCROLLTRIGGER',
    'ACCESSIBLE WEB STANDARDS',
    'EDITORIAL ARCHITECTURE',
    'REACT 19 ECOSYSTEM',
    '60FPS PERFORMANCE',
  ];

  return (
    <div 
      className="border-y border-black/[0.08] bg-[#EDE8E0] py-5 overflow-hidden select-none" 
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee space-x-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-12 shrink-0">
            {items.map((item, idx) => (
              <span 
                key={idx} 
                className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-wider text-charcoal hover:text-terracotta transition-colors flex items-center gap-12"
              >
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
