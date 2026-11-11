import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Send, Upload, X, CheckCircle2 } from 'lucide-react';

export const NewEnquiryModal: React.FC = () => {
  const { closeModal, addEnquiry, currentUser, modalData } = usePlatform();
  const [submitted, setSubmitted] = useState(false);
  const [assignedRef, setAssignedRef] = useState('');

  const [formData, setFormData] = useState({
    name: currentUser.role === 'Corporate Client' ? currentUser.name : '',
    company: currentUser.role === 'Corporate Client' ? currentUser.organization : '',
    email: currentUser.email,
    phone: currentUser.phone || '+234 1 277 0000',
    title: '',
    category: modalData?.defaultService || 'Engineering & Design',
    location: 'Niger Delta (Offshore / Onshore)',
    budget: '₦500,000,000',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = addEnquiry({
      clientName: formData.name || 'Executive Representative',
      clientCompany: formData.company || 'Energy Operator',
      clientEmail: formData.email,
      clientPhone: formData.phone,
      title: formData.title,
      serviceCategory: formData.category,
      location: formData.location,
      budgetEstimate: formData.budget,
      description: formData.description,
      status: 'New',
      priority: 'High',
    });
    setAssignedRef(ref);
    setSubmitted(true);
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
        {/* Modal Header */}
        <div className="bg-[#071629] text-white p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#F4B323] text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>COMMERCIAL INTAKE DESK</span>
            </div>
            <h3 className="text-xl font-bold">
              {modalData?.title || 'Submit Project Enquiry & RFQ'}
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#071629] mb-1">
              Enquiry Registered Successfully
            </h4>
            <p className="text-xs text-[#64748B] mb-4">
              Your technical submission has been assigned tracking reference:
            </p>
            <div className="inline-block bg-[#071629] text-[#F4B323] font-mono font-bold text-sm px-4 py-2 rounded mb-6">
              {assignedRef}
            </div>
            <p className="text-xs text-[#94A3B8] mb-6">
              Our engineering team has been notified. Live status updates will reflect in your operations dashboard.
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-2.5 bg-[#071629] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#153C65]"
            >
              Return to Workspace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Company Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. SEPLAT Energy / Chevron"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629] focus:bg-white focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Contact Person *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629] focus:bg-white focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Project Scope Title *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Gas Dehydration Skid Fabrication"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629] focus:bg-white focus:border-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Service Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-9 px-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
                >
                  <option>Engineering & Design</option>
                  <option>Procurement & Supply</option>
                  <option>Project Services</option>
                  <option>Asset Integrity</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                  Estimated Capex
                </label>
                <input
                  type="text"
                  placeholder="₦500,000,000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-mono text-[#071629]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Detailed Scope of Requirements *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe engineering specifications, pressure ratings, location and delivery deadline..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629] resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Send className="w-4 h-4 text-[#F4B323]" />
                <span>Submit RFQ to Tendering Desk</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

