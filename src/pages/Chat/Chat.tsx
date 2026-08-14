import { useState } from "react";
import { Sparkles } from "lucide-react";

import ChatWindow from "../../components/Chat/ChatWindow";
import ChatInput from "../../components/Chat/ChatInput";

import SourcePanel from "../../components/Sources/SourcePanel";

import MicButton from "../../components/Voices/MicButton";

import { streamChat } from "../../services/chatService";
import type { ChatMessage, ChatSource, ChatRequest } from "../../types/chat";

export default function Chat() {

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello 👋 I am Nexus AI. How can I help you today?",
      createdAt: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState<ChatSource[]>([]);

  async function sendMessage(content: string, focusMode: string) {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setSources([]);

    let streamedText = "";
    const assistantId = (Date.now() + 1).toString();

    const request: ChatRequest = {
      message: content,
      provider: "gemini",
      focusMode: focusMode,
      history: [...messages, userMessage],
    };

    await streamChat(
      request,
      {
        onToken: (chunk: string) => {
          streamedText += chunk;
          setMessages((prev) => {
            const index = prev.findIndex((m) => m.id === assistantId);
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
            updated[index] = { ...updated[index], content: streamedText };
            return updated;
          });
        },
        onDocuments: (docs: any) => {
          if (Array.isArray(docs)) {
            setSources(docs.map(doc => ({
              id: doc.url || doc.link || Date.now().toString(),
              title: doc.title || "Source",
              url: doc.url || doc.link,
              snippet: doc.snippet,
              sourceType: doc.source_type,
            })));
          }
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
              content: "❌ Something went wrong while generating the response.",
              createdAt: new Date(),
            },
          ]);
          setLoading(false);
        }
      }
    );
  }

  return (
    <div className="flex min-h-screen bg-[#09090B] text-white">

      {/* Chat Area */}

      <div className="flex flex-1 flex-col">

        <header className="border-b border-white/10 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

              <Sparkles size={20} />

            </div>

            <div>

              <h1 className="font-semibold">
                AI Assistant
              </h1>

              <p className="text-xs text-zinc-500">
                Research + Intelligence Engine
              </p>

            </div>

          </div>

        </header>

        <div className="flex-1 overflow-hidden">

          <ChatWindow
            messages={messages}
            loading={loading}
          />

        </div>

        <div className="border-t border-white/10 p-5">

          <div className="flex items-center gap-3">

            <div className="flex-1">

              <ChatInput
                onSend={sendMessage}
                loading={loading}
              />

            </div>

            <MicButton />

          </div>

        </div>

      </div>

      <aside className="hidden w-96 border-l border-white/10 p-5 xl:block">

        <SourcePanel
          sources={sources}
          open={sources.length > 0}
          onClose={() => setSources([])}
          loading={loading}
        />

      </aside>

    </div>

  );

}