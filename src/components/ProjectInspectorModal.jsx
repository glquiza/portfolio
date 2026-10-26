import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, Layers, Play, FileText, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

// Mini-Projects
import CyberThreatMatrix from './miniprojects/CyberThreatMatrix';
import RetroPhysicsLab from './miniprojects/RetroPhysicsLab';
import KineticAudioStudio from './miniprojects/KineticAudioStudio';

gsap.registerPlugin(Flip);

export default function ProjectInspectorModal({ project, onClose }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'case'

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

  // Render the appropriate mini-project based on ID / demoType
  const renderMiniProject = () => {
    if (project.id === 'project-1' || project.demoType === 'cyber') {
      return <CyberThreatMatrix />;
    }
    if (project.id === 'project-2' || project.demoType === 'physics') {
      return <RetroPhysicsLab />;
    }
    if (project.id === 'project-3' || project.demoType === 'audio') {
      return <KineticAudioStudio />;
    }
    return <CyberThreatMatrix />;
  };

  return (
    <div 
      ref={modalRef} 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 lg:p-8"
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
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#F4F0EA] border border-black/[0.15] shadow-2xl rounded-2xl overflow-y-auto z-10 flex flex-col will-change-transform"
      >
        {/* Top Header Bar with Mode Switcher */}
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#EDE8E0] border-b border-black/[0.08]">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-charcoal-subtle">
            <span className="w-2 h-2 rounded-full bg-terracotta"></span>
            <span className="text-charcoal font-bold">{project.title}</span>
            <span className="hidden sm:inline-block">• {project.year}</span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg bg-[#E2DDD5] p-1 border border-black/[0.06] text-xs font-mono">
              <button
                onClick={() => setActiveTab('demo')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all ${
                  activeTab === 'demo'
                    ? 'bg-terracotta text-white font-bold shadow-sm'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>INTERACTIVE DEMO</span>
              </button>

              <button
                onClick={() => setActiveTab('case')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all ${
                  activeTab === 'case'
                    ? 'bg-charcoal text-white font-bold shadow-sm'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>CASE SPECS</span>
              </button>
            </div>

            <button
              onClick={handleClose}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-black/[0.1] hover:border-charcoal bg-[#F4F0EA] hover:bg-white text-charcoal font-mono text-xs uppercase transition-all"
              aria-label="Close Inspector"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Main Title & Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold">
                {project.category}
              </span>
              <span className="text-black/[0.2] font-mono">•</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 text-[10px] font-mono font-semibold">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                GSAP-POWERED ENGINE
              </span>
            </div>

            <h2 id="inspector-title" className="font-display font-extrabold text-2xl sm:text-4xl text-charcoal tracking-tight">
              {project.title}
            </h2>
            <p className="font-body text-charcoal-muted text-sm sm:text-base leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Conditional View: Live Interactive Demo vs Case Overview */}
          {activeTab === 'demo' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-charcoal-subtle pb-1">
                <span className="flex items-center gap-1.5 text-terracotta font-semibold uppercase">
                  <Play className="w-3 h-3 fill-terracotta" />
                  LIVE EMBEDDED REACT & GSAP APPLICATION
                </span>
                <span className="hidden sm:inline-block">[ CLICK CONTROLS TO INTERACT ]</span>
              </div>

              {/* Live Rendered Mini Project */}
              {renderMiniProject()}
            </div>
          ) : (
            <div className="space-y-8">
              {/* High-Resolution Frame */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#18181C] border border-black/[0.1] shadow-xl group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                  <span className="bg-black/60 px-3 py-1 rounded backdrop-blur-sm">
                    {project.category}
                  </span>
                  <button
                    onClick={() => setActiveTab('demo')}
                    className="inline-flex items-center gap-1.5 bg-terracotta px-4 py-1.5 rounded text-white font-semibold hover:bg-terracotta-hover transition-colors"
                  >
                    <span>PLAY LIVE DEMO</span>
                    <Play className="w-3 h-3 fill-white" />
                  </button>
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
                    <span>60 FPS Locked Interactive State</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-muted">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Native Web Audio / Canvas Physics</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-muted">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% Touch & Mobile Responsive</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Action CTAs Bottom Bar */}
          <div className="pt-6 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setActiveTab(activeTab === 'demo' ? 'case' : 'demo')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-white font-mono text-xs uppercase font-semibold hover:bg-terracotta-hover transition-all rounded shadow-sm"
            >
              <span>{activeTab === 'demo' ? 'View Technical Specs' : 'Play Live Interactive Demo'}</span>
              <Sparkles className="w-4 h-4" />
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-black/[0.1] hover:border-charcoal text-charcoal font-mono text-xs uppercase transition-all bg-[#EDE8E0] hover:bg-white rounded"
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
