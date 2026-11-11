import React from 'react';

export const PartnersSection: React.FC = () => {
  const partners = [
    { name: 'SEPLAT Energy', label: 'SEPLAT', note: 'Upstream Joint Venture' },
    { name: 'Chevron Nigeria', label: 'CHEVRON', note: 'Offshore Escravos' },
    { name: 'NNPC Limited', label: 'NNPC Ltd.', note: 'National Petroleum Corp' },
    { name: 'SPDC (Shell)', label: 'SPDC', note: 'Swamp & Onshore Assets' },
    { name: 'Nigeria LNG', label: 'NLNG', note: 'Bonny Island Liquefaction' },
    { name: 'TotalEnergies EP', label: 'TotalEnergies', note: 'Deepwater OML 130' },
  ];

  return (
    <section id="partners" className="py-20 sm:py-28 bg-[#F4F7FB] border-b border-[#DFE6EF] text-[#071629]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        <div className="flex items-center justify-center gap-2.5 text-[#153C65] text-[11px] font-black uppercase tracking-[0.25em] mb-4">
          <span className="w-8 h-[2px] bg-[#F4B323]" />
          <span>TRUSTED COLLABORATION</span>
          <span className="w-8 h-[2px] bg-[#F4B323]" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#071629] mb-4">
          Working alongside energy industry leaders.
        </h2>
        <p className="text-sm text-[#64748B] max-w-xl mx-auto mb-14">
          Trusted by Nigeria's foremost operators to engineer, procure and execute mission-critical infrastructure under demanding regulatory and operational environments.
        </p>

        {/* Corporate Partner Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg border border-[#DFE6EF] hover:border-[#153C65] hover:shadow-md transition-all flex flex-col items-center justify-center min-h-[110px] group"
            >
              <span className="text-lg sm:text-xl font-black text-[#071629] tracking-tight group-hover:text-[#2563EB] transition-colors">
                {p.label}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#94A3B8] font-semibold mt-1">
                {p.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

