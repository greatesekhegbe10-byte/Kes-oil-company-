import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { X, UserCheck, Shield, Building2, Store, Briefcase, RefreshCw, Check } from 'lucide-react';

export const DemoRolesModal: React.FC = () => {
  const { 
    closeModal, 
    currentUser, 
    availableUsers, 
    switchUser, 
    surface, 
    setSurface, 
    resetDemoData,
    addToast 
  } = usePlatform();

  const handleSwitch = (u: any) => {
    switchUser(u);
    addToast('Persona Switched', `Now operating as ${u.name} (${u.role}).`, 'info');
    closeModal();
  };

  const handleReset = () => {
    resetDemoData();
    addToast('Demo Baseline Restored', 'All mock records returned to initial state.', 'info');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#0B132B] border border-[#1E293B] rounded-2xl w-full max-w-lg shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1E293B] flex items-center justify-between bg-[#080E21]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#60A5FA] flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Enterprise Demo Controller</h3>
              <p className="text-[11px] text-[#94A3B8]">Switch personas to test real role-based permissions</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="text-[#94A3B8] hover:text-white p-1 rounded-lg hover:bg-[#1E293B]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Personas List */}
        <div className="p-5 max-h-[380px] overflow-y-auto space-y-2">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
            Available Role Personas
          </div>
          {availableUsers.map((u) => {
            const isSelected = currentUser.id === u.id;
            return (
              <div
                key={u.id}
                onClick={() => handleSwitch(u)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected 
                    ? 'bg-[#172554] border-[#2563EB] shadow-xs' 
                    : 'bg-[#0E1A38] border-[#1E293B] hover:border-slate-600 hover:bg-[#14234A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1E293B] text-[#60A5FA] font-bold text-xs flex items-center justify-center border border-slate-700">
                    {u.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{u.name}</span>
                      {isSelected && (
                        <span className="text-[9px] bg-[#2563EB] text-white px-1.5 py-0.2 rounded-full font-bold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#94A3B8]">{u.title} · {u.organization}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#1E293B] text-[#93C5FD]">
                    {u.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Surface Links & Reset Footer */}
        <div className="p-4 bg-[#080E21] border-t border-[#1E293B] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setSurface('corporate'); closeModal(); }}
              className="px-2.5 py-1.5 rounded-lg bg-[#1E293B] text-slate-300 hover:text-white hover:bg-slate-700 text-[11px] font-medium"
            >
              Corporate Site
            </button>
            <button
              onClick={() => { setSurface('client'); closeModal(); }}
              className="px-2.5 py-1.5 rounded-lg bg-[#1E293B] text-slate-300 hover:text-white hover:bg-slate-700 text-[11px] font-medium"
            >
              Client Portal
            </button>
            <button
              onClick={() => { setSurface('supplier'); closeModal(); }}
              className="px-2.5 py-1.5 rounded-lg bg-[#1E293B] text-slate-300 hover:text-white hover:bg-slate-700 text-[11px] font-medium"
            >
              Supplier Portal
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-slate-400 hover:text-[#EF4444] text-[11px] font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
