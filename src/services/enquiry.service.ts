/**
 * KES Energy Services — Firestore Enquiries & RFQs Service
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { FirestoreEnquiryDoc, EnquiryWorkflowStatus } from '../types/database.types';

const ENQUIRIES_COLLECTION = 'enquiries';

export const enquiryService = {
  /**
   * Create new Enquiry / RFQ in Firestore
   */
  async createEnquiry(enquiryData: Omit<FirestoreEnquiryDoc, 'enquiryId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(db, ENQUIRIES_COLLECTION));
    const enquiryId = docRef.id;

    await setDoc(docRef, {
      ...enquiryData,
      enquiryId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return enquiryId;
  },

  /**
   * Get single enquiry by ID
   */
  async getEnquiry(enquiryId: string): Promise<FirestoreEnquiryDoc | null> {
    const ref = doc(db, ENQUIRIES_COLLECTION, enquiryId);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as FirestoreEnquiryDoc) : null;
  },

  /**
   * Query enquiries with role constraints
   */
  async getEnquiries(filters?: { clientId?: string; status?: string; maxLimit?: number }): Promise<FirestoreEnquiryDoc[]> {
    try {
      let q = query(collection(db, ENQUIRIES_COLLECTION), orderBy('createdAt', 'desc'), limit(filters?.maxLimit || 50));

      if (filters?.clientId) {
        q = query(collection(db, ENQUIRIES_COLLECTION), where('clientId', '==', filters.clientId), orderBy('createdAt', 'desc'), limit(filters?.maxLimit || 50));
      }

      const snap = await getDocs(q);
      return snap.docs.map((d) => d.data() as FirestoreEnquiryDoc);
    } catch (error) {
      console.warn('Firestore getEnquiries note:', error);
      return [];
    }
  },

  /**
   * Update enquiry workflow status
   */
  async updateStatus(enquiryId: string, status: EnquiryWorkflowStatus): Promise<void> {
    const ref = doc(db, ENQUIRIES_COLLECTION, enquiryId);
    await updateDoc(ref, {
      status,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Assign enquiry to staff member
   */
  async assignStaff(enquiryId: string, assigneeName: string, assigneeUid: string): Promise<void> {
    const ref = doc(db, ENQUIRIES_COLLECTION, enquiryId);
    await updateDoc(ref, {
      assignedTo: assigneeName,
      assignedToUid: assigneeUid,
      status: 'Assigned',
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Add internal audit note
   */
  async addInternalNote(enquiryId: string, note: { author: string; authorUid: string; text: string }): Promise<void> {
    const ref = doc(db, ENQUIRIES_COLLECTION, enquiryId);
    await updateDoc(ref, {
      internalNotes: arrayUnion({
        ...note,
        timestamp: new Date().toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }),
      }),
      updatedAt: serverTimestamp(),
    });
  },
};

