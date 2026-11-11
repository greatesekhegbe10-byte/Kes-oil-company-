import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Settings, 
  RefreshCw, 
  ShieldAlert, 
  Check, 
  Building2, 
  Bell, 
  Sliders, 
  Database,
  Lock
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { currentUser, resetDemoData, addToast } = usePlatform();

  const [orgName, setOrgName] = useState('KES Energy Group');
  const [currency, setCurrency] = useState('NGN (₦)');
  const [autoSLA, setAutoSLA] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Settings Saved', 'Platform system configuration updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#64748B] uppercase tracking-[0.2em] mb-1">
          <span className="w-5 h-[2px] bg-[#F4B323]" />
          <span>SYSTEM & WORKSPACE CONFIGURATION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
          Enterprise Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
          Workspace parameters, SLA alarm rules and demonstration dataset control.
        </p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-xl border border-[#DFE6EF] shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-[#071629] mb-1">
            Enterprise Organization Profile
          </h3>
          <p className="text-xs text-[#64748B]">
            Primary corporate entity for document headers, quotations and purchase orders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#071629] uppercase tracking-wider mb-1.5">
              Workspace Name
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full h-10 px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#071629] uppercase tracking-wider mb-1.5">
              Operating Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full h-10 px-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
            >
              <option>NGN (₦) - Nigerian Naira</option>
              <option>USD ($) - US Dollar</option>
              <option>EUR (€) - Euro</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-[#F1F5F9]">
          <h3 className="text-base font-bold text-[#071629] mb-3">
            Automation & SLA Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSLA}
                onChange={(e) => setAutoSLA(e.target.checked)}
                className="w-4 h-4 rounded text-[#2563EB]"
              />
              <div>
                <span className="text-xs font-bold text-[#071629] block">
                  Automated RFQ Tendering SLA Monitoring (48 Hours)
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Flag commercial team when client RFQ exceeds 48 hours without quotation assignment.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#2563EB]"
              />
              <div>
                <span className="text-xs font-bold text-[#071629] block">
                  Purchase Order Executive Authorization Alerts
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Send high-priority notification to Operations Director for POs exceeding ₦25,000,000.
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-[#F1F5F9] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            Save Configuration
          </button>
        </div>
      </form>

      {/* Demonstration Data Reset Section */}
      <div className="bg-[#FEF2F2]/60 p-6 rounded-xl border border-[#FECACA] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#991B1B]">
            <ShieldAlert className="w-4 h-4 text-[#DC2626]" />
            <span>EXECUTIVE DEMONSTRATION RESET</span>
          </div>
          <p className="text-xs text-[#7F1D1D] mt-1 max-w-lg">
            Restore all fictional Nigerian energy enquiries, projects, supplier profiles and purchase orders to the pristine baseline presentation state.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="h-10 px-5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors flex-shrink-0 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};

