import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const TRAIL_IMAGES = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
  "/9.jpg",
];

const MIN_SPACING = 105; // Ensures at least ~50% portion of cards remain visible
const IDLE_DELAY_MS = 400; // Quicker trigger to start disappearance
const LEAVE_DELAY_MS = 140; // Quicker trigger on mouse leave
const CARD_LIFESPAN_MS = 1000; // Natural lifespan before an individual portal starts closing

export default function ImageTrailTitle({ title = "GL_Tensei", eyebrow = "Design. Development. Marketing." }) {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const trailContainerRef = useRef(null);

  // Animated Orange Spotlight Refs (GPU-accelerated tick)
  const spotlightTextRef = useRef(null);
  const glowCircleRef = useRef(null);
  const ringCircleRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const pulsePhase = useRef(0);
  const currentRadiusRef = useRef(0);

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

    // High-performance 60/120fps fluid physics ticker for the Orange Spotlight Circle
    const updateSpotlight = () => {
      // Silky smooth dampening lerp (0.12 gives a graceful magnetic float)
      const easeFactor = 0.12;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * easeFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * easeFactor;
      pulsePhase.current += 0.038;

      // Gentle organic breathing pulse between 132px and 150px
      const targetRadius = isHoveredRef.current 
        ? 140 + Math.sin(pulsePhase.current) * 9 
        : 0;
      currentRadiusRef.current += (targetRadius - currentRadiusRef.current) * 0.1;

      const x = Math.round(currentPos.current.x * 10) / 10;
      const y = Math.round(currentPos.current.y * 10) / 10;
      const r = Math.round(currentRadiusRef.current * 10) / 10;

      // 1. Fluid clip-path on the orange gradient text layer
      if (spotlightTextRef.current) {
        spotlightTextRef.current.style.clipPath = r > 0.5 
          ? `circle(${r}px at ${x}px ${y}px)` 
          : 'circle(0px at 0px 0px)';
        spotlightTextRef.current.style.opacity = r > 1 ? '1' : '0';
      }

      // 2. Soft ambient orange halo aura following smoothly
      if (glowCircleRef.current) {
        const scaleVal = Math.max(0, r / 140);
        glowCircleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scaleVal})`;
        glowCircleRef.current.style.opacity = isHoveredRef.current && r > 2 ? '0.85' : '0';
      }

      // 3. Delicate concentric rotating ring following smoothly
      if (ringCircleRef.current) {
        const scaleVal = Math.max(0, r / 140);
        ringCircleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scaleVal})`;
        ringCircleRef.current.style.opacity = isHoveredRef.current && r > 2 ? '0.6' : '0';
      }
    };

    gsap.ticker.add(updateSpotlight);

    return () => {
      gsap.ticker.remove(updateSpotlight);
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

  // Silky Smooth Portal Entrance Animation
  const openPortal = (img, finalRot) => {
    gsap.fromTo(img,
      {
        clipPath: 'circle(0% at 50% 50%)',
        scale: 0.18,
        rotateZ: finalRot - (finalRot >= 0 ? 18 : -18),
        opacity: 0,
      },
      {
        clipPath: 'circle(85% at 50% 50%)',
        scale: 1,
        rotateZ: finalRot,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
      }
    );
  };

  // Silky Smooth Portal Exit Animation
  const closePortal = (item, onComplete, delay = 0) => {
    const { element, rot } = item;
    if (!element) return;

    if (item.lifespanTimer) {
      clearTimeout(item.lifespanTimer);
      item.lifespanTimer = null;
    }

    gsap.to(element, {
      clipPath: 'circle(0% at 50% 50%)',
      scale: 0.18,
      rotateZ: rot + (rot >= 0 ? 18 : -18),
      opacity: 0,
      duration: 0.65,
      delay,
      ease: 'power3.inOut',
      onComplete,
    });
  };

  // Dismiss all active portals with a graceful staggered wave
  const dismissAllPortals = () => {
    if (activeImages.current.length === 0) return;

    const cardsToDismiss = [...activeImages.current];
    activeImages.current = [];

    cardsToDismiss.forEach((item, index) => {
      const staggerDelay = index * 0.07;
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

    if (!isHoveredRef.current) {
      isHoveredRef.current = true;
      setIsHovered(true);
    }

    // Update target coordinates relative to the heading container
    const headingRect = headingRef.current?.getBoundingClientRect();
    if (headingRect) {
      const relX = e.clientX - headingRect.left;
      const relY = e.clientY - headingRect.top;
      targetPos.current = { x: relX, y: relY };

      // Snap immediately if entering for the first time
      if (currentRadiusRef.current < 2) {
        currentPos.current = { x: relX, y: relY };
      }
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
    const cardY = titleCenterY + (Math.random() - 0.5) * 12;

    // Cycle image source
    const imgSrc = TRAIL_IMAGES[imgIndex.current];
    imgIndex.current = (imgIndex.current + 1) % TRAIL_IMAGES.length;

    // Increment z-index inside the trail layer (stays safely behind the Title at z-40)
    zIndexCounter.current = 20 + ((zIndexCounter.current - 19) % 9);

    // Create portal image element
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Portal Preview';
    img.className = 'fixed pointer-events-none object-cover rounded-2xl shadow-[0_0_35px_rgba(217,119,70,0.3),0_20px_50px_rgba(0,0,0,0.4)] border-2 border-white/95 select-none w-44 h-60 sm:w-52 sm:h-72 md:w-60 md:h-80 will-change-transform';
    
    // Position centered on cursor X and title baseline Y
    img.style.left = `${currentX}px`;
    img.style.top = `${cardY}px`;
    img.style.zIndex = zIndexCounter.current;
    img.style.transform = 'translate(-50%, -50%)';

    trailContainerRef.current.appendChild(img);

    // Natural editorial tilt between -7 and +7 degrees
    const finalRot = (Math.random() - 0.5) * 14;

    // Open portal animation (silky smooth power3.out)
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
      isHoveredRef.current = false;
      setIsHovered(false);
    }, IDLE_DELAY_MS);
  };

  const handleMouseEnter = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    clearTimeout(idleTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      dismissAllPortals();
      isHoveredRef.current = false;
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
        
        {/* Animated Luminous Orange Ambient Aura: Follows cursor with breathing pulse (z-35) */}
        <div 
          ref={glowCircleRef}
          className="pointer-events-none absolute top-0 left-0 rounded-full z-30 will-change-transform transition-opacity duration-300"
          style={{
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, rgba(217,119,70,0.35) 0%, rgba(245,158,11,0.2) 38%, rgba(217,119,70,0.05) 60%, transparent 72%)',
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0)',
          }}
        />

        {/* Animated Concentric Pulsing Ring: Delicate rotating dashed orbit (z-35) */}
        <div 
          ref={ringCircleRef}
          className="pointer-events-none absolute top-0 left-0 z-30 will-change-transform transition-opacity duration-300"
          style={{
            width: '260px',
            height: '260px',
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0)',
          }}
        >
          {/* Inner isolated element rotates without CSS-transform collision */}
          <div className="w-full h-full rounded-full border border-dashed border-terracotta/40 animate-spin-slow" />
        </div>

        {/* Base Layer: Solid, 100% visible charcoal text that NEVER disappears */}
        <h1 
          ref={headingRef}
          className="font-display font-extrabold tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.88] uppercase select-none text-center text-charcoal pointer-events-none relative z-40"
        >
          <span className="block text-center">
            {title}
          </span>
        </h1>

        {/* Animated Spotlight Layer: Text dynamically clipped to the breathing, lerping orange circle */}
        <div 
          ref={spotlightTextRef}
          className="absolute inset-0 font-display font-extrabold tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.88] uppercase select-none text-center pointer-events-none z-40 will-change-transform transition-opacity duration-200"
          style={{
            opacity: 0,
            background: 'linear-gradient(135deg, #D97746 0%, #FF8A50 25%, #F59E0B 50%, #FF6B4A 75%, #D97746 100%)',
            backgroundSize: '200% 200%',
            animation: 'titleGradientShift 3.5s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            clipPath: 'circle(0px at 0px 0px)',
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
