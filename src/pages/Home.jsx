import React, { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import InteractiveBackground from '../components/InteractiveBackground';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Projects from '../components/Projects';
import HorizontalStrip from '../components/HorizontalStrip';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Initialize GSAP ScrollSmoother on desktop devices
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && window.innerWidth >= 768) {
      try {
        const smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.2,
          effects: true,
          smoothTouch: 0.1,
        });

        return () => {
          if (smoother) smoother.kill();
        };
      } catch (err) {
        console.warn('ScrollSmoother desktop fallback active:', err);
      }
    }
  });

  return (
    <div className="relative min-h-screen bg-[#F4F0EA] text-[#111111]">
      {/* Editorial Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Mouse-Interactive Moving Background */}
      <InteractiveBackground />

      {/* Option B: Magnetic Dynamic Studio Cursor */}
      <CustomCursor />

      {/* Fixed Sticky Studio Navigation */}
      <Navbar />

      {/* GSAP ScrollSmoother Structural Containers */}
      <div id="smooth-wrapper" className="w-full overflow-hidden">
        <div id="smooth-content" className="w-full">
          <main className="flex-1">
            <Hero />
            <Marquee />
            <Projects />
            <HorizontalStrip />
            <Services />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
