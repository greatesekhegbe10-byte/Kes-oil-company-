import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { UserProfile } from '../../types';
import { 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Key, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const TeamTab: React.FC = () => {
  const { availableUsers, currentUser, switchUser, activityLogs, addToast } = usePlatform();

  const handleInviteUser = () => {
    addToast('Personnel Invited', 'Secure enterprise onboarding invitation sent via email.', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#64748B] uppercase tracking-[0.2em] mb-1">
            <span className="w-5 h-[2px] bg-[#F4B323]" />
            <span>ROLE-BASED ACCESS CONTROL (RBAC)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
            Team & Security Administration
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manage organization members, assign operational roles, and review security audit logs.
          </p>
        </div>

        <button
          onClick={handleInviteUser}
          className="h-10 px-5 bg-[#0B1F38] hover:bg-[#153C65] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm flex-shrink-0"
        >
          <UserPlus className="w-4 h-4 text-[#F4B323]" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Role Switcher Explainer Banner */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-5 rounded-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
              Interactive Multi-Role Demonstration Mode
            </h4>
            <p className="text-xs text-[#1E40AF] mt-0.5">
              Click "Simulate Role" on any profile below to experience the platform from their specific security clearance and workspace viewpoint.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-xl border border-[#DFE6EF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Personnel Name & Email</th>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Security Role</th>
                <th className="py-3.5 px-4">Organization</th>
                <th className="py-3.5 px-4 text-right">Demo Role Switch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#071629]">
              {availableUsers.map((u) => {
                const isCurrent = currentUser.id === u.id;
                return (
                  <tr key={u.id} className={`hover:bg-[#F8FAFC] transition-colors ${isCurrent ? 'bg-[#F0FDF4]/40' : ''}`}>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#071629] text-[#F4B323] font-black text-xs flex items-center justify-center flex-shrink-0">
                          {u.initials}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#071629] flex items-center gap-2">
                            <span>{u.name}</span>
                            {isCurrent && (
                              <span className="text-[9px] bg-[#10B981] text-white px-2 py-0.5 rounded-full font-bold">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#64748B]">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-semibold text-xs text-[#071629]">
                      {u.title}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-[#F1F5F9] text-[#1E293B] border border-[#CBD5E1]">
                        {u.role}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-xs text-[#64748B]">
                      {u.organization}
                    </td>

                    <td className="py-4 px-4 text-right">
                      {isCurrent ? (
                        <span className="text-xs font-bold text-[#10B981] flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Active
                        </span>
                      ) : (
                        <button
                          onClick={() => switchUser(u)}
                          className="px-3 py-1.5 bg-[#0B1F38] hover:bg-[#153C65] text-[#F4B323] font-bold text-xs rounded transition-colors"
                        >
                          Simulate Role
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Audit Log */}
      <div className="bg-white p-6 rounded-xl border border-[#DFE6EF] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#071629]">
              Cryptographic Security Audit Log
            </h3>
            <p className="text-xs text-[#64748B]">
              Immutable audit trail of actions taken across the KES enterprise platform
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#10B981] font-bold bg-[#ECFDF5] px-2.5 py-1 rounded-full">
            Tamper-Evident Active
          </span>
        </div>

        <div className="divide-y divide-[#F1F5F9] max-h-72 overflow-y-auto">
          {activityLogs.map((log) => (
            <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-[#071629] block">{log.title}</span>
                <span className="text-[#64748B] block mt-0.5">{log.details}</span>
                <span className="text-[10px] text-[#94A3B8] font-mono mt-1 block">Actor: {log.actor}</span>
              </div>
              <span className="text-[10px] text-[#64748B] font-mono flex-shrink-0 bg-[#F1F5F9] px-2 py-0.5 rounded">
                {log.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

