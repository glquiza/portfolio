import React, { useRef } from 'react';
import { ArrowDownRight, ArrowRight, ArrowDown, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../data/projectsData';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Choreographed entrance sequence matching Driezie Studio standards
    tl.from('.hero-meta-tag', {
      opacity: 0,
      y: -15,
      duration: 0.7,
      stagger: 0.1,
    })
    .from('.hero-line-reveal', {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.12,
    }, '-=0.4')
    .from('.hero-description', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.5')
    .from('.hero-cta-btn', {
      opacity: 0,
      y: 15,
      stagger: 0.15,
      duration: 0.6,
    }, '-=0.5')
    .from('.hero-mockup-frame', {
      opacity: 0,
      scale: 0.94,
      y: 30,
      duration: 1.1,
      ease: 'power2.out',
    }, '-=0.7')
    .from('.hero-portrait-frame', {
      opacity: 0,
      scale: 0.88,
      duration: 0.9,
      ease: 'back.out(1.5)',
    }, '-=0.8')
    .from('.hero-scroll-indicator', {
      opacity: 0,
      duration: 0.8,
    }, '-=0.3');

    // Subtle gentle float for dimensional mockup
    gsap.to('.hero-float-element', {
      y: -10,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between border-b border-neutral-800/80 bg-[#09090b] overflow-hidden"
    >
      {/* Background architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 grid grid-cols-4 sm:grid-cols-12 gap-4">
          <div className="border-r border-white/[0.02] h-full hidden sm:block col-span-3"></div>
          <div className="border-r border-white/[0.02] h-full hidden sm:block col-span-3"></div>
          <div className="border-r border-white/[0.02] h-full hidden sm:block col-span-3"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Top Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-800/60 font-mono text-[11px] uppercase tracking-widest text-neutral-400">
          <div className="hero-meta-tag flex items-center gap-2">
            <span className="text-white font-semibold">[ 01 ]</span>
            <span>INDEPENDENT PRACTICE</span>
          </div>
          <div className="hero-meta-tag hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{personalInfo.availability}</span>
          </div>
          <div className="hero-meta-tag flex items-center gap-2">
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="space-y-3 mb-12">
          <h1 className="font-display font-extrabold uppercase tracking-tight text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
            <span className="hero-line-reveal block">CREATIVE FRONTEND</span>
            <span className="hero-line-reveal block text-neutral-400">
              & MOTION DESIGN
            </span>
            <span className="hero-line-reveal block text-white">
              FOR DIGITAL PRODUCTS.
            </span>
          </h1>
        </div>

        {/* Two-Column Editorial Layout: Description/CTAs & Dimensional Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-4">
          
          {/* Left: Description & CTAs */}
          <div className="lg:col-span-6 space-y-8">
            <p className="hero-description text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {personalInfo.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#projects"
                className="hero-cta-btn group inline-flex items-center gap-3 px-7 py-4 rounded-none bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-all active:scale-[0.98]"
              >
                <span>EXPLORE SELECTED WORK</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a 
                href="#contact"
                className="hero-cta-btn inline-flex items-center gap-3 px-7 py-4 rounded-none bg-transparent border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-all hover:bg-white/[0.04]"
              >
                <span>START A PROJECT</span>
              </a>
            </div>

            {/* Micro specs */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-800/80 font-mono text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">STACK</span>
                <span className="text-white font-medium">React 19 / GSAP</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">FPS</span>
                <span className="text-emerald-400 font-medium">60 Locked</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">APPROACH</span>
                <span className="text-white font-medium">Editorial / A11y</span>
              </div>
            </div>
          </div>

          {/* Right: Layered Dimensional Studio Mockup Composition */}
          <div className="lg:col-span-6 relative">
            <div className="hero-mockup-frame hero-float-element relative bg-[#121216] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
              
              {/* Browser Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#18181d] border-b border-neutral-800 text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
                </div>
                <div className="px-3 py-1 bg-black/40 rounded border border-neutral-800/60 text-[10px] tracking-wider">
                  garyalquiza.dev/preview/storybook
                </div>
                <div className="w-8"></div>
              </div>

              {/* Mockup Preview Content */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black group">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80" 
                  alt="Interactive GSAP Project Preview" 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Studio Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0c0c0e]/90 backdrop-blur-md border border-neutral-700/80 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">PROJECT 01</span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-neutral-300">GSAP Kinetic Storybook</span>
                  </div>
                  <span className="text-emerald-400 text-[11px] font-semibold">LIVE</span>
                </div>
              </div>
            </div>

            {/* Overlapping Architectural Portrait Frame */}
            <div className="hero-portrait-frame absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-32 h-32 sm:w-40 sm:h-40 bg-[#121216] border-2 border-neutral-700 p-1.5 shadow-2xl rounded-none">
              <div className="w-full h-full relative overflow-hidden bg-neutral-900">
                <img 
                  src={personalInfo.avatar} 
                  alt={personalInfo.name} 
                  className="w-full h-full object-cover contrast-105"
                />
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 px-1.5 py-0.5 border border-neutral-700 font-mono text-[9px] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>PHT</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-16 flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase">
        <div className="hero-scroll-indicator flex items-center gap-3">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>SCROLL TO EXPLORE SELECTED WORK</span>
        </div>
        <div className="hidden sm:block">
          <span>ALQUIZA / 2025 PORTFOLIO V1</span>
        </div>
      </div>

    </section>
  );
}
