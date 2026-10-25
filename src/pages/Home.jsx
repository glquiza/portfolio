import React, { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import InteractiveBackground from '../components/InteractiveBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Projects from '../components/Projects';
import HorizontalStrip from '../components/HorizontalStrip';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#F4F0EA] text-[#121212]">
      {/* Editorial Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Mouse-Interactive Moving Background */}
      <InteractiveBackground />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
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
  );
}
