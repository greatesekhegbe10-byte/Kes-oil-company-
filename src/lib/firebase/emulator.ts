import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import { auth } from './auth';
import { db } from './firestore';
import { storage } from './storage';

export function setupEmulatorsIfConfigured() {
  const useEmulator = import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true';

  if (useEmulator && typeof window !== 'undefined') {
    try {
      const authHost = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST || 'localhost:9099';
      const firestoreHost = import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST || 'localhost:8080';
      const storageHost = import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_HOST || 'localhost:9199';

      const [fHost, fPort] = firestoreHost.split(':');
      const [sHost, sPort] = storageHost.split(':');

      connectAuthEmulator(auth, `http://${authHost}`, { disableWarnings: true });
      connectFirestoreEmulator(db, fHost, parseInt(fPort));
      connectStorageEmulator(storage, sHost, parseInt(sPort));

      console.info('Connected to Firebase Local Emulator Suite');
    } catch (error) {
      console.warn('Firebase emulator connection note:', error);
    }
  }
}

