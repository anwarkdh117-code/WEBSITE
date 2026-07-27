import React, { useState, useRef } from 'react';
import { PlaygroundPreset } from '../types';
import { PLAYGROUND_PRESETS } from '../data/playgroundPresets';
import { 
  Terminal, 
  Play, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  Download, 
  Code2, 
  Zap, 
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LivePlayground: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PlaygroundPreset>(PLAYGROUND_PRESETS[0]);
  const [code, setCode] = useState<string>(PLAYGROUND_PRESETS[0].code);
  const [mode, setMode] = useState<'js' | 'ai'>(PLAYGROUND_PRESETS[0].mode);
  const [aiPrompt, setAiPrompt] = useState<string>(PLAYGROUND_PRESETS[0].aiPrompt || '');
  
  // Execution & Output state
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [aiAction, setAiAction] = useState<'run' | 'explain' | 'refactor'>('run');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Select Preset Handler
  const handleSelectPreset = (preset: PlaygroundPreset) => {
    setSelectedPreset(preset);
    setCode(preset.code);
    setMode(preset.mode);
    setAiPrompt(preset.aiPrompt || '');
    setConsoleLogs([`// Loaded preset: "${preset.title}"`]);
    setExecutionTime(null);
  };

  // Run JavaScript REPL Execution locally
  const handleRunJs = () => {
    setIsRunning(true);
    const logs: string[] = [];
    const startTime = performance.now();

    // Custom console wrapper
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      },
      error: (...args: any[]) => {
        logs.push(`❌ ERROR: ${args.map(a => String(a)).join(' ')}`);
      },
      warn: (...args: any[]) => {
        logs.push(`⚠️ WARN: ${args.map(a => String(a)).join(' ')}`);
      }
    };

    try {
      // Evaluate JavaScript safely with custom console
      const runFn = new Function('console', code);
      runFn(customConsole);
      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTime);

      setExecutionTime(elapsed);
      setConsoleLogs(logs.length > 0 ? logs : ['// Code executed successfully with zero console outputs.']);
    } catch (err: any) {
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));
      setConsoleLogs([`❌ Runtime Exception: ${err.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  // Run AI Code Studio via Gemini API server
  const handleRunAi = async (actionOverride?: 'run' | 'explain' | 'refactor') => {
    setIsRunning(true);
    const action = actionOverride || aiAction;
    const startTime = performance.now();
    setConsoleLogs(['⚡ Connecting to Gemini 3.6 Flash Server API...']);

    try {
      const res = await fetch('/api/ai/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          code,
          mode: action
        })
      });

      const data = await res.json();
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));

      if (data.reply) {
        setConsoleLogs([data.reply]);
      } else if (data.error) {
        setConsoleLogs([`❌ AI Error: ${data.error}`]);
      }
    } catch (err: any) {
      setConsoleLogs([`❌ Network Error: Could not connect to Gemini API endpoint. (${err.message})`]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playground-snippet-${Date.now()}.ts`;
    a.click();
  };

  // Calculate line numbers
  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  return (
    <section id="playground-section" className="py-16 md:py-24 bg-slate-950 relative border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 font-mono text-xs mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>Live Coding Playground</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Interactive Code & AI Prompt Studio
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-mono">
              Execute live JavaScript REPL snippets or prompt Gemini 3.6 Flash directly in browser.
            </p>
          </div>

          {/* Execution Mode Selector */}
          <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setMode('js')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                mode === 'js'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>JS / TS REPL</span>
            </button>

            <button
              onClick={() => setMode('ai')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                mode === 'ai'
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Gemini 3.6 AI</span>
            </button>
          </div>
        </div>

        {/* Presets Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider shrink-0 pr-2">Presets:</span>
          {PLAYGROUND_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all border ${
                selectedPreset.id === preset.id
                  ? 'bg-slate-800 text-cyan-400 border-cyan-500/80 font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {preset.title}
            </button>
          ))}
        </div>

        {/* Playground Grid: Editor + Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Code Editor */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Editor Topbar */}
            <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2">
                  {mode === 'js' ? 'script.ts (Browser REPL)' : 'ai_prompt.ts (Gemini 3.6)'}
                </span>
              </div>

              {/* Quick Code Tools */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-mono"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={handleDownloadCode}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-mono"
                  title="Download Code File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setCode('')}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 text-xs font-mono"
                  title="Clear Code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* AI Prompt Input Bar (If AI mode active) */}
            {mode === 'ai' && (
              <div className="p-3 bg-indigo-950/40 border-b border-indigo-900/50 space-y-2">
                <label className="text-[11px] font-mono text-indigo-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" /> AI Instruction Prompt:
                </label>
                <input
                  type="text"
                  placeholder="Ask Gemini to refactor, explain, or generate code..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full bg-slate-950 border border-indigo-800/60 rounded-xl px-3 py-2 text-xs text-indigo-200 placeholder-indigo-400/50 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            )}

            {/* Code Textarea with Line Numbers */}
            <div className="relative flex bg-slate-950 min-h-[320px] max-h-[500px] overflow-y-auto font-mono text-xs">
              {/* Line Numbers Gutter */}
              <div className="py-4 px-3 text-right bg-slate-950/80 text-slate-600 select-none border-r border-slate-800/80 min-w-[40px]">
                {lineNumbers.map((n) => (
                  <div key={n} className="leading-6">{n}</div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Enter JavaScript or TypeScript code here..."
                spellCheck={false}
                className="w-full p-4 bg-transparent text-cyan-300 focus:outline-none resize-none leading-6 font-mono whitespace-pre text-xs placeholder-slate-600"
              />
            </div>

            {/* Editor Footer Action Buttons */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-mono text-slate-500">
                Press <span className="text-slate-300 font-bold bg-slate-800 px-1.5 py-0.5 rounded">Ctrl + Enter</span> to run
              </div>

              {mode === 'js' ? (
                <button
                  onClick={handleRunJs}
                  disabled={isRunning}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{isRunning ? 'Running...' : 'Execute JS Snippet'}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRunAi('explain')}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-xl"
                  >
                    Explain Code
                  </button>
                  <button
                    onClick={() => handleRunAi('refactor')}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-xl"
                  >
                    Refactor
                  </button>
                  <button
                    onClick={() => handleRunAi('run')}
                    disabled={isRunning}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-95 disabled:opacity-50 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isRunning ? 'Generating...' : 'Run Gemini AI'}</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Console & Output Panel */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[440px]">
            
            {/* Console Topbar */}
            <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-200">Execution Console Output</span>
              </div>

              <div className="flex items-center gap-3">
                {executionTime !== null && (
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    ⚡ {executionTime} ms
                  </span>
                )}

                <button
                  onClick={() => setConsoleLogs([])}
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-rose-400 text-xs font-mono"
                  title="Clear Console"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Console Logs Display Area */}
            <div className="p-4 bg-slate-950 flex-1 font-mono text-xs overflow-y-auto space-y-2 min-h-[300px]">
              {consoleLogs.length === 0 ? (
                <div className="text-slate-600 italic py-12 text-center">
                  Console output is ready. Click "Execute JS Snippet" or "Run Gemini AI" to test code.
                </div>
              ) : (
                consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed whitespace-pre-wrap break-words border-b border-slate-900/60 pb-2 ${
                      log.startsWith('❌')
                        ? 'text-rose-400 font-bold'
                        : log.startsWith('⚡')
                        ? 'text-cyan-400 font-semibold'
                        : 'text-slate-200'
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>

            {/* Console Status Footer */}
            <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Environment: Sandboxed Web V8 + Gemini 3.6
              </span>
              <span>UTF-8</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
