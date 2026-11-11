/**
 * KES Energy Services — Cloud Firestore Database Schemas
 */

import { AppRole, AccountStatus } from './auth.types';

export type EnquiryWorkflowStatus =
  | 'New'
  | 'Under Review'
  | 'Assigned'
  | 'Quotation Preparation'
  | 'Quotation Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export type QuotationStatus = 'Draft' | 'Sent' | 'Approved' | 'Declined' | 'Superseded';

export type ProjectLifecycleStatus =
  | 'Planning'
  | 'FEED Design'
  | 'Engineering'
  | 'Procurement'
  | 'Fabrication'
  | 'Installation'
  | 'Commissioning'
  | 'Close-out';

export type ProjectHealthStatus = 'On Track' | 'At Risk' | 'Delayed';

export type SupplierVerificationState = 'Verified' | 'Under Review' | 'Pending Audit' | 'Suspended';

export type POApprovalStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';

export type PODeliveryStatus = 'Pending Dispatch' | 'In Transit' | 'Delivered' | 'Inspected';

export interface FirestoreUserDoc {
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
  createdAt: any;
  updatedAt: any;
  lastLoginAt?: any;
}

export interface FirestoreEnquiryDoc {
  enquiryId: string;
  clientId: string;
  referenceNumber: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  projectTitle: string;
  serviceCategory: string;
  projectLocation: string;
  budgetEstimate: string;
  description: string;
  status: EnquiryWorkflowStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo?: string;
  assignedToUid?: string;
  quotationValue?: string;
  attachments?: {
    name: string;
    size: string;
    type: string;
    storagePath?: string;
    downloadUrl?: string;
  }[];
  internalNotes?: {
    author: string;
    authorUid: string;
    text: string;
    timestamp: string;
  }[];
  createdAt: any;
  updatedAt: any;
}

export interface FirestoreQuotationDoc {
  quotationId: string;
  enquiryId: string;
  clientId: string;
  referenceNumber: string;
  status: QuotationStatus;
  currency: 'NGN' | 'USD' | 'EUR';
  lineItems: {
    description: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
  }[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  preparedBy: string;
  preparedByUid: string;
  validUntil: string;
  createdAt: any;
  updatedAt: any;
}

export interface FirestoreProjectDoc {
  projectId: string;
  code: string;
  projectName: string;
  projectDescription: string;
  client: string;
  location: string;
  projectManagerId: string;
  projectManagerName: string;
  teamMembers: string[];
  contractValue: string;
  budgetSpent: string;
  status: ProjectLifecycleStatus;
  health: ProjectHealthStatus;
  completionPercentage: number;
  startDate: string;
  expectedEndDate: string;
  documentsCount: number;
  milestones: {
    id: string;
    title: string;
    date: string;
    completed: boolean;
    workstream: string;
    assignedTo?: string;
  }[];
  createdAt: any;
  updatedAt: any;
}

export interface FirestoreTaskDoc {
  taskId: string;
  projectId: string;
  title: string;
  description?: string;
  assignedTo: string;
  assignedToUid?: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: any;
  updatedAt: any;
}

export interface FirestoreSupplierDoc {
  supplierId: string;
  ownerUid?: string;
  companyName: string;
  supplierCode: string;
  serviceCategories: string[];
  primaryCategory: string;
  contactPerson: string;
  contactEmail: string;
  phone: string;
  location: string;
  registrationStatus: 'Submitted' | 'Auditing' | 'Approved' | 'Declined';
  verificationStatus: SupplierVerificationState;
  complianceScore: number;
  nipexRegistered: boolean;
  isoCertified: boolean;
  activeContracts: number;
  rating: number;
  specialties: string[];
  documents?: {
    title: string;
    type: string;
    url?: string;
    verified: boolean;
  }[];
  lastAuditDate: string;
  createdAt: any;
  updatedAt: any;
}

export interface FirestoreProcurementRequestDoc {
  requestId: string;
  projectId: string;
  projectName: string;
  requestedBy: string;
  requestedByUid: string;
  title: string;
  items: {
    description: string;
    quantity: number;
    estimatedCost?: string;
  }[];
  status: 'Open' | 'Bidding' | 'Evaluated' | 'PO_Issued' | 'Cancelled';
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
  createdAt: any;
  updatedAt: any;
}

export interface FirestorePurchaseOrderDoc {
  purchaseOrderId: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  procurementRequestId?: string;
  projectId: string;
  projectName: string;
  title: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: string;
    total: string;
  }[];
  totalAmount: string;
  currency: string;
  approvalStatus: POApprovalStatus;
  deliveryStatus: PODeliveryStatus;
  requestedBy: string;
  approvedBy?: string;
  issueDate: string;
  deliveryDueDate: string;
  createdAt: any;
  updatedAt: any;
}

export interface FirestoreDocumentDoc {
  documentId: string;
  ownerUid: string;
  uploaderName: string;
  title: string;
  category: 'Technical Drawing' | 'Contract' | 'HSE & Safety' | 'Inspection Report' | 'Quotation' | 'Audit';
  fileName: string;
  fileType: 'PDF' | 'DWG' | 'DOCX' | 'XLSX';
  fileSize: string;
  storagePath: string;
  associatedRecordId: string; // Project code, Supplier code, or Enquiry ref
  associatedRecordType: 'project' | 'enquiry' | 'supplier' | 'procurement';
  confidentiality: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
  downloadUrl?: string;
  uploadedAt: any;
}

export interface FirestoreNotificationDoc {
  notificationId: string;
  recipientUid: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'critical';
  read: boolean;
  linkUrl?: string;
  createdAt: any;
}

export interface FirestoreAuditLogDoc {
  logId: string;
  actorUid: string;
  actorName: string;
  action: string;
  resourceType: 'user' | 'enquiry' | 'project' | 'supplier' | 'procurement' | 'document' | 'auth';
  resourceId: string;
  details: string;
  timestamp: any;
  ipAddress?: string;
  metadata?: Record<string, any>;
}

export interface FirestoreSystemSettingsDoc {
  settingId: string;
  workspaceName: string;
  defaultCurrency: string;
  slaNotificationHours: number;
  enableAuditLogging: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
  updatedAt: any;
  updatedBy: string;
}

