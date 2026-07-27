import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client lazily or handle missing key gracefully
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Developer Knowledge Context for AI Assistant
const DEVELOPER_BIO_CONTEXT = `
You are Alex Vance's AI Copilot. Alex Vance is a Senior Software Engineer specializing in smart AI apps, fast camera tools, search engines, and web applications.
Featured Projects:
1. "SwarmIntelligence" - AI Teamwork Engine where multiple AI helpers work together on big tasks.
2. "VisionFlow AI" - Smart Camera Eye that watches video feeds in real time to spot objects and safety issues.
3. "RAG-Core Engine" - Smart Document Finder that reads thousands of company files and gives exact answers.
4. "Edge Voice Copilot" - Talking Voice Assistant that listens and translates languages live.
5. "CodeRefactor AI" - Automatic Code Cleaner that cleans up messy code and fixes errors.
6. "Neural Canvas Studio" - Visual AI App Builder where you build AI workflows with drag-and-drop.

IMPORTANT INSTRUCTION: Use simple, plain, easy-to-understand English. Avoid complicated technical jargon. Explain things clearly and warmly so anyone can easily understand!
`;

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Assistant Chat Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API key is not configured.",
        fallbackResponse:
          "Hi! I'm Alex Vance's AI Portfolio Assistant. (Note: API Key is currently unconfigured, but you can explore Alex's projects, blog posts, and live coding playground in the navigation tabs above!). Feel free to reach out via the Contact button.",
      });
    }

    const prompt = `System Context:\n${DEVELOPER_BIO_CONTEXT}\n\nUser Question: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    return res.json({ reply: response.text || "No response generated." });
  } catch (err: any) {
    console.error("Error in /api/ai/chat:", err);
    return res.status(500).json({
      error: "Failed to process chat request",
      details: err.message || "Internal server error",
    });
  }
});

// Live Playground AI Endpoint
app.post("/api/ai/playground", async (req, res) => {
  try {
    const { prompt, code, mode, systemInstruction } = req.body;
    
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API Key missing",
        reply: "// Gemini API key not detected.\n// Here is a simulated response output:\nconsole.log('AI Execution complete: processed code snippet successfully.');",
      });
    }

    let fullPrompt = "";
    if (mode === "explain") {
      fullPrompt = `Explain the following code snippet concisely with key performance & structural highlights:\n\n\`\`\`ts\n${code}\n\`\`\``;
    } else if (mode === "refactor") {
      fullPrompt = `Refactor and optimize the following code for clarity, performance, and best practices. Return clean, formatted code with brief comments:\n\n\`\`\`ts\n${code}\n\`\`\``;
    } else if (mode === "generate") {
      fullPrompt = `Generate clean, robust TypeScript/JavaScript code for the following task:\n${prompt}\nInclude concise inline comments and usage example.`;
    } else {
      fullPrompt = prompt || code;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction || "You are an expert AI software engineer. Provide clean, efficient code and crisp technical explanations.",
        temperature: 0.2,
      },
    });

    return res.json({ reply: response.text || "" });
  } catch (err: any) {
    console.error("Error in /api/ai/playground:", err);
    return res.status(500).json({
      error: "AI Generation failed",
      details: err.message,
    });
  }
});

// Blog Article AI Assistant Endpoint
app.post("/api/ai/article-assistant", async (req, res) => {
  try {
    const { articleTitle, articleContent, userQuestion } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API Key missing",
        reply: "Key Takeaways:\n• Real-time multi-agent systems require explicit handoff schemas and strict state locks.\n• Vector database indexing should balance search recall vs latency overhead.\n• Gemini 3.6 Flash offers high throughput for stream parsing.",
      });
    }

    const prompt = `Article Title: "${articleTitle}"\nArticle Snippet:\n${articleContent}\n\nTask: ${
      userQuestion
        ? `Answer this reader's question based on the article: "${userQuestion}"`
        : "Provide a 3-bullet executive summary with key architectural insights and actionable developer takeaways."
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
      },
    });

    return res.json({ reply: response.text || "" });
  } catch (err: any) {
    console.error("Error in /api/ai/article-assistant:", err);
    return res.status(500).json({ error: "Failed to summarize article", details: err.message });
  }
});

async function startServer() {
  // Vite middleware or static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Developer Portfolio Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
