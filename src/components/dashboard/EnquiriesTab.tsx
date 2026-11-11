import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Enquiry, EnquiryStatus } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  Tag, 
  Paperclip,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const EnquiriesTab: React.FC = () => {
  const { enquiries, openModal, updateEnquiryStatus, assignEnquiry, availableUsers } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const statuses: EnquiryStatus[] = [
    'New',
    'Under Review',
    'Assigned',
    'Quotation Preparation',
    'Quotation Sent',
    'Negotiation',
    'Won',
    'Lost'
  ];

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch = 
      e.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || e.serviceCategory === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]';
      case 'Under Review':
        return 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]';
      case 'Assigned':
        return 'bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]';
      case 'Quotation Preparation':
        return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
      case 'Quotation Sent':
        return 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]';
      case 'Negotiation':
        return 'bg-[#FDF4FF] text-[#C026D3] border-[#F5D0FE]';
      case 'Won':
        return 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]';
      case 'Lost':
        return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]';
      default:
        return 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#64748B] uppercase tracking-[0.2em] mb-1">
            <span className="w-5 h-[2px] bg-[#F4B323]" />
            <span>COMMERCIAL & TENDERING WORKSPACE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
            Enquiries & RFQs Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manage inbound RFQs, prepare engineering quotations and track client negotiations.
          </p>
        </div>

        <button
          onClick={() => openModal('new-enquiry')}
          className="h-10 px-5 bg-[#0B1F38] hover:bg-[#153C65] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-[#F4B323]" />
          <span>Register New RFQ</span>
        </button>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Pipeline Volume
          </span>
          <span className="text-2xl font-black text-[#071629]">
            {enquiries.length} RFQs
          </span>
          <span className="text-[10px] text-[#10B981] font-semibold block mt-1">
            +3 received this week
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Quotation Prep
          </span>
          <span className="text-2xl font-black text-[#D97706]">
            {enquiries.filter(e => e.status === 'Quotation Preparation' || e.status === 'Under Review').length}
          </span>
          <span className="text-[10px] text-[#64748B] font-semibold block mt-1">
            Requires engineering sign-off
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Won Opportunities
          </span>
          <span className="text-2xl font-black text-[#10B981]">
            ₦2.85B
          </span>
          <span className="text-[10px] text-[#10B981] font-semibold block mt-1">
            82% Tender conversion rate
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Avg Turnaround
          </span>
          <span className="text-2xl font-black text-[#2563EB]">
            1.8 Days
          </span>
          <span className="text-[10px] text-[#64748B] font-semibold block mt-1">
            Target SLA: &lt; 2.5 business days
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#DFE6EF] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by ref, client or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#071629] focus:border-[#2563EB]"
          >
            <option value="All">All Statuses ({enquiries.length})</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#071629] focus:border-[#2563EB]"
          >
            <option value="All">All Categories</option>
            <option>Engineering & Design</option>
            <option>Procurement & Supply</option>
            <option>Project Services</option>
            <option>Asset Integrity</option>
          </select>
        </div>
      </div>

      {/* Table of Enquiries */}
      <div className="bg-white rounded-xl border border-[#DFE6EF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Reference No. & Project</th>
                <th className="py-3.5 px-4">Client Company</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Budget / Quote</th>
                <th className="py-3.5 px-4">Assigned To</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#071629]">
              {filteredEnquiries.map((enq) => (
                <tr 
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5">
                    <span className="font-mono text-[11px] font-bold text-[#2563EB] block">
                      {enq.referenceNo}
                    </span>
                    <span className="font-bold text-sm text-[#071629] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {enq.title}
                    </span>
                    <span className="text-[10px] text-[#94A3B8]">
                      {enq.location}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-semibold text-xs">
                    <div>{enq.clientCompany}</div>
                    <div className="text-[10px] text-[#64748B] font-normal">{enq.clientName}</div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-block px-2.5 py-1 bg-[#F1F5F9] text-[#334155] rounded-md text-[10.5px] font-semibold">
                      {enq.serviceCategory}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-extrabold text-[#071629]">
                      {enq.quotationValue || enq.budgetEstimate}
                    </div>
                    {enq.quotationValue && (
                      <span className="text-[9.5px] text-[#10B981] font-bold">Formal Quote</span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    {enq.assignedTo ? (
                      <span className="flex items-center gap-1.5 text-xs text-[#071629] font-medium">
                        <span className="w-5 h-5 rounded-full bg-[#1E3A5F] text-[#F4B323] text-[9px] font-bold flex items-center justify-center">
                          {enq.assignedTo.split(' ').map(n => n[0]).join('')}
                        </span>
                        <span>{enq.assignedTo}</span>
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          assignEnquiry(enq.id, 'Chinedu Okafor');
                        }}
                        className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded hover:bg-[#DBEAFE]"
                      >
                        + Assign Staff
                      </button>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${getStatusBadge(enq.status)}`}>
                      {enq.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEnquiry(enq);
                      }}
                      className="p-1.5 text-[#64748B] hover:text-[#071629] hover:bg-[#E2E8F0] rounded-lg transition-colors"
                      title="Inspect details"
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

      {/* Selected Enquiry Detail Drawer Modal */}
      {selectedEnquiry && (
        <div 
          onClick={() => setSelectedEnquiry(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div>
                  <span className="font-mono text-xs font-bold text-[#2563EB]">
                    {selectedEnquiry.referenceNo}
                  </span>
                  <h3 className="text-xl font-bold text-[#071629] mt-0.5">
                    {selectedEnquiry.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] hover:text-[#071629] flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Status Update Quick Bar */}
              <div className="my-5 p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                    Current Stage
                  </span>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(selectedEnquiry.status)}`}>
                    {selectedEnquiry.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as EnquiryStatus;
                      updateEnquiryStatus(selectedEnquiry.id, newStatus);
                      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
                    }}
                    className="h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client & Commercial Details */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Client Organization</span>
                  <span className="font-bold text-[#071629] text-sm">{selectedEnquiry.clientCompany}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Contact Representative</span>
                  <span className="font-medium text-[#071629]">{selectedEnquiry.clientName}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Email & Phone</span>
                  <span className="text-[#071629]">{selectedEnquiry.clientEmail}</span>
                  <div className="text-[11px] text-[#64748B]">{selectedEnquiry.clientPhone}</div>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Budget / Commercial Valuation</span>
                  <span className="font-black text-sm text-[#071629]">{selectedEnquiry.quotationValue || selectedEnquiry.budgetEstimate}</span>
                </div>
              </div>

              {/* Technical Description */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider mb-2">
                  Technical Scope of Work
                </h4>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#334155] leading-relaxed">
                  {selectedEnquiry.description}
                </div>
              </div>

              {/* Technical Drawing Attachments */}
              {selectedEnquiry.attachments && selectedEnquiry.attachments.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Technical Drawing Attachments ({selectedEnquiry.attachments.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedEnquiry.attachments.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-[#F1F5F9] rounded border border-[#CBD5E1] text-xs">
                        <span className="font-mono text-[#071629] font-semibold">{file.name}</span>
                        <span className="text-[10px] text-[#64748B]">{file.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Internal Notes Log */}
              <div>
                <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider mb-2">
                  Internal Tendering Notes ({selectedEnquiry.internalNotes?.length || 0})
                </h4>
                <div className="space-y-2.5 max-h-48 overflow-y-auto">
                  {selectedEnquiry.internalNotes?.map((note, idx) => (
                    <div key={idx} className="p-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded text-xs">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#1E40AF] mb-1">
                        <span>{note.author}</span>
                        <span className="font-mono text-[#64748B]">{note.timestamp}</span>
                      </div>
                      <p className="text-[#1E3A8A] leading-snug">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E2E8F0] flex gap-3">
              <button
                onClick={() => {
                  updateEnquiryStatus(selectedEnquiry.id, 'Won');
                  setSelectedEnquiry({ ...selectedEnquiry, status: 'Won' });
                }}
                className="flex-1 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Mark as Awarded (Won)
              </button>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#071629] font-bold text-xs rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

