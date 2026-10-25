import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { services } from '../data/projectsData';

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="py-24 sm:py-36 border-b border-black/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08]">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal-subtle">
              <span className="w-2 h-2 rounded-full bg-terracotta"></span>
              <span className="text-charcoal font-bold">[ 04 ]</span>
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-tight">
              SERVICES & DISCIPLINES
            </h2>
          </div>
          <p className="text-charcoal-muted font-mono text-xs uppercase tracking-widest max-w-xs">
            Engineering tailored for responsive ergonomics, standard compliance, and creative visual distinction.
          </p>
        </div>

        {/* Numbered Services Editorial List */}
        <div className="divide-y divide-black/[0.08]">
          {services.map((service, idx) => {
            const isActive = activeTab === idx;

            return (
              <div 
                key={service.index}
                className="py-8 sm:py-12 group cursor-pointer transition-colors hover:bg-black/[0.02] px-2 sm:px-4"
                onClick={() => setActiveTab(isActive ? null : idx)}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Number & Title */}
                  <div className="md:col-span-6 flex items-start gap-6">
                    <span className="font-mono text-sm sm:text-base text-terracotta font-semibold pt-1">
                      {service.index}
                    </span>
                    <h3 className="font-display font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-charcoal group-hover:text-terracotta transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description & Tags */}
                  <div className="md:col-span-5 space-y-4">
                    <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider bg-[#EDE8E0] text-charcoal-muted border border-black/[0.08]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status Toggle Indicator */}
                  <div className="md:col-span-1 flex justify-end pt-1">
                    <div className="p-2 rounded border border-black/[0.1] text-charcoal group-hover:border-charcoal transition-all">
                      {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
