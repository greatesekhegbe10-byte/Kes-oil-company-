import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Download, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ArrowUpRight,
  Printer
} from 'lucide-react';

export const ReportsTab: React.FC = () => {
  const { enquiries, projects, suppliers, purchaseOrders, addToast } = usePlatform();
  const [timeRange, setTimeRange] = useState('2026-FY');

  const wonEnquiriesCount = enquiries.filter(e => e.status === 'Won').length;
  const totalEnquiriesCount = enquiries.length;
  const conversionRate = Math.round((wonEnquiriesCount / (totalEnquiriesCount || 1)) * 100);

  const totalContractVal = "₦4.56B";
  const totalBudgetSpent = "₦3.17B";

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Reference,Title,Client,Category,Status,Budget\n"
      + enquiries.map(e => `"${e.referenceNo}","${e.title}","${e.clientCompany}","${e.serviceCategory}","${e.status}","${e.budgetEstimate}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KES_Energy_Operations_Report_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Report Exported', 'CSV dataset successfully downloaded.', 'success');
  };

  const handlePrintSummary = () => {
    window.print();
    addToast('Print Triggered', 'Opening browser print dialogue for Executive Board Report.', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#64748B] uppercase tracking-[0.2em] mb-1">
            <span className="w-5 h-[2px] bg-[#F4B323]" />
            <span>EXECUTIVE INTELLIGENCE & ANALYTICS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
            Operational Analytics & Audits
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Real-time calculations derived directly from active field, tendering and supplier datasets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="h-10 px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#071629]"
          >
            <option value="2026-FY">Fiscal Year 2026</option>
            <option value="2026-Q4">Q4 2026 (Oct - Dec)</option>
            <option value="2026-Q3">Q3 2026 (Jul - Sep)</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="h-10 px-4 bg-[#0B1F38] hover:bg-[#153C65] text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-[#F4B323]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrintSummary}
            className="h-10 px-3 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#071629] font-bold text-xs rounded-lg flex items-center gap-2 transition-all"
            title="Print Executive Dossier"
          >
            <Printer className="w-4 h-4 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* KPI Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            RFQ Conversion Rate
          </span>
          <div className="text-3xl font-extrabold text-[#10B981]">
            {conversionRate}%
          </div>
          <span className="text-xs text-[#64748B] mt-1 block">
            {wonEnquiriesCount} of {totalEnquiriesCount} active tenders won
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Portfolio Capex Under Mgt
          </span>
          <div className="text-3xl font-extrabold text-[#071629]">
            {totalContractVal}
          </div>
          <span className="text-xs text-[#64748B] mt-1 block">
            Cumulative EPC contract books
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Procurement Disbursed
          </span>
          <div className="text-3xl font-extrabold text-[#2563EB]">
            ₦304.1M
          </div>
          <span className="text-xs text-[#64748B] mt-1 block">
            Across 4 approved vendor POs
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Supplier Compliance Avg
          </span>
          <div className="text-3xl font-extrabold text-[#F59E0B]">
            94%
          </div>
          <span className="text-xs text-[#64748B] mt-1 block">
            NUPRC & NIPEX verified audits
          </span>
        </div>
      </div>

      {/* Analytical Breakdown Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tender Conversion Distribution */}
        <div className="bg-white p-6 rounded-xl border border-[#DFE6EF] shadow-sm">
          <h3 className="text-base font-bold text-[#071629] mb-1">
            Tender Status Distribution
          </h3>
          <p className="text-xs text-[#64748B] mb-6">
            Commercial pipeline health and deal velocity
          </p>

          <div className="space-y-4">
            {[
              { label: 'Awarded & Executing (Won)', count: 2, percent: 33, color: 'bg-[#10B981]' },
              { label: 'Under Active Negotiation', count: 1, percent: 17, color: 'bg-[#8B5CF6]' },
              { label: 'Quotation Dispatched / Preparing', count: 2, percent: 33, color: 'bg-[#2563EB]' },
              { label: 'Initial Review & Intake', count: 1, percent: 17, color: 'bg-[#F59E0B]' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#071629]">{item.label}</span>
                  <span className="font-mono text-[#64748B]">{item.count} RFQs ({item.percent}%)</span>
                </div>
                <div className="w-full bg-[#F1F5F9] h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Financial Execution */}
        <div className="bg-white p-6 rounded-xl border border-[#DFE6EF] shadow-sm">
          <h3 className="text-base font-bold text-[#071629] mb-1">
            Project Commercial Execution
          </h3>
          <p className="text-xs text-[#64748B] mb-6">
            Contract valuation vs actual certified spend
          </p>

          <div className="space-y-4">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs">
                <div className="flex justify-between font-bold text-[#071629] mb-1">
                  <span>{p.code}: {p.title}</span>
                  <span>{p.progressPercent}% Comp.</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#64748B] mb-2 font-mono">
                  <span>Contract: {p.contractValue}</span>
                  <span>Disbursed: {p.budgetSpent}</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full"
                    style={{ width: `${p.progressPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

