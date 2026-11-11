import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Settings, 
  RefreshCw, 
  ShieldAlert, 
  Check, 
  Building2, 
  Bell, 
  Sliders, 
  Database,
  Lock,
  LogOut,
  User,
  ExternalLink,
  KeyRound,
  ShieldCheck,
  Globe,
  Save,
  CheckCircle2
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { currentUser, resetDemoData, addToast, setSurface, openModal } = usePlatform();
  const { logout, user } = useAuth();

  const [orgName, setOrgName] = useState('KES Energy Group');
  const [currency, setCurrency] = useState('NGN (₦) - Nigerian Naira');
  const [autoSLA, setAutoSLA] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password update form
  const [currentPass, setCurrentPass] = useState('Password123!');
  const [newPass, setNewPass] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    addToast('Configuration Saved', 'Enterprise workspace parameters updated successfully.', 'success');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn('Logout fallback:', err);
    }
    addToast('Signed Out', 'Operations session closed safely. Returned to corporate site.', 'info');
    setSurface('corporate');
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#64748B] uppercase tracking-[0.2em] mb-1">
            <span className="w-5 h-[2px] bg-[#2563EB]" />
            <span>SYSTEM & WORKSPACE CONFIGURATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
            Settings & Access Control
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manage organization credentials, security policies, SLAs, and active management sessions.
          </p>
        </div>

        {/* Global Exit & Quick Nav */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSurface('corporate')}
            className="h-9 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>View Corporate Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="h-9 px-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Account Session & Authentication Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2563EB]/40 shadow-sm flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">{currentUser.name}</h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Session
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentUser.title} · {currentUser.organization}
            </p>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Email: <span className="text-slate-700 font-semibold">{currentUser.email}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => openModal('demo-roles')}
            className="px-4 py-2 bg-[#1E293B] hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Switch Persona</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </div>

      {/* Main Configuration Tabs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: General Configuration (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Enterprise Profile</h3>
                <p className="text-xs text-slate-500">Corporate parameters for project reports & PO authorization.</p>
              </div>
              {savedSuccess && (
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Corporate Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:border-[#2563EB] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Operating Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:border-[#2563EB]"
                >
                  <option>NGN (₦) - Nigerian Naira</option>
                  <option>USD ($) - US Dollar</option>
                  <option>EUR (€) - Euro</option>
                  <option>GBP (£) - British Pound</option>
                </select>
              </div>
            </div>

            {/* Automation Rules */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Operational SLA & Alert Rules
              </h4>

              <div className="space-y-3">
                <div 
                  onClick={() => setAutoSLA(!autoSLA)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">48-Hour RFQ Tendering SLA Monitoring</div>
                    <div className="text-[11px] text-slate-500">Auto-flag commercial desk when quotation request is unassigned.</div>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors p-0.5 ${autoSLA ? 'bg-[#2563EB]' : 'bg-slate-300'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${autoSLA ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>

                <div 
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">Purchase Order Capex Threshold Alerts</div>
                    <div className="text-[11px] text-slate-500">Instant notification to Operations Director for POs exceeding ₦25,000,000.</div>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors p-0.5 ${emailAlerts ? 'bg-[#2563EB]' : 'bg-slate-300'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${emailAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="h-10 px-6 bg-[#0B132B] hover:bg-[#1E293B] text-white text-xs font-bold rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Configuration</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Security & Password Policies (1 Col) */}
        <div className="space-y-6">
          {/* Security & Access Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <KeyRound className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Management Credentials
              </h3>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Admin Master Passcode
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="Password123!"
                  className="w-full h-9 px-3 bg-slate-100 border border-slate-200 rounded text-xs font-mono font-bold text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => addToast('Copied', 'Passcode copied to clipboard: Password123!', 'info')}
                  className="px-2.5 h-9 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer"
                >
                  Copy
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Default verified passcode for all enterprise demonstration accounts.</p>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-600 font-medium">Audit Trail Logging</span>
                <span className="text-emerald-600 font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-600 font-medium">RBAC Security Rules</span>
                <span className="text-emerald-600 font-bold">12 Collections</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-600 font-medium">NUPRC / NOGICD Policy</span>
                <span className="text-blue-600 font-bold">Compliant</span>
              </div>
            </div>
          </div>

          {/* Reset Demo Data Box */}
          <div className="bg-red-50/60 p-5 rounded-2xl border border-red-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-red-800 text-xs font-bold">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Reset Demo Operations Data</span>
            </div>
            <p className="text-[11px] text-red-700 leading-relaxed">
              Restore all fictional enquiries, projects, procurement POs and supplier registers to the baseline seed data.
            </p>
            <button
              onClick={() => {
                resetDemoData();
                addToast('Data Restored', 'Platform demonstration data reset to factory state.', 'info');
              }}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Simulated Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
