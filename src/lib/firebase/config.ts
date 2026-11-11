import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Firebase configuration using environment variables
// Note: Real API keys must be supplied via VITE_FIREBASE_API_KEY environment variable.
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    '',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'kes-energy-services.firebaseapp.com',
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    'kes-energy-services',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'kes-energy-services.firebasestorage.app',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    '429868670257',
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:429868670257:web:3452a1d5e657a2209d2410',
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
    import.meta.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    'G-V2WTC7GL63',
};

// Validate configuration
export function validateFirebaseConfig(): { valid: boolean; missing: string[] } {
  const requiredKeys: (keyof typeof firebaseConfig)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'appId',
  ];
  const missing = requiredKeys.filter((k) => !firebaseConfig[k]);
  return {
    valid: missing.length === 0,
    missing,
  };
}

// Singleton Firebase App Initialization
export const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Analytics with browser support check
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics optional in non-tracking environments
  });
}

export { firebaseConfig };

