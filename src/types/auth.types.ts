/**
 * KES Energy Services — Authentication and RBAC Types
 */

export type AppRole =
  | 'SUPER_ADMIN'
  | 'MANAGEMENT'
  | 'BUSINESS_DEVELOPMENT'
  | 'PROJECT_MANAGER'
  | 'PROCUREMENT_OFFICER'
  | 'CLIENT'
  | 'SUPPLIER';

export type AccountStatus = 'active' | 'pending_verification' | 'suspended' | 'disabled';

export interface UserAccount {
  uid: string;
  fullName: string;
  email: string;
  role: AppRole;
  organization: string;
  title: string;
  phone?: string;
  accountStatus: AccountStatus;
  emailVerified: boolean;
  avatarUrl?: string;
  initials: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  customClaims?: {
    role?: AppRole;
    admin?: boolean;
    companyId?: string;
  };
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  organization: string;
  title?: string;
  phone?: string;
  role: AppRole;
  termsAccepted: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export type PermissionAction =
  | 'view_overview'
  | 'manage_enquiries'
  | 'view_all_enquiries'
  | 'prepare_quotation'
  | 'manage_projects'
  | 'manage_assigned_projects'
  | 'manage_suppliers'
  | 'verify_suppliers'
  | 'manage_procurement'
  | 'approve_purchase_orders'
  | 'manage_documents'
  | 'view_reports'
  | 'export_reports'
  | 'manage_users'
  | 'system_settings'
  | 'audit_logs';

export interface RolePermissions {
  role: AppRole;
  label: string;
  description: string;
  allowedActions: PermissionAction[];
}

