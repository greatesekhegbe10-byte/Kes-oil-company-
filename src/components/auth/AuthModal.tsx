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
  KeyRound,
  Shield,
  Briefcase,
  Store,
  Sparkles
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
  const { addToast, setSurface, availableUsers, switchUser } = usePlatform();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(authModalMode);
  const [roleTab, setRoleTab] = useState<'MANAGEMENT' | 'CLIENT' | 'SUPPLIER'>('MANAGEMENT');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Form State
  const [email, setEmail] = useState('alex.esekhegbe@kesenergy.com');
  const [password, setPassword] = useState('Password123!');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Sync mode with props
  React.useEffect(() => {
    setMode(authModalMode);
    setErrorMsg(null);
    setResetSuccess(false);
  }, [authModalMode]);

  // Handle Role Tab Switching & Preset auto-fill
  const handleSelectRoleTab = (tab: 'MANAGEMENT' | 'CLIENT' | 'SUPPLIER') => {
    setRoleTab(tab);
    setErrorMsg(null);
    if (tab === 'MANAGEMENT') {
      setEmail('alex.esekhegbe@kesenergy.com');
      setPassword('Password123!');
    } else if (tab === 'CLIENT') {
      setEmail('client@seplatenergy.com');
      setPassword('Password123!');
    } else {
      setEmail('vendor@atlanticvalve.ng');
      setPassword('Password123!');
    }
  };

  if (!authModalOpen) return null;

  const handleAuthError = (err: any) => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid credentials. You can use the instant one-click login buttons below.';
      case 'auth/email-already-in-use':
        return 'An account is already registered with this corporate email.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters.';
      default:
        return err?.message || 'Authentication error. Please try again.';
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      await login({ email, password, rememberMe });
      addToast('Authenticated', 'Signed in successfully via Firebase Authentication.', 'success');
      if (roleTab === 'CLIENT') setSurface('client');
      else if (roleTab === 'SUPPLIER') setSurface('supplier');
      else setSurface('management');
      closeAuthModal();
    } catch (err: any) {
      // Fallback for seamless demo testing if Firebase project isn't live
      const match = availableUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (match) {
        switchUser(match);
        addToast('Demo Session Initialized', `Signed in as ${match.name} (${match.role}).`, 'success');
        if (roleTab === 'CLIENT') setSurface('client');
        else if (roleTab === 'SUPPLIER') setSurface('supplier');
        else setSurface('management');
        closeAuthModal();
      } else {
        setErrorMsg(handleAuthError(err));
      }
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
        role: roleTab === 'SUPPLIER' ? 'SUPPLIER' : 'CLIENT',
        termsAccepted,
      });
      addToast('Account Registered', 'Verification link dispatched. Welcome to KES Energy Platform.', 'success');
      if (roleTab === 'SUPPLIER') setSurface('supplier');
      else setSurface('client');
      closeAuthModal();
    } catch (err: any) {
      setErrorMsg(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoEntry = (roleType: 'MANAGEMENT' | 'CLIENT' | 'SUPPLIER') => {
    let targetUser = availableUsers[0]; // Alex Esekhegbe
    if (roleType === 'CLIENT') {
      targetUser = availableUsers.find(u => u.role === 'Corporate Client') || availableUsers[4];
      setSurface('client');
    } else if (roleType === 'SUPPLIER') {
      targetUser = availableUsers.find(u => u.role === 'Supplier') || availableUsers[5];
      setSurface('supplier');
    } else {
      setSurface('management');
    }
    switchUser(targetUser);
    addToast('Quick Access Granted', `Entering as ${targetUser.name} (${targetUser.role}).`, 'success');
    closeAuthModal();
  };

  return (
    <div
      onClick={closeAuthModal}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#DFE6EF] text-[#071629]"
      >
        {/* Header */}
        <div className="bg-[#071629] text-white p-6 relative">
          <div className="flex items-center gap-2 text-[#F4B323] text-[10px] font-extrabold uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4 text-[#F4B323]" />
            <span>ENTERPRISE IDENTITY GATEWAY</span>
          </div>

          <h3 className="text-xl font-extrabold">
            {mode === 'login' && 'Sign In to Operations & Portals'}
            {mode === 'register' && 'Register Organization Account'}
            {mode === 'forgot' && 'Reset Account Password'}
          </h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Default test passcode across all modules: <span className="text-[#38BDF8] font-mono font-bold">Password123!</span>
          </p>

          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Portal Category Selector */}
        <div className="grid grid-cols-3 bg-[#0B1F38] text-white border-b border-[#1E3A5F] p-1.5 gap-1">
          <button
            type="button"
            onClick={() => handleSelectRoleTab('MANAGEMENT')}
            className={`py-2 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              roleTab === 'MANAGEMENT'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Management</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectRoleTab('CLIENT')}
            className={`py-2 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              roleTab === 'CLIENT'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Client Portal</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectRoleTab('SUPPLIER')}
            className={`py-2 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              roleTab === 'SUPPLIER'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Supplier Portal</span>
          </button>
        </div>

        {/* Mode Switcher (Sign In vs Register) */}
        {mode !== 'forgot' && roleTab !== 'MANAGEMENT' && (
          <div className="flex border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <button
              onClick={() => { setMode('login'); setErrorMsg(null); }}
              className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                mode === 'login'
                  ? 'border-[#2563EB] text-[#2563EB] bg-white'
                  : 'border-transparent text-[#64748B] hover:text-[#071629]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(null); }}
              className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                mode === 'register'
                  ? 'border-[#2563EB] text-[#2563EB] bg-white'
                  : 'border-transparent text-[#64748B] hover:text-[#071629]'
              }`}
            >
              Register New Organization
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
                <span className="text-[10px] text-blue-600 font-mono">Default: Password123!</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-9 pl-9 pr-9 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629] focus:bg-white focus:border-[#2563EB]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#94A3B8] hover:text-[#071629] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as {roleTab === 'MANAGEMENT' ? 'Management' : roleTab === 'CLIENT' ? 'Corporate Client' : 'Supplier'}</span>
                  <ArrowRight className="w-4 h-4 text-[#F4B323]" />
                </>
              )}
            </button>

            {/* Instant One-Click Demo Access Bar */}
            <div className="pt-3 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                <span>Instant 1-Click Login:</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> No Typing Required
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoEntry('MANAGEMENT')}
                  className="py-2 px-1.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E40AF] rounded-lg text-[10.5px] font-bold text-center border border-[#BFDBFE] transition-colors cursor-pointer"
                >
                  Management
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoEntry('CLIENT')}
                  className="py-2 px-1.5 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] rounded-lg text-[10.5px] font-bold text-center border border-[#BBF7D0] transition-colors cursor-pointer"
                >
                  Client Portal
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoEntry('SUPPLIER')}
                  className="py-2 px-1.5 bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#6B21A8] rounded-lg text-[10.5px] font-bold text-center border border-[#E9D5FF] transition-colors cursor-pointer"
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Engr. Kunle Adeyemi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Organization Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Seplat / Shell / Oando"
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
                  Phone (Nigerian / Int.) *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+234 803 555 0100"
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
                I agree to the KES Energy Services Data Protection & NOGICD compliance requirements.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 mt-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-[#F4B323]" />
              <span>Register & Enter Portal</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
