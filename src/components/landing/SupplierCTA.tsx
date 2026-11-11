import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SupplierCTA: React.FC = () => {
  const { openModal } = usePlatform();

  return (
    <section className="py-20 bg-[#0B1F38] text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F4B323 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 text-[#F4B323] text-[11px] font-black uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-[2px] bg-[#F4B323]" />
            <span>SUPPLIER & VENDOR NETWORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Exceptional delivery starts with exceptional partners.
          </h2>

          <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-light">
            Join our pre-qualified Nigerian vendor network. Verified suppliers receive transparent tenders, prompt PO reconciliation and long-term procurement opportunities across our multi-billion naira energy portfolio.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-[#CBD5E1]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> NIPEX Pre-qualification Fast-track
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Standard 30-Day Payment Terms
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Transparent RFQ Bidding
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <button
            onClick={() => openModal('register-supplier')}
            className="h-[52px] px-8 bg-[#F4B323] hover:bg-[#FFC947] text-[#071629] font-extrabold text-[11px] uppercase tracking-wider rounded flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-xl"
          >
            <span>Register as a Supplier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

