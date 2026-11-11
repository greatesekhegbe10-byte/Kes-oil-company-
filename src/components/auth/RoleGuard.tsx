import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePlatform } from '../../context/PlatformContext';
import { AppRole } from '../../types/auth.types';
import { hasRole } from '../../lib/permissions';
import { AccessDenied } from './AccessDenied';

interface RoleGuardProps {
  allowedRoles: AppRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  actionDescription?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  children,
  fallback,
  actionDescription,
}) => {
  const { role } = useAuth();
  const { currentUser } = usePlatform();

  // Map platform currentUser role to AppRole for seamless demo sync
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
      : role;

  const permitted = hasRole(effectiveRole, allowedRoles);

  if (!permitted) {
    if (fallback) return <>{fallback}</>;
    return (
      <AccessDenied
        requiredRole={allowedRoles.join(', ')}
        attemptedAction={actionDescription}
      />
    );
  }

  return <>{children}</>;
};

