import React, { useRef } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import SlicedDeviceMockup from './SlicedDeviceMockup';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project, index }) {
  const { title, description, tech, image, githubUrl, liveUrl, category, year } = project;
  const cardRef = useRef(null);

  useGSAP(() => {
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
        
        {/* Left Side: Option A - 3D Perspective Sliced Device Mockup (Driezie Studio Reference) */}
        <div className="lg:col-span-6 flex justify-center">
          <SlicedDeviceMockup 
            image={image} 
            title={title} 
            liveUrl={liveUrl} 
          />
        </div>

        {/* Right Side: Editorial Narrative & Horizontal Table (Matching Screenshot) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Title (Café 't Huchie typography) */}
          <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight leading-tight">
            {title}
          </h3>

          {/* Description Paragraph with high readability */}
          <p className="font-body text-charcoal-muted text-base sm:text-lg leading-relaxed font-normal">
            {description}
          </p>

          {/* Clean Horizontal Divider Table (Exact Driezie Studio Spec) */}
          <div className="border-t border-black/[0.08] divide-y divide-black/[0.08] font-mono text-xs text-charcoal-muted uppercase tracking-widest pt-2">
            
            <div className="py-3.5 flex items-center justify-between">
              <span>CATEGORY</span>
              <span className="text-charcoal font-semibold">{category}</span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <span>CORE ARCHITECTURE</span>
              <span className="text-charcoal font-semibold">{tech[0] || 'React 19'}</span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <span>MOTION SYSTEM</span>
              <span className="text-charcoal font-semibold">{tech[1] || 'GSAP ScrollTrigger'}</span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <span>STYLING & RESPONSIVENESS</span>
              <span className="text-charcoal font-semibold">{tech[2] || 'Tailwind CSS'}</span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <span>ACCESSIBILITY</span>
              <span className="text-emerald-700 font-semibold">WCAG 2.1 AA COMPLIANT</span>
            </div>

          </div>

          {/* Bottom Bar: Action Links */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08]">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-base font-semibold text-charcoal hover:text-terracotta transition-colors py-2 font-display uppercase tracking-wider"
            >
              <span>Explore live demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-terracotta" />
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
