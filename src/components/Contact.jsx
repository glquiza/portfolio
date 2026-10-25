import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/projectsData';

export default function Contact() {
  const { email, github, linkedin } = personalInfo.contact;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 sm:py-40 bg-[#09090b] border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="space-y-4 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <span className="text-white font-bold">[ 06 ]</span>
            <span>COMMISSION & INQUIRIES</span>
          </div>

          <h2 className="font-display font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[0.95] max-w-5xl">
            HAVE A PROJECT IN MIND? <br />
            <span className="text-neutral-500">LET'S BUILD SOMETHING EXCEPTIONAL.</span>
          </h2>
        </div>

        {/* Large Action Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 border-t border-neutral-800">
          
          {/* Main Direct Email Action Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-[#101014] border border-neutral-800 hover:border-neutral-600 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                DIRECT INBOX
              </span>
              <p className="font-display font-bold text-2xl sm:text-3xl text-white break-all">
                {email}
              </p>
              <p className="text-neutral-400 text-sm max-w-md">
                Available for full-time front-end opportunities, contract collaborations, and creative engineering commissions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-2.5 px-7 py-4 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all active:scale-[0.98]"
              >
                <span>OPEN EMAIL CLIENT</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-6 py-4 border border-neutral-700 hover:border-white text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all hover:bg-white/[0.04]"
                aria-label="Copy email address to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ADDRESS'}</span>
              </button>
            </div>
          </div>

          {/* Social Channels Side Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            
            {/* GitHub Card */}
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-[#101014] border border-neutral-800 hover:border-white transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neutral-900 border border-neutral-800 text-white">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-bold uppercase text-lg text-white block">
                    GITHUB
                  </span>
                  <span className="font-mono text-xs text-neutral-500 block">
                    Source Code & Repos
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-[#101014] border border-neutral-800 hover:border-white transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neutral-900 border border-neutral-800 text-white">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-bold uppercase text-lg text-white block">
                    LINKEDIN
                  </span>
                  <span className="font-mono text-xs text-neutral-500 block">
                    Professional Network
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
