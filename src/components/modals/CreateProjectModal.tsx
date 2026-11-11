import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Briefcase, X, Check } from 'lucide-react';
import { ProjectPhase } from '../../types';

export const CreateProjectModal: React.FC = () => {
  const { closeModal, addProject, availableUsers } = usePlatform();

  const [formData, setFormData] = useState({
    title: '',
    client: 'SEPLAT Energy',
    location: 'Niger Delta (Delta State)',
    manager: 'Adebayo Ogunleye',
    contractValue: '₦1,250,000,000',
    phase: 'FEED Design' as ProjectPhase,
    startDate: new Date().toISOString().split('T')[0],
    targetEndDate: '2027-06-30',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      title: formData.title,
      client: formData.client,
      location: formData.location,
      manager: formData.manager,
      team: [formData.manager, 'Chinedu Okafor', 'Folake Adeleke'],
      contractValue: formData.contractValue,
      budgetSpent: '₦0',
      phase: formData.phase,
      health: 'On Track',
      progressPercent: 5,
      startDate: formData.startDate,
      targetEndDate: formData.targetEndDate,
      description: formData.description,
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Kickoff & Baseline HAZID', date: formData.startDate, completed: true, workstream: 'Planning' },
        { id: `m-${Date.now()}-2`, title: 'Detailed Design Approval', date: '2026-12-15', completed: false, workstream: 'Engineering' },
        { id: `m-${Date.now()}-3`, title: 'Procurement PO Issuance', date: '2027-02-28', completed: false, workstream: 'Procurement' },
        { id: `m-${Date.now()}-4`, title: 'Field Installation & Handover', date: formData.targetEndDate, completed: false, workstream: 'Close-out' },
      ],
      tasks: [
        { id: `t-${Date.now()}-1`, title: 'Mobilize site engineering team', assignee: formData.manager, dueDate: '2026-11-20', status: 'Pending', priority: 'High' },
      ],
      issues: [],
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
              <span>PROJECT PORTFOLIO COMMAND</span>
            </div>
            <h3 className="text-xl font-bold">Initialize New EPC Project</h3>
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
              Project Title *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Escravos Trunkline Replacement Phase 2"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Client Organization *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Chevron Nigeria"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Contract Value *
              </label>
              <input
                required
                type="text"
                placeholder="₦1,250,000,000"
                value={formData.contractValue}
                onChange={(e) => setFormData({ ...formData, contractValue: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-mono text-[#071629]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Lead Project Manager *
              </label>
              <select
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className="w-full h-9 px-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
              >
                <option>Adebayo Ogunleye</option>
                <option>Emeka Okoro</option>
                <option>Dr. Tari Lawson</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Initial Phase *
              </label>
              <select
                value={formData.phase}
                onChange={(e) => setFormData({ ...formData, phase: e.target.value as ProjectPhase })}
                className="w-full h-9 px-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs font-semibold text-[#071629]"
              >
                <option>Planning</option>
                <option>FEED Design</option>
                <option>Engineering</option>
                <option>Procurement</option>
                <option>Fabrication</option>
                <option>Installation</option>
                <option>Commissioning</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
                Target Completion Date
              </label>
              <input
                type="date"
                value={formData.targetEndDate}
                onChange={(e) => setFormData({ ...formData, targetEndDate: e.target.value })}
                className="w-full h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs text-[#071629]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#071629] uppercase tracking-wider mb-1">
              Field Location & Scope Summary
            </label>
            <textarea
              rows={3}
              placeholder="Provide field coordinates, platform name, and main deliverables..."
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
              <Briefcase className="w-4 h-4 text-[#F4B323]" />
              <span>Launch & Register Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

