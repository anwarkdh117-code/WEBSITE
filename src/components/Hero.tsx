import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, Code2, ArrowRight, Play, Github, Linkedin, ExternalLink, Zap, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
  onLaunchPlayground: () => void;
  onOpenAiCopilot: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onLaunchPlayground,
  onOpenAiCopilot,
}) => {
  const [terminalText, setTerminalText] = useState('');
  const fullText = '$ alex --status "Building Multi-Agent Gemini 3.6 Workflows"';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTerminalText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-900/80">
      {/* Background Subtle Mesh Grid & Glow Circles */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-200">Available for Senior AI Engineer Contracts & Roles</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">Gemini 3.6 Ready</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">Smart AI Apps</span> & Useful Web Projects
          </h1>

          {/* Subtitle in Simple Language */}
          <div className="max-w-2xl mx-auto p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-2xl text-cyan-100 text-sm sm:text-base leading-relaxed space-y-1 text-left sm:text-center">
            <div className="flex items-center gap-2 font-bold font-mono text-cyan-400 text-xs uppercase tracking-wider justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" /> In Simple Words:
            </div>
            <p>
              Hi, I'm Alex! I build smart AI helpers, fast camera tools, and easy-to-use websites. Everything here is designed to be simple, clean, and helpful.
            </p>
          </div>

          {/* Animated Terminal Command Banner */}
          <div className="max-w-xl mx-auto bg-slate-950/90 rounded-2xl border border-slate-800 p-3 shadow-xl font-mono text-left flex items-center gap-3">
            <div className="flex gap-1.5 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-xs text-cyan-300 overflow-hidden text-ellipsis whitespace-nowrap flex-1">
              {terminalText}
              <span className="animate-pulse text-cyan-400 font-bold">|</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-btn-explore"
              onClick={onExploreProjects}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-95 group"
            >
              <Code2 className="w-4 h-4 text-slate-950" />
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-btn-playground"
              onClick={onLaunchPlayground}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium text-sm transition-all active:scale-95"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>Live Playground</span>
            </button>

            <button
              id="hero-btn-copilot"
              onClick={onOpenAiCopilot}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-950 to-slate-900 hover:from-indigo-900 text-indigo-300 border border-indigo-700/50 font-medium text-sm transition-all shadow-md shadow-indigo-950"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Ask AI Copilot</span>
            </button>
          </div>

          {/* Quick Metrics Chips */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="text-xl font-bold font-mono text-cyan-400">6+</div>
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">AI Systems Built</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="text-xl font-bold font-mono text-emerald-400">50M+</div>
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Docs Vector Indexed</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="text-xl font-bold font-mono text-indigo-400">&lt; 28ms</div>
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Vision Pipeline</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center backdrop-blur-sm">
              <div className="text-xl font-bold font-mono text-amber-400">100%</div>
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Gemini 3.6 Native</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
