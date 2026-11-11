/**
 * KES Energy Services — Firestore Procurement & Purchase Order Service
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
import { FirestorePurchaseOrderDoc, POApprovalStatus, PODeliveryStatus } from '../types/database.types';

const PO_COLLECTION = 'purchaseOrders';

export const procurementService = {
  /**
   * Create Purchase Order
   */
  async createPurchaseOrder(poData: Omit<FirestorePurchaseOrderDoc, 'purchaseOrderId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(db, PO_COLLECTION));
    const purchaseOrderId = docRef.id;

    await setDoc(docRef, {
      ...poData,
      purchaseOrderId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return purchaseOrderId;
  },

  /**
   * Get all Purchase Orders
   */
  async getPurchaseOrders(maxLimit = 50): Promise<FirestorePurchaseOrderDoc[]> {
    try {
      const q = query(collection(db, PO_COLLECTION), orderBy('createdAt', 'desc'), limit(maxLimit));
      const snap = await getDocs(q);
      return snap.docs.map((d) => d.data() as FirestorePurchaseOrderDoc);
    } catch (error) {
      console.warn('Firestore getPurchaseOrders note:', error);
      return [];
    }
  },

  /**
   * Update PO status & approval state
   */
  async updatePOStatus(
    purchaseOrderId: string,
    approvalStatus: POApprovalStatus,
    deliveryStatus?: PODeliveryStatus,
    approvedBy?: string
  ): Promise<void> {
    const ref = doc(db, PO_COLLECTION, purchaseOrderId);
    const updates: any = {
      approvalStatus,
      updatedAt: serverTimestamp(),
    };
    if (deliveryStatus) updates.deliveryStatus = deliveryStatus;
    if (approvedBy) updates.approvedBy = approvedBy;

    await updateDoc(ref, updates);
  },
};

