import React, { useState, useEffect } from 'react';
import { Terminal, Code2, BookOpen, Cpu, Sparkles, MessageSquare, Mail, Github, Linkedin, Menu, X as CloseIcon } from 'lucide-react';

interface NavbarProps {
  activeTab: 'projects' | 'blog' | 'playground' | 'skills';
  setActiveTab: (tab: 'projects' | 'blog' | 'playground' | 'skills') => void;
  onOpenAiAssistant: () => void;
  onOpenContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiAssistant,
  onOpenContactModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  interface NavItem {
    id: 'projects' | 'blog' | 'playground' | 'skills';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'playground', label: 'Live Playground', icon: Terminal, badge: 'Live REPL' },
    { id: 'skills', label: 'Tech Stack', icon: Cpu },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/60 shadow-xl shadow-slate-950/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            onClick={() => setActiveTab('projects')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  Alex Vance
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  AI Dev
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-mono">
                Senior AI Systems & Full-Stack Engineer
              </p>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-sm shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-slate-800 border border-slate-700/80 shadow-md shadow-cyan-500/5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 rounded-md">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-sm shadow-cyan-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="btn-ai-copilot"
              onClick={onOpenAiAssistant}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 hover:from-cyan-900/80 hover:to-indigo-900/80 text-cyan-300 border border-cyan-700/50 text-xs font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/10 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Ask AI Copilot</span>
            </button>

            <button
              id="btn-contact-modal"
              onClick={onOpenContactModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium text-xs transition-all duration-200 shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 text-slate-950" />
              <span>Contact / Hire</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAiAssistant}
              className="p-2 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/60"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-3 bg-slate-900/95 border border-slate-800 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium transition-colors ${
                    isActive ? 'bg-slate-800 text-cyan-400 border border-slate-700' : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => {
                  onOpenContactModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-cyan-500 text-slate-950 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact / Hire Me</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
