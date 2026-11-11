import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePlatform } from '../../context/PlatformContext';
import { AppRole } from '../../types/auth.types';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Phone, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight,
  KeyRound
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    authModalMode, 
    closeAuthModal, 
    openAuthModal, 
    login, 
    register, 
    resetPassword 
  } = useAuth();
  const { addToast, setSurface } = usePlatform();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(authModalMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AppRole>('CLIENT');
  const [rememberMe, setRememberMe] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Sync mode with props
  React.useEffect(() => {
    setMode(authModalMode);
    setErrorMsg(null);
    setResetSuccess(false);
  }, [authModalMode]);

  if (!authModalOpen) return null;

  const handleAuthError = (err: any) => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password credentials. Please verify your details.';
      case 'auth/email-already-in-use':
        return 'An account is already registered with this corporate email.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters with mixed characters.';
      case 'auth/user-disabled':
        return 'This account has been suspended by system administrators.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful attempts. Access temporarily restricted for security.';
      default:
        return err?.message || 'Authentication error occurred. Please try again.';
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      await login({ email, password, rememberMe });
      addToast('Authenticated', 'Signed in successfully via Firebase Authentication.', 'success');
    } catch (err: any) {
      setErrorMsg(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setErrorMsg('Please accept the industrial confidentiality & safety terms.');
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName,
        email,
        password,
        organization,
        phone,
        role,
        termsAccepted,
      });
      addToast('Account Registered', 'Verification link dispatched. Please verify your email.', 'success');
    } catch (err: any) {
      setErrorMsg(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setResetSuccess(true);
      addToast('Reset Dispatched', 'Password reset instructions sent to your corporate email.', 'info');
    } catch (err: any) {
      setErrorMsg(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={closeAuthModal}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#DFE6EF] text-[#071629]"
      >
        {/* Header */}
        <div className="bg-[#071629] text-white p-6 relative">
          <div className="flex items-center gap-2 text-[#F4B323] text-[10px] font-extrabold uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4 text-[#F4B323]" />
            <span>ENTERPRISE IDENTITY GATEWAY</span>
          </div>

          <h3 className="text-xl font-extrabold">
            {mode === 'login' && 'Sign in to KES Operations'}
            {mode === 'register' && 'Register Organization Account'}
            {mode === 'forgot' && 'Reset Account Password'}
          </h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            {mode === 'login' && 'Enter your verified credentials to access workspace assets.'}
            {mode === 'register' && 'Join the KES corporate network as a client or verified supplier.'}
            {mode === 'forgot' && 'Provide your registered corporate email to reset credentials.'}
          </p>

          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        {mode !== 'forgot' && (
          <div className="flex border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <button
              onClick={() => { setMode('login'); setErrorMsg(null); }}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
                mode === 'login'
                  ? 'border-[#2563EB] text-[#2563EB] bg-white'
                  : 'border-transparent text-[#64748B] hover:text-[#071629]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(null); }}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
                mode === 'register'
                  ? 'border-[#2563EB] text-[#2563EB] bg-white'
                  : 'border-transparent text-[#64748B] hover:text-[#071629]'
              }`}
            >
              Register Organization
            </button>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2.5 text-xs text-[#991B1B]">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Reset Success Box */}
        {resetSuccess && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-start gap-2.5 text-xs text-[#065F46]">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>Instructions dispatched. Check your inbox for the password reset link.</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Corporate Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                <input
                  required
                  type="email"
                  placeholder="e.okoro@kesenergy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629] focus:bg-white focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-[#071629] uppercase tracking-wider">
                  Password *
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[10.5px] font-semibold text-[#2563EB] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-9 pl-9 pr-9 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629] focus:bg-white focus:border-[#2563EB]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#94A3B8] hover:text-[#071629]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#2563EB]"
                />
                <span className="text-xs text-[#64748B]">Remember secure session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating with Firebase...</span>
              ) : (
                <>
                  <span>Sign In to Platform</span>
                  <ArrowRight className="w-4 h-4 text-[#F4B323]" />
                </>
              )}
            </button>

            {/* Quick Demo Access Buttons */}
            <div className="pt-3 border-t border-[#E2E8F0]">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2 text-center">
                Instant Demo Access (No Password Required)
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    closeAuthModal();
                    setSurface('management');
                    addToast('Management Access', 'Entered Operations Headquarters as Alex Esekhegbe.', 'info');
                  }}
                  className="py-2 px-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#071629] rounded text-[10.5px] font-bold text-center border border-[#CBD5E1] transition-colors"
                >
                  Management
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeAuthModal();
                    setSurface('client');
                    addToast('Client Access', 'Entered Self-Service Portal as SEPLAT Energy.', 'info');
                  }}
                  className="py-2 px-1.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E40AF] rounded text-[10.5px] font-bold text-center border border-[#BFDBFE] transition-colors"
                >
                  Client Portal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeAuthModal();
                    setSurface('supplier');
                    addToast('Supplier Access', 'Entered Vendor Intelligence Portal as Atlantic Valve.', 'info');
                  }}
                  className="py-2 px-1.5 bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#6B21A8] rounded text-[10.5px] font-bold text-center border border-[#E9D5FF] transition-colors"
                >
                  Supplier Portal
                </button>
              </div>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Account Classification *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as AppRole)}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
              >
                <option value="CLIENT">Corporate Client (IOC, Marginal Field Operator)</option>
                <option value="SUPPLIER">Pre-Qualified Vendor / Equipment Supplier</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Engr. Austin Okoro"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Organization Legal Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="SEPLAT / Chevron"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Work Email *
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Password *
                </label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Confirm Password *
                </label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded text-[#2563EB]"
              />
              <span className="text-[11px] text-[#64748B]">
                I agree to the KES Energy Services Industrial Data Protection and NOGICD compliance requirements.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-[#F4B323]" />
                  <span>Create Verified Account</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Registered Work Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629] focus:bg-white focus:border-[#2563EB]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              {loading ? 'Transmitting...' : 'Send Password Reset Link'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs font-semibold text-[#2563EB] hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

