import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Supplier, SupplierVerification } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  ShieldCheck, 
  Award, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export const SuppliersTab: React.FC = () => {
  const { suppliers, openModal, updateSupplierStatus } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const filteredSuppliers = suppliers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || s.verificationStatus === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: SupplierVerification) => {
    switch (status) {
      case 'Verified':
        return 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]';
      case 'Under Review':
        return 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]';
      case 'Pending Audit':
        return 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]';
      case 'Suspended':
        return 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#64748B] uppercase tracking-[0.2em] mb-1">
            <span className="w-5 h-[2px] bg-[#F4B323]" />
            <span>SUPPLY CHAIN & VENDOR MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
            Supplier Intelligence & Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Pre-qualified Nigerian engineering vendors, compliance ratings and supply assurance.
          </p>
        </div>

        <button
          onClick={() => openModal('register-supplier')}
          className="h-10 px-5 bg-[#0B1F38] hover:bg-[#153C65] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-[#F4B323]" />
          <span>Invite / Register Supplier</span>
        </button>
      </div>

      {/* Supplier Network Hero Stats */}
      <div className="bg-[#0B1F38] text-white p-6 rounded-xl border border-[#1E3A5F] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-[#F4B323] uppercase tracking-wider block mb-1">
            VERIFIED SUPPLIER NETWORK
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            126 Approved Vendors
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Across 28 specialist oilfield categories in Lagos, Port Harcourt, and Warri.
          </p>
        </div>

        <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">94%</div>
              <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Compliance Rate</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F4B323]/20 border border-[#F4B323]/40 flex items-center justify-center text-[#F4B323]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#F4B323]">100%</div>
              <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider">NCDMB Aligned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-[#DFE6EF] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search suppliers, categories, codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#071629]"
          >
            <option value="All">All Verification States</option>
            <option>Verified</option>
            <option>Under Review</option>
            <option>Pending Audit</option>
            <option>Suspended</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#071629]"
          >
            <option value="All">All Categories</option>
            <option>Mechanical Equipment & Valves</option>
            <option>Heavy Structural Fabrication</option>
            <option>Instrumentation & Subsea</option>
            <option>Marine Logistics & Heavy Lift</option>
            <option>HSE Equipment & Fire Suppression</option>
            <option>Subsea Inspection & ROV</option>
          </select>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl border border-[#DFE6EF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Vendor Company & Code</th>
                <th className="py-3.5 px-4">Specialist Category</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4">Compliance Score</th>
                <th className="py-3.5 px-4">Active Contracts</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#071629]">
              {filteredSuppliers.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedSupplier(s)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#071629] text-[#F4B323] font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {s.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-[#071629] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                          {s.name}
                        </span>
                        <span className="font-mono text-[10px] text-[#64748B]">
                          {s.code} · Contact: {s.contactPerson}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-xs text-[#071629]">
                    {s.category}
                  </td>

                  <td className="py-4 px-4 text-xs text-[#64748B]">
                    {s.location}
                  </td>

                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${getStatusBadge(s.verificationStatus)}`}>
                      {s.verificationStatus}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="w-24">
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span>{s.complianceScore}%</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#10B981] rounded-full"
                          style={{ width: `${s.complianceScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-bold text-xs text-[#071629]">
                    {s.activeContracts} Active
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSupplier(s);
                      }}
                      className="p-1.5 text-[#64748B] hover:text-[#071629] hover:bg-[#E2E8F0] rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Profile Drawer */}
      {selectedSupplier && (
        <div
          onClick={() => setSelectedSupplier(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div>
                  <span className="font-mono text-xs font-bold text-[#64748B]">
                    {selectedSupplier.code}
                  </span>
                  <h3 className="text-xl font-bold text-[#071629] mt-0.5">
                    {selectedSupplier.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSupplier(null)}
                  className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] hover:text-[#071629] flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Status and Action Buttons */}
              <div className="my-5 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                    Verification Status
                  </span>
                  <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(selectedSupplier.verificationStatus)}`}>
                    {selectedSupplier.verificationStatus}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateSupplierStatus(selectedSupplier.id, 'Verified');
                      setSelectedSupplier({ ...selectedSupplier, verificationStatus: 'Verified' });
                    }}
                    className="px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs rounded transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      updateSupplierStatus(selectedSupplier.id, 'Under Review');
                      setSelectedSupplier({ ...selectedSupplier, verificationStatus: 'Under Review' });
                    }}
                    className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#071629] font-bold text-xs rounded transition-colors"
                  >
                    Flag Review
                  </button>
                </div>
              </div>

              {/* Vendor Specs Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Primary Contact</span>
                  <span className="font-bold text-[#071629] text-sm">{selectedSupplier.contactPerson}</span>
                  <div className="text-[11px] text-[#64748B]">{selectedSupplier.phone}</div>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Corporate Email</span>
                  <span className="text-[#071629]">{selectedSupplier.email}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Operational Base</span>
                  <span className="text-[#071629]">{selectedSupplier.location}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Last Quality Audit</span>
                  <span className="font-mono text-[#071629]">{selectedSupplier.lastAuditDate}</span>
                </div>
              </div>

              {/* Accreditations */}
              <div className="mb-6 p-4 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE]">
                <h4 className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider mb-2">
                  Verified Industry Accreditations
                </h4>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-[#1E3A8A]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    {selectedSupplier.nipexRegistered ? 'NIPEX Joint Qualification Scheme (JQS) Valid' : 'NIPEX Registration Pending'}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#1E3A8A]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    {selectedSupplier.isoCertified ? 'ISO 9001:2015 Quality Management Certified' : 'Internal QA System'}
                  </span>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider mb-2">
                  Pre-Qualified Technical Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#F1F5F9] border border-[#CBD5E1] rounded text-xs text-[#071629] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E8F0]">
              <button
                onClick={() => setSelectedSupplier(null)}
                className="w-full py-2.5 bg-[#071629] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#153C65] transition-colors"
              >
                Close Vendor Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

