import React from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project }) {
  const { title, description, tech, image, githubUrl, liveUrl } = project;

  return (
    <article className="group flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300">
      {/* Thumbnail preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img 
          src={image} 
          alt={`Preview of ${title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
            <FolderGit2 className="w-4 h-4" />
            <span>Featured Project</span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
            {title}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            {description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {tech.map((item) => (
              <span 
                key={item}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 hover:text-white transition-colors"
            aria-label={`View ${title} source code on GitHub`}
          >
            <GithubIcon className="w-4 h-4" />
            <span>Code</span>
          </a>
        </div>
      </div>
    </article>
  );
}
