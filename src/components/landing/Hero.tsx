import React, { useState, useEffect } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Activity, 
  ShieldCheck, 
  Play, 
  Pause,
  Compass,
  Radio
} from 'lucide-react';

interface HeroSlide {
  id: string;
  image: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
  fieldTag: string;
  telemetry: string;
  statLabel: string;
  statValue: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'offshore-fpso',
    image: '/hero/hero1.jpg',
    titlePart1: 'Engineering Excellence.',
    titlePart2: 'Powering Energy Operations.',
    subtitle: 'KES delivers high-integrity engineering, procurement, and construction management across Africa’s most demanding offshore and deepwater assets.',
    fieldTag: 'DEEPWATER OPERATIONS • BONGA & EGINA BASIN',
    telemetry: 'Offshore FPSO Production: 100% On-Stream',
    statLabel: 'Deepwater Projects',
    statValue: '18+',
  },
  {
    id: 'refinery-complex',
    image: '/hero/hero2.jpg',
    titlePart1: 'Industrial Precision.',
    titlePart2: 'Refining The Future.',
    subtitle: 'Turnkey crude distillation upgrades, high-pressure steam utility looping, and petrochemical revamp services built to world-class API & ASME specifications.',
    fieldTag: 'DOWNSTREAM REVAMP • NIGER DELTA REFINERIES',
    telemetry: 'Thermal Efficiency: 94.8% SLA Target Met',
    statLabel: 'Refining Assets',
    statValue: '24+',
  },
  {
    id: 'pipeline-corridor',
    image: '/hero/hero3.jpg',
    titlePart1: 'Transmission Power.',
    titlePart2: 'Unbroken Supply Chains.',
    subtitle: 'Strategic cross-country natural gas trunklines, automated custody transfer metering, and cathodic integrity preservation for national energy security.',
    fieldTag: 'PIPELINE INFRASTRUCTURE • OB3 & ESCRAVOS CORRIDOR',
    telemetry: 'Pipeline Telemetry: 142.6 Bar Custody Flow',
    statLabel: 'Trunkline Loop',
    statValue: '480 km',
  },
  {
    id: 'cryo-compression',
    image: '/hero/engineer.jpg',
    titlePart1: 'Engineering & Technical Operations.',
    titlePart2: 'Field Precision.',
    subtitle: 'Expert field engineers in safety gear reviewing technical operations, cryogenic gas monetization, and compression retrofits supporting national industrialization.',
    fieldTag: 'FIELD TECHNICAL OPERATIONS • PORT HARCOURT TERMINAL',
    telemetry: 'Zero LTI Safety Protocol: 100% Compliant',
    statLabel: 'Certified Engineers',
    statValue: '120+',
  },
];

export const Hero: React.FC = () => {
  const { openModal, setSurface } = usePlatform();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance slides every 6.5s
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const slide = HERO_SLIDES[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative min-h-[700px] sm:min-h-[820px] lg:h-[100vh] flex items-center text-white overflow-hidden bg-[#071629]">
      {/* Living Multi-Slide Background Carousel */}
      {HERO_SLIDES.map((s, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Living Ken Burns Zoom/Pan Animation with Crisp Image Rendering */}
            <img
              src={s.image}
              alt={s.fieldTag}
              className={`w-full h-full object-cover brightness-105 contrast-110 saturate-110 transition-transform duration-[8000ms] ease-out ${
                isActive ? 'scale-105 translate-x-1' : 'scale-100 translate-x-0'
              }`}
            />

            {/* High-Clarity Vignette Gradient: keeps images vibrant and visible while giving text 100% crisp contrast */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(7,22,41,0.92) 0%, rgba(7,22,41,0.72) 45%, rgba(7,22,41,0.35) 75%, rgba(7,22,41,0.2) 100%), linear-gradient(0deg, rgba(7,22,41,0.9) 0%, transparent 40%)'
              }}
            />
          </div>
        );
      })}

      {/* Subtle Blueprint Grid Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-20"
        style={{
          backgroundImage: 'linear-gradient(#ffffff0f 1px, transparent 1px), linear-gradient(90deg, #ffffff0f 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Hero Content Box - Fully Responsive on Mobile & Desktop */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-28 sm:pt-32 pb-24 sm:pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow & Live Telemetry Badge */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#071629]/90 border border-[#2563EB]/50 backdrop-blur-md text-[#F4B323] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>{slide.fieldTag}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 text-white/90 backdrop-blur-md text-[10.5px] sm:text-[11.5px] font-semibold border border-white/15">
              <Radio className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse flex-shrink-0" />
              <span className="truncate max-w-[220px] sm:max-w-none">{slide.telemetry}</span>
            </div>
          </div>

          {/* Dynamic Headline with Drop Shadow for Maximum Legibility */}
          <h1 className="text-3xl sm:text-5xl lg:text-[68px] font-black leading-[1.1] sm:leading-[1.05] tracking-tight text-white mb-4 sm:mb-6 drop-shadow-md">
            {slide.titlePart1}{' '}
            <span className="text-[#38BDF8] font-extrabold block sm:inline">
              {slide.titlePart2}
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-100 leading-relaxed max-w-2xl font-normal mb-6 sm:mb-8 drop-shadow-sm">
            {slide.subtitle}
          </p>

          {/* Action CTAs - Responsive Stacking on Mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSurface('management')}
              className="h-12 sm:h-[52px] px-6 sm:px-8 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 shadow-xl group cursor-pointer"
            >
              <span>Explore Operations HQ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => openModal('request-quotation')}
              className="h-12 sm:h-[52px] px-6 sm:px-8 bg-[#0B1F38]/90 hover:bg-white hover:text-[#071629] text-white border border-white/30 font-bold text-xs uppercase tracking-wider rounded-xl transition-all backdrop-blur-md shadow-md cursor-pointer flex items-center justify-center"
            >
              Request a Quotation
            </button>

            <button
              onClick={() => setSurface('client')}
              className="h-12 sm:h-[52px] px-4 sm:px-6 text-[#93C5FD] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Client Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Hero Metric Cards (Bottom Right on Desktop) */}
      <div className="hidden xl:flex absolute bottom-12 right-12 lg:right-16 z-30 border border-white/20 rounded-2xl bg-[#071629]/85 backdrop-blur-xl shadow-2xl overflow-hidden divide-x divide-white/15">
        <div className="py-4 px-6">
          <strong className="block text-2xl font-black text-white">{slide.statValue}</strong>
          <span className="block text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mt-1">
            {slide.statLabel}
          </span>
        </div>
        <div className="py-4 px-6">
          <strong className="block text-2xl font-black text-white">47</strong>
          <span className="block text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mt-1">
            Projects Executed
          </span>
        </div>
        <div className="py-4 px-6">
          <strong className="block text-2xl font-black text-white">2.4M</strong>
          <span className="block text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mt-1">
            Zero LTI Hours
          </span>
        </div>
        <div className="py-4 px-6">
          <strong className="block text-2xl font-black text-[#F4B323]">ISO</strong>
          <span className="block text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mt-1">
            9001:2015 Aligned
          </span>
        </div>
      </div>

      {/* Carousel Navigation Controls (Bottom Center/Left) */}
      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-12 lg:left-16 z-30 flex items-center gap-3 sm:gap-4">
        {/* Prev / Next buttons */}
        <div className="flex items-center gap-1 bg-[#0B1F38]/90 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-md">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#F4B323] hover:bg-white/10 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Auto-slide' : 'Resume Auto-slide'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Progress Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {HERO_SLIDES.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                index === currentSlide 
                  ? 'w-7 sm:w-8 bg-[#38BDF8] shadow-sm' 
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              title={`Jump to slide ${index + 1}`}
            />
          ))}
        </div>

        <span className="hidden sm:inline text-[11px] font-mono text-[#94A3B8]">
          0{currentSlide + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>
    </section>
  );
};
