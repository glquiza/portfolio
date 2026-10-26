import React, { useState, useRef, useEffect } from 'react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Eye, 
  Download, 
  X, 
  Copy, 
  Check, 
  FileText,
  Sparkles
} from 'lucide-react';
import { certifications } from '../data/projectsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [previewCert, setPreviewCert] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  const categories = ['ALL', 'CYBERSECURITY', 'NETWORKING', 'WEB & DEV', 'PROFESSIONAL'];

  const filteredCerts = selectedCategory === 'ALL'
    ? certifications
    : certifications.filter(c => c.category.toUpperCase().includes(selectedCategory));

  // GSAP Entrance animation
  useGSAP(() => {
    gsap.from('.cert-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 35,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out',
    });
  }, { scope: containerRef, dependencies: [selectedCategory] });

  // Escape key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && previewCert) {
        setPreviewCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewCert]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (previewCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [previewCert]);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

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
            const hasPreview = Boolean(cert.previewImage);

            return (
              <div
                key={cert.id}
                className={`cert-card p-6 bg-[#F4F0EA] border transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md rounded-lg ${
                  cert.isFeatured 
                    ? 'border-terracotta/40 bg-gradient-to-b from-[#F4F0EA] to-[#EBE5DC] ring-1 ring-terracotta/20' 
                    : 'border-black/[0.08] hover:border-charcoal'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Card Metadata & Status Badge */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-charcoal-subtle font-medium">{cert.year}</span>
                    
                    <div className="flex items-center gap-2">
                      {cert.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-terracotta text-white">
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}

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
                  </div>

                  {/* High-Res Certificate Preview Thumbnail (if available) */}
                  {hasPreview && (
                    <div 
                      onClick={() => setPreviewCert(cert)}
                      className="relative mt-2 overflow-hidden rounded-md border border-black/10 bg-[#EFEBE4] cursor-pointer group/thumb aspect-[16/10]"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${cert.title}`}
                      onKeyDown={(e) => { if (e.key === 'Enter') setPreviewCert(cert); }}
                    >
                      <img 
                        src={cert.previewImage} 
                        alt={cert.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 text-charcoal rounded text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                          <Eye className="w-3.5 h-3.5 text-terracotta" />
                          Inspect Certificate
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Title & Issuer */}
                  <div className="space-y-1.5 pt-1">
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

                {/* Footer: Credential ID & Actions */}
                <div className="pt-5 mt-6 border-t border-black/[0.08] flex items-center justify-between font-mono text-xs text-charcoal-subtle">
                  <div className="flex items-center gap-1.5 truncate max-w-[50%]">
                    <ShieldCheck className="w-3.5 h-3.5 text-terracotta shrink-0" />
                    <span className="text-[11px] font-mono tracking-wider truncate" title={cert.credentialId}>
                      {cert.credentialId}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {hasPreview && (
                      <button
                        onClick={() => setPreviewCert(cert)}
                        className="inline-flex items-center gap-1 text-charcoal font-semibold hover:text-terracotta transition-colors"
                        title="Preview certificate lightbox"
                      >
                        <Eye className="w-3.5 h-3.5 text-terracotta" />
                        <span className="text-[11px] uppercase tracking-wider">Preview</span>
                      </button>
                    )}

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-charcoal hover:text-terracotta transition-colors duration-200"
                      aria-label={`Verify or view document for ${cert.title}`}
                    >
                      <span className="text-[11px] uppercase tracking-wider font-semibold">
                        {cert.pdfUrl ? 'PDF' : 'Verify'}
                      </span>
                      <ExternalLink className="w-3 h-3 text-terracotta" />
                    </a>
                  </div>
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
              <span>Cor Jesu College BSIT • Active Cybersecurity, Networking, and Tech Entrepreneurship Credentials.</span>
            </div>
          </div>

          <div className="text-[11px] text-charcoal-subtle uppercase tracking-widest whitespace-nowrap">
            DIGOS CITY • DAVAO DEL SUR
          </div>
        </div>

      </div>

      {/* Certificate Lightbox Modal */}
      {previewCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setPreviewCert(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#F4F0EA] border border-black/20 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#EDE8E0] border-b border-black/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <div>
                  <h4 id="cert-modal-title" className="font-display font-bold text-base sm:text-lg text-charcoal">
                    {previewCert.title}
                  </h4>
                  <p className="font-mono text-xs text-charcoal-subtle">
                    {previewCert.issuer} • Issued {previewCert.year}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setPreviewCert(null)}
                className="p-2 rounded-lg bg-black/5 hover:bg-black/10 text-charcoal transition-colors focus:outline-none"
                aria-label="Close certificate preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewer */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#E8E2D8] flex items-center justify-center">
              <div className="relative rounded-lg overflow-hidden shadow-lg border border-black/15 bg-white max-w-full">
                <img 
                  src={previewCert.previewImage} 
                  alt={`Official Certificate for ${previewCert.title}`}
                  className="w-full max-h-[62vh] object-contain"
                />
              </div>
            </div>

            {/* Modal Footer & Actions */}
            <div className="px-6 py-4 bg-[#EDE8E0] border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              
              {/* Credential ID with Copy */}
              <div className="flex items-center gap-2 text-charcoal-muted w-full sm:w-auto">
                <span className="uppercase text-charcoal-subtle text-[11px]">Credential ID:</span>
                <code className="px-2 py-0.5 bg-[#F4F0EA] border border-black/10 rounded text-[11px] font-bold text-charcoal select-all">
                  {previewCert.credentialId}
                </code>
                <button
                  onClick={() => handleCopyId(previewCert.credentialId)}
                  className="p-1 hover:text-terracotta text-charcoal-subtle transition-colors"
                  title="Copy Credential ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {previewCert.pdfUrl && (
                  <>
                    <a
                      href={previewCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#F4F0EA] hover:bg-white text-charcoal border border-black/10 transition-colors uppercase tracking-wider font-semibold"
                    >
                      <FileText className="w-3.5 h-3.5 text-terracotta" />
                      <span>Open PDF</span>
                    </a>

                    <a
                      href={previewCert.pdfUrl}
                      download={`Wadhwani-Certificate-${previewCert.credentialId}.pdf`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-terracotta hover:bg-terracotta-dark text-white font-bold transition-all shadow-sm uppercase tracking-wider"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </>
                )}

                <button
                  onClick={() => setPreviewCert(null)}
                  className="px-3.5 py-2 rounded bg-charcoal text-white hover:bg-charcoal/90 transition-colors uppercase tracking-wider font-semibold"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}