import React, { useRef } from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../data/projectsData';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', {
      opacity: 0,
      y: -20,
      duration: 0.8,
    })
    .from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 0.9,
    }, '-=0.5')
    .from('.hero-tagline', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.6')
    .from('.hero-cta', {
      opacity: 0,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.6,
    }, '-=0.5')
    .from('.hero-avatar', {
      opacity: 0,
      scale: 0.85,
      duration: 1,
      ease: 'back.out(1.7)',
    }, '-=0.8');
  }, { scope: containerRef });

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 sm:py-24 overflow-hidden"
    >
      {/* Decorative gradient glow backdrop */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-sky-500/10 blur-[130px] rounded-full"></div>
        <div className="w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full -translate-y-12"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available for new opportunities</span>
          </div>

          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">{personalInfo.name}</span>
          </h1>

          <p className="hero-tagline text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            {personalInfo.tagline}
          </p>

          <div className="hero-cta flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <a 
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>View my work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a 
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold hover:border-slate-600 transition-all transform hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              <span>Contact me</span>
            </a>
          </div>
        </div>

        {/* Right Column: Avatar Photo */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="hero-avatar relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-500 opacity-30 group-hover:opacity-60 blur-lg transition duration-500"></div>
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900">
              <img 
                src={personalInfo.avatar} 
                alt={`${personalInfo.name} profile portrait`} 
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
