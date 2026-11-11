import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck, X } from 'lucide-react';

export const RegisterSupplierModal: React.FC = () => {
  const { closeModal, addSupplier } = usePlatform();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Mechanical Equipment & Valves',
    contactPerson: '',
    email: '',
    phone: '',
    location: 'Port Harcourt, Rivers State',
    nipexRegistered: true,
    isoCertified: true,
    specialties: 'API Valves, High-Pressure Piping, Flanges',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSupplier({
      name: formData.name,
      category: formData.category,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      verificationStatus: 'Under Review',
      complianceScore: 92,
      nipexRegistered: formData.nipexRegistered,
      isoCertified: formData.isoCertified,
      activeContracts: 0,
      rating: 4.5,
      lastAuditDate: new Date().toISOString().split('T')[0],
      specialties: formData.specialties.split(',').map(s => s.trim()),
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
              <span>SUPPLIER PRE-QUALIFICATION</span>
            </div>
            <h3 className="text-xl font-bold">Register Vendor Company</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
              Company Legal Name *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Niger Delta Subsea Solutions Ltd"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Vendor Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-9 px-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
              >
                <option>Mechanical Equipment & Valves</option>
                <option>Heavy Structural Fabrication</option>
                <option>Instrumentation & Subsea</option>
                <option>Marine Logistics & Heavy Lift</option>
                <option>HSE Equipment & Fire Suppression</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Operational Base *
              </label>
              <input
                required
                type="text"
                placeholder="Port Harcourt / Warri / Lagos"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Contact Person *
              </label>
              <input
                required
                type="text"
                placeholder="Full Name"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Work Email *
              </label>
              <input
                required
                type="email"
                placeholder="procurement@vendor.ng"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
              Specialties (Comma Separated)
            </label>
            <input
              type="text"
              placeholder="e.g. API 6D, Cryogenic Valves, Hydrotest"
              value={formData.specialties}
              onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
              className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
            />
          </div>

          <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#071629] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nipexRegistered}
                onChange={(e) => setFormData({ ...formData, nipexRegistered: e.target.checked })}
                className="rounded text-[#2563EB]"
              />
              <span>Registered on Nigerian NIPEX Joint Qualification Scheme (JQS)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#071629] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isoCertified}
                onChange={(e) => setFormData({ ...formData, isoCertified: e.target.checked })}
                className="rounded text-[#2563EB]"
              />
              <span>ISO 9001:2015 Quality Management Certified</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-[#F4B323]" />
              <span>Submit for Pre-Qualification Audit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

