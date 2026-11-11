import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Plus, 
  Calendar, 
  ChevronDown, 
  ArrowRight, 
  CheckCircle2, 
  Circle,
  Briefcase, 
  FileText, 
  HardHat, 
  Users, 
  MoreHorizontal,
  Mail,
  Phone,
  Check
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { 
    openModal, 
    setActiveManagementTab, 
    setSurface 
  } = usePlatform();

  // 5 exact projects from screenshot
  const projects = [
    {
      id: 'prj-01',
      name: 'Delta Energy Facility',
      manager: 'Engr. Tunde A.',
      managerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=150&q=80',
      progress: 78,
      status: 'On Track',
      deadline: 'Dec 15, 2026',
      badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    },
    {
      id: 'prj-02',
      name: 'Rivers Refinery Upgrade',
      manager: 'Engr. Amaka E.',
      managerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=150&q=80',
      progress: 45,
      status: 'In Progress',
      deadline: 'Dec 28, 2026',
      badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200'
    },
    {
      id: 'prj-03',
      name: 'Lagos Pipeline Expansion',
      manager: 'Engr. David K.',
      managerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=150&q=80',
      progress: 92,
      status: 'On Track',
      deadline: 'Nov 30, 2026',
      badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    },
    {
      id: 'prj-04',
      name: 'Abuja Power Project',
      manager: 'Engr. Chioma U.',
      managerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=150&q=80',
      progress: 30,
      status: 'Planning',
      deadline: 'Jan 20, 2027',
      badgeClass: 'bg-blue-50 text-blue-700 border border-blue-200'
    },
    {
      id: 'prj-05',
      name: 'Port Harcourt Gas Plant',
      manager: 'Engr. Samuel O.',
      managerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=150&q=80',
      progress: 65,
      status: 'In Progress',
      deadline: 'Jan 15, 2027',
      badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200'
    }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Controls Row: Date Picker & + New Enquiry Button */}
      <div className="flex items-center justify-end gap-3">
        <button className="h-9 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2 shadow-xs transition-colors">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Mon, Nov 10, 2026</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        <button
          onClick={() => openModal('new-enquiry')}
          className="h-9 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>New Enquiry</span>
        </button>
      </div>

      {/* OPERATIONS HERO BANNER */}
      <div className="relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[240px] flex items-center p-6 sm:p-10 text-white shadow-lg bg-[#071629]">
        {/* Illuminated night refinery background */}
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=85"
          alt="Refinery infrastructure at dusk"
          className="absolute inset-0 w-full h-full object-cover object-right opacity-60 mix-blend-luminosity brightness-95"
        />

        {/* Deep rich gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #071629 0%, #071629F2 42%, #07162999 75%, #07162940 100%)'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white mb-2 leading-tight">
              Engineering that<br />
              keeps <span className="text-[#38BDF8]">energy moving.</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-5 max-w-lg">
              End-to-end engineering, procurement, and construction management.
            </p>

            <button
              onClick={() => openModal('new-enquiry')}
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all group"
            >
              <span>Start an Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 3 Value Points on Right with Blue Circle Checkmarks */}
          <div className="flex flex-col gap-3 md:pr-4">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">
                World-Class Engineering
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">
                Reliable Project Delivery
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">
                Sustainable Energy Solutions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 STAT KPI CARDS WITH CIRCULAR ICONS & SPARKLINE WAVES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Enquiries */}
        <div 
          onClick={() => setActiveManagementTab('Enquiries & RFQs')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-[#2563EB] transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">248</span>
                <span className="text-[11px] font-bold text-emerald-600">↑ 12%</span>
              </div>
              <div className="text-xs font-medium text-slate-500">Total Enquiries</div>
            </div>
          </div>

          {/* Blue Sparkline SVG */}
          <div className="w-20 h-10 flex-shrink-0">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path
                d="M 5 30 Q 25 15, 50 25 T 95 10"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div 
          onClick={() => setActiveManagementTab('Projects')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-purple-500 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9333EA] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">18</span>
                <span className="text-[11px] font-bold text-emerald-600">↑ 8%</span>
              </div>
              <div className="text-xs font-medium text-slate-500">Active Projects</div>
            </div>
          </div>

          {/* Purple Sparkline SVG */}
          <div className="w-20 h-10 flex-shrink-0">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path
                d="M 5 28 Q 30 35, 55 18 T 95 12"
                fill="none"
                stroke="#9333EA"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: Pending Quotations */}
        <div 
          onClick={() => setActiveManagementTab('Enquiries & RFQs')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">42</span>
                <span className="text-[11px] font-bold text-emerald-600">↑ 15%</span>
              </div>
              <div className="text-xs font-medium text-slate-500">Pending Quotations</div>
            </div>
          </div>

          {/* Green Sparkline SVG */}
          <div className="w-20 h-10 flex-shrink-0">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path
                d="M 5 26 Q 25 32, 50 18 T 95 8"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 4: Verified Suppliers */}
        <div 
          onClick={() => setActiveManagementTab('Suppliers')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-amber-500 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">125</span>
                <span className="text-[11px] font-bold text-emerald-600">↑ 10%</span>
              </div>
              <div className="text-xs font-medium text-slate-500">Verified Suppliers</div>
            </div>
          </div>

          {/* Amber Sparkline SVG */}
          <div className="w-20 h-10 flex-shrink-0">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path
                d="M 5 28 Q 28 14, 55 24 T 95 10"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: PROJECT PORTFOLIO TABLE (65%) & KEY MILESTONES (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: PROJECT PORTFOLIO (8 COLS) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">Project Portfolio</h3>
            </div>
            <button
              onClick={() => setActiveManagementTab('Projects')}
              className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Portfolio Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium">
                  <th className="pb-2.5 font-medium">Project Name</th>
                  <th className="pb-2.5 font-medium">Project Manager</th>
                  <th className="pb-2.5 font-medium">Progress</th>
                  <th className="pb-2.5 font-medium">Status</th>
                  <th className="pb-2.5 font-medium">Deadline</th>
                  <th className="pb-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Project Name + Thumbnail */}
                    <td className="py-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.thumbnail}
                          alt={p.name}
                          className="w-9 h-7 rounded object-cover border border-slate-200 flex-shrink-0"
                        />
                        <span className="truncate max-w-[160px] sm:max-w-[200px]">{p.name}</span>
                      </div>
                    </td>

                    {/* Project Manager + Avatar */}
                    <td className="py-3 text-slate-700">
                      <div className="flex items-center gap-2">
                        <img
                          src={p.managerAvatar}
                          alt={p.manager}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200 flex-shrink-0"
                        />
                        <span className="truncate">{p.manager}</span>
                      </div>
                    </td>

                    {/* Progress Bar + % */}
                    <td className="py-3">
                      <div className="flex items-center gap-2.5 min-w-[100px]">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-[#2563EB] h-1.5 rounded-full" 
                            style={{ width: `${p.progress}%` }} 
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600">{p.progress}%</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold ${p.badgeClass}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {p.status}
                      </span>
                    </td>

                    {/* Deadline */}
                    <td className="py-3 text-slate-600 text-[11px] whitespace-nowrap">
                      {p.deadline}
                    </td>

                    {/* Actions */}
                    <td className="py-3 text-right">
                      <button 
                        onClick={() => setActiveManagementTab('Projects')}
                        className="text-slate-400 hover:text-slate-700 p-1"
                        title="Options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: KEY MILESTONES (4 COLS) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">Key Milestones</h3>
              </div>
              <button
                onClick={() => setActiveManagementTab('Projects')}
                className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <span>View Timeline</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Vertical Stepper List */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
              {/* Milestone 1: Nov 5 - Completed */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center ring-4 ring-white">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Nov 5, 2026</div>
                <div className="text-xs font-bold text-slate-900">Project Kickoff Meeting</div>
                <div className="text-[11px] text-slate-500">Delta Energy Facility</div>
              </div>

              {/* Milestone 2: Nov 12 - Completed */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center ring-4 ring-white">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Nov 12, 2026</div>
                <div className="text-xs font-bold text-slate-900">Technical Review</div>
                <div className="text-[11px] text-slate-500">Rivers Refinery Upgrade</div>
              </div>

              {/* Milestone 3: Dec 1 - Active / Upcoming */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 border-[#2563EB] bg-white flex items-center justify-center ring-4 ring-white">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Dec 1, 2026</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Submit Final Quotation</span>
                  <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700">
                    Upcoming
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">Lagos Pipeline Expansion</div>
              </div>

              {/* Milestone 4: Dec 15 - Pending */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 border-slate-300 bg-slate-100 flex items-center justify-center ring-4 ring-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Dec 15, 2026</div>
                <div className="text-xs font-bold text-slate-700">Project Approval</div>
                <div className="text-[11px] text-slate-500">Abuja Power Project</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: 3 CARDS (REGISTER AS SUPPLIER, OUR TRUSTED PARTNERS, GET IN TOUCH) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CARD 1: REGISTER AS A SUPPLIER */}
        <div className="rounded-xl overflow-hidden p-5 relative bg-gradient-to-r from-[#1D4ED8] via-[#1E40AF] to-[#0F172A] text-white flex flex-col justify-between shadow-xs">
          {/* Subtle Handshake Overlay */}
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80"
            alt="Partnership handshake"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          />

          <div className="relative z-10">
            <div className="w-9 h-9 rounded-full bg-blue-500/30 flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-sm font-bold text-white">Register as a Supplier</h4>
            <p className="text-xs text-blue-100 mt-0.5">Partner with KES and grow your business.</p>
          </div>

          <div className="relative z-10 mt-5">
            <button
              onClick={() => setSurface('supplier')}
              className="bg-white hover:bg-slate-100 text-[#0F172A] text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: OUR TRUSTED PARTNERS */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
              Our Trusted Partners
            </h4>
            
            {/* Logos Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-2">
              <span className="text-xs font-extrabold text-slate-700 tracking-tight">Schneider</span>
              <span className="text-xs font-extrabold text-slate-700 tracking-wider">Honeywell</span>
              <span className="text-xs font-black text-slate-800 tracking-widest">SIEMENS</span>
              <span className="text-sm font-black text-slate-900 tracking-tight">ABB</span>
              <span className="inline-flex items-center gap-1 border border-slate-300 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                ISO 9001
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
            Certified compliant OEM equipment and integration partners.
          </div>
        </div>

        {/* CARD 3: GET IN TOUCH */}
        <div className="bg-[#F0F6FE] rounded-xl border border-blue-100 shadow-xs p-5 relative overflow-hidden flex flex-col justify-between">
          {/* Power grid towers image at sunset */}
          <img
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=400&q=80"
            alt="Power transmission grid"
            className="absolute right-0 top-0 bottom-0 w-1/3 object-cover opacity-35 mix-blend-multiply"
          />

          <div className="relative z-10 max-w-[70%]">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Get in Touch
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>info@kesenergy.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>+234 803 555 0123</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-5">
            <button
              onClick={() => openModal('contact-sales')}
              className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
