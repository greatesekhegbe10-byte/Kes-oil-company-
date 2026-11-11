import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Project, ProjectHealth, ProjectPhase } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  TrendingUp, 
  User, 
  FileText,
  Layers,
  MapPin
} from 'lucide-react';

export const ProjectsTab: React.FC = () => {
  const { projects, openModal, toggleTask, addProjectTask } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<string>('All');
  const [healthFilter, setHealthFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPhase = phaseFilter === 'All' || p.phase === phaseFilter;
    const matchesHealth = healthFilter === 'All' || p.health === healthFilter;

    return matchesSearch && matchesPhase && matchesHealth;
  });

  const getHealthBadge = (health: ProjectHealth) => {
    switch (health) {
      case 'On Track':
        return 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]';
      case 'At Risk':
        return 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]';
      case 'Delayed':
        return 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !newTaskTitle) return;
    addProjectTask(
      selectedProject.id,
      newTaskTitle,
      newTaskAssignee || 'Project Engineer',
      new Date().toISOString().split('T')[0],
      'High'
    );
    setNewTaskTitle('');
    setNewTaskAssignee('');
    // refresh selected project
    const updated = projects.find(p => p.id === selectedProject.id);
    if (updated) setSelectedProject(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#64748B] uppercase tracking-[0.2em] mb-1">
            <span className="w-5 h-[2px] bg-[#F4B323]" />
            <span>PROJECT COMMAND & FIELD DELIVERY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071629] tracking-tight">
            Active Projects Command
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Monitor engineering milestones, fabrication schedules and commercial milestones.
          </p>
        </div>

        <button
          onClick={() => openModal('create-project')}
          className="h-10 px-5 bg-[#0B1F38] hover:bg-[#153C65] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-[#F4B323]" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Portfolio Contract Value
          </span>
          <div className="text-3xl font-extrabold text-[#071629]">
            ₦4.56B
          </div>
          <span className="text-xs text-[#64748B] mt-1 block">
            Across 18 active projects in Niger Delta & Deepwater
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            On-Schedule Performance
          </span>
          <div className="text-3xl font-extrabold text-[#10B981]">
            87%
          </div>
          <span className="text-xs text-[#10B981] font-bold mt-1 block flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +4.2% vs last month
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DFE6EF] shadow-sm">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Cumulative Safe Hours
          </span>
          <div className="text-3xl font-extrabold text-[#2563EB]">
            18,420
          </div>
          <span className="text-xs text-[#64748B] mt-1 block">
            2,106 engineering hours logged this month
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#DFE6EF] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search projects, clients, codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#071629] focus:bg-white focus:border-[#2563EB] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#071629]"
          >
            <option value="All">All Phases</option>
            <option>FEED Design</option>
            <option>Engineering</option>
            <option>Procurement</option>
            <option>Fabrication</option>
            <option>Installation</option>
            <option>Commissioning</option>
            <option>Close-out</option>
          </select>

          <select
            value={healthFilter}
            onChange={(e) => setHealthFilter(e.target.value)}
            className="h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#071629]"
          >
            <option value="All">All Health States</option>
            <option>On Track</option>
            <option>At Risk</option>
            <option>Delayed</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-[#DFE6EF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Project Code & Name</th>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Phase</th>
                <th className="py-3.5 px-4">Progress</th>
                <th className="py-3.5 px-4">Contract Value</th>
                <th className="py-3.5 px-4">Health</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#071629]">
              {filteredProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5">
                    <span className="font-mono text-[11px] font-bold text-[#64748B] block">
                      {p.code}
                    </span>
                    <span className="font-bold text-sm text-[#071629] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {p.title}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#F4B323]" />
                      {p.location}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-bold text-xs text-[#071629]">
                    {p.client}
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-block px-2.5 py-1 bg-[#F1F5F9] text-[#334155] rounded-md text-[10.5px] font-semibold">
                      {p.phase}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="w-32">
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span>{p.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            p.health === 'On Track'
                              ? 'bg-[#2563EB]'
                              : p.health === 'At Risk'
                              ? 'bg-[#F59E0B]'
                              : 'bg-[#EF4444]'
                          }`}
                          style={{ width: `${p.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-black text-sm text-[#071629]">
                      {p.contractValue}
                    </div>
                    <div className="text-[10px] text-[#64748B]">
                      Spent: {p.budgetSpent}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${getHealthBadge(p.health)}`}>
                      {p.health}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(p);
                      }}
                      className="p-1.5 text-[#64748B] hover:text-[#071629] hover:bg-[#E2E8F0] rounded-lg transition-colors"
                      title="Inspect Gantt & tasks"
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

      {/* Integrated Gantt-Style Timeline Visualization */}
      <div className="bg-white p-6 rounded-xl border border-[#DFE6EF] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#071629]">
              Integrated Project Lifecycle Timeline
            </h3>
            <p className="text-xs text-[#64748B]">
              Key workstreams across active operations portfolio
            </p>
          </div>
          <div className="text-xs font-semibold text-[#2563EB]">
            Q1 - Q4 Schedule
          </div>
        </div>

        <div className="border border-[#E2E8F0] rounded-lg p-4 bg-[#F8FAFC]">
          <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-[#64748B] pb-3 border-b border-[#E2E8F0]">
            <div className="col-span-4 uppercase tracking-wider">Workstream</div>
            <div className="col-span-8 grid grid-cols-5 text-center">
              <span>FEED / APR</span>
              <span>ENG / JUN</span>
              <span>PROC / AUG</span>
              <span>FAB / OCT</span>
              <span>COMM / DEC</span>
            </div>
          </div>

          <div className="space-y-3 pt-3">
            {[
              { stream: 'OML-42 Central Gas Compression', client: 'SEPLAT', left: '10%', width: '70%', color: 'bg-[#2563EB]' },
              { stream: 'Escravos 24" Subsea Riser Spools', client: 'Chevron', left: '25%', width: '55%', color: 'bg-[#10B981]' },
              { stream: 'Ogidigben Primary Substation FEED', client: 'NNPC Ltd', left: '5%', width: '45%', color: 'bg-[#F59E0B]' },
              { stream: 'Bonny Terminal Tank 3 Integrity', client: 'NLNG', left: '40%', width: '55%', color: 'bg-[#8B5CF6]' },
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center text-xs">
                <div className="col-span-4 font-semibold text-[#071629] truncate">
                  {item.stream}
                  <span className="text-[10px] text-[#64748B] block">{item.client}</span>
                </div>
                <div className="col-span-8 relative h-7 bg-white rounded border border-[#E2E8F0] flex items-center px-1">
                  <div
                    className={`h-5 rounded text-[10px] font-bold text-white flex items-center px-2 shadow-sm ${item.color}`}
                    style={{ marginLeft: item.left, width: item.width }}
                  >
                    Active Delivery
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Drawer */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div>
                  <span className="font-mono text-xs font-bold text-[#64748B]">
                    {selectedProject.code} · {selectedProject.client}
                  </span>
                  <h3 className="text-xl font-bold text-[#071629] mt-0.5">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] hover:text-[#071629] flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Status and Progress Bar */}
              <div className="my-5 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#071629]">
                    Execution Progress ({selectedProject.progressPercent}%)
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getHealthBadge(selectedProject.health)}`}>
                    {selectedProject.health}
                  </span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full transition-all duration-300"
                    style={{ width: `${selectedProject.progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#64748B] mt-2">
                  <span>Start: {selectedProject.startDate}</span>
                  <span>Target Handover: {selectedProject.targetEndDate}</span>
                </div>
              </div>

              {/* Project Lead & Commercial */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Lead Project Manager</span>
                  <span className="font-bold text-[#071629] text-sm">{selectedProject.manager}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold text-[10px] uppercase block">Contract Value</span>
                  <span className="font-black text-sm text-[#071629]">{selectedProject.contractValue}</span>
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider mb-3">
                  Engineering & Field Milestones
                </h4>
                <div className="space-y-2">
                  {selectedProject.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-4 h-4 rounded flex items-center justify-center ${
                          m.completed ? 'bg-[#10B981] text-white' : 'border border-[#CBD5E1]'
                        }`}>
                          {m.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </span>
                        <span className={`font-medium ${m.completed ? 'text-[#64748B] line-through' : 'text-[#071629]'}`}>
                          {m.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#94A3B8]">
                        {m.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks Checklist */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-[#071629] uppercase tracking-wider mb-2">
                  Assigned Workstream Tasks
                </h4>
                <div className="space-y-2 mb-3">
                  {selectedProject.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(selectedProject.id, task.id)}
                      className="flex items-center justify-between p-2.5 bg-white border border-[#E2E8F0] hover:border-[#2563EB] rounded cursor-pointer transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.status === 'Completed'}
                          onChange={() => {}}
                          className="rounded text-[#2563EB]"
                        />
                        <span className={task.status === 'Completed' ? 'line-through text-[#94A3B8]' : 'font-semibold text-[#071629]'}>
                          {task.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#64748B]">
                        {task.assignee}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add task mini-form */}
                <form onSubmit={handleAddTask} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="flex-1 h-9 px-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Assignee"
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-28 h-9 px-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-xs"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-[#071629] text-white font-bold text-xs rounded hover:bg-[#153C65]"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Issues & Delays Logger */}
              {selectedProject.issues.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Logged Technical Issues ({selectedProject.issues.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.issues.map((iss) => (
                      <div key={iss.id} className="p-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded text-xs text-[#991B1B]">
                        <span className="font-bold">[{iss.severity} Severity] </span>
                        {iss.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Close Action */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full py-2.5 bg-[#071629] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#153C65] transition-colors"
              >
                Close Project Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

