export type UserRole = 
  | 'Super Administrator'
  | 'Management'
  | 'Business Development Officer'
  | 'Project Manager'
  | 'Procurement Officer'
  | 'Corporate Client'
  | 'Supplier';

export type EnquiryStatus = 
  | 'New'
  | 'Under Review'
  | 'Assigned'
  | 'Quotation Preparation'
  | 'Quotation Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export type ProjectPhase = 
  | 'Planning'
  | 'FEED Design'
  | 'Engineering'
  | 'Procurement'
  | 'Fabrication'
  | 'Installation'
  | 'Commissioning'
  | 'Close-out';

export type ProjectHealth = 'On Track' | 'At Risk' | 'Delayed';

export type SupplierVerification = 'Verified' | 'Under Review' | 'Pending Audit' | 'Suspended';

export type PurchaseOrderStatus = 
  | 'Draft'
  | 'Pending Approval'
  | 'Approved'
  | 'In Transit'
  | 'Delivered'
  | 'Completed';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  initials: string;
  organization: string;
  avatarUrl?: string;
  phone?: string;
}

export interface Enquiry {
  id: string;
  referenceNo: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  title: string;
  serviceCategory: string;
  location: string;
  budgetEstimate: string;
  description: string;
  status: EnquiryStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo?: string;
  submittedAt: string;
  updatedAt: string;
  attachments?: { name: string; size: string; type: string }[];
  internalNotes?: { author: string; text: string; timestamp: string }[];
  quotationValue?: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  workstream: string;
  assignedTo?: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}

export interface ProjectIssue {
  id: string;
  description: string;
  severity: 'Minor' | 'Moderate' | 'Critical';
  loggedDate: string;
  resolved: boolean;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  client: string;
  location: string;
  manager: string;
  team: string[];
  contractValue: string;
  budgetSpent: string;
  phase: ProjectPhase;
  health: ProjectHealth;
  progressPercent: number;
  startDate: string;
  targetEndDate: string;
  milestones: ProjectMilestone[];
  tasks: ProjectTask[];
  issues: ProjectIssue[];
  documentsCount: number;
  description: string;
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  verificationStatus: SupplierVerification;
  complianceScore: number;
  nipexRegistered: boolean;
  isoCertified: boolean;
  activeContracts: number;
  rating: number;
  lastAuditDate: string;
  registeredDate: string;
  specialties: string[];
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  title: string;
  supplierName: string;
  supplierId: string;
  projectId: string;
  projectName: string;
  amount: string;
  issueDate: string;
  deliveryDueDate: string;
  status: PurchaseOrderStatus;
  requestedBy: string;
  approvedBy?: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: string;
    total: string;
  }[];
}

export interface DocumentRecord {
  id: string;
  title: string;
  category: 'Technical Drawing' | 'Contract' | 'HSE & Safety' | 'Inspection Report' | 'Quotation' | 'Audit';
  fileType: 'PDF' | 'DWG' | 'DOCX' | 'XLSX';
  fileSize: string;
  uploadedBy: string;
  uploadedDate: string;
  relatedEntity: string; // Project code or Supplier code or Enquiry ref
  confidentiality: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
  downloadUrl?: string;
}

export interface ActivityLog {
  id: string;
  type: 'enquiry' | 'project' | 'supplier' | 'procurement' | 'document' | 'auth';
  title: string;
  actor: string;
  details: string;
  timestamp: string;
}

