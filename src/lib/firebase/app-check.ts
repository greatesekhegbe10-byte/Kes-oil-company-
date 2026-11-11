import { initializeAppCheck, ReCaptchaV3Provider, AppCheck } from 'firebase/app-check';
import { app } from './config';

export let appCheck: AppCheck | null = null;

export function setupAppCheck(): AppCheck | null {
  if (typeof window === 'undefined') return null;

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const isDebug = import.meta.env.VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN === 'true';

  if (isDebug) {
    // Enable debug token for localhost / testing
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  if (!recaptchaSiteKey && !isDebug) {
    return null;
  }

  try {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaSiteKey || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'),
      isTokenAutoRefreshEnabled: true,
    });
    return appCheck;
  } catch (error) {
    console.warn('App Check initialization non-fatal warning:', error);
    return null;
  }
}

