import React, { useRef } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projectsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.projects-header', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
    });
  }, { scope: sectionRef });

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 sm:py-36 relative border-b border-black/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header (Inspired by screenshot with terracotta dot) */}
        <div className="projects-header flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08]">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal-subtle">
              <span className="w-2 h-2 rounded-full bg-terracotta"></span>
              <span className="text-charcoal font-bold">[ 02 ]</span>
              <span>SELECTED WORK</span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-tight">
              PORTFOLIO SHOWCASE
            </h2>
          </div>
          <p className="text-charcoal-muted font-mono text-xs uppercase tracking-widest max-w-xs">
            A curated collection of React mini-projects with custom GSAP scroll choreography and accessible interfaces.
          </p>
        </div>

        {/* Editorial Projects Listing */}
        <div className="divide-y divide-black/[0.08]">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
