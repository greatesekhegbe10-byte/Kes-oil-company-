import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { openModal } = usePlatform();
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      no: '01',
      title: 'Engineering & Design',
      category: 'FEED & Detailed Engineering',
      copy: 'Multi-disciplinary engineering, front-end engineering design (FEED), process simulation, and detailed structural & piping design developed to global API/ASME standards.',
      details: [
        'Conceptual Studies & Feasibility Analyses',
        'Front-End Engineering Design (FEED)',
        '3D Plant Modeling & Stress Analysis (CAESAR II)',
        'Instrumentation, Control & SCADA Telemetry',
        'Brownfield Retrofit & As-Built Digitization',
      ],
      tag: 'Engineering',
    },
    {
      no: '02',
      title: 'Procurement & Supply',
      category: 'Strategic Sourcing & Vendor Assurance',
      copy: 'Strategic global sourcing, API 6D valve distribution, OEM machinery procurement, and vendor assurance across mission-critical energy assets.',
      details: [
        'API Spec Valves & High-Pressure Piping Systems',
        'Process Pumps, Compressors & Turbomachinery',
        'Specialty Metallurgy (Duplex, Super Duplex, Inconel)',
        'Factory Acceptance Testing (FAT) Supervision',
        'Expediting, Customs Clearing & Free Zone Logistics',
      ],
      tag: 'Procurement',
    },
    {
      no: '03',
      title: 'Project Services & EPC',
      category: 'Turnkey Delivery & Commissioning',
      copy: 'Integrated project management, swamp & offshore fabrication support, pipeline construction, and pre-commissioning with uncompromising schedule control.',
      details: [
        'EPC/EPCM Project Delivery Framework',
        'Swamp & Offshore Pipeline Construction',
        'Mechanical, Structural & Electrical Skids',
        'Rigless Well Intervention Support & Tie-Ins',
        'Pre-Commissioning, Hydrotesting & Gas-In Execution',
      ],
      tag: 'Projects',
    },
    {
      no: '04',
      title: 'Asset Integrity & Maintenance',
      category: 'NDT & Lifecycle Extension',
      copy: 'Advanced non-destructive testing (NDT), ultrasonic corrosion mapping, subsea ROV surveys, and lifecycle integrity solutions engineered to maximize plant uptime.',
      details: [
        'Advanced Ultrasonic & Phased Array NDT Scans',
        'Atmospheric & Cryogenic Storage Tank Overhaul',
        'Cathodic Protection & Corrosion Inhibitor Skids',
        'Subsea Pipeline Riser Inspection & Repair',
        'Turnaround Maintenance (TAM) Shutdown Planning',
      ],
      tag: 'Integrity',
    },
  ];

  return (
    <section id="capabilities" className="py-24 sm:py-32 bg-[#071629] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 text-[#F4B323] text-[11px] font-black uppercase tracking-[0.25em] mb-4">
              <span className="w-8 h-[2px] bg-[#F4B323]" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12]">
              Capabilities engineered
              <br />
              around your operation.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#94A3B8] leading-relaxed">
            From initial concept to full operational commissioning, our interdisciplinary teams bring precision, local content accountability and strict safety oversight to every asset lifecycle.
          </p>
        </div>

        {/* Interactive Capability Rows */}
        <div className="flex flex-col divide-y divide-white/10">
          {services.map((s, index) => {
            const isExpanded = selectedService === index;
            return (
              <div
                key={s.no}
                className={`py-8 transition-colors ${isExpanded ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
              >
                <div
                  onClick={() => setSelectedService(isExpanded ? -1 : index)}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer group"
                >
                  <div className="flex items-start gap-8">
                    <span className="text-[#F4B323] font-mono text-sm font-bold pt-1">
                      {s.no}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase block mb-1">
                        {s.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#F4B323] transition-colors">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed lg:px-6">
                    {s.copy}
                  </p>

                  <div className="flex items-center gap-4 self-end lg:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('request-quotation', { defaultService: s.title });
                      }}
                      className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider text-[#F4B323] hover:text-white transition-colors"
                    >
                      Inquire Quote
                    </button>
                    <div className={`w-11 h-11 rounded border border-white/20 flex items-center justify-center transition-all ${
                      isExpanded ? 'bg-[#F4B323] text-[#071629] border-[#F4B323]' : 'group-hover:border-[#F4B323] text-white group-hover:text-[#F4B323]'
                    }`}>
                      <ChevronRight className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="mt-8 pt-6 border-t border-white/10 pl-16 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-xs font-bold text-[#F4B323] uppercase tracking-wider mb-3">
                        Technical Deliverables
                      </h4>
                      <ul className="space-y-2">
                        {s.details.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#0B1F38] p-5 rounded-lg border border-[#1E3A5F] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider">
                          Capability Benchmark
                        </span>
                        <p className="text-xs text-[#E2E8F0] mt-1 leading-relaxed">
                          All KES {s.title.toLowerCase()} workflows integrate digital tracking, QA/QC documentation, and transparent procurement logs available via our client management dashboard.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#1E3A5F] flex justify-end">
                        <button
                          onClick={() => openModal('request-quotation', { defaultService: s.title })}
                          className="text-xs font-bold text-[#071629] bg-[#F4B323] hover:bg-[#FFC947] px-4 py-2 rounded flex items-center gap-2 transition-all shadow-md"
                        >
                          <span>Request {s.title} Proposal</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

