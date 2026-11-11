import React from 'react';
import { ArrowRight, ShieldCheck, Award, Compass, Zap } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#F4F7FB] text-[#071629]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Heading & Mission */}
          <div>
            <div className="flex items-center gap-2.5 text-[#153C65] text-[11px] font-black uppercase tracking-[0.25em] mb-4">
              <span className="w-8 h-[2px] bg-[#F4B323]" />
              <span>WHO WE ARE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#071629] leading-[1.15] mb-6">
              Built for the demands of modern energy.
            </h2>

            <p className="text-base sm:text-lg text-[#526379] leading-relaxed mb-8">
              KES Energy Services is a premier Nigerian energy engineering company delivering complex, high-value solutions across the oil, gas, power and industrial infrastructure sectors.
            </p>

            <a
              href="#capabilities"
              className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-wider text-[#153C65] border-b-2 border-[#153C65] pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
            >
              <span>Discover KES Energy Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column: Key Pillars & Pillars Grid */}
          <div className="flex flex-col gap-6">
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              We combine in-country operational agility with rigorous international engineering standards to make operations safer, more efficient and resilient against technical volatility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-white p-6 rounded-lg border border-[#DFE6EF] shadow-sm hover:border-[#2563EB] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#F4F7FB] flex items-center justify-center text-[#2563EB] mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h3 className="text-base font-bold text-[#071629] mb-2">Local Content Champion</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Fully compliant with NOGICD Act, fostering indigenous technical talent and in-country manufacturing capabilities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#DFE6EF] shadow-sm hover:border-[#F4B323] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#F4F7FB] flex items-center justify-center text-[#F4B323] mb-4">
                  <Award className="w-5 h-5 text-[#F4B323]" />
                </div>
                <h3 className="text-base font-bold text-[#071629] mb-2">Zero-Compromise HSE</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  2.4 million consecutive man-hours without Lost Time Injury (LTI), backed by rigorous safety hazard identification systems.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#DFE6EF] shadow-sm hover:border-[#10B981] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#F4F7FB] flex items-center justify-center text-[#10B981] mb-4">
                  <Compass className="w-5 h-5 text-[#10B981]" />
                </div>
                <h3 className="text-base font-bold text-[#071629] mb-2">Niger Delta Mastery</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Deep experience navigating swamp, shallow offshore, and deepwater logistics across Warri, Port Harcourt, and Escravos.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#DFE6EF] shadow-sm hover:border-[#8B5CF6] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#F4F7FB] flex items-center justify-center text-[#8B5CF6] mb-4">
                  <Zap className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h3 className="text-base font-bold text-[#071629] mb-2">Precision Engineering</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  End-to-end deliverables adhering strictly to ASME, API, ISO 9001:2015 and NUPRC regulatory frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

