import { getStorage, FirebaseStorage } from 'firebase/storage';
import { app } from './config';

export const storage: FirebaseStorage = getStorage(app);

// Standardized Storage folder architecture constants
export const STORAGE_PATHS = {
  PROFILE_IMAGES: (uid: string, fileName: string) => `profile-images/${uid}/${fileName}`,
  ENQUIRY_DOCS: (uid: string, enquiryId: string, fileName: string) => `enquiry-documents/${uid}/${enquiryId}/${fileName}`,
  PROJECT_DOCS: (projectId: string, fileName: string) => `project-documents/${projectId}/${fileName}`,
  SUPPLIER_DOCS: (uid: string, fileName: string) => `supplier-documents/${uid}/${fileName}`,
  QUOTATION_DOCS: (quotationId: string, fileName: string) => `quotation-documents/${quotationId}/${fileName}`,
  PROCUREMENT_DOCS: (requestId: string, fileName: string) => `procurement-documents/${requestId}/${fileName}`,
  REPORTS: (projectId: string, fileName: string) => `reports/${projectId}/${fileName}`,
};

export const MAX_FILE_SIZES = {
  PROFILE_IMAGE: 5 * 1024 * 1024, // 5MB
  STANDARD_DOC: 25 * 1024 * 1024, // 25MB
  ENGINEERING_DRAWING: 100 * 1024 * 1024, // 100MB
};

export const ALLOWED_DOC_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
  'application/acad', // DWG / CAD
  'image/vnd.dwg',
  'application/x-dwg',
];

