import React, { useRef } from 'react';
import { ArrowDownRight, ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const floatingImageRef = useRef(null);

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
    .from(floatingImageRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 40,
      duration: 1.2,
      ease: 'power2.out',
    }, '-=0.8')
    .from('.hero-scroll-indicator', {
      opacity: 0,
      duration: 0.8,
    }, '-=0.4');

    // 1. Continuous Ambient Floating Animation
    gsap.to(floatingImageRef.current, {
      y: -18,
      rotation: 1.2,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // 2. ScrollTrigger: Smoothly changes position, angle & scale as the user scrolls down
    gsap.to(floatingImageRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
      y: 240,
      x: -50,
      rotation: -6,
      scale: 0.86,
      ease: 'power1.inOut',
    });

  }, { scope: containerRef });

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between border-b border-black/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10">
        
        {/* Top Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-black/[0.07] font-mono text-[11px] uppercase tracking-widest text-charcoal-subtle">
          <div className="hero-meta-tag flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta"></span>
            <span className="text-charcoal font-semibold">[ 01 ]</span>
            <span>INDEPENDENT PRACTICE</span>
          </div>
          <div className="hero-meta-tag hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>{personalInfo.availability}</span>
          </div>
          <div className="hero-meta-tag flex items-center gap-2">
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="space-y-3 mb-12">
          <h1 className="font-display font-extrabold uppercase tracking-tight text-charcoal text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
            <span className="hero-line-reveal block">CREATIVE FRONTEND</span>
            <span className="hero-line-reveal block text-charcoal-muted">
              & MOTION DESIGN
            </span>
            <span className="hero-line-reveal block text-charcoal">
              FOR DIGITAL PRODUCTS.
            </span>
          </h1>
        </div>

        {/* Two-Column Layout: Narrative & Scroll-Reactive Floating Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end pt-4">
          
          {/* Left: Description & CTAs */}
          <div className="lg:col-span-6 space-y-8">
            <p className="hero-description text-charcoal-muted text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {personalInfo.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#projects"
                className="hero-cta-btn group inline-flex items-center gap-3 px-7 py-4 rounded-none bg-terracotta text-white font-mono text-xs uppercase tracking-widest font-semibold hover:bg-terracotta-hover shadow-md shadow-terracotta/20 transition-all active:scale-[0.98]"
              >
                <span>EXPLORE SELECTED WORK</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a 
                href="#contact"
                className="hero-cta-btn inline-flex items-center gap-3 px-7 py-4 rounded-none bg-[#EDE8E0] border border-black/[0.08] hover:border-charcoal text-charcoal font-mono text-xs uppercase tracking-widest transition-all hover:bg-[#E5DFD5]"
              >
                <span>CONTACT ME</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Micro specs */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/[0.08] font-mono text-xs">
              <div>
                <span className="text-charcoal-subtle block text-[10px] uppercase">STACK</span>
                <span className="text-charcoal font-medium">React 19 / GSAP</span>
              </div>
              <div>
                <span className="text-charcoal-subtle block text-[10px] uppercase">FPS</span>
                <span className="text-emerald-700 font-medium">60 Locked</span>
              </div>
              <div>
                <span className="text-charcoal-subtle block text-[10px] uppercase">APPROACH</span>
                <span className="text-charcoal font-medium">Editorial / A11y</span>
              </div>
            </div>
          </div>

          {/* Right: Floating & Scroll-Triggered Position-Changing Composition */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div 
              ref={floatingImageRef}
              className="relative w-full max-w-lg select-none will-change-transform"
            >
              
              {/* Sliced 3D Sculptural Device Mockup Card (Driezie Studio Reference Style) */}
              <div className="relative bg-[#1A1A1E] text-white p-3 rounded-2xl shadow-2xl border border-black/10 overflow-hidden group">
                
                {/* Mockup Titlebar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-[10px] font-mono text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="tracking-wider">garyalquiza.studio / showcase</span>
                  <span className="text-terracotta font-semibold">GSAP 3</span>
                </div>

                {/* Sliced Visual Preview Preview */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black">
                  <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80" 
                    alt="Featured Project Preview" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Status Banner */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/80 backdrop-blur-md rounded border border-white/10 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-terracotta font-bold">PROJECT 01</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-white text-xs">Interactive Storybook</span>
                    </div>
                    <span className="text-emerald-400 text-[10px]">SCROLL REACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Overlapping Gary's Portrait Frame */}
              <div className="absolute -bottom-8 -left-6 sm:-bottom-10 sm:-left-10 w-36 h-36 sm:w-44 sm:h-44 bg-[#F4F0EA] border-2 border-charcoal p-1.5 shadow-2xl rounded-none">
                <div className="w-full h-full relative overflow-hidden bg-neutral-200">
                  <img 
                    src={personalInfo.avatar} 
                    alt={personalInfo.name} 
                    className="w-full h-full object-cover contrast-105"
                  />
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-charcoal text-white px-2 py-0.5 font-mono text-[9px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>FOUNDER</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-16 flex items-center justify-between text-charcoal-subtle font-mono text-[10px] tracking-widest uppercase z-10">
        <div className="hero-scroll-indicator flex items-center gap-3">
          <ArrowDown className="w-3.5 h-3.5 text-terracotta animate-bounce" />
          <span>SCROLL DOWN TO TRIGGER MOTION TRANSITIONS</span>
        </div>
        <div className="hidden sm:block">
          <span>ALQUIZA / STUDIO V1 — 2025</span>
        </div>
      </div>

    </section>
  );
}
