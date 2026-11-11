import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePlatform } from '../../context/PlatformContext';
import { AppRole } from '../../types/auth.types';
import { hasRole } from '../../lib/permissions';
import { AccessDenied } from './AccessDenied';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
  requireEmailVerification?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireEmailVerification = false,
}) => {
  const { user, loading, emailVerified, openAuthModal } = useAuth();
  const { currentUser } = usePlatform();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FB]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-[#071629] uppercase tracking-wider">
            Authenticating KES Operations...
          </span>
        </div>
      </div>
    );
  }

  // If not logged in and not in active demonstration session
  const inDemoSession = !!currentUser;
  if (!user && !inDemoSession) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#F4F7FB]">
        <div className="bg-white p-8 rounded-2xl border border-[#DFE6EF] shadow-lg max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-[#071629] text-[#F4B323] flex items-center justify-center mx-auto mb-4 font-bold">
            KES
          </div>
          <h3 className="text-lg font-bold text-[#071629] mb-2">
            Authentication Required
          </h3>
          <p className="text-xs text-[#64748B] mb-6">
            Please sign in with your corporate credentials to access this protected operational zone.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="w-full py-2.5 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
          >
            Sign In with Firebase
          </button>
        </div>
      </div>
    );
  }

  // Role verification check if roles specified
  if (allowedRoles && allowedRoles.length > 0) {
    const effectiveRole: AppRole =
      currentUser.role === 'Super Administrator'
        ? 'SUPER_ADMIN'
        : currentUser.role === 'Management'
        ? 'MANAGEMENT'
        : currentUser.role === 'Business Development Officer'
        ? 'BUSINESS_DEVELOPMENT'
        : currentUser.role === 'Project Manager'
        ? 'PROJECT_MANAGER'
        : currentUser.role === 'Procurement Officer'
        ? 'PROCUREMENT_OFFICER'
        : currentUser.role === 'Corporate Client'
        ? 'CLIENT'
        : currentUser.role === 'Supplier'
        ? 'SUPPLIER'
        : 'CLIENT';

    if (!hasRole(effectiveRole, allowedRoles)) {
      return <AccessDenied requiredRole={allowedRoles.join(', ')} />;
    }
  }

  return <>{children}</>;
};

