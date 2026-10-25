import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project, index }) {
  const { title, description, tech, image, githubUrl, liveUrl, category, year } = project;
  const isEven = index % 2 === 1;

  return (
    <article className="py-20 sm:py-28 border-t border-neutral-800/80 first:border-t-0">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}>
        
        {/* Project Metadata & Narrative */}
        <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:col-start-8' : ''}`}>
          
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">[{project.index}]</span>
              <span className="uppercase tracking-wider">{category}</span>
            </div>
            <span>{year}</span>
          </div>

          <h3 className="font-display font-extrabold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
            {title}
          </h3>

          <p className="text-neutral-400 text-base leading-relaxed font-normal">
            {description}
          </p>

          {/* Tech stack metadata pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {tech.map((item) => (
              <span 
                key={item}
                className="px-3 py-1 font-mono text-xs uppercase tracking-wider bg-[#141418] text-neutral-300 border border-neutral-800"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all active:scale-[0.98]"
            >
              <span>EXPLORE LIVE DEMO</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-neutral-700 hover:border-white text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all hover:bg-white/[0.04]"
              aria-label={`View ${title} source code on GitHub`}
            >
              <GithubIcon className="w-4 h-4" />
              <span>SOURCE CODE</span>
            </a>
          </div>

        </div>

        {/* Large Desktop Mockup Preview */}
        <div className={`lg:col-span-7 ${isEven ? 'lg:col-start-1' : ''}`}>
          <div className="group relative bg-[#121216] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 hover:border-neutral-600">
            
            {/* Browser frame title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#18181d] border-b border-neutral-800 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 group-hover:bg-rose-500/80 transition-colors"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 group-hover:bg-amber-500/80 transition-colors"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 group-hover:bg-emerald-500/80 transition-colors"></span>
              </div>
              <div className="px-3 py-1 bg-black/40 rounded border border-neutral-800/60 text-[10px] tracking-wider text-neutral-400">
                app.alquiza.studio/{project.id}
              </div>
              <span className="text-[10px] text-neutral-500 uppercase">{year}</span>
            </div>

            {/* Visual preview container */}
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block relative aspect-[16/10] overflow-hidden bg-black"
            >
              <img 
                src={image} 
                alt={`Preview of ${title}`}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
              
              {/* Hover Badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-neutral-700 font-mono text-[11px] text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>VIEW CASE DEMO</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>

          </div>
        </div>

      </div>
    </article>
  );
}
