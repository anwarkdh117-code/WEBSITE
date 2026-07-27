export type ProjectCategory = 'All' | 'Agents & LLMs' | 'Computer Vision' | 'DevTools' | 'Infrastructure';

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  simpleTitle?: string;
  simpleSummary?: string;
  category: ProjectCategory;
  tags: string[];
  stars: number;
  forks: number;
  status: 'Deployed' | 'Active Beta' | 'Open Source' | 'Research';
  featured: boolean;
  metrics: ProjectMetric[];
  architectureOverview: string;
  codeSnippet: string;
  demoType: 'terminal' | 'vision' | 'rag' | 'audio';
  demoConfig: {
    inputs: string[];
    sampleOutput: string;
    terminalLogs?: string[];
  };
  githubUrl: string;
  liveUrl?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  simpleTitle?: string;
  simpleSummary?: string;
  publishDate: string;
  readTimeMinutes: number;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  likes: number;
  keyTakeaways: string[];
  codeBlock?: {
    language: string;
    code: string;
    title: string;
  };
}

export interface PlaygroundPreset {
  id: string;
  title: string;
  category: 'JavaScript REPL' | 'Gemini AI API' | 'Algorithms' | 'Data Structures';
  description: string;
  code: string;
  mode: 'js' | 'ai';
  aiPrompt?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0-100
    experience: string;
    featuredTag?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
