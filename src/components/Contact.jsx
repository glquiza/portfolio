import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
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
    <section id="contact" className="py-28 sm:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="space-y-4 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal-subtle">
            <span className="w-2 h-2 rounded-full bg-terracotta"></span>
            <span className="text-charcoal font-bold">[ 06 ]</span>
            <span>COMMISSION & INQUIRIES</span>
          </div>

          <h2 className="font-display font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-charcoal leading-[0.95] max-w-5xl">
            HAVE A PROJECT IN MIND? <br />
            <span className="text-charcoal-muted">LET'S BUILD SOMETHING EXCEPTIONAL.</span>
          </h2>
        </div>

        {/* Large Action Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 border-t border-black/[0.08]">
          
          {/* Main Direct Email Action Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-[#EDE8E0] border border-black/[0.08] hover:border-charcoal transition-all flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-charcoal-subtle">
                DIRECT INBOX
              </span>
              <p className="font-display font-bold text-2xl sm:text-3xl text-charcoal break-all">
                {email}
              </p>
              <p className="text-charcoal-muted text-sm max-w-md">
                Available for full-time front-end opportunities, contract collaborations, and creative engineering commissions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-2.5 px-7 py-4 bg-terracotta text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-terracotta-hover transition-all shadow-sm active:scale-[0.98]"
              >
                <span>OPEN EMAIL CLIENT</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-6 py-4 border border-black/[0.1] hover:border-charcoal text-charcoal font-mono text-xs uppercase tracking-wider transition-all bg-[#F4F0EA] hover:bg-white"
                aria-label="Copy email address to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
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
              className="p-8 bg-[#EDE8E0] border border-black/[0.08] hover:border-charcoal transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#F4F0EA] border border-black/[0.08] text-charcoal">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-bold uppercase text-lg text-charcoal block">
                    GITHUB
                  </span>
                  <span className="font-mono text-xs text-charcoal-subtle block">
                    Source Code & Repos
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-charcoal-subtle group-hover:text-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-[#EDE8E0] border border-black/[0.08] hover:border-charcoal transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#F4F0EA] border border-black/[0.08] text-charcoal">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-bold uppercase text-lg text-charcoal block">
                    LINKEDIN
                  </span>
                  <span className="font-mono text-xs text-charcoal-subtle block">
                    Professional Network
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-charcoal-subtle group-hover:text-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
