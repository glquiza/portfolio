import React from 'react';
import { Mail, ArrowUpRight, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/projectsData';

export default function Contact() {
  const { email, github, linkedin } = personalInfo.contact;

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-slate-900 bg-slate-950/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <p className="text-sky-400 font-semibold tracking-wider text-xs uppercase inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Get in Touch
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Let's build something together.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Whether you have an upcoming project, an opportunity, or just want to chat about web technology, my inbox is always open.
          </p>
        </div>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Email card */}
          <a
            href={`mailto:${email}`}
            className="flex flex-col items-center p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 transition-all group"
          >
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <span className="font-semibold text-white text-sm mb-1">Email Me</span>
            <span className="text-xs text-slate-400 group-hover:text-sky-300 transition-colors flex items-center gap-1">
              {email} <ArrowUpRight className="w-3 h-3" />
            </span>
          </a>

          {/* GitHub card */}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all group"
          >
            <div className="p-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 group-hover:scale-110 transition-transform mb-3">
              <GithubIcon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-white text-sm mb-1">GitHub</span>
            <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-1">
              Follow & Star <ArrowUpRight className="w-3 h-3" />
            </span>
          </a>

          {/* LinkedIn card */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all group"
          >
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform mb-3">
              <LinkedinIcon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-white text-sm mb-1">LinkedIn</span>
            <span className="text-xs text-slate-400 group-hover:text-indigo-300 transition-colors flex items-center gap-1">
              Connect <ArrowUpRight className="w-3 h-3" />
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
