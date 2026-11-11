import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { PurchaseOrder, PurchaseOrderStatus } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  FileCheck, 
  Building, 
  ChevronRight,
  TrendingUp,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const ProcurementTab: React.FC = () => {
  const { purchaseOrders, openModal, updatePOStatus, currentUser } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

  const filteredPOs = purchaseOrders.filter((po) => {
    const matchesSearch =
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || po.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: PurchaseOrderStatus) => {
    switch (status) {
      case 'Draft':
        return 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]';
      case 'Pending Approval':
        return 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]';
      case 'Approved':
        return 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]';
      case 'In Transit':
        return 'bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]';
      case 'Delivered':
        return 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]';
      case 'Completed':
        return 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]';
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
            <span>STRATEGIC SOURCING & PROCUREMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
            Purchase Orders & Sourcing
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manage purchase requisitions, supplier quotation comparisons, and PO approvals.
          </p>
        </div>

        <button
          onClick={() => openModal('new-po')}
          className="h-10 px-5 bg-[#0B1F38] hover:bg-[#153C65] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-[#F4B323]" />
          <span>Issue New Purchase Order</span>
        </button>
      </div>

      {/* Sourcing Comparison Card (Direct Requirement: Phase 6 - Quotation Comparison) */}
      <div className="bg-white p-6 rounded-xl border border-[#DFE6EF] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#2563EB] uppercase tracking-wider mb-1">
              <span>ACTIVE PROCUREMENT COMPARISON MATRIX</span>
            </div>
            <h3 className="text-lg font-bold text-[#071629]">
              API 610 Heavy Duty Process Pumps Tender (Escravos & OML-42)
            </h3>
          </div>
          <span className="text-xs font-bold bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-full">
            3 Competing Bids
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Vendor 1 */}
          <div className="p-4 rounded-xl border-2 border-[#10B981] bg-[#F0FDF4]/30 relative flex flex-col justify-between">
            <div className="absolute top-3 right-3 bg-[#10B981] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
              RECOMMENDED
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#64748B]">BID-2026-041</span>
              <h4 className="text-sm font-bold text-[#071629] mt-0.5">Atlantic Valve & Controls</h4>
              <div className="text-2xl font-black text-[#071629] my-2">₦48,200,000</div>
              <ul className="text-xs space-y-1.5 text-[#334155] mb-4">
                <li>• Lead Time: <strong>4 Weeks</strong></li>
                <li>• Compliance: <strong>98% (NIPEX Audited)</strong></li>
                <li>• Warranty: <strong>24 Months OEM</strong></li>
              </ul>
            </div>
            <button
              onClick={() => openModal('new-po', { defaultSupplier: 'Atlantic Valve & Controls Ltd', amount: '₦48,200,000' })}
              className="w-full py-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs rounded transition-colors"
            >
              Award Contract & Generate PO
            </button>
          </div>

          {/* Vendor 2 */}
          <div className="p-4 rounded-xl border border-[#DFE6EF] bg-[#F8FAFC] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#64748B]">BID-2026-042</span>
              <h4 className="text-sm font-bold text-[#071629] mt-0.5">Westline Technical Services</h4>
              <div className="text-2xl font-black text-[#071629] my-2">₦52,400,000</div>
              <ul className="text-xs space-y-1.5 text-[#334155] mb-4">
                <li>• Lead Time: <strong>6 Weeks</strong></li>
                <li>• Compliance: <strong>82% (Reviewing)</strong></li>
                <li>• Warranty: <strong>12 Months</strong></li>
              </ul>
            </div>
            <button
              onClick={() => openModal('new-po', { defaultSupplier: 'Westline Technical Services', amount: '₦52,400,000' })}
              className="w-full py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#071629] font-bold text-xs rounded transition-colors"
            >
              Select Vendor
            </button>
          </div>

          {/* Vendor 3 */}
          <div className="p-4 rounded-xl border border-[#DFE6EF] bg-[#F8FAFC] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#64748B]">BID-2026-043</span>
              <h4 className="text-sm font-bold text-[#071629] mt-0.5">Niger Delta Marine Yards</h4>
              <div className="text-2xl font-black text-[#071629] my-2">₦49,800,000</div>
              <ul className="text-xs space-y-1.5 text-[#334155] mb-4">
                <li>• Lead Time: <strong>5.5 Weeks</strong></li>
                <li>• Compliance: <strong>94% (Verified)</strong></li>
                <li>• Warranty: <strong>18 Months</strong></li>
              </ul>
            </div>
            <button
              onClick={() => openModal('new-po', { defaultSupplier: 'Niger Delta Fabrication & Marine Yards', amount: '₦49,800,000' })}
              className="w-full py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#071629] font-bold text-xs rounded transition-colors"
            >
              Select Vendor
            </button>
          </div>
        </div>
      </div>

      {/* PO Table Header and Controls */}
      <div className="bg-white p-4 rounded-xl border border-[#DFE6EF] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search PO number, vendor or item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#071629]"
          >
            <option value="All">All PO Statuses</option>
            <option>Draft</option>
            <option>Pending Approval</option>
            <option>Approved</option>
            <option>In Transit</option>
            <option>Delivered</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white rounded-xl border border-[#DFE6EF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">PO Number & Item Scope</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4">Delivery Due</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#071629]">
              {filteredPOs.map((po) => (
                <tr
                  key={po.id}
                  onClick={() => setSelectedPO(po)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5">
                    <span className="font-mono text-[11px] font-bold text-[#2563EB] block">
                      #{po.poNumber}
                    </span>
                    <span className="font-bold text-sm text-[#071629] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {po.title}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-bold text-xs text-[#071629]">
                    {po.supplierName}
                  </td>

                  <td className="py-4 px-4 text-xs text-[#64748B]">
                    {po.projectName}
                  </td>

                  <td className="py-4 px-4 font-black text-sm text-[#071629]">
                    {po.amount}
                  </td>

                  <td className="py-4 px-4 text-xs font-mono text-[#64748B]">
                    {po.issueDate}
                  </td>

                  <td className="py-4 px-4 text-xs font-mono text-[#64748B]">
                    {po.deliveryDueDate}
                  </td>

                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${getStatusBadge(po.status)}`}>
                      {po.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPO(po);
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

      {/* PO Detail Drawer */}
      {selectedPO && (
        <div
          onClick={() => setSelectedPO(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div>
                  <span className="font-mono text-xs font-bold text-[#2563EB]">
                    Purchase Order #{selectedPO.poNumber}
                  </span>
                  <h3 className="text-xl font-bold text-[#071629] mt-0.5">
                    {selectedPO.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPO(null)}
                  className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] hover:text-[#071629] flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Status and Approval */}
              <div className="my-5 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">
                    Order Status
                  </span>
                  <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(selectedPO.status)}`}>
                    {selectedPO.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {selectedPO.status === 'Pending Approval' ? (
                    <button
                      onClick={() => {
                        updatePOStatus(selectedPO.id, 'Approved');
                        setSelectedPO({ ...selectedPO, status: 'Approved', approvedBy: currentUser.name });
                      }}
                      className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs rounded transition-colors shadow-sm"
                    >
                      Authorize & Approve PO
                    </button>
                  ) : (
                    <select
                      value={selectedPO.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as PurchaseOrderStatus;
                        updatePOStatus(selectedPO.id, newStatus);
                        setSelectedPO({ ...selectedPO, status: newStatus });
                      }}
                      className="h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-semibold"
                    >
                      <option>Draft</option>
                      <option>Pending Approval</option>
                      <option>Approved</option>
                      <option>In Transit</option>
                      <option>Delivered</option>
                      <option>Completed</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Commercial Specs */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Supplier Company</span>
                  <span className="font-bold text-[#071629] text-sm">{selectedPO.supplierName}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Assigned Project</span>
                  <span className="font-bold text-[#071629] text-sm">{selectedPO.projectName}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Requested By</span>
                  <span className="text-[#071629]">{selectedPO.requestedBy}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Executive Approver</span>
                  <span className="text-[#071629]">{selectedPO.approvedBy || 'Pending Executive Review'}</span>
                </div>
              </div>

              {/* Line Items Breakdown */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider mb-2">
                  Commercial Line Items
                </h4>
                <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold text-[10px] uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Item Description</th>
                        <th className="py-2.5 px-2">Qty</th>
                        <th className="py-2.5 px-3">Unit Price</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {selectedPO.items.map((item, i) => (
                        <tr key={i}>
                          <td className="py-2.5 px-3 font-semibold text-[#071629]">{item.description}</td>
                          <td className="py-2.5 px-2 text-center">{item.quantity}</td>
                          <td className="py-2.5 px-3 font-mono">{item.unitPrice}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-right">{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-[#F8FAFC] border-t border-[#E2E8F0] font-black">
                      <tr>
                        <td colSpan={3} className="py-2.5 px-3 text-right uppercase text-[10px] text-[#64748B]">Total Contract Value:</td>
                        <td className="py-2.5 px-3 text-right text-sm text-[#071629] font-black">{selectedPO.amount}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E8F0]">
              <button
                onClick={() => setSelectedPO(null)}
                className="w-full py-2.5 bg-[#071629] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#153C65] transition-colors"
              >
                Close Purchase Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

