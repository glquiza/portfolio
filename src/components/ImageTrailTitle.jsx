import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const TRAIL_IMAGES = [
  "/pfp.png",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
];

export default function ImageTrailTitle({ title = "GL_Tensei", eyebrow = "Design. Development. Marketing." }) {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const trailContainerRef = useRef(null);

  const lastPos = useRef({ x: 0, y: 0 });
  const imgIndex = useRef(0);
  const zIndexCounter = useRef(100);
  const idleTimer = useRef(null);
  const activeImages = useRef([]);

  // GSAP Entrance Timeline for Title & Eyebrow
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    try {
      const split = new SplitText(headingRef.current, {
        type: 'lines,words,chars',
        linesClass: 'overflow-hidden leading-none',
      });

      tl.from('.trail-title-eyebrow', {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: 'power3.out',
      })
      .from(split.chars || split.words, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.03,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.4');
    } catch (e) {
      tl.from('.trail-title-eyebrow', {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
      .from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
      }, '-=0.3');
    }
  }, []);

  // Fade out all active images with smooth closing animation
  const fadeOutAll = () => {
    if (activeImages.current.length === 0) return;

    activeImages.current.forEach((img) => {
      gsap.to(img, {
        opacity: 0,
        scale: 0.8,
        y: -15,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          if (img && img.parentNode) {
            img.parentNode.removeChild(img);
          }
        }
      });
    });

    activeImages.current = [];
  };

  // Mouse move inside title area: spawn image trail
  const handleMouseMove = (e) => {
    if (!containerRef.current || !trailContainerRef.current) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    const dist = Math.hypot(currentX - lastPos.current.x, currentY - lastPos.current.y);

    // Spawn an image when cursor moves at least 65px
    if (dist > 65) {
      lastPos.current = { x: currentX, y: currentY };

      // Cycle images
      const imgSrc = TRAIL_IMAGES[imgIndex.current];
      imgIndex.current = (imgIndex.current + 1) % TRAIL_IMAGES.length;
      zIndexCounter.current += 1;

      // Create image element dynamically for high-performance 60fps
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = 'Visual Trail Preview';
      img.className = 'fixed pointer-events-none object-cover rounded-xl shadow-2xl border-2 border-white select-none w-36 h-48 sm:w-44 sm:h-56 md:w-52 md:h-64';
      
      // Position image centered on cursor
      img.style.left = `${currentX}px`;
      img.style.top = `${currentY}px`;
      img.style.zIndex = zIndexCounter.current;
      img.style.transform = 'translate(-50%, -50%)';

      trailContainerRef.current.appendChild(img);
      activeImages.current.push(img);

      // Random rotation between -10 and +10 degrees (Yanfssss reference style)
      const randomRot = (Math.random() - 0.5) * 20;

      // Dramatic entrance animation
      gsap.fromTo(img, 
        {
          opacity: 0,
          scale: 0.55,
          rotate: randomRot * 1.5,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: randomRot,
          y: 0,
          duration: 0.45,
          ease: 'back.out(1.6)',
        }
      );

      // Max active images limit: smoothly remove oldest if more than 8
      if (activeImages.current.length > 8) {
        const oldest = activeImages.current.shift();
        gsap.to(oldest, {
          opacity: 0,
          scale: 0.75,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            if (oldest && oldest.parentNode) {
              oldest.parentNode.removeChild(oldest);
            }
          }
        });
      }
    }

    // Reset Inactivity Timer: if cursor stops moving for 550ms, close all images
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      fadeOutAll();
    }, 550);
  };

  const handleMouseLeave = () => {
    clearTimeout(idleTimer.current);
    fadeOutAll();
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-30 space-y-4 mb-16 text-center flex flex-col items-center justify-center cursor-default select-none py-4 px-2"
    >
      {/* Dynamic Trail Portal Container */}
      <div ref={trailContainerRef} className="pointer-events-none" />

      {/* Centered Eyebrow Text on Top */}
      <div className="trail-title-eyebrow font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.26em] text-terracotta font-semibold text-center select-none">
        {eyebrow}
      </div>

      {/* Centered Big Title: GL_Tensei with Interactive Hover Image Trail */}
      <div className="relative inline-block group">
        <h1 
          ref={headingRef}
          className="font-display font-extrabold tracking-tighter text-charcoal text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.88] uppercase select-none text-center transition-colors duration-300 group-hover:text-neutral-800"
        >
          <span className="block text-center">
            {title}
          </span>
        </h1>

        {/* Subtle subtle tactile hover hint */}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] tracking-widest text-charcoal-subtle uppercase block pt-2">
          [ MOVE CURSOR OVER TEXT TO REVEAL VISUALS ]
        </span>
      </div>
    </div>
  );
}
