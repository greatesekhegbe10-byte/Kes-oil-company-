import React from 'react';
import { Navbar } from './Navbar';
import { CorporateFooter } from './CorporateFooter';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck, Award, Users, Target, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setSurface, openModal } = usePlatform();

  return (
    <div className="min-h-screen bg-[#071629] text-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#071629]">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/hero/engineer.avif"
            alt="KES Engineering Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-[#071629]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153C65]/80 border border-[#2563EB]/40 text-[#F4B323] text-xs font-black uppercase tracking-[0.2em] mb-4">
              <span>About KES Energy Services</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Engineering Excellence, <br />
              <span className="text-[#38BDF8]">Local Leadership.</span>
            </h1>
            <p className="text-lg text-[#CBD5E1] leading-relaxed mb-8">
              Founded on unyielding technical integrity, KES Energy Services provides indigenous engineering, procurement, construction, and asset maintenance across Africa's high-stakes upstream, midstream, and downstream sectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSurface('corporate')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all"
              >
                Back to Overview
              </button>
              <button
                onClick={() => openModal('contact-sales')}
                className="px-6 py-3 bg-[#2563EB] hover:bg-blue-600 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center gap-2"
              >
                <span>Partner with KES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Pillars */}
      <section className="py-20 bg-[#F8FAFC] text-[#071629]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] block mb-2">Our Foundation</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071629] leading-tight mb-6">
                Pioneering high-spec EPC solutions in demanding energy corridors.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                With comprehensive operational hubs in Lagos and Port Harcourt, KES combines in-country agility with rigorous international API, ASME, and ISO standards. We bridge local capacity with global engineering standards.
              </p>
              
              <div className="space-y-4">
                {[
                  '100% NOGICD Act Compliant Nigerian Enterprise',
                  'Over 2.4 Million Safe Man-Hours without Lost Time Injury (LTI)',
                  'Certified ISO 9001:2015 Quality & ISO 45001 Safety Management Systems',
                  'Dedicated In-House Multidisciplinary Engineering & Testing Fleet'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-3xl sm:text-4xl font-black text-[#2563EB] block mb-1">18+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Years Active</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-3xl sm:text-4xl font-black text-[#10B981] block mb-1">2.4M</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Zero LTI Hours</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-3xl sm:text-4xl font-black text-[#F59E0B] block mb-1">47+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Major Projects</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-3xl sm:text-4xl font-black text-[#071629] block mb-1">100%</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audit Success</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Values */}
      <section className="py-20 bg-white text-[#071629]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#2563EB] block mb-2">Core Commitments</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071629]">The Standards That Drive KES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Absolute Asset Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We never compromise on safety, metallurgy, or engineering precision. Every project undergoes stringent multi-stage inspection and third-party QA.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F59E0B] flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Local Value Maximization</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We champion indigenous engineering talent and supply networks, generating lasting socio-economic prosperity across host communities.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#10B981] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">On-Schedule Delivery</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Utilizing state-of-the-art telemetry, Primavera scheduling, and integrated supply chains, our clients avoid costly downtime and budget overruns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CorporateFooter />
    </div>
  );
};
