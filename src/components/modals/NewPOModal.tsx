import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Package, X } from 'lucide-react';

export const NewPOModal: React.FC = () => {
  const { closeModal, addPurchaseOrder, suppliers, projects, currentUser, modalData } = usePlatform();

  const [formData, setFormData] = useState({
    title: modalData?.title || 'Industrial Process Valves & Spools',
    supplierName: modalData?.defaultSupplier || (suppliers[0]?.name || 'Atlantic Valve & Controls Ltd'),
    projectName: projects[0]?.title || 'OML-42 Flowstation Modernisation',
    amount: modalData?.amount || '₦48,200,000',
    deliveryDueDate: '2026-12-15',
    itemDescription: 'API 610 Heavy Duty Industrial Valves Assembly',
    quantity: 4,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find(s => s.name === formData.supplierName) || suppliers[0];
    const prj = projects.find(p => p.title === formData.projectName) || projects[0];

    addPurchaseOrder({
      title: formData.title,
      supplierName: formData.supplierName,
      supplierId: sup.id,
      projectId: prj.id,
      projectName: prj.title,
      amount: formData.amount,
      deliveryDueDate: formData.deliveryDueDate,
      status: 'Pending Approval',
      requestedBy: currentUser.name,
      items: [
        {
          description: formData.itemDescription,
          quantity: formData.quantity,
          unitPrice: '₦12,050,000',
          total: formData.amount,
        },
      ],
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
              <span>PROCUREMENT & SUPPLY COMMAND</span>
            </div>
            <h3 className="text-xl font-bold">Issue Purchase Order</h3>
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
              PO Title / Scope *
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Vendor / Supplier *
              </label>
              <select
                value={formData.supplierName}
                onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                className="w-full h-9 px-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
              >
                {suppliers.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Assigned Project *
              </label>
              <select
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="w-full h-9 px-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.title}>{p.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Total Value (NGN) *
              </label>
              <input
                required
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-mono font-bold text-[#071629]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Delivery Target Date *
              </label>
              <input
                required
                type="date"
                value={formData.deliveryDueDate}
                onChange={(e) => setFormData({ ...formData, deliveryDueDate: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
              Primary Line Item Description
            </label>
            <input
              type="text"
              value={formData.itemDescription}
              onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
              className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Package className="w-4 h-4 text-[#F4B323]" />
              <span>Generate Purchase Order Document</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

