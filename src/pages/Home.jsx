import React from 'react';
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
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
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
  );
}
