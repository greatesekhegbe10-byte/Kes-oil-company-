import { useAuth } from '../contexts/AuthContext';
import { AppRole, PermissionAction } from '../types/auth.types';
import {
  hasRole,
  hasPermission,
  canAccessRoute,
  canManageEnquiry,
  canManageProject,
  canManageSupplier,
  canManageProcurement,
  formatRoleTitle,
} from '../lib/permissions';

export function useRole() {
  const { role, user, profile } = useAuth();

  return {
    role,
    roleTitle: formatRoleTitle(role),
    isSuperAdmin: role === 'SUPER_ADMIN',
    isManagement: ['SUPER_ADMIN', 'MANAGEMENT'].includes(role),
    isStaff: ['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DEVELOPMENT', 'PROJECT_MANAGER', 'PROCUREMENT_OFFICER'].includes(role),
    isClient: role === 'CLIENT',
    isSupplier: role === 'SUPPLIER',
    
    // Permission checking methods
    hasRole: (allowedRoles: AppRole[]) => hasRole(role, allowedRoles),
    hasPermission: (action: PermissionAction) => hasPermission(role, action),
    canAccessRoute: (route: string) => canAccessRoute(role, route),
    canManageEnquiry: (enquiryOwnerUid?: string) => canManageEnquiry(role, enquiryOwnerUid, user?.uid),
    canManageProject: (projectManagerId?: string) => canManageProject(role, projectManagerId, user?.uid),
    canManageSupplier: (supplierOwnerUid?: string) => canManageSupplier(role, supplierOwnerUid, user?.uid),
    canManageProcurement: () => canManageProcurement(role),
  };
}

