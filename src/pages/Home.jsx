import React, { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import InteractiveBackground from '../components/InteractiveBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#F4F0EA] text-[#111111]">
      {/* Editorial Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Mouse-Interactive Moving Background */}
      <InteractiveBackground />

      {/* Fixed Sticky Studio Navigation */}
      <Navbar />

      {/* Single Continuous Seamless Page (All sections fully scrollable to top & bottom) */}
      <main className="flex-1 w-full">
        <Hero />
        <Marquee />
        <Projects />
        <Certifications />
        <Services />
        <About />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
