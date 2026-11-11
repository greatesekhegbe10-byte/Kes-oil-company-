import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Activity, ShieldCheck, MapPin, Building } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const FeaturedProjects: React.FC = () => {
  const { setSurface, setActiveManagementTab } = usePlatform();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const projects = [
    {
      no: '01 / 03',
      sector: 'Offshore Engineering · Niger Delta',
      title: 'Brownfield Asset Integrity Programme',
      client: 'Major IOC Joint Venture',
      location: 'Offshore Niger Delta (Swamp & Shallow Water)',
      description: 'Multi-discipline non-destructive examination, subsea riser ultrasonic testing, and topside structural rehabilitation extending asset design life by 15 years while production remained uninterrupted.',
      image: 'https://images.unsplash.com/photo-1690508313456-bf8c851e8319?auto=format&fit=crop&w=1400&q=86',
      metrics: [
        { label: 'Uptime Sustained', value: '98.6%' },
        { label: 'Safety Record', value: '0 LTI' },
        { label: 'Asset Life Extended', value: '+15 Yrs' },
      ],
      deliverables: ['Ultrasonic phased-array testing', 'Structural riser clamp replacement', 'Corrosion mitigation monitoring'],
    },
    {
      no: '02 / 03',
      sector: 'Subsea Controls · Deepwater Nigeria',
      title: 'Egina FPSO Subsea Controls Upgrade',
      client: 'TotalEnergies EP Nigeria',
      location: 'OML 130 (150km Offshore)',
      description: 'Turnkey fabrication and FAT testing of topside master control station (MCS) and hydraulic distribution units supporting high-rate deepwater subsea producing wells.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=86',
      metrics: [
        { label: 'Water Depth', value: '1,750m' },
        { label: 'Safety Integrity Level', value: 'SIL 3' },
        { label: 'QA Pass Rate', value: '100%' },
      ],
      deliverables: ['Dual-redundant hydraulic power unit', 'Subsea electronic modules', 'Umbilical termination assemblies'],
    },
    {
      no: '03 / 03',
      sector: 'Pipeline Rehabilitation · Western Delta',
      title: 'Escravos Pipeline Infrastructure Replacement',
      client: 'Chevron Nigeria Limited',
      location: 'Escravos Terminal Region',
      description: 'EPC fabrication and hyperbaric diver-assisted installation of 24-inch duplex stainless steel riser tie-in spools with integrated pigging loop verification and cathodic protection overhaul.',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1400&q=86',
      metrics: [
        { label: 'Throughput Protected', value: '180k bpd' },
        { label: 'Welding Radiography', value: '100% NDT' },
        { label: 'Schedule Variance', value: '0 Days' },
      ],
      deliverables: ['Duplex 2205 welded spools', 'Hyperbaric tie-in welds', 'Sacrificial anode arrays'],
    },
  ];

  const current = projects[activeProjectIndex];

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#F4F7FB] text-[#071629]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 text-[#153C65] text-[11px] font-black uppercase tracking-[0.25em] mb-4">
              <span className="w-8 h-[2px] bg-[#F4B323]" />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#071629] leading-[1.15]">
              Complex challenges.
              <br />
              Precisely delivered.
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
              className="w-11 h-11 rounded-lg border border-[#DFE6EF] bg-white hover:bg-[#071629] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono font-bold text-[#64748B]">
              {activeProjectIndex + 1} / {projects.length}
            </span>
            <button
              onClick={() => setActiveProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
              className="w-11 h-11 rounded-lg border border-[#DFE6EF] bg-white hover:bg-[#071629] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Project Showcase Card */}
        <div className="relative bg-[#0B1F38] text-white rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Project Image Column */}
          <div className="relative lg:col-span-7 h-72 lg:h-auto overflow-hidden">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center filter saturate-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#0B1F38]/40 to-[#0B1F38]" />

            <div className="absolute top-5 left-5 bg-[#071629]/90 border border-white/10 px-3.5 py-1.5 rounded text-[10px] font-mono tracking-widest text-[#F4B323]">
              {current.no}
            </div>
          </div>

          {/* Project Info Column */}
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#F4B323] text-[10px] font-extrabold uppercase tracking-widest mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{current.sector}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
                {current.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-5">
                <Building className="w-3.5 h-3.5 text-[#F4B323]" />
                <span>Client: {current.client}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-6 font-light">
                {current.description}
              </p>

              {/* Key Deliverables Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {current.deliverables.map((d, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#153C65]/50 border border-[#1E3A5F] text-[#93C5FD] px-2.5 py-1 rounded-full"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {/* Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6 mb-6">
                {current.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-xl sm:text-2xl font-black text-white">
                      {m.value}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-[#94A3B8] mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Operations Link */}
              <button
                onClick={() => {
                  setSurface('management');
                  setActiveManagementTab('Projects');
                }}
                className="w-full py-3 bg-[#F4B323] hover:bg-[#FFC947] text-[#071629] font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <span>View Live Operations in Management Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

