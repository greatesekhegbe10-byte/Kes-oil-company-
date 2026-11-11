import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Brand } from '../shared/Brand';
import { 
  Building, 
  Package, 
  ShieldCheck, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Plus,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const SupplierPortal: React.FC = () => {
  const { purchaseOrders, currentUser, setSurface, openModal, addToast } = usePlatform();

  // Find POs assigned to current supplier or Atlantic Valve
  const vendorPOs = purchaseOrders;

  const handleSubmitBid = () => {
    addToast('Bid Submitted', 'Your commercial quotation has been transmitted to KES Procurement.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col text-[#071629]">
      {/* Header */}
      <header className="h-[76px] bg-white border-b border-[#E2E8F0] px-6 sm:px-12 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <Brand onClick={() => setSurface('corporate')} />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white font-bold text-xs flex items-center justify-center">
              {currentUser.initials}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="text-xs font-bold text-[#071629] block">{currentUser.organization}</span>
              <span className="text-[10px] text-[#64748B]">Pre-Qualified Vendor</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-[#E2E8F0] pl-3">
            <button
              onClick={() => setSurface('management')}
              className="text-xs font-semibold text-slate-700 hover:text-[#2563EB] px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 transition-colors"
            >
              Operations HQ
            </button>
            <button
              onClick={() => setSurface('corporate')}
              className="text-xs font-semibold text-[#8B5CF6] hover:underline flex items-center gap-1"
            >
              <span>Corporate Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10 space-y-8">
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#8B5CF6] uppercase tracking-[0.2em] mb-1">
              <span>VERIFIED VENDOR COMMAND</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
              Vendor Operations Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Track purchase orders, respond to sourcing invitations and upload annual compliance renewals.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold bg-[#ECFDF5] text-[#059669] px-3.5 py-1.5 rounded-full border border-[#A7F3D0]">
            <ShieldCheck className="w-4 h-4" />
            <span>NIPEX & ISO 9001 Audited: 98% Compliance</span>
          </div>
        </div>

        {/* Vendor Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
            <span className="text-xs font-semibold text-[#64748B]">Active Purchase Orders</span>
            <div className="text-3xl font-extrabold text-[#071629] mt-1">{vendorPOs.length} Orders</div>
            <span className="text-[11px] text-[#10B981] font-semibold mt-1 block">₦183.2M Contract Value</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
            <span className="text-xs font-semibold text-[#64748B]">Open Sourcing Tenders</span>
            <div className="text-3xl font-extrabold text-[#8B5CF6] mt-1">2 Invitations</div>
            <span className="text-[11px] text-[#64748B] font-semibold mt-1 block">Tender closure in 4 days</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
            <span className="text-xs font-semibold text-[#64748B]">Quality Delivery Score</span>
            <div className="text-3xl font-extrabold text-[#10B981] mt-1">4.9 / 5.0</div>
            <span className="text-[11px] text-[#10B981] font-semibold mt-1 block">Zero rejection rate</span>
          </div>
        </div>

        {/* Assigned POs & Open Tenders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active POs */}
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-[#DFE6EF] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#071629]">
                  Assigned Purchase Orders (Execution & Delivery)
                </h3>
                <p className="text-xs text-[#64748B]">Purchase orders awarded to your company</p>
              </div>
            </div>

            <div className="divide-y divide-[#F1F5F9]">
              {vendorPOs.map((po) => (
                <div key={po.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#2563EB]">
                      #{po.poNumber} · {po.projectName}
                    </span>
                    <h4 className="text-sm font-bold text-[#071629] mt-0.5">
                      {po.title}
                    </h4>
                    <div className="text-xs text-[#64748B] mt-0.5">
                      Delivery Target: <strong className="text-[#071629]">{po.deliveryDueDate}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-[#071629]">{po.amount}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8]">
                      {po.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Tender Invitation */}
          <div className="lg:col-span-4 bg-[#071629] text-white p-6 rounded-xl border border-[#1E3A5F] shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#F4B323] uppercase tracking-wider block mb-2">
                OPEN TENDER INVITATION
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Escravos Riser Valve Flanges (API 6D)
              </h3>
              <p className="text-xs text-[#CBD5E1] leading-relaxed mb-4">
                KES Engineering invites verified bids for 24-inch Class 900 duplex stainless steel valve bodies.
              </p>

              <div className="p-3 bg-[#0B1F38] rounded-lg border border-[#1E3A5F] text-xs space-y-1.5 mb-6">
                <div>• Delivery Port: <strong>Warri Jetty, Delta State</strong></div>
                <div>• Spec: <strong>ASTM A182 F51 Duplex</strong></div>
                <div>• Closing Date: <strong>18 Nov 2026 (17:00 WAT)</strong></div>
              </div>
            </div>

            <button
              onClick={handleSubmitBid}
              className="w-full py-2.5 bg-[#F4B323] hover:bg-[#FFC947] text-[#071629] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md"
            >
              Submit Commercial Quotation
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

