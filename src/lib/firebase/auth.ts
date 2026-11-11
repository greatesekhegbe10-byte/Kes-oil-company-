import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence,
  Auth 
} from 'firebase/auth';
import { app } from './config';

export const auth: Auth = getAuth(app);

// Configure secure local persistence by default
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.warn('Firebase auth persistence configuration warning:', error);
  });
}

export function setRememberMe(remember: boolean) {
  return setPersistence(
    auth, 
    remember ? browserLocalPersistence : browserSessionPersistence
  );
}

