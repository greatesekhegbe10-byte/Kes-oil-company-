import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Upload, X, FileText } from 'lucide-react';
import { DocumentRecord } from '../../types';

export const UploadDocumentModal: React.FC = () => {
  const { closeModal, addDocument, projects, suppliers } = usePlatform();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technical Drawing' as DocumentRecord['category'],
    fileType: 'PDF' as DocumentRecord['fileType'],
    fileSize: '5.4 MB',
    relatedEntity: projects[0]?.code || 'KES-2508',
    confidentiality: 'Confidential' as DocumentRecord['confidentiality'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument({
      title: formData.title,
      category: formData.category,
      fileType: formData.fileType,
      fileSize: formData.fileSize,
      relatedEntity: formData.relatedEntity,
      confidentiality: formData.confidentiality,
      uploadedBy: 'CurrentUser',
    });
    closeModal();
  };

  return (
    <div 
      onClick={closeModal}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#DFE6EF] text-[#071629]"
      >
        <div className="bg-[#071629] text-white p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#F4B323] text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>DOCUMENT MANAGEMENT (EDMS)</span>
            </div>
            <h3 className="text-xl font-bold">Upload Technical Document</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Simulated File Dropzone */}
          <div className="border-2 border-dashed border-[#CBD5E1] hover:border-[#2563EB] rounded-xl p-6 text-center bg-[#F8FAFC] cursor-pointer transition-colors">
            <Upload className="w-8 h-8 text-[#2563EB] mx-auto mb-2" />
            <div className="text-xs font-bold text-[#071629]">Drop file here or click to browse</div>
            <div className="text-[10px] text-[#64748B] mt-0.5">Supports PDF, DWG, XLSX, DOCX up to 100MB</div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
              Document Title *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. OML-42 High Pressure Tie-in Isometric Drawing"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full h-9 px-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
              >
                <option>Technical Drawing</option>
                <option>Contract</option>
                <option>HSE & Safety</option>
                <option>Inspection Report</option>
                <option>Quotation</option>
                <option>Audit</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Format
              </label>
              <select
                value={formData.fileType}
                onChange={(e) => setFormData({ ...formData, fileType: e.target.value as any })}
                className="w-full h-9 px-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
              >
                <option>PDF</option>
                <option>DWG</option>
                <option>DOCX</option>
                <option>XLSX</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Related Entity / Project *
              </label>
              <input
                type="text"
                value={formData.relatedEntity}
                onChange={(e) => setFormData({ ...formData, relatedEntity: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-mono text-[#071629]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Confidentiality Level *
              </label>
              <select
                value={formData.confidentiality}
                onChange={(e) => setFormData({ ...formData, confidentiality: e.target.value as any })}
                className="w-full h-9 px-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
              >
                <option>Public</option>
                <option>Internal</option>
                <option>Confidential</option>
                <option>Restricted</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Upload className="w-4 h-4 text-[#F4B323]" />
              <span>Upload to Secure Repository</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

