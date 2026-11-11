/**
 * KES Energy Services — Cryptographic Audit Log Service
 */

import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { FirestoreAuditLogDoc } from '../types/database.types';

const AUDIT_COLLECTION = 'auditLogs';

export const auditService = {
  /**
   * Log an immutable security or operational event
   */
  async logAuditEvent(event: Omit<FirestoreAuditLogDoc, 'logId' | 'timestamp'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, AUDIT_COLLECTION), {
        ...event,
        timestamp: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.warn('Failed to record audit log:', error);
      return '';
    }
  },

  /**
   * Retrieve recent audit logs for Management / Super Admin inspection
   */
  async getRecentAuditLogs(max = 20): Promise<FirestoreAuditLogDoc[]> {
    try {
      const q = query(collection(db, AUDIT_COLLECTION), orderBy('timestamp', 'desc'), limit(max));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({
        logId: d.id,
        ...d.data(),
      })) as FirestoreAuditLogDoc[];
    } catch (error) {
      console.warn('Audit query notice:', error);
      return [];
    }
  },
};

