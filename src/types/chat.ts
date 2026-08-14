
export type ChatProvider = |"gemini" | "groq";

export type ChatRole = |"user" | "assistant" | "system";

export interface ChatSource {

  id: string;
  title: string;
  url: string;
  snippet?: string;
  favicon?: string;
  source?: string;

}

export interface FollowUpQuestion {
  id: string;
  question: string;

}

export interface ChatMessage {

  id: string;
  role: ChatRole;
  content: string;
  createdAt: Date;
  provider?: ChatProvider;
  sources?: ChatSource[];

}

export interface ChatRequest {

  message: string;
  provider: ChatProvider;
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