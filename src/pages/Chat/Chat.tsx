import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles } from "lucide-react";

import ChatWindow from "../../components/Chat/ChatWindow";
import ChatInput from "../../components/Chat/ChatInput";

import SourcePanel from "../../components/Sources/SourcePanel";

import MicButton from "../../components/Voices/MicButton";

import { streamChat } from "../../services/chatService";
import {
  type ChatMessage,
  type ChatSource,
  type ChatRequest,
  type Provider,
  normalizeSource,
  normalizeChatMessage,
} from "../../types/chat";

const modeDetails: Record<string, { title: string; subtitle: string }> = {
  academic: {
    title: "Academic Search",
    subtitle: "Peer-reviewed papers + Scholarly research engine",
  },
  web: {
    title: "Web Search",
    subtitle: "Real-time web search + Intelligence engine",
  },
  reddit: {
    title: "Reddit Search",
    subtitle: "Community discussions + Reddit insights engine",
  },
  youtube: {
    title: "YouTube Search",
    subtitle: "Video search + Transcript intelligence engine",
  },
  video: {
    title: "Video Search",
    subtitle: "Video content analysis & search",
  },
  image: {
    title: "Image Search",
    subtitle: "Visual search & image context engine",
  },
  writing: {
    title: "Writing Assistant",
    subtitle: "Creative writing, editing & content assistant",
  },
};

export default function Chat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const validFocusModes = [
    "academic",
    "web",
    "reddit",
    "youtube",
    "video",
    "image",
    "writing",
  ];
  const modeParam = searchParams.get("mode");
  const activeFocusMode = validFocusModes.includes(modeParam || "")
    ? modeParam!
    : "academic";

  const currentDetails = modeDetails[activeFocusMode] || modeDetails.academic;

  const [messages, setMessages] = useState<ChatMessage[]>([
    normalizeChatMessage({
      id: "1",
      role: "assistant",
      content: "Hello 👋 I am Nexus AI. How can I help you today?",
      createdAt: new Date(),
    }),
  ]);
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState<ChatSource[]>([]);

  async function sendMessage(content: string, focusMode: string, provider: Provider = "groq") {
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
            const index = prev.findIndex((m) => m.id === assistantId);
            if (index === -1) {
              const newMsg = normalizeChatMessage({
                id: assistantId,
                role: "assistant",
                content: streamedText,
                createdAt: new Date(),
              });
              console.log("[NEXUS FRONTEND NORMALIZED RESPONSE]", newMsg);
              return [...prev, newMsg];
            }
            const updated = [...prev];
            const updatedMsg = normalizeChatMessage({
              ...updated[index],
              content: streamedText,
            });
            console.log("[NEXUS FRONTEND NORMALIZED RESPONSE]", updatedMsg);
            updated[index] = updatedMsg;
            return updated;
          });
        },
        onDocuments: (docs: any) => {
          console.log("[NEXUS FRONTEND RAW DOCUMENTS]", docs);
          if (Array.isArray(docs)) {
            const normalizedSources = docs.map(normalizeSource);
            setSources(normalizedSources);
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
                    sources: normalizedSources,
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
                sources: normalizedSources,
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
            normalizeChatMessage({
              id: Date.now().toString(),
              role: "assistant",
              content: "❌ Something went wrong while generating the response.",
              createdAt: new Date(),
            }),
          ]);
          setLoading(false);
        }
      }
    );
  }

  return (
    <div className="flex h-screen max-h-screen w-full overflow-hidden bg-[#09090B] text-white">

      {/* Chat Area */}

      <div className="flex flex-1 flex-col h-full min-w-0 overflow-hidden">

        <header className="border-b border-white/10 px-6 py-4 shrink-0">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

              <Sparkles size={20} />

            </div>

            <div>

              <h1 className="font-semibold">
                {currentDetails.title}
              </h1>

              <p className="text-xs text-zinc-500">
                {currentDetails.subtitle}
              </p>

            </div>

          </div>

        </header>

        {/* Scrollable Conversation Area */}
        <div className="flex-1 overflow-hidden min-h-0 flex flex-col">

          <ChatWindow
            messages={messages}
            loading={loading}
          />

        </div>

        {/* Fixed Composer at Bottom */}
        <div className="shrink-0 border-t border-white/10 p-5 bg-[#09090B]">

          <div className="flex items-center gap-3 w-full px-6">

            <div className="flex-1 min-w-0">

              <ChatInput
                onSend={sendMessage}
                loading={loading}
                activeFocusMode={activeFocusMode}
                onFocusModeChange={(newMode) => setSearchParams({ mode: newMode })}
              />

            </div>

            <MicButton />

          </div>

        </div>

      </div>

      <aside className="hidden w-96 shrink-0 border-l border-white/10 p-5 xl:block overflow-y-auto h-full">

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