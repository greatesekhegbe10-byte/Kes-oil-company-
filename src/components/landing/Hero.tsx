import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openModal } = usePlatform();

  const heroImage = "https://images.unsplash.com/photo-1600221574280-9bcd5d108100?auto=format&fit=crop&w=2200&q=88";

  return (
    <section className="relative min-h-[820px] h-[100vh] flex items-center text-white overflow-hidden bg-[#071629]">
      {/* Background Photography with Zoom Effect */}
      <img
        src={heroImage}
        alt="Illuminated industrial refinery and offshore energy infrastructure"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-pulse duration-10000 opacity-60"
        style={{ animationDuration: '20s' }}
      />

      {/* Multi-layered cinematic gradient overlays */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #06162Bea 0%, #071B31d0 45%, #07162970 85%), linear-gradient(0deg, #071629f0 0%, transparent 45%)'
        }}
      />

      {/* Subtle blueprint grid overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#ffffff0d 1px, transparent 1px), linear-gradient(90deg, #ffffff0d 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage: 'linear-gradient(90deg, #000 0%, transparent 70%)'
        }}
      />

      {/* Hero Content Box */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 text-[#F4B323] text-[11px] font-black uppercase tracking-[0.25em] mb-6">
            <span className="w-8 h-[2px] bg-[#F4B323]" />
            <span>INTEGRATED ENERGY & ENGINEERING SOLUTIONS</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-bold leading-[1.04] tracking-tight text-white mb-6">
            Engineering Excellence.{' '}
            <span className="text-[#D8E4F0] font-normal block sm:inline">
              Powering Energy Operations.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-[#CBD5E1] leading-relaxed max-w-2xl font-light mb-10">
            KES delivers high-integrity engineering, procurement and project services for Africa's most critical energy infrastructure across upstream, midstream and downstream assets.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#capabilities"
              className="h-[54px] px-8 bg-[#F4B323] hover:bg-[#FFC947] text-[#071629] font-extrabold text-[11px] uppercase tracking-wider rounded flex items-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-xl"
            >
              <span>Explore Our Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => openModal('request-quotation')}
              className="h-[54px] px-8 bg-[#0B1F38]/90 hover:bg-white hover:text-[#071629] text-white border border-white/30 font-bold text-[11px] uppercase tracking-wider rounded transition-all backdrop-blur-md"
            >
              Request a Quotation
            </button>
          </div>
        </div>
      </div>

      {/* Floating Hero Metric Cards (Bottom Right) */}
      <div className="hidden lg:flex absolute bottom-12 right-12 lg:right-16 z-10 border-t border-white/20 bg-[#071629]/70 backdrop-blur-md">
        <div className="w-36 py-4 px-5 border-l border-white/20">
          <strong className="block text-2xl font-black text-white">15+</strong>
          <span className="block text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">Years of Delivery</span>
        </div>
        <div className="w-36 py-4 px-5 border-l border-white/20">
          <strong className="block text-2xl font-black text-white">47</strong>
          <span className="block text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">Projects Executed</span>
        </div>
        <div className="w-36 py-4 px-5 border-l border-white/20">
          <strong className="block text-2xl font-black text-white">2.4M</strong>
          <span className="block text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">Safe Work Hours</span>
        </div>
        <div className="w-36 py-4 px-5 border-l border-white/20">
          <strong className="block text-2xl font-black text-[#F4B323]">ISO</strong>
          <span className="block text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">9001:2015 Aligned</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:flex absolute bottom-10 left-12 z-10 items-center gap-3 text-[10px] text-[#94A3B8] uppercase tracking-widest font-semibold">
        <span className="w-px h-10 bg-[#F4B323]" />
        <span className="rotate-180 [writing-mode:vertical-rl]">Scroll to discover</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#F4B323] animate-bounce" />
      </div>
    </section>
  );
};

