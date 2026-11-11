import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { RoleSwitcher } from './components/shared/RoleSwitcher';
import { ToastContainer } from './components/shared/ToastContainer';
import { ModalContainer } from './components/modals/ModalContainer';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { ManagementDashboard } from './components/dashboard/ManagementDashboard';
import { ClientPortal } from './components/client/ClientPortal';
import { SupplierPortal } from './components/supplier/SupplierPortal';

const AppContent: React.FC = () => {
  const { surface } = usePlatform();

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-['Manrope',sans-serif] selection:bg-[#F4B323] selection:text-[#071629]">
      {/* Executive Demo Switcher Banner */}
      <RoleSwitcher />

      {/* Main Surface Renderer */}
      <div className="flex-1">
        {surface === 'corporate' && <LandingPage />}
        {surface === 'management' && <ManagementDashboard />}
        {surface === 'client' && <ClientPortal />}
        {surface === 'supplier' && <SupplierPortal />}
      </div>

      {/* Global Modals and Toasts */}
      <ModalContainer />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PlatformProvider>
        <AppContent />
      </PlatformProvider>
    </AuthProvider>
  );
}
