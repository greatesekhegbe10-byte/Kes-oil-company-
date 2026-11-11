import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ArrowRight, CheckCircle2, Shield, FileCheck, Layers } from 'lucide-react';

export const PrecisionSection: React.FC = () => {
  const { setSurface } = usePlatform();

  const detailImage = "https://images.unsplash.com/photo-1788377563486-276967375266?auto=format&fit=crop&w=1100&q=86";

  return (
    <section id="precision" className="bg-[#153C65] text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
        {/* Left Column: Image with Industrial Tag */}
        <div className="relative min-h-[360px] lg:min-h-full">
          <img
            src={detailImage}
            alt="Precision pipework, manifold valves, and offshore engineering infrastructure"
            className="w-full h-full object-cover object-center filter saturate-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-[#153C65]/80" />
          
          <div className="absolute bottom-6 left-6 bg-[#071629]/90 border border-white/20 px-4 py-2 rounded text-[11px] font-mono tracking-wider text-[#F4B323]">
            ENGINEERING / PROCUREMENT / CONSTRUCTION / COMMISSIONING
          </div>
        </div>

        {/* Right Column: Copy & Value Proposition */}
        <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
          <div className="flex items-center gap-2.5 text-[#F4B323] text-[11px] font-black uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-[2px] bg-[#F4B323]" />
            <span>ENGINEERED CONFIDENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-6">
            Precision in every detail.
          </h2>

          <p className="text-sm sm:text-base text-[#D4DEEA] leading-relaxed mb-8">
            Our enterprise management systems connect live engineering data, vetted supplier intelligence and end-to-end project controls—giving every corporate client and project manager a continuous, accountable line of sight from scope to commissioning.
          </p>

          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#F4B323]/20 flex items-center justify-center text-[#F4B323] mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-sm font-semibold text-white">International Codes & Standards</strong>
                <span className="text-xs text-[#CBD5E1]">Strict compliance with ASME B31.3/B31.8, API 6D, API 6A, and ISO 9001:2015 specifications.</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#F4B323]/20 flex items-center justify-center text-[#F4B323] mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-sm font-semibold text-white">Integrated Quality Assurance & NDT</strong>
                <span className="text-xs text-[#CBD5E1]">100% radiographic, ultrasonic, dye penetrant, and hydrostatic traceability on all welds.</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#F4B323]/20 flex items-center justify-center text-[#F4B323] mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-sm font-semibold text-white">Nigerian Content & NOGICD Accreditation</strong>
                <span className="text-xs text-[#CBD5E1]">NCDMB bi-annual compliance audit passed with distinction; indigenous workforce training programs.</span>
              </div>
            </li>
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setSurface('management')}
              className="h-[52px] px-8 bg-[#F4B323] hover:bg-[#FFC947] text-[#071629] font-extrabold text-[11px] uppercase tracking-wider rounded flex items-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-xl"
            >
              <span>Enter Operations Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

