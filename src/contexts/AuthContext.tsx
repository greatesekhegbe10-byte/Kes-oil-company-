import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase/auth';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { UserAccount, AppRole, RegisterPayload, LoginPayload } from '../types/auth.types';
import { setupAppCheck } from '../lib/firebase/app-check';
import { setupEmulatorsIfConfigured } from '../lib/firebase/emulator';

interface AuthContextType {
  user: User | null;
  profile: UserAccount | null;
  role: AppRole;
  loading: boolean;
  emailVerified: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  openAuthModal: (mode?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Initialize emulators & App Check on mount
  useEffect(() => {
    setupEmulatorsIfConfigured();
    setupAppCheck();
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const userProfile = await userService.getUserProfile(firebaseUser.uid);
          if (userProfile) {
            setProfile(userProfile);
          } else {
            // Temporary fallback if profile is initializing
            setProfile({
              uid: firebaseUser.uid,
              fullName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              role: 'CLIENT',
              organization: 'KES Energy Partner',
              title: 'Representative',
              accountStatus: 'active',
              emailVerified: firebaseUser.emailVerified,
              initials: (firebaseUser.displayName || 'KE').substring(0, 2).toUpperCase(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.warn('Profile fetch error:', err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    try {
      const { user: loggedInUser, profile: loggedInProfile } = await authService.login(payload);
      setUser(loggedInUser);
      setProfile(loggedInProfile);
      setAuthModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      const { user: newUser, profile: newProfile } = await authService.register(payload);
      setUser(newUser);
      setProfile(newProfile);
      setAuthModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await authService.sendPasswordReset(email);
  };

  const resendVerification = async () => {
    await authService.resendVerificationEmail();
  };

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const role: AppRole = profile?.role || 'CLIENT';
  const emailVerified = user?.emailVerified || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        loading,
        emailVerified,
        login,
        register,
        logout,
        resetPassword,
        resendVerification,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

