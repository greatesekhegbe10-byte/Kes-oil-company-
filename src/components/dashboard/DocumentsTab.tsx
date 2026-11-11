import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { DocumentRecord } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  FolderOpen,
  FileCode,
  FileCheck
} from 'lucide-react';

export const DocumentsTab: React.FC = () => {
  const { documents, openModal, deleteDocument, addToast } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredDocs = documents.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.relatedEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDownload = (doc: DocumentRecord) => {
    addToast('Download Initiated', `Secure transmission of '${doc.title}' (${doc.fileType}) started.`, 'info');
  };

  const getConfidentialityBadge = (conf: DocumentRecord['confidentiality']) => {
    switch (conf) {
      case 'Confidential':
        return 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]';
      case 'Restricted':
        return 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]';
      case 'Internal':
        return 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]';
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
            <span>ENTERPRISE DOCUMENT MANAGEMENT SYSTEM (EDMS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
            Centralized Document Repository
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Cryptographically audited vault for drawings, contracts, NUPRC permits and inspection dossiers.
          </p>
        </div>

        <button
          onClick={() => openModal('upload-document')}
          className="h-10 px-5 bg-[#0B1F38] hover:bg-[#153C65] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-[#F4B323]" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Security Banner */}
      <div className="bg-[#0B1F38] text-white p-5 rounded-xl border border-[#1E3A5F] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#153C65] text-[#F4B323] flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Role-Based Access Control & End-to-End Encryption
            </h4>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              All engineering DWGs and commercial contracts are watermarked with user ID & timestamped in compliance with ISO 27001 standards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#F4B323] font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>SHA-256 Vault Active</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-[#DFE6EF] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search documents by title, project or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#071629]"
          >
            <option value="All">All Categories ({documents.length})</option>
            <option>Technical Drawing</option>
            <option>Contract</option>
            <option>HSE & Safety</option>
            <option>Inspection Report</option>
            <option>Quotation</option>
            <option>Audit</option>
          </select>
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="bg-white rounded-xl border border-[#DFE6EF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Document Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Format & Size</th>
                <th className="py-3.5 px-4">Entity Ref</th>
                <th className="py-3.5 px-4">Uploaded By</th>
                <th className="py-3.5 px-4">Confidentiality</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#071629]">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {doc.fileType}
                      </div>
                      <span className="font-bold text-sm text-[#071629] line-clamp-1">
                        {doc.title}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-xs text-[#071629]">
                    {doc.category}
                  </td>

                  <td className="py-4 px-4 font-mono text-xs text-[#64748B]">
                    {doc.fileType} · {doc.fileSize}
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-xs text-[#2563EB]">
                    {doc.relatedEntity}
                  </td>

                  <td className="py-4 px-4 text-xs text-[#64748B]">
                    <div>{doc.uploadedBy}</div>
                    <div className="text-[10px] text-[#94A3B8]">{doc.uploadedDate}</div>
                  </td>

                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${getConfidentialityBadge(doc.confidentiality)}`}>
                      {doc.confidentiality}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-1.5 text-[#2563EB] hover:bg-[#EFF6FF] rounded transition-colors"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-1.5 text-[#EF4444] hover:bg-[#FEF2F2] rounded transition-colors"
                        title="Delete file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

