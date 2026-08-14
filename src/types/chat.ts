
export type Provider = "gemini" | "groq";
export type ChatProvider = Provider;

export type ChatRole = "user" | "assistant" | "system";

export interface ChatSource {
  id: string;
  title: string;
  url: string;
  domain?: string;
  snippet?: string;
  favicon?: string;
  thumbnail?: string;
  source?: string;
  sourceType?: string;
  date?: string;
  relevance?: number;
  author?: string;
  site_name?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface FollowUpQuestion {
  id: string;
  question: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  answer?: string;
  createdAt: Date;
  provider?: Provider;
  sources?: ChatSource[];
  source?: string;
  url?: string;
  urls?: string[];
  status?: string;
  videos?: Array<{
    title: string;
    url: string;
    content?: string;
    thumbnail?: string | null;
    [key: string]: unknown;
  }>;
  suggestions?: string[];
  metadata?: Record<string, unknown>;
  citations?: unknown[];
  [key: string]: unknown;
}

export interface ChatRequest {
  message: string;
  provider: Provider;
  focusMode: string;
  history: ChatMessage[];
}

export interface StreamingChunk {
  type:
    | "token"
    | "source"
    | "done"
    | "error";
  content?: string;
  source?: ChatSource;
}

export interface ChatResponse {
  message: ChatMessage;
  followUps: FollowUpQuestion[];
  sources: ChatSource[];
}

export function normalizeSource(raw: unknown): ChatSource {
  if (typeof raw !== "object" || raw === null) {
    return {
      id: String(Date.now()),
      title: String(raw || "Source"),
      url: "",
    };
  }

  const obj = raw as Record<string, unknown>;
  const url = String(obj.url || obj.link || obj.href || "");
  const title = String(obj.title || obj.name || obj.source || url || "Source");
  const id = String(obj.id || url || Date.now());
  const snippet = obj.snippet ? String(obj.snippet) : obj.summary ? String(obj.summary) : obj.content ? String(obj.content) : undefined;
  const sourceType = obj.sourceType ? String(obj.sourceType) : obj.source_type ? String(obj.source_type) : undefined;

  let domain = "";
  let favicon = obj.favicon ? String(obj.favicon) : undefined;

  if (url) {
    try {
      const parsedUrl = new URL(url);
      domain = parsedUrl.hostname.replace(/^www\./, "");
      if (!favicon) {
        favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      }
    } catch {
      domain = "";
    }
  }

  const rawThumb = obj.thumbnail || obj.img_src || obj.image;
  const thumbnail = typeof rawThumb === "string"
    ? rawThumb
    : rawThumb && typeof rawThumb === "object"
    ? (rawThumb as any).src || (rawThumb as any).url || undefined
    : undefined;

  return {
    ...obj,
    id,
    title,
    url,
    domain,
    snippet,
    sourceType,
    favicon,
    thumbnail,
  };
}

export function normalizeChatMessage(raw: unknown): ChatMessage {
  if (typeof raw !== "object" || raw === null) {
    return {
      id: String(Date.now()),
      role: "assistant",
      content: String(raw || ""),
      createdAt: new Date(),
    };
  }

  const obj = raw as Record<string, unknown>;
  const id = String(obj.id || Date.now());
  const role: ChatRole = (obj.role as ChatRole) || "assistant";
  const content = String(obj.content || obj.answer || obj.message || obj.text || "");
  const answer = obj.answer ? String(obj.answer) : undefined;
  const createdAt = obj.createdAt instanceof Date ? obj.createdAt : obj.createdAt ? new Date(String(obj.createdAt)) : new Date();

  let sources: ChatSource[] | undefined = undefined;
  if (Array.isArray(obj.sources)) {
    sources = obj.sources.map(normalizeSource);
  } else if (Array.isArray(obj.documents_found)) {
    sources = (obj.documents_found as unknown[]).map(normalizeSource);
  }

  return {
    ...obj,
    id,
    role,
    content,
    answer,
    createdAt,
    sources: sources || (obj.sources as ChatSource[] | undefined),
  };
}