import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck, RefreshCw, ChevronDown, Monitor, UserCheck, Globe, Briefcase, Store } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { 
    currentUser, 
    availableUsers, 
    switchUser, 
    surface, 
    setSurface, 
    resetDemoData 
  } = usePlatform();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [minimized, setMinimized] = useState(() => surface === 'corporate');

  if (minimized) {
    return (
      <button 
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 right-4 z-50 bg-[#071629]/95 backdrop-blur-md text-[#F4B323] text-xs font-bold px-3.5 py-2 rounded-full shadow-2xl border border-[#2563EB]/50 flex items-center gap-2 hover:bg-[#0B1F38] hover:scale-105 transition-all cursor-pointer"
        title="Open Enterprise Demo Controller"
      >
        <ShieldCheck className="w-4 h-4 text-[#F4B323]" />
        <span>Demo Controller</span>
      </button>
    );
  }

  return (
    <div className="bg-[#051120] border-b border-[#152B47] text-white text-xs px-4 py-2 relative z-50 flex flex-wrap items-center justify-between gap-3 shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-[#0B1F38] px-2.5 py-1 rounded text-[#F4B323] font-bold tracking-wider text-[11px] border border-[#1E3A5F]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F4B323]" />
          <span>ENTERPRISE DEMO CONTROLLER</span>
        </div>
        <span className="hidden sm:inline text-[#94A3B8]">
          Experience KES Energy platform as:
        </span>

        {/* User Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 bg-[#0E2849] hover:bg-[#153C65] text-white px-3 py-1 rounded border border-[#234E7D] transition-colors"
          >
            <span className="w-5 h-5 rounded-full bg-[#F4B323] text-[#071629] font-black text-[10px] flex items-center justify-center">
              {currentUser.initials}
            </span>
            <span className="font-semibold">{currentUser.name}</span>
            <span className="text-[#94A3B8] hidden md:inline">({currentUser.role})</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          </button>

          {openDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-72 bg-[#0B1F38] border border-[#234E7D] rounded-lg shadow-2xl py-2 z-50 text-white animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-bold text-[#64748B] uppercase tracking-wider border-b border-[#152B47]">
                Switch Enterprise Persona
              </div>
              {availableUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUser(u);
                    setOpenDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#153C65] transition-colors ${
                    currentUser.id === u.id ? 'bg-[#153C65]/60 text-[#F4B323]' : 'text-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#1E3A5F] text-[#F4B323] font-bold text-[11px] flex items-center justify-center">
                      {u.initials}
                    </span>
                    <div>
                      <div className="font-semibold leading-tight">{u.name}</div>
                      <div className="text-[10px] text-[#94A3B8]">{u.title} · {u.organization}</div>
                    </div>
                  </div>
                  {currentUser.id === u.id && <UserCheck className="w-4 h-4 text-[#F4B323]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Surface Quick-Navigation Links */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[#0B1F38] rounded p-0.5 border border-[#1E3A5F]">
          <button
            onClick={() => setSurface('corporate')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
              surface === 'corporate' ? 'bg-[#F4B323] text-[#071629] font-bold shadow-sm' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span className="text-[11px]">Corporate Site</span>
          </button>
          <button
            onClick={() => setSurface('management')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
              surface === 'management' ? 'bg-[#2563EB] text-white font-bold shadow-sm' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span className="text-[11px]">Management HQ</span>
          </button>
          <button
            onClick={() => setSurface('client')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
              surface === 'client' ? 'bg-[#10B981] text-white font-bold shadow-sm' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span className="text-[11px]">Client Portal</span>
          </button>
          <button
            onClick={() => setSurface('supplier')}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
              surface === 'supplier' ? 'bg-[#8B5CF6] text-white font-bold shadow-sm' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Store className="w-3 h-3" />
            <span className="text-[11px]">Supplier Portal</span>
          </button>
        </div>

        {/* Reset Demo Data */}
        <button
          onClick={resetDemoData}
          className="flex items-center gap-1.5 bg-[#17263C] hover:bg-[#203756] text-[#CBD5E1] px-2.5 py-1 rounded border border-[#234E7D] text-[11px] transition-colors"
          title="Restore pristine seed data for demonstration"
        >
          <RefreshCw className="w-3 h-3 text-[#F4B323]" />
          <span>Reset Data</span>
        </button>

        {/* Minimize banner button */}
        <button
          onClick={() => setMinimized(true)}
          className="text-[#64748B] hover:text-white px-1.5 py-1"
          title="Hide bar"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

