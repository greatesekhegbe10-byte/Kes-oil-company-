import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { CorporateFooter } from './CorporateFooter';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Wrench, 
  Truck, 
  HardHat, 
  ShieldCheck, 
  Flame, 
  Gauge, 
  ArrowRight, 
  CheckCircle2, 
  Download 
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { openModal, setSurface } = usePlatform();
  const [activeTab, setActiveTab] = useState<'all' | 'epc' | 'procurement' | 'integrity'>('all');

  const capabilities = [
    {
      category: 'epc',
      title: 'EPC & Turnkey Project Delivery',
      subtitle: 'Complete lifecycle engineering from FEED to handover',
      image: '/hero/hero2.jpg',
      points: [
        'Front-End Engineering Design (FEED) & Detailed Engineering',
        'Swamp & Deepwater Pipeline Construction & Tie-in Spools',
        'Topside & Subsea Manifold Structural Fabrication',
        'Pre-commissioning, Hydrotesting & Gas-In Execution',
      ]
    },
    {
      category: 'procurement',
      title: 'Global Supply Chain & API Sourcing',
      subtitle: 'Direct OEM partnership with certified compliance',
      image: '/hero/logistics.avif',
      points: [
        'API 6D High-Pressure Ball, Gate, Globe & Check Valves',
        'Process Turbomachinery, Gas Compressors & Multiphase Pumps',
        'Duplex, Super Duplex & Inconel Specialty Metallurgy',
        'Expedited Global Freight, Port Harcourt & Onne Free Zone Logistics',
      ]
    },
    {
      category: 'integrity',
      title: 'Asset Integrity & Advanced NDT',
      subtitle: 'Predictive inspection and remaining-life assessment',
      image: '/hero/hero1.jpg',
      points: [
        'Phased Array Ultrasonic Testing (PAUT) & TOFD Scans',
        'Corrosion Under Insulation (CUI) & Cathodic Protection Surveys',
        'Atmospheric & Cryogenic Storage Tank Overhaul (API 653)',
        'Subsea ROV Structural & Pipeline Bathymetry Scans',
      ]
    },
  ];

  const filtered = activeTab === 'all' ? capabilities : capabilities.filter(c => c.category === activeTab);

  return (
    <div className="min-h-screen bg-[#071629] text-white flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#071629]">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/hero/logistics.avif"
            alt="Logistics & Infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-[#071629]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153C65]/80 border border-[#2563EB]/40 text-[#F4B323] text-xs font-black uppercase tracking-[0.2em] mb-4">
              <span>Technical Capabilities</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Engineering That Keeps <br />
              <span className="text-[#38BDF8]">Energy Moving.</span>
            </h1>
            <p className="text-lg text-[#CBD5E1] leading-relaxed mb-8">
              Explore our multidisciplinary scope spanning turnkey EPC delivery, world-class supply chain procurement, and high-precision asset maintenance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openModal('request-quotation')}
                className="px-6 py-3 bg-[#2563EB] hover:bg-blue-600 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSurface('corporate')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all"
              >
                Corporate Home
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-[#0B132B] border-b border-white/10 sticky top-[84px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Capabilities' },
              { id: 'epc', label: 'EPC & Construction' },
              { id: 'procurement', label: 'Procurement & Logistics' },
              { id: 'integrity', label: 'Asset Integrity & NDT' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing {filtered.length} core engineering categories
          </div>
        </div>
      </section>

      {/* Capabilities Content Grid */}
      <section className="py-20 bg-[#F8FAFC] text-[#071629]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-16">
          {filtered.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 relative min-h-[300px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071629] mb-4">
                    {item.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" />
                        <span className="text-xs font-semibold text-slate-700 leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => openModal('request-quotation')}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#2563EB] hover:text-blue-700 uppercase tracking-wider"
                  >
                    <span>Engage This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] font-mono text-slate-400">
                    ISO 9001 / API Q1 Certified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CorporateFooter />
    </div>
  );
};

