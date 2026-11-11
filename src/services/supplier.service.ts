/**
 * KES Energy Services — Firestore Supplier Management Service
 */

import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { FirestoreSupplierDoc, SupplierVerificationState } from '../types/database.types';

const SUPPLIERS_COLLECTION = 'suppliers';

export const supplierService = {
  /**
   * Register new supplier
   */
  async registerSupplier(supplierData: Omit<FirestoreSupplierDoc, 'supplierId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(db, SUPPLIERS_COLLECTION));
    const supplierId = docRef.id;

    await setDoc(docRef, {
      ...supplierData,
      supplierId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return supplierId;
  },

  /**
   * Get all suppliers
   */
  async getSuppliers(maxLimit = 50): Promise<FirestoreSupplierDoc[]> {
    try {
      const q = query(collection(db, SUPPLIERS_COLLECTION), orderBy('createdAt', 'desc'), limit(maxLimit));
      const snap = await getDocs(q);
      return snap.docs.map((d) => d.data() as FirestoreSupplierDoc);
    } catch (error) {
      console.warn('Firestore getSuppliers note:', error);
      return [];
    }
  },

  /**
   * Update supplier audit verification state
   */
  async updateVerification(supplierId: string, verificationStatus: SupplierVerificationState, complianceScore?: number): Promise<void> {
    const ref = doc(db, SUPPLIERS_COLLECTION, supplierId);
    const updates: any = {
      verificationStatus,
      updatedAt: serverTimestamp(),
    };
    if (complianceScore !== undefined) {
      updates.complianceScore = complianceScore;
    }

    await updateDoc(ref, updates);
  },
};

