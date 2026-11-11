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
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2400&q=90',
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
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=90',
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
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=2400&q=90',
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
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2400&q=90',
    titlePart1: 'Sustainable Solutions.',
    titlePart2: 'Zero-Routine Flaring.',
    subtitle: 'Pioneering gas monetization, cryogenic natural gas liquid recovery, and compression retrofits supporting Nigeria’s Decades of Gas industrialization agenda.',
    fieldTag: 'GAS MONETIZATION • PORT HARCOURT TERMINAL',
    telemetry: 'Flare Elimination Index: 92.4% Captured',
    statLabel: 'Gas Captured',
    statValue: '1.2B SCF',
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
    <section className="relative min-h-[860px] h-[100vh] flex items-center text-white overflow-hidden bg-[#071629]">
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
            {/* Living Ken Burns Zoom/Pan Animation */}
            <img
              src={s.image}
              alt={s.fieldTag}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                isActive ? 'scale-110 translate-x-1.5' : 'scale-100 translate-x-0'
              }`}
            />

            {/* Cinematic Gradient Overlays */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #071629FA 0%, #071629D9 42%, #07162988 75%, #07162940 100%), linear-gradient(0deg, #071629F5 0%, transparent 40%)'
              }}
            />
          </div>
        );
      })}

      {/* Blueprint Grid Texture */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none z-20"
        style={{
          backgroundImage: 'linear-gradient(#ffffff0f 1px, transparent 1px), linear-gradient(90deg, #ffffff0f 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Hero Content Box */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Eyebrow & Live Telemetry Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153C65]/80 border border-[#2563EB]/40 backdrop-blur-md text-[#F4B323] text-[10.5px] font-black uppercase tracking-[0.2em] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>{slide.fieldTag}</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 backdrop-blur-md text-[11px] font-medium border border-white/10">
              <Radio className="w-3 h-3 text-[#38BDF8] animate-pulse" />
              <span>{slide.telemetry}</span>
            </div>
          </div>

          {/* Dynamic Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tight text-white mb-6">
            {slide.titlePart1}{' '}
            <span className="text-[#38BDF8] font-extrabold block sm:inline">
              {slide.titlePart2}
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-[#CBD5E1] leading-relaxed max-w-2xl font-normal mb-8">
            {slide.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setSurface('management')}
              className="h-[52px] px-8 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 shadow-xl group cursor-pointer"
            >
              <span>Explore Operations HQ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => openModal('request-quotation')}
              className="h-[52px] px-8 bg-[#0B1F38]/90 hover:bg-white hover:text-[#071629] text-white border border-white/30 font-bold text-xs uppercase tracking-wider rounded-xl transition-all backdrop-blur-md shadow-md cursor-pointer"
            >
              Request a Quotation
            </button>

            <button
              onClick={() => setSurface('client')}
              className="h-[52px] px-6 text-[#93C5FD] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Client Portal</span>
              <Compass className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Hero Metric Cards (Bottom Right) */}
      <div className="hidden lg:flex absolute bottom-12 right-12 lg:right-16 z-30 border border-white/15 rounded-2xl bg-[#071629]/80 backdrop-blur-xl shadow-2xl overflow-hidden divide-x divide-white/15">
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

      {/* Carousel Navigation Controls (Bottom Center) */}
      <div className="absolute bottom-10 left-6 sm:left-12 lg:left-16 z-30 flex items-center gap-4">
        {/* Prev / Next buttons */}
        <div className="flex items-center gap-1.5 bg-[#0B1F38]/80 backdrop-blur-md p-1 rounded-full border border-white/20">
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
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                index === currentSlide 
                  ? 'w-8 bg-[#38BDF8] shadow-sm' 
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              title={`Jump to slide ${index + 1}`}
            />
          ))}
        </div>

        <span className="hidden md:inline text-[11px] font-mono text-[#94A3B8]">
          0{currentSlide + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>
    </section>
  );
};
