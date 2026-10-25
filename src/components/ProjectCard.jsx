import React, { useRef } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project, index }) {
  const { title, description, tech, image, githubUrl, liveUrl, category, year } = project;
  const cardRef = useRef(null);

  useGSAP(() => {
    // ScrollTrigger entrance reveal for each project card
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: cardRef });

  return (
    <article 
      ref={cardRef} 
      className="py-20 sm:py-28 border-t border-black/[0.08] first:border-t-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Dimensional Sliced Device Mockup (Exact Driezie Studio Aesthetic) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="group relative w-full max-w-lg aspect-[16/12] flex items-center justify-center">
            
            {/* Ambient drop shadow under dimensional object */}
            <div className="absolute inset-x-8 bottom-4 h-8 bg-black/15 blur-xl rounded-full"></div>

            {/* Sliced Beveled Dimensional Container */}
            <div className="relative w-full h-full bg-[#1A1A1E] rounded-3xl p-3 shadow-2xl border border-black/10 flex flex-col justify-between overflow-hidden transform group-hover:-translate-y-1 group-hover:rotate-[0.5deg] transition-all duration-700 ease-out">
              
              {/* Window Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 text-[10px] font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                </div>
                <span className="tracking-widest uppercase">CASE / {project.index}</span>
                <span className="text-terracotta">{year}</span>
              </div>

              {/* Segmented Sliced Visual Preview Preview */}
              <div className="relative flex-1 my-2 overflow-hidden rounded-xl bg-black">
                <img 
                  src={image} 
                  alt={`Preview of ${title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out opacity-90"
                  loading="lazy"
                />
                
                {/* Horizontal slice accent lines (mimicking sculptural glass slices from screenshot) */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-evenly">
                  <div className="w-full h-px bg-white/10 shadow-sm"></div>
                  <div className="w-full h-px bg-white/10 shadow-sm"></div>
                </div>

                {/* Hover Demo Trigger */}
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                  aria-label={`Open ${title} live site`}
                >
                  <span className="px-5 py-2.5 bg-white text-charcoal font-mono text-xs uppercase font-semibold flex items-center gap-2 shadow-lg">
                    <span>EXPLORE LIVE SITE</span>
                    <ExternalLink className="w-3.5 h-3.5 text-terracotta" />
                  </span>
                </a>
              </div>

              {/* Bottom Bevel Strip */}
              <div className="px-3 py-1 bg-[#121215] rounded text-[10px] font-mono text-neutral-400 flex items-center justify-between">
                <span>FRONTEND ARCHITECTURE</span>
                <span className="text-emerald-400">60FPS LOCKED</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Editorial Narrative & Horizontal Metadata Table (Matching Screenshot) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Title (Café 't Huchie style) */}
          <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight leading-tight">
            {title}
          </h3>

          {/* Description Paragraph */}
          <p className="text-charcoal-muted text-base sm:text-lg leading-relaxed font-normal">
            {description}
          </p>

          {/* Clean Horizontal Divider Table (Exact Driezie Studio Spec) */}
          <div className="border-t border-black/[0.08] divide-y divide-black/[0.08] font-mono text-xs text-charcoal-muted uppercase tracking-widest pt-2">
            
            <div className="py-3 flex items-center justify-between">
              <span>CATEGORY</span>
              <span className="text-charcoal font-medium">{category}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <span>CORE ARCHITECTURE</span>
              <span className="text-charcoal font-medium">{tech[0] || 'React 19'}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <span>MOTION SYSTEM</span>
              <span className="text-charcoal font-medium">{tech[1] || 'GSAP ScrollTrigger'}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <span>STYLING & RESPONSIVENESS</span>
              <span className="text-charcoal font-medium">{tech[2] || 'Tailwind CSS'}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <span>ACCESSIBILITY</span>
              <span className="text-emerald-700 font-medium">WCAG 2.1 AA COMPLIANT</span>
            </div>

          </div>

          {/* Bottom Bar: Action Links */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08]">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-charcoal hover:text-terracotta transition-colors py-2 font-display uppercase tracking-wider"
            >
              <span>Explore the project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-terracotta" />
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-black/[0.1] hover:border-charcoal text-charcoal font-mono text-xs uppercase tracking-wider transition-all bg-[#EDE8E0] hover:bg-[#E2DDD5]"
              aria-label={`View ${title} source code`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source code</span>
            </a>
          </div>

        </div>

      </div>
    </article>
  );
}
