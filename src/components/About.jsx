import React from 'react';
import { MapPin, BookOpen, Code2, Terminal } from 'lucide-react';
import { personalInfo } from '../data/projectsData';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 border-t border-slate-900 bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-2 mb-12 text-center sm:text-left">
          <p className="text-sky-400 font-semibold tracking-wider text-xs uppercase flex items-center justify-center sm:justify-start gap-2">
            <Terminal className="w-4 h-4" /> About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Background & Focus
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Bio text */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-base sm:text-lg">
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index} className="border-l-2 border-sky-500/40 pl-4 py-0.5">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 flex flex-wrap gap-4 text-sm text-slate-400">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>San Francisco, CA</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Focus: React & GSAP Systems</span>
              </div>
            </div>
          </div>

          {/* Tech Skills Box */}
          <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Core Technologies</h3>
                <p className="text-xs text-slate-400">Tools I work with daily</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {personalInfo.skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-slate-800/80 text-slate-200 border border-slate-700/60 hover:border-sky-500/50 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
