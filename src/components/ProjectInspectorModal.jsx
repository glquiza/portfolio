import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export default function ProjectInspectorModal({ project, onClose }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';

    // GSAP Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(backdropRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.35 }
    )
    .fromTo(contentRef.current,
      { opacity: 0, scale: 0.94, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' },
      '-=0.2'
    );

    // Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
      defaults: { ease: 'power2.in' }
    });

    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.96,
      y: 20,
      duration: 0.25,
    })
    .to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
    }, '-=0.1');
  };

  if (!project) return null;

  return (
    <div 
      ref={modalRef} 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspector-title"
    >
      {/* Dim backdrop */}
      <div 
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md will-change-opacity"
      />

      {/* Modal Dialog Container */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#F4F0EA] border border-black/[0.15] shadow-2xl rounded-2xl overflow-y-auto z-10 flex flex-col will-change-transform"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#EDE8E0] border-b border-black/[0.08]">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-charcoal-subtle">
            <span className="w-2 h-2 rounded-full bg-terracotta"></span>
            <span className="text-charcoal font-bold">CASE INSPECTOR / {project.index}</span>
            <span className="hidden sm:inline-block">• {project.year}</span>
          </div>

          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-black/[0.1] hover:border-charcoal bg-[#F4F0EA] hover:bg-white text-charcoal font-mono text-xs uppercase transition-all"
            aria-label="Close Case Study Inspector"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Main Title & Category */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold">
              {project.category}
            </span>
            <h2 id="inspector-title" className="font-display font-extrabold text-3xl sm:text-5xl text-charcoal tracking-tight">
              {project.title}
            </h2>
            <p className="font-body text-charcoal-muted text-base sm:text-lg leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* High-Resolution Preview Frame */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#18181C] border border-black/[0.1] shadow-xl group">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
              <span className="bg-black/60 px-3 py-1 rounded backdrop-blur-sm">
                FULL VIEWPORT PREVIEW
              </span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-terracotta px-4 py-1.5 rounded text-white font-semibold hover:bg-terracotta-hover transition-colors"
              >
                <span>OPEN LIVE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Deep-Dive Technical Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/[0.08]">
            
            {/* Tech Stack Specs */}
            <div className="p-6 bg-[#EDE8E0] rounded-xl border border-black/[0.08] space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal font-semibold">
                <Cpu className="w-4 h-4 text-terracotta" />
                <span>TOOLCHAIN & LIBRARIES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span 
                    key={item}
                    className="px-3 py-1 bg-[#F4F0EA] border border-black/[0.08] font-mono text-xs text-charcoal rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance & Quality Checklist */}
            <div className="p-6 bg-[#EDE8E0] rounded-xl border border-black/[0.08] space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 uppercase tracking-widest text-charcoal font-semibold mb-2">
                <Layers className="w-4 h-4 text-terracotta" />
                <span>VERIFIED METRICS</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal-muted">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>60 FPS Locked Scroll Animations</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal-muted">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Mobile Responsive Viewport</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal-muted">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>WCAG 2.1 AA Keyboard Accessible</span>
              </div>
            </div>

          </div>

          {/* Action CTAs Bottom Bar */}
          <div className="pt-6 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-terracotta text-white font-mono text-xs uppercase font-semibold hover:bg-terracotta-hover transition-all rounded shadow-sm"
            >
              <span>Launch Live Site</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-black/[0.1] hover:border-charcoal text-charcoal font-mono text-xs uppercase transition-all bg-[#EDE8E0] hover:bg-white rounded"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Inspect Source Code</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
