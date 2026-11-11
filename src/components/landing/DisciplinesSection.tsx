import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react';

export const DisciplinesSection: React.FC = () => {
  const { setSurface, openModal } = usePlatform();

  const disciplines = [
    {
      id: 'oil-gas',
      badge: '01',
      title: 'Oil & Gas Services',
      subtitle: 'Upstream, midstream & deepwater engineering',
      description: 'Procurement, hyperbaric installation, API valve distribution, and technical maintenance across downstream refineries & offshore platforms.',
      image: '/hero/oil-gas-engineer-sunset.jpg',
      stat: '100% On-Stream',
      action: () => setSurface('services'),
    },
    {
      id: 'civil-contracting',
      badge: '02',
      title: 'Civil Contracting & Fabrication',
      subtitle: 'Heavy structural & swamp corridor construction',
      description: 'Site development, structural skid assembly, swamp trenching, heavy civil earthworks, and pipeline crossing stations engineered to API specifications.',
      image: '/hero/offshore-flare-sunset.jpg',
      stat: '480 km Corridor',
      action: () => setSurface('services'),
    },
    {
      id: 'general-energy',
      badge: '03',
      title: 'General Energy Solutions',
      subtitle: 'Power grid, gas monetization & zero-routine flaring',
      description: 'High-voltage transmission, cryogenic gas recovery, flare elimination compression skids, and turnkey industrial energy systems for national growth.',
      image: '/hero/pumpjack-refinery-sunset.jpg',
      stat: '92.4% Gas Captured',
      action: () => setSurface('services'),
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F8FAFC] text-[#071629] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Heading matching the user's uploaded reference */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#2563EB] block mb-3">
            INTEGRATED CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#071629] tracking-tight leading-[1.15]">
            Three disciplines, one operating standard.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            From field fabrication and deepwater logistics to turnkey project delivery, KES operates under uncompromised engineering rigor.
          </p>
        </div>

        {/* 3 Discipline Cards with crystal clear imagery & gold/warm accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {disciplines.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Header with Badge */}
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/90 via-[#071629]/30 to-transparent" />

                  {/* Top Warm Gold Icon Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="w-9 h-9 rounded-xl bg-[#F4B323] text-[#071629] font-black text-xs flex items-center justify-center shadow-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Metric Pill */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-[11px] font-bold text-[#F4B323] uppercase tracking-wider">
                      {item.subtitle}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white">
                      {item.stat}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 group-hover:text-[#2563EB] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={item.action}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#071629] group-hover:text-[#2563EB] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

