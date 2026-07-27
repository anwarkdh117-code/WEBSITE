import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'swarm-intelligence',
    title: 'SwarmIntelligence Framework',
    subtitle: 'Distributed Multi-Agent Task Orchestration Engine',
    description: 'An open-source TypeScript framework for composing autonomous LLM agent swarms with state synchronization and human-in-the-loop controls.',
    longDescription: 'SwarmIntelligence enables complex multi-agent workflows where specialized agents (Planner, Researcher, Coder, Verifier) collaborate via a shared vector state graph. Features deadlock resolution, tool execution sandboxing, and real-time streaming state updates.',
    simpleTitle: 'AI Teamwork Engine',
    simpleSummary: 'A tool that lets different smart AI helpers (like a Planner, a Writer, and a Code Checker) work together as a team to finish big projects fast and correctly.',
    category: 'Agents & LLMs',
    tags: ['Gemini 3.6', 'TypeScript', 'Vector Graph', 'Express', 'Agents'],
    stars: 1420,
    forks: 185,
    status: 'Open Source',
    featured: true,
    metrics: [
      { label: 'Task Throughput', value: '3.4x faster' },
      { label: 'Token Efficiency', value: '-42% cost' },
      { label: 'Active Swarms', value: '12,500+' }
    ],
    architectureOverview: 'Client Frontend -> Express Coordinator -> Sub-agent Task Queue -> Shared Memory Vector DB -> Parallel Gemini 3.6 Streams -> State Convergence Validator',
    codeSnippet: `import { SwarmManager, Agent } from '@alex/swarm-intel';

const planner = new Agent({ role: 'Planner', model: 'gemini-3.6-flash' });
const coder = new Agent({ role: 'Coder', model: 'gemini-3.6-flash' });

const swarm = new SwarmManager({
  agents: [planner, coder],
  maxIterations: 5,
  memoryStore: 'in-memory-vector'
});

const result = await swarm.executeTask('Refactor legacy API to SSE streams');
console.log('Swarm Completed Task:', result.summary);`,
    demoType: 'terminal',
    demoConfig: {
      inputs: ['Refactor Express route to server-sent events', 'Audit OWASP top 10 vulnerabilities'],
      sampleOutput: 'Swarm Execution Summary:\n[Planner] Task decomposed into 3 sub-tasks.\n[Coder] Refactored /api/stream with TextDecoderStream.\n[Verifier] Zero syntax errors. All tests passing (12/12).',
      terminalLogs: [
        '🚀 Initializing Swarm Manager v2.4...',
        '🤖 Agent [Planner] selected gemini-3.6-flash model.',
        '🤖 Agent [Coder] joined workspace channel #dev-swarm.',
        '⚡ Dispatched sub-task #1: Analyze route requirements.',
        '✅ State lock resolved in 34ms. Execution complete.'
      ]
    },
    githubUrl: 'https://github.com/example/swarm-intelligence',
    liveUrl: 'https://swarm-intel-demo.example.com'
  },
  {
    id: 'vision-flow-ai',
    title: 'VisionFlow Real-Time Analytics',
    subtitle: 'Sub-50ms Edge Video Intelligence Pipeline',
    description: 'Ultra low-latency computer vision pipeline combining spatial object detection, zero-shot tracking, and Gemini multimodal scene descriptions.',
    longDescription: 'Built with WebAssembly and WebGL frame processors, VisionFlow streams RTSP/WebRTC feeds directly to edge inference nodes, highlighting anomalies and automatically indexing camera metadata in real time.',
    simpleTitle: 'Smart Camera Eye',
    simpleSummary: 'A super fast camera system that watches video feeds in real time to count objects, spot safety issues, and describe scenes instantly.',
    category: 'Computer Vision',
    tags: ['Computer Vision', 'PyTorch', 'WebGL', 'Wasm', 'Multimodal'],
    stars: 890,
    forks: 94,
    status: 'Deployed',
    featured: true,
    metrics: [
      { label: 'Processing Latency', value: '28 ms/frame' },
      { label: 'Frame Rate', value: '120 FPS' },
      { label: 'Object Recall', value: '98.6%' }
    ],
    architectureOverview: 'RTSP Stream -> WebGL Frame Shader -> Edge TensorRT Model -> Multimodal Gemini Spatial Grounding -> Realtime WebSocket Dashboard',
    codeSnippet: `import { VisionStream } from '@alex/vision-flow';

const stream = new VisionStream({
  fps: 60,
  confidenceThreshold: 0.85,
  useGPU: true
});

stream.on('detection', (objects) => {
  console.log(\`Detected \${objects.length} bounding boxes in 24ms\`);
});`,
    demoType: 'vision',
    demoConfig: {
      inputs: ['Traffic Camera Feed #04', 'Industrial Robotics Assembly Line'],
      sampleOutput: 'Detection Matrix:\n- Bounding Box [120, 45, 300, 280]: Autonomous Forklift (Confidence: 99.4%)\n- Bounding Box [450, 100, 520, 220]: Safety Worker Helmet Verified',
      terminalLogs: [
        '📹 Connecting WebRTC Video Sink...',
        '⚡ Initializing WebGL Canvas Texture GPU Pipeline...',
        '🔍 Processing Frame #14800 (Latency: 22ms)...',
        '✅ Zero spatial collisions detected in ROI.'
      ]
    },
    githubUrl: 'https://github.com/example/vision-flow-ai',
    liveUrl: 'https://visionflow.example.com'
  },
  {
    id: 'rag-core-engine',
    title: 'RAG-Core Hybrid Indexer',
    subtitle: 'Enterprise Semantic & BM25 Vector Retrieval System',
    description: 'A resilient vector search engine with contextual chunking, dense + sparse hybrid re-ranking, and dynamic token compression.',
    longDescription: 'RAG-Core solves hallucination in large technical documentations by combining BM25 keyword matching with dense Gemini embedding vector indexers and Cross-Encoder re-ranking.',
    simpleTitle: 'Smart Document Finder',
    simpleSummary: 'An intelligent search engine that reads thousands of company documents and finds exact answers without making things up.',
    category: 'Infrastructure',
    tags: ['Vector DB', 'PgVector', 'Gemini Embeddings', 'RAG', 'Python'],
    stars: 2150,
    forks: 310,
    status: 'Deployed',
    featured: true,
    metrics: [
      { label: 'Retrieval Accuracy', value: '96.2%' },
      { label: 'Query Latency', value: '< 45ms' },
      { label: 'Docs Indexed', value: '50M+' }
    ],
    architectureOverview: 'Document Ingestion -> Contextual Sliding Chunk -> Hybrid Vector + BM25 Index -> Cohere Re-ranker -> Context Window Compressor -> Gemini Response Generator',
    codeSnippet: `import { RagEngine } from '@alex/rag-core';

const engine = new RagEngine({
  vectorStore: 'pgvector',
  embeddingModel: 'gemini-embedding-2-preview',
  topK: 10
});

const context = await engine.retrieve('How to configure CORS in Cloud Run?');
console.log('Relevant Chunks:', context.chunks.length);`,
    demoType: 'rag',
    demoConfig: {
      inputs: ['How to handle OAuth callback redirect in iframe?', 'How to stream JSON objects from Gemini API?'],
      sampleOutput: 'Search Strategy: Dense Vector (0.7) + Sparse BM25 (0.3)\nRetrieved 4 chunks with avg cosine distance 0.94.\nGenerated Grounded Answer in 320ms.',
      terminalLogs: [
        '📄 Reading PDF Documentation (450 pages)...',
        '✂️ Contextual Chunking applied with 128-token overlap.',
        '🧠 Generating Embeddings via gemini-embedding-2-preview...',
        '🎯 Cosine similarity query returned Top-5 hits in 18ms.'
      ]
    },
    githubUrl: 'https://github.com/example/rag-core-engine'
  },
  {
    id: 'edge-voice-copilot',
    title: 'Edge Voice AI Copilot',
    subtitle: 'Real-Time Bi-Directional Speech Translation',
    description: 'Low-latency live voice interaction tool leveraging Gemini Live API over WebSockets with client-side 16kHz PCM audio streaming.',
    longDescription: 'Built for hands-free industrial maintenance and developer pairs, allowing real-time multi-speaker speech synthesis and instantaneous technical translation.',
    simpleTitle: 'Talking Voice Assistant',
    simpleSummary: 'A real-time voice assistant that listens to you talk, answers immediately, and translates spoken languages on the spot.',
    category: 'Agents & LLMs',
    tags: ['Gemini Live API', 'Audio Worklet', 'WebSockets', 'React', 'PCM'],
    stars: 640,
    forks: 72,
    status: 'Active Beta',
    featured: false,
    metrics: [
      { label: 'Audio Latency', value: '180ms' },
      { label: 'Voice Clarity', value: '24kHz HD' },
      { label: 'Uptime', value: '99.9%' }
    ],
    architectureOverview: 'Browser Microphone -> Audio Worklet (16kHz PCM) -> Server WebSocket -> Gemini Live API -> 24kHz Audio Buffer -> Gapless AudioContext Playback',
    codeSnippet: `// Client-side PCM audio streaming chunk handler
const audioCtx = new AudioContext({ sampleRate: 16000 });
const processor = audioCtx.createScriptProcessor(4096, 1, 1);

processor.onaudioprocess = (e) => {
  const pcmData = pcmToBase64(e.inputBuffer.getChannelData(0));
  ws.send(JSON.stringify({ type: 'audio', data: pcmData }));
};`,
    demoType: 'audio',
    demoConfig: {
      inputs: ['Explain quantum entanglement in 15 seconds', 'Translate code logic to Spanish voice'],
      sampleOutput: 'Voice Response Stream Active [24kHz PCM]\n"Quantum entanglement is a physical phenomenon where pairs of particles remain connected such that actions performed on one instantly affect the other..."',
      terminalLogs: [
        '🎙️ AudioContext (16000 Hz) initialized.',
        '🔌 WebSocket connected to /live API bridge.',
        '🔊 Model stream receiving 24000 Hz PCM chunks.',
        '⚡ Zero audio dropouts detected.'
      ]
    },
    githubUrl: 'https://github.com/example/edge-voice-copilot'
  },
  {
    id: 'coderefactor-ai',
    title: 'CodeRefactor CLI & AST Studio',
    subtitle: 'AI-Powered AST Transformations & Security Linter',
    description: 'Command line tool and visual playground that analyzes TypeScript/JavaScript AST trees to automatically fix code smells and optimize performance.',
    longDescription: 'CodeRefactor transforms monolithic codebases into modern functional modular structures while checking for security anti-patterns and performance bottlenecks.',
    simpleTitle: 'Automatic Code Cleaner',
    simpleSummary: 'A tool that reads messy computer code and automatically fixes bugs, removes bad code, and makes it run much faster.',
    category: 'DevTools',
    tags: ['DevTools', 'TypeScript AST', 'CLI', 'Gemini 3.6', 'Esbuild'],
    stars: 1120,
    forks: 140,
    status: 'Open Source',
    featured: false,
    metrics: [
      { label: 'Code Smells Fixed', value: '140,000+' },
      { label: 'Execution Speed', value: '250 files/sec' },
      { label: 'Dev Time Saved', value: '~4 hrs/wk' }
    ],
    architectureOverview: 'Source File -> Babel/TypeScript Parser -> AST Inspection -> Pattern Matcher -> Gemini Refactoring Prompt -> Clean Code Emitter',
    codeSnippet: `import { refactorAST } from 'coderefactor-ai';

const dirtyCode = \`
  function calculateTotal(items) {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
      total = total + items[i].price;
    }
    return total;
  }
\`;

const cleanCode = await refactorAST(dirtyCode, { targetES: 'ES2022' });
console.log(cleanCode);`,
    demoType: 'terminal',
    demoConfig: {
      inputs: ['Refactor imperative for-loops to functional reduce()', 'Add explicit TypeScript interfaces'],
      sampleOutput: 'Refactored Output:\nexport const calculateTotal = (items: Item[]): number =>\n  items.reduce((sum, item) => sum + item.price, 0);',
      terminalLogs: [
        '📦 Parsing src/components/App.tsx into AST tree...',
        '🔍 Found 4 var declarations and 2 implicit any types.',
        '✨ Applied functional transformation rule #14.',
        '🎉 Refactoring completed with zero breaking changes.'
      ]
    },
    githubUrl: 'https://github.com/example/coderefactor-ai'
  },
  {
    id: 'neural-canvas-studio',
    title: 'Neural Canvas AI Workflow',
    subtitle: 'Interactive Visual Node Graph for Generative AI Pipelines',
    description: 'A canvas UI for dragging, connecting, and testing multimodal AI pipeline nodes (Prompts, Models, Vector Stores, API Webhooks).',
    longDescription: 'Neural Canvas allows engineers to visually prototype generative workflows with live node inspection, step-by-step debugger, and one-click export to Express/FastAPI code.',
    simpleTitle: 'Visual AI App Builder',
    simpleSummary: 'A drag-and-drop screen where you connect building blocks like blocks in a puzzle to build your own custom AI app without hard coding.',
    category: 'DevTools',
    tags: ['React Canvas', 'Workflow', 'Visual Node Editor', 'Express', 'Tailwind'],
    stars: 1780,
    forks: 210,
    status: 'Active Beta',
    featured: false,
    metrics: [
      { label: 'Nodes Rendered', value: '60 FPS' },
      { label: 'Pipelines Built', value: '8,400+' },
      { label: 'Export Formats', value: 'TS, Python, JSON' }
    ],
    architectureOverview: 'HTML5 Canvas Node Graph -> State Machine -> Reactive Node Bus -> Step Execution Engine -> Live Output Inspection Modal',
    codeSnippet: `import { WorkflowGraph, Node } from '@alex/neural-canvas';

const graph = new WorkflowGraph();
const promptNode = new Node('PromptTemplate', { template: 'Summarize {{text}}' });
const modelNode = new Node('GeminiModel', { model: 'gemini-3.6-flash' });

graph.connect(promptNode.output('prompt'), modelNode.input('contents'));
const result = await graph.run({ text: 'AI Studio Build platform details...' });`,
    demoType: 'terminal',
    demoConfig: {
      inputs: ['Translate -> Summarize -> Export PDF Node Flow'],
      sampleOutput: 'Pipeline Execution Completed:\nNode 1 [PromptTemplate]: Passed (2ms)\nNode 2 [GeminiModel]: Returned 140 tokens (310ms)\nNode 3 [OutputFormatter]: Validated JSON Schema',
      terminalLogs: [
        '🎨 Rendering Node Canvas Graph (32 active nodes)...',
        '⚡ Triggered Event Bus: Node #4 -> Node #7',
        '💾 Workflow JSON exported to local clipboard.'
      ]
    },
    githubUrl: 'https://github.com/example/neural-canvas-studio'
  }
];
