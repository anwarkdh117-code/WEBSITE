import { PlaygroundPreset } from '../types';

export const PLAYGROUND_PRESETS: PlaygroundPreset[] = [
  {
    id: 'simple-greeting-calculator',
    title: 'Easy Greeting & Calculator',
    category: 'JavaScript REPL',
    description: 'A super simple code example that prints a friendly message and calculates total prices.',
    mode: 'js',
    code: `// Simple & Easy JavaScript Example
const myName = "Friend";
console.log("Hello, " + myName + "! Welcome to Alex's AI Playground.");

// Simple Calculator
const items = [
  { name: "Laptop Sleeve", price: 25 },
  { name: "Wireless Mouse", price: 15 },
  { name: "USB Hub", price: 20 }
];

let total = 0;
items.forEach(item => {
  console.log("-> Item: " + item.name + " costs $" + item.price);
  total += item.price;
});

console.log("🎉 Total Price = $" + total);
`
  },
  {
    id: 'vector-cosine-similarity',
    title: 'Vector Cosine Similarity & Top-K',
    category: 'Algorithms',
    description: 'Computes cosine distance between document embedding vectors and ranks candidates.',
    mode: 'js',
    code: `// Cosine Similarity Matrix Calculator
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Sample Query Vector (768-dim normalized embedding simulation)
const queryVector = [0.82, 0.45, 0.12, 0.95, 0.33];

// Candidate Documents
const candidates = [
  { id: 'doc_1', title: 'Gemini 3.6 Flash Multi-Agent API', vector: [0.80, 0.44, 0.15, 0.92, 0.31] },
  { id: 'doc_2', title: 'CSS Grid Responsive Layout Tips', vector: [0.10, 0.90, 0.85, 0.05, 0.12] },
  { id: 'doc_3', title: 'Vector DB Indexing with PgVector', vector: [0.75, 0.48, 0.20, 0.88, 0.40] },
];

console.log('🔍 Calculating Cosine Similarity Scores...');
const ranked = candidates.map(doc => ({
  title: doc.title,
  score: (cosineSimilarity(queryVector, doc.vector) * 100).toFixed(2) + '%'
})).sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

console.log('📊 Ranked Vector Results:', JSON.stringify(ranked, null, 2));
`
  },
  {
    id: 'agentic-task-loop',
    title: 'Autonomous Agent Workflow Loop',
    category: 'JavaScript REPL',
    description: 'Simulates a state-machine task planner with retry policies and step logging.',
    mode: 'js',
    code: `// Agent State Machine Simulator
class AgentTaskRunner {
  constructor(taskName) {
    this.taskName = taskName;
    this.history = [];
    this.status = 'PENDING';
  }

  logStep(agentName, action, result) {
    const entry = { timestamp: new Date().toLocaleTimeString(), agentName, action, result };
    this.history.push(entry);
    console.log(\`[\${entry.timestamp}] [\${agentName}] -> \${action}: \${result}\`);
  }

  async runPipeline() {
    this.status = 'RUNNING';
    console.log(\`🚀 Starting Agent Swarm Pipeline for: "\${this.taskName}"\`);
    
    // Step 1: Planner
    this.logStep('PlannerAgent', 'Deconstruct Task', 'Identified 3 sub-tasks');
    await new Promise(r => setTimeout(r, 100));

    // Step 2: Coder
    this.logStep('CoderAgent', 'Generate AST Refactor', 'Generated 42 lines of TypeScript');
    await new Promise(r => setTimeout(r, 100));

    // Step 3: Verifier
    this.logStep('VerifierAgent', 'Validate Syntax', 'All unit tests passing (100% score)');
    
    this.status = 'COMPLETED';
    console.log('✅ Pipeline Completed Successfully!');
    return this.history;
  }
}

const runner = new AgentTaskRunner('Build Live Playground Component');
runner.runPipeline();
`
  },
  {
    id: 'gemini-structured-json',
    title: 'Gemini 3.6 Structured Schema Generator',
    category: 'Gemini AI API',
    description: 'Ask server-side Gemini 3.6 to generate code or structured technical architecture schemas.',
    mode: 'ai',
    aiPrompt: 'Generate a TypeScript interface and sample JSON configuration for a production RAG pipeline with hybrid search, re-ranking, and max latency limits.',
    code: `// Click "Run AI Generation" to execute this prompt via server-side Gemini 3.6 Flash API!
// System instruction will enforce typed schema and architectural commentary.
`
  },
  {
    id: 'ai-code-refactor',
    title: 'AI Code Refactoring & Optimization',
    category: 'Gemini AI API',
    description: 'Refactor complex or imperative JavaScript/TypeScript code for clean functional performance.',
    mode: 'ai',
    aiPrompt: 'Refactor the following code to modern async/await, add strict error handling, and optimize loop performance.',
    code: `function fetchUserData(userIds) {
  var results = [];
  for (var i = 0; i < userIds.length; i++) {
    var id = userIds[i];
    if (id > 0) {
      // simulated sync fetch
      results.push({ id: id, name: 'User_' + id, active: true });
    }
  }
  return results;
}`
  }
];
