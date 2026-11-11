import React, { useState } from 'react';
import { Brand } from '../shared/Brand';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowRight, Menu, X, Shield, Lock, LogIn, UserCheck, Building2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setSurface, openModal } = usePlatform();
  const { user, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-40 h-[84px] flex items-center justify-between px-6 md:px-12 lg:px-16 border-b border-white/10 bg-[#071629]/80 backdrop-blur-md">
      <Brand light onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-9">
        <a href="#about" className="text-[13px] font-medium text-[#E1E7EF] hover:text-[#F4B323] transition-colors">
          About KES
        </a>
        <a href="#capabilities" className="text-[13px] font-medium text-[#E1E7EF] hover:text-[#F4B323] transition-colors">
          Capabilities
        </a>
        <a href="#projects" className="text-[13px] font-medium text-[#E1E7EF] hover:text-[#F4B323] transition-colors">
          Portfolio
        </a>
        <a href="#precision" className="text-[13px] font-medium text-[#E1E7EF] hover:text-[#F4B323] transition-colors">
          HSE & Quality
        </a>
        <a href="#partners" className="text-[13px] font-medium text-[#E1E7EF] hover:text-[#F4B323] transition-colors">
          Partners
        </a>
        <a href="#contact" className="text-[13px] font-medium text-[#E1E7EF] hover:text-[#F4B323] transition-colors">
          Contact
        </a>
      </nav>

      {/* Action Buttons */}
      <div className="hidden sm:flex items-center gap-2.5">
        <button
          onClick={() => setSurface('client')}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-[#CBD5E1] hover:text-[#38BDF8] px-2.5 py-2 rounded transition-colors"
        >
          <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Client Portal</span>
        </button>

        <button
          onClick={() => setSurface('management')}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-[#CBD5E1] hover:text-[#F4B323] px-2.5 py-2 rounded transition-colors"
        >
          <Lock className="w-3.5 h-3.5 text-[#F4B323]" />
          <span>Operations HQ</span>
        </button>

        {user ? (
          <button
            onClick={() => setSurface('management')}
            className="flex items-center gap-2 text-[12px] font-semibold text-[#10B981] hover:text-white px-2.5 py-2 rounded transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="truncate max-w-[120px]">{user.email?.split('@')[0]}</span>
          </button>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-[#CBD5E1] hover:text-[#F4B323] px-2.5 py-2 rounded transition-colors"
          >
            <LogIn className="w-3.5 h-3.5 text-[#F4B323]" />
            <span>Sign In</span>
          </button>
        )}

        <button
          onClick={() => openModal('request-quotation')}
          className="h-[40px] px-4 bg-[#F4B323] hover:bg-[#FFC947] text-[#071629] font-bold text-[11px] uppercase tracking-wider rounded flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 shadow-lg ml-1"
        >
          <span>Request Quotation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden text-white p-2"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[84px] left-0 right-0 bg-[#071629] border-b border-[#1E3A5F] p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-[#E2E8F0] hover:text-[#F4B323] py-2 border-b border-[#152B47]"
          >
            About KES
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-[#E2E8F0] hover:text-[#F4B323] py-2 border-b border-[#152B47]"
          >
            Capabilities
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-[#E2E8F0] hover:text-[#F4B323] py-2 border-b border-[#152B47]"
          >
            Portfolio
          </a>
          <a
            href="#precision"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-[#E2E8F0] hover:text-[#F4B323] py-2 border-b border-[#152B47]"
          >
            HSE & Quality
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-[#E2E8F0] hover:text-[#F4B323] py-2 border-b border-[#152B47]"
          >
            Contact
          </a>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSurface('client');
              }}
              className="w-full py-2.5 bg-[#0B1F38] text-[#38BDF8] border border-[#1E3A5F] font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#38BDF8]" />
              <span>Client Portal</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSurface('management');
              }}
              className="w-full py-2.5 bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#F4B323]" />
              <span>Operations HQ</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('request-quotation');
              }}
              className="w-full py-2.5 bg-[#F4B323] text-[#071629] font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2"
            >
              <span>Request Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

