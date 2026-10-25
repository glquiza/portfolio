import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, FlaskConical, Terminal } from 'lucide-react';
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

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      scroll('left');
    } else if (e.key === 'ArrowRight') {
      scroll('right');
    }
  };

  return (
    <section 
      id="lab" 
      className="py-24 sm:py-32 bg-[#0c0c0e] border-y border-neutral-800"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Upcoming Interaction Lab Carousel"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <span className="text-white font-bold">[ 03 ]</span>
              <span>MOTION & EXPERIMENTAL LAB</span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl tracking-tight text-white">
              INTERACTION LAB STRIP
            </h2>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-white transition-all focus:outline-none focus:ring-1 focus:ring-white active:scale-95"
              aria-label="Previous lab item"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-white transition-all focus:outline-none focus:ring-1 focus:ring-white active:scale-95"
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
            className="w-[300px] sm:w-[380px] shrink-0 p-8 bg-[#111115] border border-neutral-800 hover:border-neutral-600 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>LAB / 0{index + 1}</span>
                <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-emerald-400 font-medium text-[10px] uppercase tracking-wider">
                  {item.status}
                </span>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {item.tag}
                </span>
                <h3 className="font-display font-bold uppercase text-xl text-white group-hover:text-neutral-200 transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-8 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                <span>60FPS GSAP</span>
              </span>
              <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
