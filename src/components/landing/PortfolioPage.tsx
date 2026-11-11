import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { CorporateFooter } from './CorporateFooter';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { setSurface, openModal } = usePlatform();
  const [filter, setFilter] = useState<'all' | 'offshore' | 'pipeline' | 'power'>('all');

  const portfolio = [
    {
      id: 'prj-01',
      category: 'offshore',
      title: 'Egina FPSO Subsea Controls Upgrade',
      client: 'TotalEnergies EP Nigeria',
      location: 'OML 130 Deepwater (1,750m Depth)',
      duration: '18 Months',
      status: 'Completed',
      image: '/hero/hero2.jpg',
      statLabel: 'Zero LTI Hours',
      statVal: '480,000 hrs',
      description: 'Turnkey fabrication, testing, and offshore integration of topside master control stations (MCS) and hydraulic distribution systems supporting deepwater subsea producing wells.',
      deliverables: [
        'Dual-redundant hydraulic power unit fabrication',
        'Subsea electronic modules integration & FAT',
        'Umbilical termination assemblies testing'
      ]
    },
    {
      id: 'prj-02',
      category: 'pipeline',
      title: 'Escravos 24" Pipeline Rehabilitation',
      client: 'Chevron Nigeria Limited',
      location: 'Western Niger Delta Swamps',
      duration: '12 Months',
      status: 'Completed',
      image: '/hero/hero3.jpg',
      statLabel: 'Throughput Protected',
      statVal: '180,000 bpd',
      description: 'Engineering, fabrication, and hyperbaric diver-assisted installation of 24-inch duplex stainless steel riser tie-in spools with integrated pigging loop verification.',
      deliverables: [
        'Duplex 2205 welded tie-in spools',
        'Hyperbaric underwater tie-in welds with 100% NDT',
        'Overhauled cathodic protection sacrificial anode arrays'
      ]
    },
    {
      id: 'prj-03',
      category: 'power',
      title: 'Port Harcourt Gas Monetization & Compression',
      client: 'Nigeria LNG (NLNG) Feedstock Corridors',
      location: 'Rivers State Industrial Corridor',
      duration: 'Ongoing',
      status: 'Active',
      image: '/hero/hero1.jpg',
      statLabel: 'Gas Flare Reduction',
      statVal: '92.4% Captured',
      description: 'Engineering and installation of cryogenic natural gas liquid recovery units and multi-stage reciprocating compressors to eliminate routine gas flaring.',
      deliverables: [
        'Cryogenic turbo-expander skids erection',
        'SCADA telemetry & high-pressure custody metering',
        'Hazardous area instrumentation commissioning'
      ]
    },
    {
      id: 'prj-04',
      category: 'pipeline',
      title: 'OB3 Gas Pipeline Crossing & Valve Station',
      client: 'NNPC / Gas Aggregation Company',
      location: 'Delta & Edo State Borders',
      duration: '14 Months',
      status: 'Completed',
      image: '/hero/logistics.avif',
      statLabel: 'Pipeline Corridor',
      statVal: '48" Diameter',
      description: 'Critical mainline block valve station mechanical construction, ultrasonic testing, and automated emergency shutdown (ESD) telemetry integration.',
      deliverables: [
        'Class 600 high-pressure ball valve installation',
        'Cathodic protection deep groundbed installation',
        'Hydrostatic test and nitrogen de-watering'
      ]
    }
  ];

  const filtered = filter === 'all' ? portfolio : portfolio.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#071629] text-white flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#071629]">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/hero/hero1.jpg"
            alt="KES Project Portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-[#071629]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153C65]/80 border border-[#2563EB]/40 text-[#F4B323] text-xs font-black uppercase tracking-[0.2em] mb-4">
              <span>Track Record of Proof</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Major Energy Projects, <br />
              <span className="text-[#38BDF8]">Flawlessly Delivered.</span>
            </h1>
            <p className="text-lg text-[#CBD5E1] leading-relaxed mb-8">
              Review our marquee EPC contracts, subsea field support, and cross-country gas infrastructure projects executed for leading IOCs and national energy operators.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSurface('management')}
                className="px-6 py-3 bg-[#2563EB] hover:bg-blue-600 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Live Management Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSurface('corporate')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all"
              >
                Back to Home
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
              { id: 'all', label: 'All Projects' },
              { id: 'offshore', label: 'Offshore & Deepwater' },
              { id: 'pipeline', label: 'Pipelines & Corridors' },
              { id: 'power', label: 'Gas Monetization' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === tab.id
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            {filtered.length} audited operational contracts
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-[#F8FAFC] text-[#071629]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map(prj => (
            <div key={prj.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={prj.image}
                    alt={prj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-[10.5px] font-bold uppercase tracking-wider backdrop-blur-md">
                      {prj.client}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 text-xs text-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{prj.location}</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/80 text-white">
                      {prj.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                    {prj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {prj.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {prj.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-700 font-medium">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{prj.statLabel}</span>
                  <span className="text-sm font-black text-slate-900">{prj.statVal}</span>
                </div>

                <button
                  onClick={() => openModal('request-quotation')}
                  className="px-4 py-2 bg-[#071629] hover:bg-[#1E293B] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Inquire Similar Scope</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CorporateFooter />
    </div>
  );
};

