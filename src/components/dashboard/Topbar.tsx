import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Search, 
  Bell, 
  ChevronRight, 
  ChevronDown, 
  Menu, 
  ExternalLink,
  Plus,
  LogIn,
  LogOut,
  ShieldCheck,
  Check
} from 'lucide-react';

export const Topbar: React.FC<{ setMobileOpen: (open: boolean) => void }> = ({ setMobileOpen }) => {
  const { 
    currentUser, 
    activeManagementTab, 
    setActiveManagementTab, 
    setSurface,
    openModal,
    activityLogs,
    addToast
  } = usePlatform();
  const { user, logout, openAuthModal } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    addToast('Signed Out', 'Firebase session ended.', 'info');
  };

  return (
    <header className="h-[64px] bg-white border-b border-[#E2E8F0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-[#071629] p-1.5 rounded hover:bg-[#F1F5F9] focus:outline-none"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
          <span 
            onClick={() => setActiveManagementTab('Overview')}
            className="hover:text-[#071629] cursor-pointer"
          >
            KES Energy Group
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="font-bold text-[#071629]">
            {activeManagementTab}
          </span>
        </div>
      </div>

      {/* Center: Search projects, enquiries, suppliers... */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div 
          onClick={() => openModal('global-search')}
          className="w-full flex items-center gap-2.5 px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-full text-xs text-[#94A3B8] cursor-pointer transition-colors shadow-xs"
        >
          <Search className="w-4 h-4 text-[#64748B]" />
          <span className="truncate">Search projects, enquiries, suppliers...</span>
        </div>
      </div>

      {/* Right: Notifications, Avatar */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#071629] transition-colors relative"
            title="Activity Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-2xl p-4 z-50 text-left animate-in fade-in zoom-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider">
                  Live Operations Feed
                </h4>
                <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="py-2 space-y-2.5 max-h-64 overflow-y-auto">
                <div className="text-xs p-2 rounded-lg bg-blue-50/60 border border-blue-100/60">
                  <div className="font-bold text-[#071629]">Quotation Submitted</div>
                  <div className="text-[11px] text-[#64748B]">Delta Energy Facility valve packages ready for review.</div>
                </div>
                <div className="text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#071629]">Supplier Verified</div>
                  <div className="text-[11px] text-[#64748B]">Atlantic Valve & Controls passed ISO 9001 compliance.</div>
                </div>
                <div className="text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="font-bold text-[#071629]">Milestone Achieved</div>
                  <div className="text-[11px] text-[#64748B]">Rivers Refinery technical review signed off.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 py-1 px-1.5 rounded-full hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="Alex Esekhegbe"
              className="w-9 h-9 rounded-full object-cover border border-[#CBD5E1]"
            />
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-[#071629] group-hover:text-[#2563EB] transition-colors">
                Alex Esekhegbe
              </span>
              <span className="text-[10px] text-[#64748B] flex items-center gap-1">
                Management <ChevronDown className="w-2.5 h-2.5" />
              </span>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E2E8F0] rounded-xl shadow-2xl py-2 z-50 text-left animate-in fade-in zoom-95">
              <div className="px-4 py-2 border-b border-[#F1F5F9]">
                <div className="text-xs font-bold text-[#071629]">Alex Esekhegbe</div>
                <div className="text-[10px] text-[#64748B]">alex.esekhegbe@kesenergy.com</div>
                <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[9px]">
                  <ShieldCheck className="w-3 h-3 text-blue-600" /> Management
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setSurface('corporate');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#071629] hover:bg-[#F8FAFC] flex items-center justify-between"
                >
                  <span>Public Corporate Site</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8]" />
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    openModal('user-settings');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#071629] hover:bg-[#F8FAFC]"
                >
                  Profile & Preferences
                </button>
              </div>

              <div className="border-t border-[#F1F5F9] pt-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    openAuthModal('login');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2 font-semibold"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Switch Account / Sign In</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

