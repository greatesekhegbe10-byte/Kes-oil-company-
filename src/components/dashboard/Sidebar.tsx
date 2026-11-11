import React from 'react';
import { Brand } from '../shared/Brand';
import { usePlatform } from '../../context/PlatformContext';
import { useRole } from '../../hooks/useRole';
import { 
  Home,
  Mail, 
  Briefcase, 
  Users, 
  ShoppingCart, 
  FileText, 
  TrendingUp, 
  UserCheck, 
  Settings, 
  Headphones, 
  ChevronRight,
  Sliders
} from 'lucide-react';

export const Sidebar: React.FC<{ mobileOpen: boolean; setMobileOpen: (open: boolean) => void }> = ({ 
  mobileOpen, 
  setMobileOpen 
}) => {
  const { 
    activeManagementTab, 
    setActiveManagementTab, 
    setSurface,
    openModal 
  } = usePlatform();
  const { canAccessRoute } = useRole();

  const rawWorkspaceNav = [
    { id: 'Overview', label: 'Overview', icon: Home },
    { id: 'Enquiries & RFQs', label: 'Enquiries & RFQs', icon: Mail, badge: 12 },
    { id: 'Projects', label: 'Projects', icon: Briefcase },
    { id: 'Suppliers', label: 'Suppliers', icon: Users },
    { id: 'Procurement', label: 'Procurement', icon: ShoppingCart },
    { id: 'Documents', label: 'Documents', icon: FileText },
  ];

  const rawAdminNav = [
    { id: 'Reports', label: 'Reports', icon: TrendingUp },
    { id: 'Team management', label: 'Team Management', icon: UserCheck },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  // All routes are permanently available in the management dashboard
  const workspaceNav = rawWorkspaceNav;
  const adminNav = rawAdminNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      <aside className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-[240px] bg-[#0B132B] border-r border-[#1E293B] flex flex-col justify-between select-none transform transition-transform duration-300 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 flex flex-col gap-4 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between pt-1">
            <Brand light onClick={() => setSurface('corporate')} />
          </div>

          {/* Enterprise Demo Controller Button */}
          <button
            onClick={() => openModal('demo-roles')}
            className="w-full bg-[#172554]/60 hover:bg-[#1E3A8A] border border-[#2563EB]/40 text-[#93C5FD] hover:text-white rounded-lg py-2 px-3 text-xs font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5 text-[#60A5FA]" />
            <span>Enterprise Demo Controller</span>
          </button>

          {/* Section 1: WORKSPACE */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-3 mb-2">
              Workspace
            </div>

            {workspaceNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeManagementTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveManagementTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#EF4444] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Section 2: INSIGHTS & ADMIN */}
          <div className="space-y-1 pt-2 border-t border-[#1E293B]">
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-3 mb-2">
              Insights & Admin
            </div>

            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeManagementTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveManagementTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#1E293B] space-y-3 bg-[#080E21]">
          {/* Need a hand? View Help Center */}
          <div 
            onClick={() => openModal('help-centre')}
            className="bg-[#111C3A] hover:bg-[#16254E] border border-[#1E293B] rounded-lg p-2.5 flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#1E293B] text-[#93C5FD] flex items-center justify-center">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-white block">Need a hand?</span>
                <span className="text-[9.5px] text-[#64748B] hover:text-blue-400">View Help Center &rarr;</span>
              </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="pt-1 text-left px-1">
            <div className="text-xs font-bold text-white tracking-wide">KES Energy Services</div>
            <div className="text-[10px] text-[#64748B]">Powering a brighter future</div>
          </div>
        </div>
      </aside>
    </>
  );
};

