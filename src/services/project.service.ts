/**
 * KES Energy Services — Firestore Projects & Milestones Service
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { FirestoreProjectDoc, ProjectLifecycleStatus } from '../types/database.types';

const PROJECTS_COLLECTION = 'projects';

export const projectService = {
  /**
   * Create new Project document
   */
  async createProject(projectData: Omit<FirestoreProjectDoc, 'projectId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(db, PROJECTS_COLLECTION));
    const projectId = docRef.id;

    await setDoc(docRef, {
      ...projectData,
      projectId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return projectId;
  },

  /**
   * Get all projects
   */
  async getProjects(maxLimit = 50): Promise<FirestoreProjectDoc[]> {
    try {
      const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'), limit(maxLimit));
      const snap = await getDocs(q);
      return snap.docs.map((d) => d.data() as FirestoreProjectDoc);
    } catch (error) {
      console.warn('Firestore getProjects note:', error);
      return [];
    }
  },

  /**
   * Update completion percentage & lifecycle status
   */
  async updateProgress(projectId: string, completionPercentage: number, status?: ProjectLifecycleStatus): Promise<void> {
    const ref = doc(db, PROJECTS_COLLECTION, projectId);
    const updates: any = {
      completionPercentage,
      updatedAt: serverTimestamp(),
    };
    if (status) updates.status = status;

    await updateDoc(ref, updates);
  },

  /**
   * Update project milestones checklist
   */
  async updateMilestones(projectId: string, milestones: FirestoreProjectDoc['milestones']): Promise<void> {
    const ref = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(ref, {
      milestones,
      updatedAt: serverTimestamp(),
    });
  },
};

