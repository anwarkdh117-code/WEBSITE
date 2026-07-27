import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { BlogSection } from './components/BlogSection';
import { LivePlayground } from './components/LivePlayground';
import { SkillsRadar } from './components/SkillsRadar';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { Sparkles, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'projects' | 'blog' | 'playground' | 'skills'>('projects');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleExploreProjects = () => {
    setActiveTab('projects');
    const el = document.getElementById('portfolio-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLaunchPlayground = () => {
    setActiveTab('playground');
    const el = document.getElementById('playground-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Fixed Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onExploreProjects={handleExploreProjects}
        onLaunchPlayground={handleLaunchPlayground}
        onOpenAiCopilot={() => setIsAiAssistantOpen(true)}
      />

      {/* Main Section Navigation Content */}
      <main className="relative z-10">
        
        {/* Render Active View or All Views smoothly */}
        {activeTab === 'projects' && (
          <PortfolioShowcase />
        )}

        {activeTab === 'blog' && (
          <BlogSection />
        )}

        {activeTab === 'playground' && (
          <LivePlayground />
        )}

        {activeTab === 'skills' && (
          <SkillsRadar />
        )}

        {/* Secondary Featured Preview for Full Page Context */}
        {activeTab === 'projects' && (
          <>
            <SkillsRadar />
            <BlogSection />
            <LivePlayground />
          </>
        )}

      </main>

      {/* Floating AI Copilot Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-ai-copilot-btn"
          onClick={() => setIsAiAssistantOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs rounded-2xl shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
          <span className="font-mono">Ask AI Copilot</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping" />
        </button>
      </div>

      {/* Modals */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

    </div>
  );
}
