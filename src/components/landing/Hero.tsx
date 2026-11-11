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
    id: 'offshore-platform',
    image: '/hero/offshore-platform-helipad.jpg',
    titlePart1: 'KES Energy Services.',
    titlePart2: 'Building Infrastructure. Powering Progress.',
    subtitle: 'KES Energy Services is an indigenous Nigerian firm delivering high-integrity oil & gas, offshore EPC, and integrated energy projects with discipline, safety, and follow-through.',
    fieldTag: 'OFFSHORE PRODUCTION & DRILLING • DEEPWATER ASSETS',
    telemetry: 'Offshore Helipad & Process Facility: 100% Operational',
    statLabel: 'Deepwater Projects',
    statValue: '18+',
  },
  {
    id: 'pipeline-corridor',
    image: '/hero/pipeline-excavator.jpg',
    titlePart1: 'Heavy Pipeline Delivery.',
    titlePart2: 'Corridor Construction.',
    subtitle: 'Turnkey mainline swamp trenching, heavy civil earthworks, and pipeline crossing stations engineered to world-class API 1104 & ASME standards.',
    fieldTag: 'PIPELINE INFRASTRUCTURE • OB3 & ESCRAVOS CORRIDOR',
    telemetry: 'Heavy Excavation: 48-Inch Trunkline Loop Active',
    statLabel: 'Corridor Built',
    statValue: '480 km',
  },
  {
    id: 'consultancy-engineers',
    image: '/hero/field-engineers-boat.jpg',
    titlePart1: 'Technical Operations.',
    titlePart2: 'Zero-Compromise HSE.',
    subtitle: 'Specialized field engineers and technical consultants delivering swamp inspections, non-destructive testing, and marine transport with 2.4 million consecutive LTI-free hours.',
    fieldTag: 'FIELD CONSULTING & MARINE SUPPORT • NIGER DELTA',
    telemetry: 'HSE Audit: 2.4 Million Safe Man-Hours Certified',
    statLabel: 'Zero LTI Hours',
    statValue: '2.4M',
  },
  {
    id: 'valve-inspection',
    image: '/hero/valve-consultancy-engineers.jpg',
    titlePart1: 'High-Pressure Procurement.',
    titlePart2: 'API Valve Distribution.',
    subtitle: 'Strategic sourcing, API 6D high-pressure valve distribution, containerized skid inspection, and factory acceptance testing under strict quality assurance.',
    fieldTag: 'VALVE TESTING & METALLURGY • ONNE FREE ZONE YARD',
    telemetry: 'Hydrostatic Pressure Test: 100% SIL 3 Verified',
    statLabel: 'Verified Suppliers',
    statValue: '125+',
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

            {/* High-Clarity Warm Atmospheric Vignette matching visual reference */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(7,22,41,0.92) 0%, rgba(7,22,41,0.65) 45%, rgba(7,22,41,0.28) 75%, rgba(7,22,41,0.15) 100%), linear-gradient(0deg, rgba(7,22,41,0.85) 0%, transparent 45%), radial-gradient(circle at 80% 40%, rgba(244,179,35,0.08) 0%, transparent 60%)'
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

          {/* Dynamic Headline matching visual reference with warm gold brand punch */}
          <h1 className="text-3xl sm:text-5xl lg:text-[72px] font-black leading-[1.08] tracking-tight text-white mb-4 sm:mb-6 drop-shadow-lg">
            {slide.titlePart1}{' '}
            <span className="text-[#F4B323] font-black block sm:inline">
              {slide.titlePart2}
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal mb-8 sm:mb-10 drop-shadow-md">
            {slide.subtitle}
          </p>

          {/* Action CTAs matching visual reference with warm gold button & translucent secondary button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSurface('services')}
              className="h-12 sm:h-[54px] px-8 bg-[#F4B323] hover:bg-[#E0A21B] text-[#071629] font-black text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 shadow-xl group cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setSurface('contact')}
              className="h-12 sm:h-[54px] px-8 bg-black/40 hover:bg-white hover:text-[#071629] text-white border border-white/40 font-bold text-xs uppercase tracking-wider rounded-full transition-all backdrop-blur-md shadow-md cursor-pointer flex items-center justify-center"
            >
              Contact Us
            </button>

            <button
              onClick={() => setSurface('management')}
              className="h-12 sm:h-[54px] px-6 text-[#93C5FD] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Operations HQ</span>
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
