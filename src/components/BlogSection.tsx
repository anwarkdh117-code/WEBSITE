import React, { useState, useMemo } from 'react';
import { BlogArticle } from '../types';
import { BLOG_ARTICLES } from '../data/blogData';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Tag, 
  ThumbsUp, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  X as CloseIcon, 
  Copy, 
  Check, 
  Send, 
  Bot, 
  ArrowRight,
  Share2
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likedArticles, setLikedArticles] = useState<Record<string, number>>({});
  
  // Reader Modal State
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Article AI Copilot State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const tags = ['All', 'Agents', 'Gemini API', 'RAG', 'Architecture', 'TypeScript', 'Performance'];

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesTag = selectedTag === 'All' || article.tags.includes(selectedTag);
      const matchesSearch =
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleLikeArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedArticles((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleOpenArticle = (article: BlogArticle) => {
    setActiveArticle(article);
    setAiQuestion('');
    setAiAnswer('');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAskArticleAi = async (customQ?: string) => {
    if (!activeArticle) return;
    const q = customQ || aiQuestion;
    setAiLoading(true);

    try {
      const res = await fetch('/api/ai/article-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleTitle: activeArticle.title,
          articleContent: activeArticle.content,
          userQuestion: q || undefined
        })
      });

      const data = await res.json();
      setAiAnswer(data.reply || 'No response generated.');
    } catch (err) {
      setAiAnswer('AI Summarizer unavailable. Key takeaway: Enforce typed handoff schemas and strict state locks.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <section id="blog-section" className="py-16 md:py-24 bg-slate-950 relative border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 font-mono text-xs mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Integrated Technical Blog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              AI Engineering Insights & Articles
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-mono">
              In-depth tutorials, system benchmarks, and AI architecture breakdowns.
            </p>
          </div>

          {/* Bookmarks Counter */}
          <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-cyan-400" />
            <span>{bookmarkedIds.length} Saved Articles</span>
          </div>
        </div>

        {/* Toolbar Filter */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-8 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => {
            const isBookmarked = bookmarkedIds.includes(article.id);
            const totalLikes = article.likes + (likedArticles[article.id] || 0);

            return (
              <article
                key={article.id}
                onClick={() => handleOpenArticle(article)}
                className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 shadow-lg cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Tags & Bookmarks */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 text-[10px] font-mono rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(article.id, e)}
                      className={`p-2 rounded-xl transition-colors ${
                        isBookmarked ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark Article'}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  {article.simpleSummary && (
                    <div className="p-3 bg-cyan-950/40 border border-cyan-800/50 rounded-xl mb-3 text-xs text-cyan-200 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[10px] text-cyan-400 uppercase tracking-wider font-mono">
                        <Sparkles className="w-3 h-3 text-cyan-400" /> Easy Summary:
                      </div>
                      <p className="leading-relaxed">{article.simpleSummary}</p>
                    </div>
                  )}

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                </div>

                {/* Author Info & Meta */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-slate-200 font-semibold">{article.author.name}</div>
                      <div className="text-[10px] text-slate-500">{article.publishDate}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> {article.readTimeMinutes} min
                    </span>

                    <button
                      onClick={(e) => handleLikeArticle(article.id, e)}
                      className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> {totalLikes}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Topbar */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950/80">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  {activeArticle.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                      {t}
                    </span>
                  ))}
                  <span className="text-xs text-slate-500 font-mono">• {activeArticle.publishDate} • {activeArticle.readTimeMinutes} min read</span>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight">{activeArticle.title}</h3>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
              
              {/* Executive Key Takeaways Box */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Key Executive Takeaways
                  </span>
                  <button
                    onClick={() => handleAskArticleAi()}
                    className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Generate AI Summary</span>
                  </button>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 leading-relaxed pt-1">
                  {activeArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Main Article Content */}
              <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4 font-sans">
                {activeArticle.content}
              </div>

              {/* Code Snippet Box */}
              {activeArticle.codeBlock && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">{activeArticle.codeBlock.title}</span>
                    <button
                      onClick={() => handleCopyCode(activeArticle.codeBlock!.code)}
                      className="px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded text-xs font-mono flex items-center gap-1"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                    <code>{activeArticle.codeBlock.code}</code>
                  </pre>
                </div>
              )}

              {/* AI Assistant Section Inside Article Modal */}
              <div className="bg-slate-950/90 border border-cyan-800/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-cyan-400">
                  <Bot className="w-4 h-4" />
                  <span>Ask AI Copilot About This Article</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., How does this compare to LangChain or Gemini Live API?"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskArticleAi()}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => handleAskArticleAi()}
                    disabled={aiLoading}
                    className="px-4 py-2 bg-cyan-500 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:bg-cyan-400 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ask AI</span>
                  </button>
                </div>

                {aiLoading && (
                  <div className="text-xs font-mono text-cyan-400 animate-pulse pt-2">
                    ⚡ Gemini 3.6 Flash analyzing article content...
                  </div>
                )}

                {aiAnswer && (
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line font-mono">
                    {aiAnswer}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>Written by {activeArticle.author.name}</span>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-mono"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
