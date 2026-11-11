import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Search, X, Briefcase, MessageSquare, Users, Package, FileText } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { closeModal, projects, enquiries, suppliers, purchaseOrders, setActiveManagementTab, setSurface } = usePlatform();
  const [query, setQuery] = useState('');

  const q = query.toLowerCase();

  const matchedProjects = query ? projects.filter(p => p.title.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)) : [];
  const matchedEnquiries = query ? enquiries.filter(e => e.title.toLowerCase().includes(q) || e.referenceNo.toLowerCase().includes(q) || e.clientCompany.toLowerCase().includes(q)) : [];
  const matchedSuppliers = query ? suppliers.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) : [];

  return (
    <div 
      onClick={closeModal}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 pt-20 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#DFE6EF] text-[#071629]"
      >
        <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3 bg-[#F8FAFC]">
          <Search className="w-5 h-5 text-[#2563EB]" />
          <input
            autoFocus
            type="text"
            placeholder="Search projects, RFQs, suppliers, equipment, purchase orders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-sm font-semibold text-[#071629]"
          />
          <button onClick={closeModal} className="text-[#94A3B8] hover:text-[#071629]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
          {!query && (
            <div className="text-center py-8 text-[#94A3B8]">
              Type to instantly search across all operations, tenders and procurement records.
            </div>
          )}

          {matchedProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Projects</div>
              <div className="space-y-1.5">
                {matchedProjects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSurface('management');
                      setActiveManagementTab('Projects');
                      closeModal();
                    }}
                    className="p-2 hover:bg-[#F1F5F9] rounded cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#2563EB]" />
                      <span className="font-bold text-[#071629]">{p.code}: {p.title}</span>
                    </div>
                    <span className="text-[10px] text-[#64748B]">{p.client}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedEnquiries.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Enquiries & RFQs</div>
              <div className="space-y-1.5">
                {matchedEnquiries.map(e => (
                  <div
                    key={e.id}
                    onClick={() => {
                      setSurface('management');
                      setActiveManagementTab('Enquiries & RFQs');
                      closeModal();
                    }}
                    className="p-2 hover:bg-[#F1F5F9] rounded cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#10B981]" />
                      <span className="font-bold text-[#071629]">{e.referenceNo}: {e.title}</span>
                    </div>
                    <span className="text-[10px] text-[#64748B]">{e.clientCompany}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedSuppliers.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Suppliers</div>
              <div className="space-y-1.5">
                {matchedSuppliers.map(s => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSurface('management');
                      setActiveManagementTab('Suppliers');
                      closeModal();
                    }}
                    className="p-2 hover:bg-[#F1F5F9] rounded cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#8B5CF6]" />
                      <span className="font-bold text-[#071629]">{s.name}</span>
                    </div>
                    <span className="text-[10px] text-[#64748B]">{s.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

