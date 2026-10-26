import React, { useState, useRef } from 'react';
import { Award, ShieldCheck, CheckCircle2, Clock, ExternalLink, ShieldAlert, Cpu } from 'lucide-react';
import { certifications } from '../data/projectsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'CYBERSECURITY', 'NETWORKING', 'WEB & DEV'];

  const filteredCerts = selectedCategory === 'ALL'
    ? certifications
    : certifications.filter(c => c.category.toUpperCase() === selectedCategory);

  useGSAP(() => {
    gsap.from('.cert-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: containerRef, dependencies: [selectedCategory] });

  return (
    <section 
      id="certifications" 
      ref={containerRef}
      className="py-24 sm:py-32 bg-[#EFEBE4] border-b border-black/[0.08]"
      aria-label="Verified Certifications & Credentials"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal-subtle">
              <span className="w-2 h-2 rounded-full bg-terracotta"></span>
              <span className="text-charcoal font-bold">[ 03 ]</span>
              <span>CREDENTIALS & INDUSTRY TRAINING</span>
            </div>
            
            <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl tracking-tight text-charcoal">
              VERIFIED CERTIFICATIONS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded transition-all uppercase tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-terracotta text-white font-bold shadow-sm'
                    : 'bg-[#F4F0EA] hover:bg-white text-charcoal-muted border border-black/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {filteredCerts.map((cert) => {
            const isVerified = cert.status === 'Verified';
            const isInProgress = cert.status === 'In Progress';

            return (
              <div
                key={cert.id}
                className="cert-card p-7 bg-[#F4F0EA] border border-black/[0.08] hover:border-charcoal transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md rounded-lg"
              >
                <div className="space-y-5">
                  
                  {/* Card Metadata & Status Badge */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-charcoal-subtle">{cert.year}</span>
                    
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                      isVerified
                        ? 'bg-emerald-600/10 text-emerald-800 border border-emerald-600/20'
                        : isInProgress
                        ? 'bg-amber-500/10 text-amber-800 border border-amber-500/20'
                        : 'bg-terracotta/10 text-terracotta border border-terracotta/20'
                    }`}>
                      {isInProgress ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span>{cert.status}</span>
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-terracotta font-semibold block">
                      {cert.issuer}
                    </span>
                    
                    <h3 className="font-display font-bold text-xl text-charcoal group-hover:text-terracotta transition-colors leading-snug">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Summary Description */}
                  <p className="font-body text-charcoal-muted text-sm leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Competency Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-[#EDE8E0] border border-black/[0.06] rounded font-mono text-[10px] text-charcoal-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer: Credential ID & Verification Link */}
                <div className="pt-6 mt-6 border-t border-black/[0.08] flex items-center justify-between font-mono text-xs text-charcoal-subtle">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
                    <span className="text-[11px] font-mono tracking-wider">{cert.credentialId}</span>
                  </div>

                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-charcoal hover:text-terracotta transition-colors group-hover:translate-x-0.5 duration-200"
                    aria-label={`Verify ${cert.title}`}
                  >
                    <span className="text-[11px] uppercase tracking-wider font-semibold">Verify</span>
                    <ExternalLink className="w-3 h-3 text-terracotta" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Academic & Cybersecurity Assurance Note */}
        <div className="mt-12 p-6 bg-[#EDE8E0] border border-black/[0.08] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-charcoal-muted">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-terracotta shrink-0" />
            <div>
              <span className="font-bold text-charcoal uppercase block">CONTINUOUS PROFESSIONAL DEVELOPMENT</span>
              <span>Currently preparing for CompTIA Security+ & Cisco Certified CyberOps Associate.</span>
            </div>
          </div>

          <div className="text-[11px] text-charcoal-subtle uppercase tracking-widest whitespace-nowrap">
            BSIT DIGOS CITY • DAVAO DEL SUR
          </div>
        </div>

      </div>
    </section>
  );
}
