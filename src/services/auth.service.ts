/**
 * KES Energy Services — Firebase Authentication Service
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User,
  IdTokenResult,
} from 'firebase/auth';
import { auth, setRememberMe } from '../lib/firebase/auth';
import { RegisterPayload, LoginPayload, AppRole } from '../types/auth.types';
import { userService } from './user.service';
import { auditService } from './audit.service';

export const authService = {
  /**
   * Register a new user with Firebase Auth and initialize their Firestore document.
   * Note: Authoritative administrative roles (SUPER_ADMIN, MANAGEMENT) require custom claims verification.
   */
  async register(payload: RegisterPayload) {
    // Clean inputs
    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    // Default to CLIENT if invalid or unprivileged role chosen in self-signup
    const requestedRole: AppRole = ['CLIENT', 'SUPPLIER'].includes(payload.role)
      ? payload.role
      : 'CLIENT';

    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name in Firebase Auth
    await updateProfile(user, {
      displayName: payload.fullName,
    });

    // Send verification email
    try {
      await sendEmailVerification(user);
    } catch (err) {
      console.warn('Email verification send notice:', err);
    }

    // Initialize user profile in Firestore
    const userDoc = await userService.createUserProfile({
      uid: user.uid,
      fullName: payload.fullName,
      email: email,
      role: requestedRole,
      organization: payload.organization || 'Independent Operator',
      title: payload.title || (requestedRole === 'CLIENT' ? 'Client Representative' : 'Vendor Partner'),
      phone: payload.phone || '',
      accountStatus: 'pending_verification',
      emailVerified: user.emailVerified,
      initials: payload.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'KE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Audit log registration
    await auditService.logAuditEvent({
      actorUid: user.uid,
      actorName: payload.fullName,
      action: 'USER_REGISTERED',
      resourceType: 'auth',
      resourceId: user.uid,
      details: `Registered new account as ${requestedRole} (${email})`,
    });

    return { user, profile: userDoc };
  },

  /**
   * Authenticate with email and password
   */
  async login(payload: LoginPayload) {
    if (payload.rememberMe !== undefined) {
      await setRememberMe(payload.rememberMe);
    }

    const email = payload.email.trim().toLowerCase();
    const userCredential = await signInWithEmailAndPassword(auth, email, payload.password);
    const user = userCredential.user;

    // Retrieve Firestore profile
    let profile = await userService.getUserProfile(user.uid);

    // If first login without profile (or seeded), create baseline profile
    if (!profile) {
      profile = await userService.createUserProfile({
        uid: user.uid,
        fullName: user.displayName || email.split('@')[0],
        email: email,
        role: 'CLIENT',
        organization: 'KES Energy Client',
        title: 'Representative',
        accountStatus: 'active',
        emailVerified: user.emailVerified,
        initials: (user.displayName || email)
          .substring(0, 2)
          .toUpperCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      });
    } else {
      // Update last login
      await userService.updateUserProfile(user.uid, {
        lastLoginAt: new Date().toISOString(),
        emailVerified: user.emailVerified,
      });
    }

    // Audit log
    await auditService.logAuditEvent({
      actorUid: user.uid,
      actorName: profile.fullName,
      action: 'USER_LOGIN',
      resourceType: 'auth',
      resourceId: user.uid,
      details: `User logged in from web client`,
    });

    return { user, profile };
  },

  /**
   * Logout current authenticated session
   */
  async logout() {
    const user = auth.currentUser;
    if (user) {
      await auditService.logAuditEvent({
        actorUid: user.uid,
        actorName: user.displayName || user.email || 'User',
        action: 'USER_LOGOUT',
        resourceType: 'auth',
        resourceId: user.uid,
        details: 'User logged out',
      });
    }
    await signOut(auth);
  },

  /**
   * Send password reset email
   */
  async sendPasswordReset(email: string) {
    await sendPasswordResetEmail(auth, email.trim().toLowerCase());
  },

  /**
   * Resend verification email
   */
  async resendVerificationEmail() {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
    }
  },

  /**
   * Retrieve authoritative token claims
   */
  async getCustomClaims(): Promise<IdTokenResult | null> {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdTokenResult(true);
  },
};

