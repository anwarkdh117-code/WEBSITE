import React from 'react';
import { Terminal, Github, Linkedin, ExternalLink, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'projects' | 'blog' | 'playground' | 'skills') => void;
  onOpenContactModal: () => void;
  onOpenAiAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenContactModal,
  onOpenAiAssistant
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-white text-sm">Alex Vance</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Minimalist, modern AI engineering portfolio showcasing autonomous agent swarms, vision pipelines, and production RAG architecture.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <div className="text-white font-bold uppercase text-[11px] tracking-wider mb-2">Sections</div>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-cyan-400 transition-colors">
                  Custom Projects Showcase
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-cyan-400 transition-colors">
                  Integrated Technical Blog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('playground')} className="hover:text-cyan-400 transition-colors">
                  Live Coding Playground
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('skills')} className="hover:text-cyan-400 transition-colors">
                  Tech Stack Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: AI Copilot & Tools */}
          <div className="space-y-2">
            <div className="text-white font-bold uppercase text-[11px] tracking-wider mb-2">AI Copilot</div>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onOpenAiAssistant} className="text-cyan-400 hover:underline flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Ask Alex AI Copilot
                </button>
              </li>
              <li>
                <button onClick={onOpenContactModal} className="hover:text-slate-200">
                  Request Contract / Resume
                </button>
              </li>
              <li className="text-slate-500">
                Powered by Gemini 3.6 Flash
              </li>
            </ul>
          </div>

          {/* Col 4: Status */}
          <div className="space-y-2">
            <div className="text-white font-bold uppercase text-[11px] tracking-wider mb-2">System Status</div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">All Systems Operational</span>
              </div>
              <div className="text-[10px] text-slate-500">Latency: 24ms | Gemini 3.6 Ready</div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Alex Vance. Built with React, Tailwind CSS, & Gemini 3.6 API.
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">LinkedIn</a>
            <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">HuggingFace</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
