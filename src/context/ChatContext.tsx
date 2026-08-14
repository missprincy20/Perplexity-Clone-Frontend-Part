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
} from "../types/chat";

interface ChatContextType {
  messages: ChatMessage[];

  loading: boolean;

  sources: ChatSource[];

  sendMessage: (content: string) => Promise<void>;

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
    {
      id: "1",
      role: "assistant",
      content:
        "Hello 👋 I am Nexus AI. How can I help you today?",
      createdAt: new Date(),
    },
  ]);

  const [loading, setLoading] = useState(false);

  const [sources, setSources] = useState<ChatSource[]>([]);

  function addMessage(message: ChatMessage) {
    setMessages((prev) => [...prev, message]);
  }

  async function sendMessage(content: string) {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    addMessage(userMessage);

    setLoading(true);

    let streamedText = "";

    const assistantId = (Date.now() + 1).toString();

    const request: ChatRequest = {
      message: content,
      provider: "gemini",
      focusMode: "academic",
      history: [...messages, userMessage],
    };

    await streamChat(
      request,

      // Streaming chunks
      (chunk: string) => {
        streamedText += chunk;

        setMessages((prev) => {
          const index = prev.findIndex(
            (m) => m.id === assistantId
          );

          if (index === -1) {
            return [
              ...prev,
              {
                id: assistantId,
                role: "assistant",
                content: streamedText,
                createdAt: new Date(),
              },
            ];
          }

          const updated = [...prev];

          updated[index] = {
            ...updated[index],
            content: streamedText,
          };

          return updated;
        });
      },

      // Stream Finished
      () => {
        setLoading(false);
      },

      // Error
      (error) => {
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