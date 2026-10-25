import React from 'react';
import { MapPin, Globe, Terminal, Cpu } from 'lucide-react';
import { personalInfo } from '../data/projectsData';

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-36 bg-[#0a0a0d] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-800">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <span className="text-white font-bold">[ 05 ]</span>
              <span>STUDIO & FOUNDER PROFILE</span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              PHILOSOPHY & TECHNICAL STANDARDS
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 items-start">
          
          {/* Left Column: Portrait & Numerical Statistics */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Portrait Frame */}
            <div className="relative bg-[#121216] border border-neutral-800 p-2 shadow-2xl">
              <div className="aspect-[4/5] overflow-hidden bg-neutral-900 relative">
                <img 
                  src={personalInfo.avatar} 
                  alt={personalInfo.name} 
                  className="w-full h-full object-cover contrast-105 hover:scale-102 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Monospace Caption Bar */}
              <div className="mt-2 pt-2 px-1 flex items-center justify-between font-mono text-[11px] text-neutral-400 border-t border-neutral-800/80">
                <span className="text-white font-semibold">{personalInfo.name}</span>
                <span className="uppercase text-neutral-500">FOUNDER & DEVELOPER</span>
              </div>
            </div>

            {/* Numerical Statistics */}
            <div className="grid grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="p-6 bg-[#0e0e12] space-y-1">
                  <span className="block font-display font-bold text-3xl sm:text-4xl text-white">
                    {stat.value}
                  </span>
                  <span className="block font-mono text-xs uppercase tracking-wider text-neutral-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Narrative & Technical Disciplines */}
          <div className="lg:col-span-7 space-y-10">
            
            <div className="space-y-6 text-neutral-300 text-lg sm:text-xl leading-relaxed font-normal">
              {personalInfo.bio.map((paragraph, index) => (
                <p key={index} className="text-balance">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Technical Stack Tags */}
            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
                <Cpu className="w-4 h-4 text-white" />
                <span>ACTIVE TECHNOLOGY TOOLCHAIN</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {personalInfo.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider bg-[#141418] text-neutral-200 border border-neutral-800 hover:border-neutral-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Studio Coordinates Bar */}
            <div className="p-6 bg-[#111116] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-white">Davao del Sur, Philippines</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>PHT / UTC+08:00</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
