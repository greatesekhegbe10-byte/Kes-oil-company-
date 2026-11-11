import React from 'react';
import { Brand } from '../shared/Brand';
import { usePlatform } from '../../context/PlatformContext';
import { Shield, ArrowUp } from 'lucide-react';

export const CorporateFooter: React.FC = () => {
  const { setSurface } = usePlatform();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#051120] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Brand light onClick={scrollToTop} />
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm mt-5 font-light">
              KES Energy Services delivers integrated engineering, procurement and project delivery across Nigeria's energy frontier. Dedicated to industrial excellence and indigenous engineering mastery.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[10px] bg-[#0E2849] text-[#F4B323] px-2.5 py-1 rounded border border-[#1E3A5F] font-mono">
                NCDMB REG: NOGIC-2026-KES
              </span>
              <span className="text-[10px] bg-[#0E2849] text-[#93C5FD] px-2.5 py-1 rounded border border-[#1E3A5F] font-mono">
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li><a href="#about" className="hover:text-[#F4B323] transition-colors">About KES</a></li>
              <li><a href="#projects" className="hover:text-[#F4B323] transition-colors">Flagship Projects</a></li>
              <li><a href="#partners" className="hover:text-[#F4B323] transition-colors">Industry Partners</a></li>
              <li><a href="#precision" className="hover:text-[#F4B323] transition-colors">HSE & Quality</a></li>
              <li>
                <button onClick={() => setSurface('management')} className="hover:text-[#F4B323] transition-colors text-left">
                  Operations HQ
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li><a href="#capabilities" className="hover:text-[#F4B323] transition-colors">FEED & Design</a></li>
              <li><a href="#capabilities" className="hover:text-[#F4B323] transition-colors">Procurement & Supply</a></li>
              <li><a href="#capabilities" className="hover:text-[#F4B323] transition-colors">EPC & Construction</a></li>
              <li><a href="#capabilities" className="hover:text-[#F4B323] transition-colors">Asset Integrity (NDT)</a></li>
              <li>
                <button onClick={() => setSurface('client')} className="hover:text-[#F4B323] transition-colors text-left">
                  Client Workspace
                </button>
              </li>
            </ul>
          </div>

          {/* Operations Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contact Desk
            </h4>
            <address className="not-italic space-y-2 text-xs text-[#94A3B8]">
              <p>Plot 14, Adeola Odeku St,</p>
              <p>Victoria Island, Lagos</p>
              <p className="pt-1 text-[#E2E8F0] font-mono">+234 (0) 1 270 0000</p>
              <p className="text-[#F4B323]">projects@kesenergy.com</p>
            </address>
          </div>
        </div>

        {/* Base Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="flex items-center gap-6">
            <span>© 2026 KES Energy Services Limited. All rights reserved.</span>
            <span className="hidden md:inline">Safety. Integrity. Excellence.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Developed by Alextechenterprise</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded bg-[#0B1F38] hover:bg-[#153C65] text-white flex items-center justify-center transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

