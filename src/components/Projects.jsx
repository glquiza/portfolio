import React from 'react';
import { Layers } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projectsData';

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 mb-14">
          <p className="text-sky-400 font-semibold tracking-wider text-xs uppercase flex items-center gap-2">
            <Layers className="w-4 h-4" /> Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            React & Animation Projects
          </h2>
          <p className="text-slate-400 text-base">
            A collection of interactive web applications and experiments focusing on responsive UI, animations, and clean state design.
          </p>
        </div>

        {/* Projects Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
