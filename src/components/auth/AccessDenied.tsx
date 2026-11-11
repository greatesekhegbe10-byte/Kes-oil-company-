import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const AccessDenied: React.FC<{ requiredRole?: string; attemptedAction?: string }> = ({
  requiredRole,
  attemptedAction,
}) => {
  const { setActiveManagementTab } = usePlatform();

  return (
    <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#DFE6EF] shadow-sm text-center max-w-lg mx-auto my-12 animate-in fade-in duration-200">
      <div className="w-16 h-16 rounded-full bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mx-auto mb-4 border border-[#FECACA]">
        <Lock className="w-8 h-8" />
      </div>

      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#DC2626] mb-1">
        SECURITY ACCESS RESTRICTION (403)
      </div>

      <h3 className="text-xl font-bold text-[#071629] mb-2">
        Restricted Operational Module
      </h3>

      <p className="text-xs text-[#64748B] leading-relaxed mb-6">
        Your current account role does not hold clearance to {attemptedAction || 'access this module'}.
        {requiredRole && (
          <span className="block mt-1 font-semibold text-[#071629]">
            Required Clearance: {requiredRole}
          </span>
        )}
      </p>

      <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] text-[11px] text-[#64748B] mb-6 text-left">
        <strong>Tip for Executive Demonstration:</strong> Use the top demo controller banner to switch into an authorized persona (e.g. <em>Emeka Okoro — Management</em> or <em>Super Administrator</em>).
      </div>

      <button
        onClick={() => setActiveManagementTab('Overview')}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#071629] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#153C65] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Operations Overview</span>
      </button>
    </div>
  );
};

