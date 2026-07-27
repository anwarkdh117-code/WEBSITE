import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { 
  Code2, 
  Search, 
  Star, 
  GitFork, 
  ExternalLink, 
  Terminal, 
  Layers, 
  Play, 
  Copy, 
  Check, 
  X as CloseIcon, 
  Sparkles, 
  Cpu, 
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';

export const PortfolioShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  
  // Modal internal state
  const [modalTab, setModalTab] = useState<'architecture' | 'demo' | 'code'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedDemoInput, setSelectedDemoInput] = useState<string>('');
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoLogs, setDemoLogs] = useState<string[]>([]);

  const categories: ProjectCategory[] = ['All', 'Agents & LLMs', 'Computer Vision', 'DevTools', 'Infrastructure'];
  const statuses = ['All', 'Deployed', 'Open Source', 'Active Beta'];

  // Filter projects
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  const handleOpenProjectModal = (project: Project, initialTab: 'architecture' | 'demo' | 'code' = 'architecture') => {
    setActiveModalProject(project);
    setModalTab(initialTab);
    setSelectedDemoInput(project.demoConfig.inputs[0] || '');
    setDemoLogs(project.demoConfig.terminalLogs || []);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunDemo = () => {
    if (!activeModalProject) return;
    setDemoRunning(true);
    setDemoLogs([
      `⚡ [${new Date().toLocaleTimeString()}] Triggering ${activeModalProject.title} execution pipeline...`,
      `📥 Received input payload: "${selectedDemoInput}"`,
      `🧠 Running model weights & tensor pass...`
    ]);

    setTimeout(() => {
      setDemoLogs((prev) => [
        ...prev,
        `✅ Execution completed successfully in ${Math.floor(Math.random() * 20 + 15)}ms.`,
        `📊 Output: ${activeModalProject.demoConfig.sampleOutput}`
      ]);
      setDemoRunning(false);
    }, 900);
  };

  return (
    <section id="portfolio-section" className="py-16 md:py-24 bg-slate-950 relative border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 font-mono text-xs mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Custom Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured AI Coding Projects
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-mono">
              Architectures, open-source repositories, and live interactive demos.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Showing {filteredProjects.length} of {PROJECTS_DATA.length} Projects</span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-8 backdrop-blur-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Status Secondary Filter */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 text-xs font-mono">
            <span className="text-slate-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Status:
            </span>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedStatus === status
                    ? 'text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
            <p className="text-slate-400 text-sm font-mono">No projects found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="mt-3 px-4 py-2 bg-slate-800 text-cyan-400 rounded-xl text-xs font-mono hover:bg-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/5 flex flex-col justify-between"
              >
                <div>
                  {/* Status & Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 text-[10px] font-mono font-medium rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                      {project.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono rounded-md border ${
                          project.status === 'Deployed'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : project.status === 'Open Source'
                            ? 'bg-indigo-950 text-indigo-400 border-indigo-800'
                            : 'bg-amber-950 text-amber-400 border-amber-800'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5 mb-3 line-clamp-1">
                    {project.subtitle}
                  </p>

                  {/* Simple Language Summary Box */}
                  {project.simpleSummary && (
                    <div className="p-3 bg-cyan-950/40 border border-cyan-800/50 rounded-xl mb-4 text-xs text-cyan-200 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[10px] text-cyan-400 uppercase tracking-wider font-mono">
                        <Sparkles className="w-3 h-3 text-cyan-400" /> Simple Explanation:
                      </div>
                      <p className="leading-relaxed">{project.simpleSummary}</p>
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-950/80 rounded-xl border border-slate-800/80 mb-4 text-center">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-[11px] font-bold font-mono text-cyan-400">{m.value}</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 rounded-md border border-slate-700/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons & Social Metrics */}
                <div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 hover:text-amber-400">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" /> {project.stars}
                      </span>
                      <span className="flex items-center gap-1 hover:text-cyan-400">
                        <GitFork className="w-3.5 h-3.5 text-slate-400" /> {project.forks}
                      </span>
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenProjectModal(project, 'architecture')}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 border border-slate-700/80 transition-all"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Architecture</span>
                    </button>

                    <button
                      onClick={() => handleOpenProjectModal(project, 'demo')}
                      className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 border border-cyan-500/30 transition-all"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950/60">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {activeModalProject.category}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {activeModalProject.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">{activeModalProject.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">{activeModalProject.subtitle}</p>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Header */}
            <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-3 text-xs font-mono">
              <button
                onClick={() => setModalTab('architecture')}
                className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all ${
                  modalTab === 'architecture'
                    ? 'border-cyan-400 text-cyan-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Architecture Overview</span>
              </button>

              <button
                onClick={() => setModalTab('demo')}
                className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all ${
                  modalTab === 'demo'
                    ? 'border-cyan-400 text-cyan-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </button>

              <button
                onClick={() => setModalTab('code')}
                className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all ${
                  modalTab === 'code'
                    ? 'border-cyan-400 text-cyan-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Code Snippet</span>
              </button>
            </div>

            {/* Modal Tab Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
              
              {modalTab === 'architecture' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">Deep Description</h4>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                      {activeModalProject.longDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">Pipeline Architecture Flow</h4>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                      {activeModalProject.architectureOverview}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">Verified Performance Metrics</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {activeModalProject.metrics.map((m, idx) => (
                        <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                          <div className="text-2xl font-bold font-mono text-cyan-400">{m.value}</div>
                          <div className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'demo' && (
                <div className="space-y-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                    <label className="text-xs font-mono text-slate-400 block">Select Sample Input Payload:</label>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProject.demoConfig.inputs.map((input) => (
                        <button
                          key={input}
                          onClick={() => setSelectedDemoInput(input)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            selectedDemoInput === input
                              ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          "{input}"
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleRunDemo}
                        disabled={demoRunning}
                        className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                      >
                        <Play className="w-4 h-4 fill-slate-950" />
                        <span>{demoRunning ? 'Executing Pipeline...' : 'Run Live Pipeline'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Terminal Execution Window */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 space-y-2 min-h-[180px]">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-500">
                      <span>Execution Output Log</span>
                      <span className="text-emerald-400">Status: OK</span>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      {demoLogs.map((log, idx) => (
                        <div key={idx} className="leading-relaxed text-slate-300">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'code' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">TypeScript Core Entrypoint</span>
                    <button
                      onClick={() => handleCopyCode(activeModalProject.codeSnippet)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <pre className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                    <code>{activeModalProject.codeSnippet}</code>
                  </pre>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono flex items-center gap-2 transition-colors"
              >
                <span>View Source on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-mono"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
