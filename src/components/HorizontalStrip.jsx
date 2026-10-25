import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Terminal } from 'lucide-react';
import { labExperiments } from '../data/projectsData';

export default function HorizontalStrip() {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Mouse Drag Support
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') scroll('left');
    else if (e.key === 'ArrowRight') scroll('right');
  };

  return (
    <section 
      id="lab" 
      className="py-24 sm:py-32 bg-[#EFEBE4] border-b border-black/[0.08]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
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

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-[#F4F0EA] border border-black/[0.1] text-charcoal hover:border-charcoal hover:bg-white transition-all focus:outline-none focus:ring-1 focus:ring-charcoal active:scale-95"
              aria-label="Previous lab item"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-[#F4F0EA] border border-black/[0.1] text-charcoal hover:border-charcoal hover:bg-white transition-all focus:outline-none focus:ring-1 focus:ring-charcoal active:scale-95"
              aria-label="Next lab item"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div 
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 overflow-x-auto scrollbar-none px-6 sm:px-8 lg:px-12 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {labExperiments.map((item, index) => (
          <div 
            key={item.id}
            className="w-[300px] sm:w-[380px] shrink-0 p-8 bg-[#F4F0EA] border border-black/[0.08] hover:border-charcoal transition-all flex flex-col justify-between group shadow-sm"
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

              <p className="text-charcoal-muted text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-8 border-t border-black/[0.08] flex items-center justify-between font-mono text-xs text-charcoal-subtle">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-terracotta" />
                <span>60FPS GSAP</span>
              </span>
              <span className="text-charcoal group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
