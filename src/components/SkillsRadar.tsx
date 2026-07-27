import React, { useState } from 'react';
import { Cpu, Layers, Terminal, Server, ShieldCheck, Zap, Database, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { SkillCategory } from '../types';

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Generative AI & Agent Architecture',
    iconName: 'Brain',
    skills: [
      { name: 'Gemini 3.6 API & SDK', level: 98, experience: '4 yrs', featuredTag: 'Core Expert' },
      { name: 'Multi-Agent Swarm Orchestration', level: 95, experience: '3 yrs', featuredTag: 'Architecture' },
      { name: 'Gemini Live Speech (24kHz PCM)', level: 92, experience: '2 yrs' },
      { name: 'Function Calling & Tool Hybrid Mode', level: 96, experience: '3 yrs' },
      { name: 'LangChain / LlamaIndex Systems', level: 90, experience: '3 yrs' }
    ]
  },
  {
    title: 'RAG & Vector Database Systems',
    iconName: 'Database',
    skills: [
      { name: 'PgVector & Qdrant Engine', level: 94, experience: '4 yrs', featuredTag: 'High Scale' },
      { name: 'Hybrid BM25 + Dense RRF Fusion', level: 96, experience: '3 yrs' },
      { name: 'Contextual Sliding Chunking', level: 92, experience: '3 yrs' },
      { name: 'Gemini Embeddings 2', level: 95, experience: '3 yrs' }
    ]
  },
  {
    title: 'Full-Stack Engineering',
    iconName: 'Terminal',
    skills: [
      { name: 'TypeScript / React 19', level: 96, experience: '6 yrs', featuredTag: 'Production' },
      { name: 'Express / Node.js ESM', level: 95, experience: '6 yrs' },
      { name: 'Tailwind CSS & Framer Motion', level: 92, experience: '5 yrs' },
      { name: 'WebSockets & SSE Streaming', level: 94, experience: '5 yrs' }
    ]
  },
  {
    title: 'Computer Vision & Infrastructure',
    iconName: 'Server',
    skills: [
      { name: 'PyTorch & TensorRT', level: 88, experience: '4 yrs' },
      { name: 'WebGL & Wasm Frame Shaders', level: 85, experience: '3 yrs' },
      { name: 'Docker / Cloud Run Containers', level: 92, experience: '5 yrs' },
      { name: 'CUDA Performance Tuning', level: 82, experience: '2 yrs' }
    ]
  }
];

export const SkillsRadar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section className="py-16 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 font-mono text-xs mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Stack & Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Production Skills & Deep Architecture Knowledge
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-mono">
            Tested across high-concurrency production deployments and high-throughput LLM pipelines.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SKILLS_DATA.map((cat, idx) => {
            const isSelected = selectedCategory === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setSelectedCategory(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{cat.skills.length} Skills</span>
                </div>
                <h3 className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {cat.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Category Skill List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">
                {SKILLS_DATA[selectedCategory].title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Verified proficiency levels and industry experience
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              <span>Production Validated</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS_DATA[selectedCategory].skills.map((skill) => (
              <div key={skill.name} className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-200">{skill.name}</span>
                    {skill.featuredTag && (
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-md">
                        {skill.featuredTag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span>{skill.experience}</span>
                    <span className="text-cyan-400 font-bold">{skill.level}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
