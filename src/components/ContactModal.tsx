import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, ExternalLink, X as CloseIcon, FileText, CheckCircle2, User, Globe } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    roleType: 'Senior Contract Role',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'resume'>('contact');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Get in Touch with Alex Vance</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">AI Engineering, Consulting & Technical Inquiries</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-3 gap-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 px-2 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'contact' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-slate-400'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Form</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`pb-3 px-2 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'resume' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-slate-400'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Resume Summary</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'contact' ? (
            submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Transmitted!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {form.name}. I'll respond to <span className="text-cyan-400 font-mono">{form.email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', roleType: 'Senior Contract Role', message: '' });
                  }}
                  className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-mono hover:bg-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Inquiry Type</label>
                  <select
                    value={form.roleType}
                    onChange={(e) => setForm({ ...form, roleType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Senior Contract Role">Senior AI Contract Role</option>
                    <option value="Full-Time Staff/Lead AI Engineer">Full-Time Staff / Lead AI Engineer</option>
                    <option value="AI Systems Consulting">AI Systems Consulting</option>
                    <option value="General Inquiry">General Technical Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Project Details / Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your AI engineering requirements, architecture goals, or timeline..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )
          ) : (
            <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between font-bold text-white text-sm">
                  <span>Alex Vance</span>
                  <span className="text-cyan-400">Senior AI Systems Engineer</span>
                </div>
                <p className="text-slate-400">6+ Years experience building LLM swarms, vision pipelines, and production RAG platforms.</p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider">Experience</h5>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-cyan-300">
                    <span>Lead AI Architect @ NeuralSystems</span>
                    <span>2024 - Present</span>
                  </div>
                  <p className="text-slate-400">Architected multi-agent Gemini swarms and PgVector search processing 10M+ daily tokens.</p>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-cyan-300">
                    <span>Senior Full-Stack AI Dev @ VisionFlow</span>
                    <span>2022 - 2024</span>
                  </div>
                  <p className="text-slate-400">Built sub-50ms WebGL computer vision pipelines and TypeScript SDKs.</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#resume"
                  onClick={() => alert("Downloading Alex_Vance_AI_Engineer_Resume.pdf")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl border border-slate-700"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Full PDF Resume</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Socials */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>

          <button onClick={onClose} className="hover:text-slate-200">
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
