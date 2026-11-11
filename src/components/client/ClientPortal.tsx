import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Brand } from '../shared/Brand';
import { 
  Plus, 
  MessageSquare, 
  FileText, 
  Upload, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Download, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2,
  ExternalLink,
  Briefcase
} from 'lucide-react';

export const ClientPortal: React.FC = () => {
  const { enquiries, currentUser, openModal, setSurface } = usePlatform();
  const [activeTab, setActiveTab] = useState<'requests' | 'documents' | 'quotations'>('requests');

  // Filter enquiries relevant to this client or all demo
  const clientRequests = enquiries;

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col text-[#071629]">
      {/* Client Header */}
      <header className="h-[76px] bg-white border-b border-[#E2E8F0] px-6 sm:px-12 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <Brand onClick={() => setSurface('corporate')} />

        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-[#64748B]">
          <button 
            onClick={() => setActiveTab('requests')}
            className={`py-2 border-b-2 transition-colors ${activeTab === 'requests' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent hover:text-[#071629]'}`}
          >
            My Project Enquiries
          </button>
          <button 
            onClick={() => setActiveTab('quotations')}
            className={`py-2 border-b-2 transition-colors ${activeTab === 'quotations' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent hover:text-[#071629]'}`}
          >
            Commercial Quotations
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`py-2 border-b-2 transition-colors ${activeTab === 'documents' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent hover:text-[#071629]'}`}
          >
            Technical Vault
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#10B981] text-white font-bold text-xs flex items-center justify-center">
              {currentUser.initials}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="text-xs font-bold text-[#071629] block">{currentUser.organization}</span>
              <span className="text-[10px] text-[#64748B]">{currentUser.name}</span>
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
              className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
            >
              <span>Corporate Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Client Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10 space-y-8">
        {/* Welcome Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#2563EB] uppercase tracking-[0.2em] mb-1">
              <span>CLIENT OPERATIONS WORKSPACE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
              Welcome back, {currentUser.name.split(' ')[0]}.
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Submit project scopes, exchange engineering drawings and track tender milestones with KES.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal('new-enquiry')}
              className="h-10 px-5 bg-[#071629] hover:bg-[#153C65] text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#F4B323]" />
              <span>Submit Project Enquiry</span>
            </button>
          </div>
        </div>

        {/* Quick Action Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => openModal('new-enquiry')}
            className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#071629] group-hover:text-[#2563EB] transition-colors">
                  Submit New Scope
                </h4>
                <p className="text-xs text-[#64748B]">Provide requirements & drawings</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#2563EB] transform group-hover:translate-x-1 transition-all" />
          </div>

          <div
            onClick={() => openModal('request-quotation')}
            className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm hover:border-[#F4B323] hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#071629] group-hover:text-[#D97706] transition-colors">
                  Request Quotation
                </h4>
                <p className="text-xs text-[#64748B]">Procurement & supply pricing</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#D97706] transform group-hover:translate-x-1 transition-all" />
          </div>

          <div
            onClick={() => openModal('upload-document')}
            className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm hover:border-[#10B981] hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#071629] group-hover:text-[#059669] transition-colors">
                  Upload Drawings
                </h4>
                <p className="text-xs text-[#64748B]">Share DWG, P&ID and specs</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#059669] transform group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Requests & Account Manager Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Client Requests Table (8 Cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-[#DFE6EF] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#071629]">
                  Active Enquiries & RFQ Tenders
                </h3>
                <p className="text-xs text-[#64748B]">Live status tracking on your company's submittals</p>
              </div>
              <span className="text-xs font-bold text-[#2563EB]">
                {clientRequests.length} Requests Active
              </span>
            </div>

            <div className="divide-y divide-[#F1F5F9]">
              {clientRequests.map((req) => (
                <div key={req.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F8FAFC] p-2 rounded-lg transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#2563EB]">
                        {req.referenceNo}
                      </span>
                      <span className="text-[10px] bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded font-semibold">
                        {req.serviceCategory}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#071629] mt-0.5">
                      {req.title}
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">
                      {req.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-shrink-0">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                      {req.status}
                    </span>
                    <button
                      onClick={() => openModal('enquiry-detail', req)}
                      className="text-xs font-bold text-[#2563EB] hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated KES Account Representative (4 Cols) */}
          <div className="lg:col-span-4 bg-[#071629] text-white p-6 rounded-xl border border-[#1E3A5F] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#F4B323] text-[10px] font-bold uppercase tracking-widest mb-4">
                <span>DEDICATED KEY ACCOUNT MANAGER</span>
              </div>

              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-full bg-[#F4B323] text-[#071629] font-black text-sm flex items-center justify-center">
                  NO
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Nneka Okoli</h4>
                  <p className="text-xs text-[#94A3B8]">Senior Client Services Manager</p>
                </div>
              </div>

              <p className="text-xs text-[#CBD5E1] leading-relaxed mb-6 font-light">
                Assigned to manage all communications, technical clarification meetings, and formal contract drafting for your organization.
              </p>

              <div className="space-y-2.5 text-xs text-[#94A3B8] border-t border-white/10 pt-4 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#F4B323]" />
                  <span>nneka.okoli@kesenergy.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F4B323]" />
                  <span>+234 1 270 4402 (Direct Line)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Avg Response: &lt; 2 Business Hours</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0B1F38] p-3.5 rounded-lg border border-[#1E3A5F] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#10B981] flex-shrink-0" />
              <div className="text-[11px] text-[#CBD5E1]">
                <strong className="block text-white">Enterprise Data Assurance</strong>
                Drawings are strictly encrypted & non-disclosed.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

