/**
 * KES Energy Services — Firebase Storage & EDMS Service
 */

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTask,
} from 'firebase/storage';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { storage, MAX_FILE_SIZES, ALLOWED_DOC_TYPES } from '../lib/firebase/storage';
import { db } from '../lib/firebase/firestore';
import { FirestoreDocumentDoc } from '../types/database.types';

const DOCUMENTS_COLLECTION = 'documents';

export const documentService = {
  /**
   * Validate file prior to upload
   */
  validateFile(file: File, isEngineeringDrawing = false): { valid: boolean; error?: string } {
    const maxSize = isEngineeringDrawing ? MAX_FILE_SIZES.ENGINEERING_DRAWING : MAX_FILE_SIZES.STANDARD_DOC;

    if (file.size > maxSize) {
      const maxMb = Math.round(maxSize / (1024 * 1024));
      return { valid: false, error: `File exceeds maximum allowed size of ${maxMb}MB` };
    }

    // Type check if known MIME
    if (file.type && !ALLOWED_DOC_TYPES.includes(file.type) && !file.name.endsWith('.dwg')) {
      return { valid: false, error: 'Unsupported file format. Please upload PDF, DWG, DOCX or XLSX.' };
    }

    return { valid: true };
  },

  /**
   * Upload file to Firebase Storage with progress tracking
   */
  uploadFile(
    file: File,
    storagePath: string,
    onProgress?: (percent: number) => void
  ): { task: UploadTask; promise: Promise<string> } {
    const storageRef = ref(storage, storagePath);
    const task = uploadBytesResumable(storageRef, file, {
      contentType: file.type || 'application/octet-stream',
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });

    const promise = new Promise<string>((resolve, reject) => {
      task.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => reject(error),
        async () => {
          const downloadUrl = await getDownloadURL(task.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });

    return { task, promise };
  },

  /**
   * Record metadata in Firestore
   */
  async recordDocument(docData: Omit<FirestoreDocumentDoc, 'documentId' | 'uploadedAt'>): Promise<string> {
    const docRef = doc(collection(db, DOCUMENTS_COLLECTION));
    const documentId = docRef.id;

    await setDoc(docRef, {
      ...docData,
      documentId,
      uploadedAt: serverTimestamp(),
    });

    return documentId;
  },

  /**
   * List all documents
   */
  async getDocuments(maxLimit = 50): Promise<FirestoreDocumentDoc[]> {
    try {
      const q = query(collection(db, DOCUMENTS_COLLECTION), orderBy('uploadedAt', 'desc'), limit(maxLimit));
      const snap = await getDocs(q);
      return snap.docs.map((d) => d.data() as FirestoreDocumentDoc);
    } catch (error) {
      console.warn('Firestore getDocuments note:', error);
      return [];
    }
  },

  /**
   * Delete file from Storage and remove Firestore record
   */
  async deleteDocument(documentId: string, storagePath?: string): Promise<void> {
    if (storagePath) {
      try {
        const fileRef = ref(storage, storagePath);
        await deleteObject(fileRef);
      } catch (err) {
        console.warn('Storage delete warning:', err);
      }
    }
    await deleteDoc(doc(db, DOCUMENTS_COLLECTION, documentId));
  },
};

