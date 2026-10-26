import React, { useRef, useEffect, useState } from 'react';
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

const MIN_SPACING = 95; // Minimum horizontal distance between cards to guarantee ~50% visibility
const IDLE_DELAY_MS = 950; // Linger delay before idle disappearance starts
const LEAVE_DELAY_MS = 320; // Linger delay on mouse leave

export default function ImageTrailTitle({ title = "GL_Tensei", eyebrow = "Design. Development. Marketing." }) {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const trailContainerRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [activeCount, setActiveCount] = useState(0);

  const lastPos = useRef({ x: -999, y: -999 });
  const imgIndex = useRef(0);
  const zIndexCounter = useRef(15);
  const idleTimer = useRef(null);
  const leaveTimer = useRef(null);
  const activeImages = useRef([]);
  const animStyleCounter = useRef(0);

  // GSAP Initial Entrance Timeline for Title & Eyebrow
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

    return () => {
      clearTimeout(idleTimer.current);
      clearTimeout(leaveTimer.current);
      activeImages.current.forEach((item) => {
        if (item.element && item.element.parentNode) {
          item.element.parentNode.removeChild(item.element);
        }
      });
      activeImages.current = [];
    };
  }, []);

  // Dramatic In-Animation Dispatcher
  const playEntranceAnimation = (img, inType, finalRot) => {
    switch (inType) {
      case 0: // "Elastic 3D Slam" - Spring scale with perspective tilt
        gsap.fromTo(img,
          {
            opacity: 0,
            scale: 0.18,
            rotateZ: finalRot * 2.5,
            rotateX: (Math.random() - 0.5) * 35,
            y: (Math.random() - 0.5) * 25,
          },
          {
            opacity: 1,
            scale: 1,
            rotateZ: finalRot,
            rotateX: 0,
            y: 0,
            duration: 0.42,
            ease: 'back.out(2.4)',
          }
        );
        break;

      case 1: // "Blade Slit Expand" - Camera shutter blade expand
        gsap.fromTo(img,
          {
            opacity: 0,
            scaleY: 0.04,
            scaleX: 1.25,
            rotateZ: finalRot * 1.5,
            filter: 'contrast(1.4) brightness(1.2)',
          },
          {
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            rotateZ: finalRot,
            filter: 'contrast(1) brightness(1)',
            duration: 0.38,
            ease: 'power4.out',
          }
        );
        break;

      case 2: // "Angular 3D Swoop" - Swing in from angled perspective
        gsap.fromTo(img,
          {
            opacity: 0,
            scale: 0.3,
            rotateY: (Math.random() - 0.5) * 55,
            rotateZ: finalRot * 2,
            y: 40,
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateZ: finalRot,
            y: 0,
            duration: 0.44,
            ease: 'back.out(1.8)',
          }
        );
        break;

      case 3: // "Heavy Stamp Drop" - Heavy impact downslam
      default:
        gsap.fromTo(img,
          {
            opacity: 0,
            scale: 1.55,
            y: -60,
            rotateZ: finalRot * 2,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateZ: finalRot,
            duration: 0.48,
            ease: 'elastic.out(1.05, 0.55)',
          }
        );
        break;
    }
  };

  // Fast Dramatic Out-Animation Dispatcher (0.18s - 0.22s)
  const playExitAnimation = (item, onComplete, delay = 0) => {
    const { element, outType, rot } = item;
    if (!element) return;

    switch (outType) {
      case 0: // "Shutter Collapse" - Snaps into a thin horizontal line
        gsap.to(element, {
          scaleY: 0.02,
          scaleX: 1.2,
          opacity: 0,
          duration: 0.2,
          delay,
          ease: 'power3.in',
          onComplete,
        });
        break;

      case 1: // "Plummet Flick" - Whips downward like a flicked card
        gsap.to(element, {
          y: 85,
          rotateZ: rot + (rot >= 0 ? 28 : -28),
          scale: 0.5,
          opacity: 0,
          duration: 0.22,
          delay,
          ease: 'power4.in',
          onComplete,
        });
        break;

      case 2: // "Implosion Pop" - Snaps inward with brightness pop
        gsap.to(element, {
          scale: 0.08,
          rotateZ: -rot * 2,
          filter: 'brightness(2)',
          opacity: 0,
          duration: 0.18,
          delay,
          ease: 'back.in(2.2)',
          onComplete,
        });
        break;

      case 3: // "Vacuum Pull Up" - Zips vertically up
      default:
        gsap.to(element, {
          y: -85,
          scaleX: 0.25,
          scaleY: 1.25,
          opacity: 0,
          duration: 0.2,
          delay,
          ease: 'power3.in',
          onComplete,
        });
        break;
    }
  };

  // Fast, staggered dismissal of all active cards
  const dismissAllCards = () => {
    if (activeImages.current.length === 0) {
      setActiveCount(0);
      return;
    }

    const cardsToDismiss = [...activeImages.current];
    activeImages.current = [];
    setActiveCount(0);

    cardsToDismiss.forEach((item, index) => {
      const staggerDelay = index * 0.035; // Rapid wave
      playExitAnimation(item, () => {
        if (item.element && item.element.parentNode) {
          item.element.parentNode.removeChild(item.element);
        }
      }, staggerDelay);
    });
  };

  // Mouse move handler
  const handleMouseMove = (e) => {
    if (!containerRef.current || !trailContainerRef.current) return;

    // Clear leave timer if active
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }

    if (!isHovered) {
      setIsHovered(true);
    }

    const currentX = e.clientX;

    // Check 1: Distance from last spawned position (at least MIN_SPACING horizontally)
    const distFromLast = Math.abs(currentX - lastPos.current.x);
    if (distFromLast < MIN_SPACING) {
      // Reset idle timer even if not spawning, so images stay visible while mouse moves
      resetIdleTimer();
      return;
    }

    // Check 2: Distance from ALL existing active images (guarantees at least 50% / half portion visibility)
    const isTooCloseToExisting = activeImages.current.some(
      (item) => Math.abs(item.x - currentX) < (MIN_SPACING - 10)
    );
    if (isTooCloseToExisting) {
      resetIdleTimer();
      return;
    }

    // Update last spawn position
    lastPos.current = { x: currentX, y: e.clientY };

    // Calculate vertical position anchored to the Title's centerline for perfect editorial alignment
    const headingRect = headingRef.current?.getBoundingClientRect();
    const titleCenterY = headingRect 
      ? headingRect.top + headingRect.height / 2 
      : e.clientY;
    const cardY = titleCenterY + (Math.random() - 0.5) * 16;

    // Cycle image source and animation styles
    const imgSrc = TRAIL_IMAGES[imgIndex.current];
    imgIndex.current = (imgIndex.current + 1) % TRAIL_IMAGES.length;
    
    // Increment z-index inside the trail layer (stays z-20 to z-28, safely behind Title at z-40)
    zIndexCounter.current = 20 + ((zIndexCounter.current - 19) % 9);

    const inType = animStyleCounter.current % 4;
    const outType = (animStyleCounter.current + 1) % 4;
    animStyleCounter.current += 1;

    // Create image element dynamically for maximum 60fps performance
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Visual Trail Preview';
    img.className = 'fixed pointer-events-none object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border-2 border-white/85 select-none w-40 h-56 sm:w-48 sm:h-64 md:w-56 md:h-76 will-change-transform';
    
    // Position centered on cursor X and title baseline Y
    img.style.left = `${currentX}px`;
    img.style.top = `${cardY}px`;
    img.style.zIndex = zIndexCounter.current;
    img.style.transform = 'translate(-50%, -50%)';

    trailContainerRef.current.appendChild(img);

    // Random tilt angle between -9 and +9 degrees (editorial fashion style)
    const finalRot = (Math.random() - 0.5) * 18;

    // Trigger dramatic entrance animation
    playEntranceAnimation(img, inType, finalRot);

    const cardItem = {
      element: img,
      x: currentX,
      y: cardY,
      rot: finalRot,
      outType,
    };

    activeImages.current.push(cardItem);
    setActiveCount(activeImages.current.length);

    // Enforce max active limit: if more than 7, smoothly and rapidly dismiss oldest
    if (activeImages.current.length > 7) {
      const oldest = activeImages.current.shift();
      playExitAnimation(oldest, () => {
        if (oldest.element && oldest.element.parentNode) {
          oldest.element.parentNode.removeChild(oldest.element);
        }
      });
      setActiveCount(activeImages.current.length);
    }

    resetIdleTimer();
  };

  const resetIdleTimer = () => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      dismissAllCards();
      setIsHovered(false);
    }, IDLE_DELAY_MS);
  };

  const handleMouseEnter = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    clearTimeout(idleTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      dismissAllCards();
      setIsHovered(false);
    }, LEAVE_DELAY_MS);
  };

  const isAdapting = isHovered || activeCount > 0;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-30 space-y-4 mb-16 text-center flex flex-col items-center justify-center cursor-default select-none py-6 px-2"
    >
      {/* Dynamic Trail Portal: Layered BEHIND the Title at z-20 */}
      <div 
        ref={trailContainerRef} 
        className="pointer-events-none fixed inset-0 z-20 overflow-hidden" 
      />

      {/* Centered Eyebrow Text on Top (z-40) */}
      <div className="relative z-40 trail-title-eyebrow font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.26em] text-terracotta font-semibold text-center select-none pointer-events-none">
        {eyebrow}
      </div>

      {/* Centered Big Title: GL_Tensei (z-40 so it is NEVER covered by the images) */}
      <div className="relative inline-block group z-40">
        <h1 
          ref={headingRef}
          className={`font-display font-extrabold tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.88] uppercase select-none text-center pointer-events-none transition-all duration-500 relative z-40 ${
            isAdapting
              ? 'title-adapting-gradient mix-blend-difference'
              : 'text-charcoal'
          }`}
          style={{
            WebkitTextStroke: isAdapting 
              ? '1.5px rgba(255, 255, 255, 0.45)' 
              : 'none',
          }}
        >
          <span className="block text-center">
            {title}
          </span>
        </h1>

        {/* Tactile hint */}
        <span 
          className={`font-mono text-[10px] tracking-widest uppercase block pt-2 transition-opacity duration-300 pointer-events-none ${
            isAdapting ? 'opacity-100 text-terracotta' : 'opacity-0 text-charcoal-subtle'
          }`}
        >
          [ GLIDE CURSOR OVER TEXT TO REVEAL VISUALS ]
        </span>
      </div>
    </div>
  );
}
