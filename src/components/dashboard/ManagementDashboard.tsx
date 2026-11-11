import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { OverviewTab } from './OverviewTab';
import { EnquiriesTab } from './EnquiriesTab';
import { ProjectsTab } from './ProjectsTab';
import { SuppliersTab } from './SuppliersTab';
import { ProcurementTab } from './ProcurementTab';
import { DocumentsTab } from './DocumentsTab';
import { ReportsTab } from './ReportsTab';
import { TeamTab } from './TeamTab';
import { SettingsTab } from './SettingsTab';
import { Megaphone, X } from 'lucide-react';

export const ManagementDashboard: React.FC = () => {
  const { activeManagementTab, resetDemoData, addToast } = usePlatform();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(true);

  const handleResetData = () => {
    resetDemoData();
    addToast('Demo Data Reset', 'Simulated operations data restored to baseline.', 'info');
  };

  const renderActiveTab = () => {
    switch (activeManagementTab) {
      case 'Overview':
        return <OverviewTab />;
      case 'Enquiries & RFQs':
        return <EnquiriesTab />;
      case 'Projects':
        return <ProjectsTab />;
      case 'Suppliers':
        return <SuppliersTab />;
      case 'Procurement':
        return <ProcurementTab />;
      case 'Documents':
        return <DocumentsTab />;
      case 'Reports':
        return <ReportsTab />;
      case 'Team management':
      case 'Team Management':
        return <TeamTab />;
      case 'Settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F7FB] overflow-hidden">
      {/* 100% Faithful Sidebar matching the screenshot */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar with operational indicators & user menu */}
        <Topbar setMobileOpen={setMobileOpen} />

        {/* Demonstration Mode Amber Banner */}
        {showDemoBanner && (
          <div className="bg-[#FEF3C7] border-b border-[#FDE68A] px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-[#92400E] z-20 transition-all">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-base leading-none">📣</span>
              <span>Demonstration Mode: Viewing simulated data.</span>
              <button
                onClick={handleResetData}
                className="text-[#2563EB] hover:underline font-semibold ml-0.5 focus:outline-none"
              >
                Reset Demo Data.
              </button>
            </div>
            <button
              onClick={() => setShowDemoBanner(false)}
              className="text-[#92400E]/70 hover:text-[#92400E] p-1 rounded transition-colors"
              title="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scrollable Dashboard View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1440px] mx-auto">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  );
};

