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

const MIN_SPACING = 105; // Ensures at least ~50% portion of cards remain visible
const IDLE_DELAY_MS = 400; // Quicker trigger to start disappearance (down from 900ms)
const LEAVE_DELAY_MS = 140; // Quicker trigger on mouse leave (down from 300ms)
const CARD_LIFESPAN_MS = 1000; // Natural lifespan before an individual portal starts closing

export default function ImageTrailTitle({ title = "GL_Tensei", eyebrow = "Design. Development. Marketing." }) {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const trailContainerRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: -999, y: -999 });

  const lastPos = useRef({ x: -999, y: -999 });
  const imgIndex = useRef(0);
  const zIndexCounter = useRef(15);
  const idleTimer = useRef(null);
  const leaveTimer = useRef(null);
  const activeImages = useRef([]);

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
        if (item.lifespanTimer) clearTimeout(item.lifespanTimer);
        if (item.element && item.element.parentNode) {
          item.element.parentNode.removeChild(item.element);
        }
      });
      activeImages.current = [];
    };
  }, []);

  // Smooth, Slow & Long-Lasting Portal Entrance Animation
  const openPortal = (img, finalRot) => {
    gsap.set(img, {
      clipPath: 'circle(0% at 50% 50%)',
      scale: 0.15,
      rotateZ: finalRot - (finalRot >= 0 ? 30 : -30),
      opacity: 0,
      filter: 'brightness(1.6) contrast(1.15) blur(8px)',
    });

    gsap.to(img, {
      clipPath: 'circle(85% at 50% 50%)',
      scale: 1,
      rotateZ: finalRot,
      opacity: 1,
      filter: 'brightness(1) contrast(1) blur(0px)',
      duration: 0.95, // Slower, graceful portal opening
      ease: 'power2.out',
    });
  };

  // Smooth, Slow & Long-Lasting Portal Exit Animation
  const closePortal = (item, onComplete, delay = 0) => {
    const { element, rot } = item;
    if (!element) return;

    if (item.lifespanTimer) {
      clearTimeout(item.lifespanTimer);
      item.lifespanTimer = null;
    }

    gsap.to(element, {
      clipPath: 'circle(0% at 50% 50%)',
      scale: 0.12,
      rotateZ: rot + (rot >= 0 ? 30 : -30),
      opacity: 0,
      filter: 'brightness(1.8) contrast(1.2) blur(6px)',
      duration: 0.75, // Slower, graceful vortex contraction
      delay,
      ease: 'power2.inOut',
      onComplete,
    });
  };

  // Dismiss all active portals with a graceful staggered wave
  const dismissAllPortals = () => {
    if (activeImages.current.length === 0) return;

    const cardsToDismiss = [...activeImages.current];
    activeImages.current = [];

    cardsToDismiss.forEach((item, index) => {
      const staggerDelay = index * 0.08;
      closePortal(item, () => {
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

    // Update localized spotlight position relative to the heading
    const headingRect = headingRef.current?.getBoundingClientRect();
    if (headingRect) {
      setSpotlightPos({
        x: e.clientX - headingRect.left,
        y: e.clientY - headingRect.top,
      });
    }

    const currentX = e.clientX;

    // Check 1: Minimum horizontal spacing from last spawn point
    const distFromLast = Math.abs(currentX - lastPos.current.x);
    if (distFromLast < MIN_SPACING) {
      resetIdleTimer();
      return;
    }

    // Check 2: Minimum horizontal spacing against all currently open portals
    const isTooCloseToExisting = activeImages.current.some(
      (item) => Math.abs(item.x - currentX) < (MIN_SPACING - 15)
    );
    if (isTooCloseToExisting) {
      resetIdleTimer();
      return;
    }

    // Update last spawn position
    lastPos.current = { x: currentX, y: e.clientY };

    // Calculate vertical position anchored to the Title's centerline
    const titleCenterY = headingRect 
      ? headingRect.top + headingRect.height / 2 
      : e.clientY;
    const cardY = titleCenterY + (Math.random() - 0.5) * 14;

    // Cycle image source
    const imgSrc = TRAIL_IMAGES[imgIndex.current];
    imgIndex.current = (imgIndex.current + 1) % TRAIL_IMAGES.length;

    // Increment z-index inside the trail layer (stays safely behind the Title at z-40)
    zIndexCounter.current = 20 + ((zIndexCounter.current - 19) % 9);

    // Create portal image element
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Portal Preview';
    img.className = 'fixed pointer-events-none object-cover rounded-2xl shadow-[0_0_35px_rgba(217,119,70,0.35),0_20px_50px_rgba(0,0,0,0.45)] border-2 border-white/95 select-none w-44 h-60 sm:w-52 sm:h-72 md:w-60 md:h-80 will-change-transform';
    
    // Position centered on cursor X and title baseline Y
    img.style.left = `${currentX}px`;
    img.style.top = `${cardY}px`;
    img.style.zIndex = zIndexCounter.current;
    img.style.transform = 'translate(-50%, -50%)';

    trailContainerRef.current.appendChild(img);

    // Natural editorial tilt between -8 and +8 degrees
    const finalRot = (Math.random() - 0.5) * 16;

    // Open portal animation (lasts longer, slow and smooth)
    openPortal(img, finalRot);

    const cardItem = {
      element: img,
      x: currentX,
      y: cardY,
      rot: finalRot,
      lifespanTimer: null,
    };

    // Auto-schedule closing for older cards to keep the portal flow organic
    cardItem.lifespanTimer = setTimeout(() => {
      const idx = activeImages.current.findIndex(i => i === cardItem);
      if (idx !== -1) {
        activeImages.current.splice(idx, 1);
        closePortal(cardItem, () => {
          if (cardItem.element && cardItem.element.parentNode) {
            cardItem.element.parentNode.removeChild(cardItem.element);
          }
        });
      }
    }, CARD_LIFESPAN_MS);

    activeImages.current.push(cardItem);

    // Keep max active portals to 6 for clean visual balance
    if (activeImages.current.length > 6) {
      const oldest = activeImages.current.shift();
      closePortal(oldest, () => {
        if (oldest.element && oldest.element.parentNode) {
          oldest.element.parentNode.removeChild(oldest.element);
        }
      });
    }

    resetIdleTimer();
  };

  const resetIdleTimer = () => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      dismissAllPortals();
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
      dismissAllPortals();
      setIsHovered(false);
    }, LEAVE_DELAY_MS);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-30 space-y-4 mb-16 text-center flex flex-col items-center justify-center cursor-default select-none py-6 px-2"
    >
      {/* Dynamic Portal Visuals Layer: Layered BEHIND the Title at z-20 */}
      <div 
        ref={trailContainerRef} 
        className="pointer-events-none fixed inset-0 z-20 overflow-hidden" 
      />

      {/* Centered Eyebrow Text on Top (z-40) */}
      <div className="relative z-40 trail-title-eyebrow font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.26em] text-terracotta font-semibold text-center select-none pointer-events-none">
        {eyebrow}
      </div>

      {/* Centered Big Title: GL_Tensei (z-40 so it is NEVER covered by portals) */}
      <div className="relative inline-block z-40">
        
        {/* Base Layer: Solid, 100% visible charcoal text that NEVER disappears */}
        <h1 
          ref={headingRef}
          className="font-display font-extrabold tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.88] uppercase select-none text-center text-charcoal pointer-events-none relative z-40"
        >
          <span className="block text-center">
            {title}
          </span>
        </h1>

        {/* Localized Spotlight Layer: Only the pointed part illuminates into vibrant gradient */}
        <div 
          className="absolute inset-0 font-display font-extrabold tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.88] uppercase select-none text-center pointer-events-none z-40"
          style={{
            opacity: isHovered ? 1 : 0,
            background: 'linear-gradient(135deg, #D97746 0%, #FF8A50 25%, #F59E0B 50%, #FF6B4A 75%, #D97746 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            clipPath: isHovered 
              ? `circle(140px at ${spotlightPos.x}px ${spotlightPos.y}px)` 
              : 'circle(0px at 0px 0px)',
            transition: 'clip-path 0.12s ease-out, opacity 0.35s ease-out',
          }}
          aria-hidden="true"
        >
          <span className="block text-center">
            {title}
          </span>
        </div>

      </div>
    </div>
  );
}
