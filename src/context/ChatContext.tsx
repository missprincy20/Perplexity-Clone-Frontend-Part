import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";

import { streamChat } from "../services/chatService";

import type {
  ChatMessage,
  ChatRequest,
  ChatSource,
  Provider,
} from "../types/chat";
import { normalizeSource, normalizeChatMessage } from "../types/chat";

interface ChatContextType {
  messages: ChatMessage[];

  loading: boolean;

  sources: ChatSource[];

  sendMessage: (content: string, focusMode?: string, provider?: Provider) => Promise<void>;

  addMessage: (message: ChatMessage) => void;

  setLoading: (value: boolean) => void;

  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({
  children,
}: ChatProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    normalizeChatMessage({
      id: "1",
      role: "assistant",
      content:
        "Hello 👋 I am Nexus AI. How can I help you today?",
      createdAt: new Date(),
    }),
  ]);

  const [loading, setLoading] = useState(false);

  const [sources, setSources] = useState<ChatSource[]>([]);

  function addMessage(message: ChatMessage) {
    setMessages((prev) => [...prev, message]);
  }

  async function sendMessage(content: string, focusMode: string = "web", provider: Provider = "groq") {
    if (!content.trim()) return;

    const userMessage: ChatMessage = normalizeChatMessage({
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date(),
    });

    const assistantId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = normalizeChatMessage({
      id: assistantId,
      role: "assistant",
      content: "",
      createdAt: new Date(),
    });

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setLoading(true);
    setSources([]);

    let streamedText = "";

    const request: ChatRequest = {
      message: content,
      provider: provider,
      focusMode: focusMode,
      history: [...messages, userMessage],
    };

    await streamChat(
      request,
      {
        onToken: (chunk: string) => {
          streamedText += chunk;

          setMessages((prev) => {
            const index = prev.findIndex(
              (m) => m.id === assistantId
            );

            if (index === -1) {
              return [
                ...prev,
                normalizeChatMessage({
                  id: assistantId,
                  role: "assistant",
                  content: streamedText,
                  createdAt: new Date(),
                }),
              ];
            }

            const updated = [...prev];

            updated[index] = normalizeChatMessage({
              ...updated[index],
              content: streamedText,
            });

            return updated;
          });
        },
        onDocuments: (docs: any) => {
          if (Array.isArray(docs)) {
            const normalizedDocs = docs.map(normalizeSource);
            setSources(normalizedDocs);
            setMessages((prev) => {
              const index = prev.findIndex((m) => m.id === assistantId);
              if (index === -1) {
                return [
                  ...prev,
                  normalizeChatMessage({
                    id: assistantId,
                    role: "assistant",
                    content: "",
                    createdAt: new Date(),
                    sources: normalizedDocs,
                    ...(focusMode === "video" && {
                      videos: docs.map((d: any) => ({
                        title: String(d.title || d.name || "Video"),
                        url: String(d.url || d.link || d.href || ""),
                        content: d.content || d.snippet || undefined,
                        thumbnail: d.thumbnail || d.img_src || null,
                      })),
                    }),
                  }),
                ];
              }
              const updated = [...prev];
              updated[index] = normalizeChatMessage({
                ...updated[index],
                sources: normalizedDocs,
                ...(focusMode === "video" && {
                  videos: docs.map((d: any) => ({
                    title: String(d.title || d.name || "Video"),
                    url: String(d.url || d.link || d.href || ""),
                    content: d.content || d.snippet || undefined,
                    thumbnail: d.thumbnail || d.img_src || null,
                  })),
                }),
              });
              return updated;
            });
          }
        },
        onStatus: (statusData: any) => {
          if (statusData?.step) {
            setMessages((prev) => {
              const index = prev.findIndex((m) => m.id === assistantId);
              if (index !== -1) {
                const updated = [...prev];
                updated[index] = normalizeChatMessage({
                  ...updated[index],
                  status: statusData.step,
                });
                return updated;
              }
              return prev;
            });
          }
        },
        onData: (dataPayload: any) => {
          const videoArray = Array.isArray(dataPayload)
            ? dataPayload
            : dataPayload?.type === "videos" && Array.isArray(dataPayload?.data)
            ? dataPayload.data
            : Array.isArray(dataPayload?.data)
            ? dataPayload.data
            : null;

          if (videoArray) {
            const mappedVideos = videoArray.map((v: any) => ({
              ...v,
              title: String(v.title || v.name || "Video"),
              url: String(v.url || v.link || v.href || ""),
              content: v.content || v.snippet || v.description || v.summary || undefined,
              thumbnail: v.thumbnail || v.img_src || v.image || null,
            }));

            setMessages((prev) => {
              const index = prev.findIndex((m) => m.id === assistantId);
              if (index === -1) {
                return [
                  ...prev,
                  normalizeChatMessage({
                    id: assistantId,
                    role: "assistant",
                    content: "",
                    createdAt: new Date(),
                    videos: mappedVideos,
                  }),
                ];
              }
              const updated = [...prev];
              updated[index] = normalizeChatMessage({
                ...updated[index],
                videos: mappedVideos,
              });
              return updated;
            });
          }
        },
        onSuggestions: (chunk: string) => {
          setMessages((prev) => {
            const index = prev.findIndex((m) => m.id === assistantId);
            if (index !== -1) {
              const updated = [...prev];
              const currentSuggestions = updated[index].suggestions || [];
              const lastSuggestion = currentSuggestions[currentSuggestions.length - 1] || "";
              let newSuggestions: string[];
              if (chunk.includes("\n")) {
                const parts = chunk.split("\n").filter(Boolean);
                newSuggestions = [...currentSuggestions, ...parts];
              } else if (currentSuggestions.length === 0) {
                newSuggestions = [chunk];
              } else {
                newSuggestions = [...currentSuggestions.slice(0, -1), lastSuggestion + chunk];
              }
              updated[index] = normalizeChatMessage({
                ...updated[index],
                suggestions: newSuggestions,
              });
              return updated;
            }
            return prev;
          });
        },
        onCompleted: () => {
          setLoading(false);
        },
        onError: (error: any) => {
          console.error("Chat Error:", error);

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "assistant",
              content:
                "❌ Something went wrong while generating the response.",
              createdAt: new Date(),
            },
          ]);

          setLoading(false);
        }
      }
    );
  }

  function clearChat() {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Hello 👋 I am Nexus AI. How can I help you today?",
        createdAt: new Date(),
      },
    ]);

    setSources([]);
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        sources,
        sendMessage,
        addMessage,
        setLoading,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChat must be used inside ChatProvider"
    );
  }

  return context;
}