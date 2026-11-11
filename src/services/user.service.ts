/**
 * KES Energy Services — Firestore User Profile Service
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { UserAccount } from '../types/auth.types';

const USERS_COLLECTION = 'users';

export const userService = {
  /**
   * Fetch single user profile by Firebase Auth UID
   */
  async getUserProfile(uid: string): Promise<UserAccount | null> {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        return snapshot.data() as UserAccount;
      }
      return null;
    } catch (error) {
      console.warn('Firestore getUserProfile error:', error);
      return null;
    }
  },

  /**
   * Create new user document in Firestore
   */
  async createUserProfile(userDocData: UserAccount): Promise<UserAccount> {
    const userRef = doc(db, USERS_COLLECTION, userDocData.uid);
    await setDoc(userRef, {
      ...userDocData,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    return userDocData;
  },

  /**
   * Update permitted user fields
   */
  async updateUserProfile(uid: string, fields: Partial<UserAccount>): Promise<void> {
    // Security safeguard: Never allow client-side role elevation through generic user updates
    const sanitized = { ...fields };
    delete sanitized.role;
    delete sanitized.uid;

    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, {
      ...sanitized,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * List users with pagination for Team Management
   */
  async listUsers(maxLimit = 50): Promise<UserAccount[]> {
    try {
      const q = query(collection(db, USERS_COLLECTION), limit(maxLimit));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => docSnap.data() as UserAccount);
    } catch (error) {
      console.warn('Firestore listUsers note:', error);
      return [];
    }
  },
};

