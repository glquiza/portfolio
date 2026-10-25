import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Terminal } from 'lucide-react';
import { labExperiments } from '../data/projectsData';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Draggable);

export default function HorizontalStrip() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    if (!trackRef.current || !containerRef.current) return;

    // Calculate maximum drag offset
    const getBounds = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      return {
        minX: -(trackWidth - containerWidth + 60),
        maxX: 0,
      };
    };

    // GSAP Draggable with momentum and spring bounds
    Draggable.create(trackRef.current, {
      type: 'x',
      edgeResistance: 0.75,
      bounds: getBounds(),
      inertia: true,
      cursor: 'grab',
      activeCursor: 'grabbing',
    });
  }, { scope: containerRef });

  const scrollByAmount = (direction) => {
    if (!trackRef.current) return;
    const currentX = gsap.getProperty(trackRef.current, 'x') || 0;
    const moveAmount = 380;
    const newX = direction === 'left' ? currentX + moveAmount : currentX - moveAmount;
    
    gsap.to(trackRef.current, {
      x: Math.min(0, Math.max(-1200, newX)),
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section 
      id="lab" 
      ref={containerRef}
      className="py-24 sm:py-32 bg-[#EFEBE4] border-b border-black/[0.08] overflow-hidden"
      aria-label="Upcoming Interaction Lab Carousel"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-black/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal-subtle">
              <span className="w-2 h-2 rounded-full bg-terracotta"></span>
              <span className="text-charcoal font-bold">[ 03 ]</span>
              <span>EXPERIMENTAL LAB</span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl tracking-tight text-charcoal">
              INTERACTION LAB STRIP
            </h2>
          </div>

          {/* Interactive Controls & Drag Notice */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block font-mono text-xs text-charcoal-subtle uppercase">
              DRAG OR USE ARROWS →
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount('left')}
                className="p-3 bg-[#F4F0EA] border border-black/[0.1] text-charcoal hover:border-charcoal hover:bg-white transition-all focus:outline-none focus:ring-1 focus:ring-charcoal active:scale-95"
                aria-label="Previous lab item"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                className="p-3 bg-[#F4F0EA] border border-black/[0.1] text-charcoal hover:border-charcoal hover:bg-white transition-all focus:outline-none focus:ring-1 focus:ring-charcoal active:scale-95"
                aria-label="Next lab item"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Track Container with Option B Magnetic Cursor Support */}
      <div className="px-6 sm:px-8 lg:px-12" data-cursor="drag">
        <div 
          ref={trackRef}
          data-cursor="drag"
          className="flex gap-6 w-max select-none will-change-transform"
        >
          {labExperiments.map((item, index) => (
            <div 
              key={item.id}
              className="w-[320px] sm:w-[400px] shrink-0 p-8 bg-[#F4F0EA] border border-black/[0.08] hover:border-charcoal transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between font-mono text-xs text-charcoal-subtle">
                  <span>LAB / 0{index + 1}</span>
                  <span className="px-2 py-0.5 bg-terracotta/10 text-terracotta font-medium text-[10px] uppercase tracking-wider rounded">
                    {item.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-charcoal-subtle">
                    {item.tag}
                  </span>
                  <h3 className="font-display font-bold uppercase text-xl text-charcoal group-hover:text-terracotta transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="font-body text-charcoal-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-8 border-t border-black/[0.08] flex items-center justify-between font-mono text-xs text-charcoal-subtle">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-terracotta" />
                  <span>GSAP DRAGGABLE & INERTIA</span>
                </span>
                <span className="text-charcoal group-hover:translate-x-1.5 transition-transform font-bold">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
