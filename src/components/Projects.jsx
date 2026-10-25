import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projectsData';

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-36 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-800">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <span className="text-white font-bold">[ 02 ]</span>
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              SELECTED WORKS & EXPERIMENTS
            </h2>
          </div>
          <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest max-w-xs">
            A curated index of interactive web applications, motion canvases, and production prototypes.
          </p>
        </div>

        {/* Editorial Projects Listing */}
        <div className="divide-y divide-neutral-800/80">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
