/**
 * KES Energy Services — Role-Based Access Control (RBAC) Architecture
 */

import { AppRole, PermissionAction, RolePermissions } from '../types/auth.types';

export const ROLE_DEFINITIONS: Record<AppRole, RolePermissions> = {
  SUPER_ADMIN: {
    role: 'SUPER_ADMIN',
    label: 'Super Administrator',
    description: 'Full unconstrained platform control, user provisioning, security policies & system configuration.',
    allowedActions: [
      'view_overview',
      'manage_enquiries',
      'view_all_enquiries',
      'prepare_quotation',
      'manage_projects',
      'manage_assigned_projects',
      'manage_suppliers',
      'verify_suppliers',
      'manage_procurement',
      'approve_purchase_orders',
      'manage_documents',
      'view_reports',
      'export_reports',
      'manage_users',
      'system_settings',
      'audit_logs',
    ],
  },
  MANAGEMENT: {
    role: 'MANAGEMENT',
    label: 'Management / Executive',
    description: 'Operational oversight, Capex authorization, high-level reporting and tender sign-off.',
    allowedActions: [
      'view_overview',
      'view_all_enquiries',
      'manage_enquiries',
      'prepare_quotation',
      'manage_projects',
      'manage_suppliers',
      'verify_suppliers',
      'manage_procurement',
      'approve_purchase_orders',
      'manage_documents',
      'view_reports',
      'export_reports',
      'audit_logs',
    ],
  },
  BUSINESS_DEVELOPMENT: {
    role: 'BUSINESS_DEVELOPMENT',
    label: 'Business Development Officer',
    description: 'Inbound client enquiry intake, commercial proposal development, RFQ negotiation and tender management.',
    allowedActions: [
      'view_overview',
      'view_all_enquiries',
      'manage_enquiries',
      'prepare_quotation',
      'manage_documents',
      'view_reports',
      'export_reports',
    ],
  },
  PROJECT_MANAGER: {
    role: 'PROJECT_MANAGER',
    label: 'Lead Project Manager',
    description: 'EPC workstream command, task delegation, field milestones, fabrication schedules, and daily progress logs.',
    allowedActions: [
      'view_overview',
      'manage_assigned_projects',
      'manage_projects',
      'manage_documents',
      'view_reports',
    ],
  },
  PROCUREMENT_OFFICER: {
    role: 'PROCUREMENT_OFFICER',
    label: 'Senior Procurement Specialist',
    description: 'Vendor qualification, purchase requisitions, quotation comparison matrices and logistics expediting.',
    allowedActions: [
      'view_overview',
      'manage_suppliers',
      'verify_suppliers',
      'manage_procurement',
      'manage_documents',
      'view_reports',
      'export_reports',
    ],
  },
  CLIENT: {
    role: 'CLIENT',
    label: 'Corporate Client',
    description: 'Self-service submission of project scopes, engineering drawing exchanges, quotation reviews and progress tracking.',
    allowedActions: [
      'manage_enquiries',
      'manage_documents',
    ],
  },
  SUPPLIER: {
    role: 'SUPPLIER',
    label: 'Pre-Qualified Supplier / Contractor',
    description: 'Tender bidding, purchase order tracking, compliance certificate uploads and delivery coordination.',
    allowedActions: [
      'manage_procurement',
      'manage_documents',
    ],
  },
};

/**
 * Checks if a given role matches one of the allowed roles
 */
export function hasRole(currentRole: AppRole | undefined, allowedRoles: AppRole[]): boolean {
  if (!currentRole) return false;
  if (currentRole === 'SUPER_ADMIN') return true;
  return allowedRoles.includes(currentRole);
}

/**
 * Checks if a role has permission for a specific action
 */
export function hasPermission(currentRole: AppRole | undefined, action: PermissionAction): boolean {
  if (!currentRole) return false;
  if (currentRole === 'SUPER_ADMIN') return true;
  const def = ROLE_DEFINITIONS[currentRole];
  return def ? def.allowedActions.includes(action) : false;
}

/**
 * Checks route access permissions
 */
export function canAccessRoute(currentRole: AppRole | undefined, route: string): boolean {
  if (!currentRole) return false;
  if (currentRole === 'SUPER_ADMIN') return true;

  switch (route) {
    case 'Overview':
      return hasPermission(currentRole, 'view_overview');
    case 'Enquiries & RFQs':
      return hasPermission(currentRole, 'view_all_enquiries') || hasPermission(currentRole, 'manage_enquiries');
    case 'Projects':
      return hasPermission(currentRole, 'manage_projects') || hasPermission(currentRole, 'manage_assigned_projects');
    case 'Suppliers':
      return hasPermission(currentRole, 'manage_suppliers');
    case 'Procurement':
      return hasPermission(currentRole, 'manage_procurement');
    case 'Documents':
      return hasPermission(currentRole, 'manage_documents');
    case 'Reports':
      return hasPermission(currentRole, 'view_reports');
    case 'Team management':
      return hasRole(currentRole, ['SUPER_ADMIN', 'MANAGEMENT']);
    case 'Settings':
      return hasRole(currentRole, ['SUPER_ADMIN', 'MANAGEMENT']);
    default:
      return true;
  }
}

/**
 * Granular Enquiry Management Permission Check
 */
export function canManageEnquiry(
  currentRole: AppRole | undefined,
  enquiryOwnerUid?: string,
  currentUid?: string
): boolean {
  if (!currentRole) return false;
  if (['SUPER_ADMIN', 'MANAGEMENT', 'BUSINESS_DEVELOPMENT'].includes(currentRole)) return true;
  if (currentRole === 'CLIENT' && enquiryOwnerUid && currentUid) {
    return enquiryOwnerUid === currentUid;
  }
  return false;
}

/**
 * Granular Project Management Permission Check
 */
export function canManageProject(
  currentRole: AppRole | undefined,
  projectManagerId?: string,
  currentUid?: string
): boolean {
  if (!currentRole) return false;
  if (['SUPER_ADMIN', 'MANAGEMENT'].includes(currentRole)) return true;
  if (currentRole === 'PROJECT_MANAGER' && projectManagerId && currentUid) {
    return projectManagerId === currentUid;
  }
  return false;
}

/**
 * Granular Supplier Management Permission Check
 */
export function canManageSupplier(
  currentRole: AppRole | undefined,
  supplierOwnerUid?: string,
  currentUid?: string
): boolean {
  if (!currentRole) return false;
  if (['SUPER_ADMIN', 'MANAGEMENT', 'PROCUREMENT_OFFICER'].includes(currentRole)) return true;
  if (currentRole === 'SUPPLIER' && supplierOwnerUid && currentUid) {
    return supplierOwnerUid === currentUid;
  }
  return false;
}

/**
 * Granular Procurement Action Permission Check
 */
export function canManageProcurement(currentRole: AppRole | undefined): boolean {
  return hasRole(currentRole, ['SUPER_ADMIN', 'MANAGEMENT', 'PROCUREMENT_OFFICER', 'SUPPLIER']);
}

/**
 * Formats AppRole to human readable title
 */
export function formatRoleTitle(role: AppRole): string {
  return ROLE_DEFINITIONS[role]?.label || role;
}

