import { BlogArticle } from '../types';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'building-multi-agent-workflows',
    title: 'Building Production-Grade Multi-Agent Workflows with Gemini 3.6',
    slug: 'building-multi-agent-workflows-gemini-3.6',
    excerpt: 'A practical architecture guide to building resilient, state-synchronized agent swarms with deadlock resolution and server-side execution safety.',
    simpleTitle: 'How to Make AI Helpers Work Together Easily',
    simpleSummary: 'A simple guide explaining how to make different AI assistants talk to each other safely without getting stuck or confused.',
    publishDate: 'July 18, 2026',
    readTimeMinutes: 6,
    tags: ['Agents', 'Gemini API', 'Architecture', 'TypeScript'],
    author: {
      name: 'Alex Vance',
      role: 'AI Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    },
    likes: 142,
    keyTakeaways: [
      'Multi-agent systems require explicit task handoff schemas rather than unstructured text prompts.',
      'Use Gemini 3.6 Flash for high-speed sub-agent reasoning loops and system verification.',
      'Always implement loop iteration bounds to prevent runaway API token burn.'
    ],
    codeBlock: {
      title: 'Agent Coordination Handshake',
      language: 'typescript',
      code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function runSubAgentHandshake(taskDescription: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: \`Break down this task into sub-agent JSON roles: \${taskDescription}\`,
    config: {
      responseMimeType: 'application/json',
      systemInstruction: 'You are a Coordinator Agent orchestrating parallel workers.'
    }
  });
  
  return JSON.parse(response.text || '{}');
}`
    },
    content: `When scaling LLM applications beyond single-prompt interactions, autonomous agent swarms offer superior modularity and reasoning depth. However, unconstrained agent communication quickly leads to cascading state errors or infinite reasoning loops.

### 1. The Core Architecture Pattern
In production systems, avoid letting agents communicate purely through freeform conversational messages. Instead, enforce structured state graphs with typed handoff payloads.

Every agent invocation should produce:
1. **Status Code**: \`SUCCESS\`, \`NEEDS_MORE_DATA\`, or \`UNRECOVERABLE_ERROR\`
2. **Next Agent Target**: The designated worker ID for the next phase
3. **Structured Context Delta**: Only the necessary state updates rather than full prompt histories

### 2. Guardrails Against Runaway Execution
Always enforce strict bounds:
- **Max Hop Limits**: Set hard caps (e.g., maximum 5 hops per user request)
- **State Locks**: Mutex locks around shared vector stores or database tables
- **Timeout Enforcers**: Terminate any sub-agent taking longer than 10 seconds per reasoning step.

By pairing Gemini 3.6 Flash's ultra-fast token generation with strict handoff schemas, systems achieve both high reliability and minimal latency.`
  },
  {
    id: 'optimizing-rag-latency',
    title: 'Optimizing RAG Retrieval Latency: From 800ms to 45ms',
    slug: 'optimizing-rag-retrieval-latency',
    excerpt: 'How we restructured dense vector indexing, added contextual sliding chunking, and introduced hybrid BM25 + vector re-ranking.',
    simpleTitle: 'Making AI Document Search 20x Faster',
    simpleSummary: 'How we made AI search through thousands of pages of documents in less than a single second to give accurate answers.',
    publishDate: 'June 30, 2026',
    readTimeMinutes: 8,
    tags: ['Vector DB', 'RAG', 'Performance', 'Python'],
    author: {
      name: 'Alex Vance',
      role: 'AI Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    },
    likes: 218,
    keyTakeaways: [
      'Dense vector search alone suffers from exact query keyword miss; hybrid dense/sparse search yields 95%+ precision.',
      'Contextual sliding chunking preserves semantic continuity across document boundaries.',
      'Pre-indexing metadata in HNSW graphs cuts query latency by over 80%.'
    ],
    codeBlock: {
      title: 'Hybrid Re-Ranker Score Fusion',
      language: 'python',
      code: `def reciprocal_rank_fusion(dense_results, sparse_results, k=60):
    scores = {}
    for rank, doc_id in enumerate(dense_results):
        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank)
    for rank, doc_id in enumerate(sparse_results):
        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank)
    
    sorted_docs = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [doc_id for doc_id, score in sorted_docs]`
    },
    content: `Retrieval-Augmented Generation (RAG) is the backbone of enterprise search and domain Q&A applications. But naive vector search often fails on technical queries requiring exact product codes, function names, or numerical specifications.

### The Bottleneck in Naive RAG
1. **Over-reliance on Cosine Distance**: Pure vector embeddings group concepts by semantic similarity, often missing specific variable names or precise product model numbers.
2. **Chunk Fragmentation**: Fixed 512-token chunks cut off relevant context mid-sentence.
3. **Unfiltered Context Windows**: Feeding 20 raw chunks to an LLM introduces "lost in the middle" attention decay.

### The Solution: Hybrid Reciprocal Rank Fusion (RRF)
By combining dense embeddings (via \`gemini-embedding-2-preview\`) with sparse BM25 inverted indexes, we capture both conceptual meaning and exact term precision. Passing the top 20 candidate docs through a fast cross-encoder re-ranker selects the top 3 most relevant context blocks in under 45ms.`
  },
  {
    id: 'designing-human-in-the-loop-ai',
    title: 'Designing Human-in-the-Loop AI Interfaces for Developers',
    slug: 'designing-human-in-the-loop-ai-interfaces',
    excerpt: 'Best UX patterns for generative code tools, diff inspection, streamed previews, and non-blocking approval controls.',
    simpleTitle: 'Designing Clear & Easy AI Screens for People',
    simpleSummary: 'Key tips for creating user interfaces that let people easily check, accept, or change AI suggestions with zero confusion.',
    publishDate: 'June 12, 2026',
    readTimeMinutes: 5,
    tags: ['UX', 'DevTools', 'React', 'Frontend'],
    author: {
      name: 'Alex Vance',
      role: 'AI Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    },
    likes: 95,
    keyTakeaways: [
      'Never block the developer canvas while streaming AI generated code.',
      'Provide side-by-side AST visual diff inspection before committing auto-refactors.',
      'Allow instant inline prompt adjustment without discarding previous context.'
    ],
    codeBlock: {
      title: 'Optimistic Stream Renderer Hook',
      language: 'typescript',
      code: `import { useState, useEffect } from 'react';

export function useStreamBuffer(streamReader: ReadableStreamDefaultReader<Uint8Array>) {
  const [text, setText] = useState('');

  useEffect(() => {
    const decoder = new TextDecoder();
    async function read() {
      while (true) {
        const { done, value } = await streamReader.read();
        if (done) break;
        setText((prev) => prev + decoder.decode(value, { stream: true }));
      }
    }
    read();
  }, [streamReader]);

  return text;
}`
    },
    content: `The most successful developer tools do not attempt to completely replace human developer judgment—they enhance it. When building AI coding assistants or automated refactoring dashboards, UI response times and clarity of proposed changes are critical.

### Key UX Principles for AI DevTools
- **Progressive Disclosure**: Show high-level diff summaries before revealing granular multi-file changes.
- **Undo/Revert Safety**: Every AI action must be stored as an immutable atomic git commit or local undo snapshot.
- **Keyboard-First Controls**: Provide shortcuts (\`Cmd+Shift+Y\` to accept, \`Cmd+Shift+N\` to reject) so developers remain in flow.`
  },
  {
    id: 'real-time-voice-gemini-live',
    title: 'Sub-200ms Web Speech Streaming with Gemini Live API',
    slug: 'real-time-voice-gemini-live-api',
    excerpt: 'Connecting client-side Web Audio Worklets with server-side WebSockets and 24kHz raw PCM audio playback.',
    simpleTitle: 'How Real-Time Voice AI Speaks Instantly',
    simpleSummary: 'A simple look at how voice AI listens to your microphone and replies naturally without long delays.',
    publishDate: 'May 28, 2026',
    readTimeMinutes: 7,
    tags: ['Audio', 'Gemini Live API', 'WebSockets', 'Realtime'],
    author: {
      name: 'Alex Vance',
      role: 'AI Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    },
    likes: 180,
    keyTakeaways: [
      'Browser audio input requires 16kHz PCM downsampling to match Gemini Live API specs.',
      'Model output audio is streamed at 24kHz PCM, requiring a separate AudioContext playback buffer.',
      'Maintain an advancing nextStartTime timeline variable to prevent audio stutter and gaps.'
    ],
    codeBlock: {
      title: 'Gapless 24kHz PCM Audio Playback',
      language: 'typescript',
      code: `let nextStartTime = 0;
const outputAudioCtx = new AudioContext({ sampleRate: 24000 });

export function queuePcmChunk(pcmBase64: string) {
  const pcmData = base64ToFloat32(pcmBase64);
  const buffer = outputAudioCtx.createBuffer(1, pcmData.length, 24000);
  buffer.getChannelData(0).set(pcmData);

  const source = outputAudioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(outputAudioCtx.destination);

  const now = outputAudioCtx.currentTime;
  const startTime = Math.max(now, nextStartTime);
  source.start(startTime);
  nextStartTime = startTime + buffer.duration;
}`
    },
    content: `Real-time voice conversation requires low latency and gapless audio output. Unlike standard HTTP request-response loops, the Gemini Live API over WebSockets allows bidirectional streaming of audio chunks while processing user speech concurrently.`
  }
];
