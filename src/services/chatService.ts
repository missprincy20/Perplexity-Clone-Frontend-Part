// Is file ka kaam hoga:
// Backend ko request bhejega
// Stream read karega
// Response ko decode karega
// UI ko continuously update karega

import type { ChatRequest } from "../types/chat";

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/chat`;

export async function streamChat(
  body: ChatRequest,
  callbacks: {
    onToken: (token: string) => void;
    onDocuments: (docs: any) => void;
    onSuggestions?: (suggestions: string) => void;
    onStatus?: (status: any) => void;
    onData?: (data: any) => void;
    onCompleted: () => void;
    onError: (err: any) => void;
  }
) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Keep the last incomplete line in the buffer

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          console.log("[NEXUS FRONTEND RAW RESPONSE]", parsed);
          if (parsed.type === "token") callbacks.onToken(parsed.data);
          else if (parsed.type === "sources" || parsed.type === "documents_found") callbacks.onDocuments(parsed.data);
          else if (parsed.type === "suggestions") callbacks.onSuggestions?.(parsed.data);
          else if (parsed.type === "status") callbacks.onStatus?.(parsed.data);
          else if (parsed.type === "data") callbacks.onData?.(parsed.data);
          else if (parsed.type === "completed") callbacks.onCompleted();
          else if (parsed.type === "error" || parsed.type === "suggestion_error") callbacks.onError(new Error(parsed.message));
        } catch (e) {
          console.error("Failed to parse stream line", line, e);
        }
      }
    }
    
    // Process any remaining buffer
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer);
        console.log("[NEXUS FRONTEND RAW RESPONSE]", parsed);
        if (parsed.type === "token") callbacks.onToken(parsed.data);
        else if (parsed.type === "sources" || parsed.type === "documents_found") callbacks.onDocuments(parsed.data);
        else if (parsed.type === "suggestions") callbacks.onSuggestions?.(parsed.data);
        else if (parsed.type === "status") callbacks.onStatus?.(parsed.data);
        else if (parsed.type === "data") callbacks.onData?.(parsed.data);
        else if (parsed.type === "completed") callbacks.onCompleted();
        else if (parsed.type === "error" || parsed.type === "suggestion_error") callbacks.onError(new Error(parsed.message));
      } catch (e) {
        console.error("Failed to parse stream line", buffer, e);
      }
    }

    callbacks.onCompleted();
  } catch (err) {
    callbacks.onError(err);
  }
}