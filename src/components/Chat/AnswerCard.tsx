import { motion } from "framer-motion";
import {
  Bot,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Info,
} from "lucide-react";
import { useState } from "react";
import MarkdownRenderer from "../Markdown/MarkdownRenderer";
import StreamingText from "./StreamingText";
import type { ChatMessage } from "../../types/chat";

interface AnswerCardProps {
  answer?: string;
  message?: ChatMessage;
  isStreaming?: boolean;
  timestamp?: Date;
}

export default function AnswerCard({
  answer,
  message,
  isStreaming = false,
  timestamp,
}: AnswerCardProps) {
  const [copied, setCopied] = useState(false);

  const displayContent = message?.content || message?.answer || answer || "";
  const displayTimestamp = message?.createdAt || timestamp;
  const singleUrl = message?.url;
  const urlsList = message?.urls || (singleUrl ? [singleUrl] : []);
  const sourceBadge = message?.source;
  const metadata = message?.metadata;

  async function handleCopy() {
    await navigator.clipboard.writeText(displayContent);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex gap-4 w-full"
    >
      {/* AI Avatar */}

      <div
        className="
        h-11
        w-11
        shrink-0
        rounded-full
        bg-gradient-to-br
        from-[#4F8CFF]
        to-cyan-400
        flex
        items-center
        justify-center
        shadow-lg
        shadow-blue-500/30
        "
      >
        <Bot
          size={18}
          className="text-white"
        />
      </div>

      {/* Message */}

      <div className="flex-1">

        <div
          className="
          rounded-3xl
          border
          border-white/5
          bg-[#111113]
          backdrop-blur-xl
          px-7
          py-6
          shadow-xl
          space-y-4
          "
        >
          {/* Source badge if present */}
          {sourceBadge && typeof sourceBadge === "string" && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400 font-medium border border-blue-500/20">
              <span>Source: {sourceBadge}</span>
            </div>
          )}

          {/* Render Agent Status Step if present */}
          {message?.status && (
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs text-blue-400 font-medium animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              <span className="capitalize">{String(message.status).replace(/_/g, " ")}</span>
            </div>
          )}

          {/* Main Answer Content */}
          {displayContent ? (
            isStreaming ? (
              <StreamingText
                text={displayContent}
                streaming
              />
            ) : (
              <MarkdownRenderer
                content={displayContent}
              />
            )
          ) : null}

          {/* Render Sources Section (Perplexity-style) if provided */}
          {message?.sources && Array.isArray(message.sources) && message.sources.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Sources ({message.sources.length})
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {message.sources.map((src, idx) => {
                  const domainName = src.domain || (src.url ? new URL(src.url).hostname.replace(/^www\./, "") : "");
                  return (
                    <a
                      key={src.id || idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-blue-500/40 hover:bg-white/10"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-[10px] font-bold text-blue-400 border border-blue-500/20">
                            {idx + 1}
                          </span>
                          {domainName && (
                            <span className="truncate text-[11px] font-medium text-zinc-400 group-hover:text-zinc-300">
                              {domainName}
                            </span>
                          )}
                        </div>
                        <h5 className="line-clamp-2 text-xs font-semibold text-white group-hover:text-blue-400">
                          {src.title}
                        </h5>
                        {src.snippet && (
                          <p className="line-clamp-2 text-[11px] text-zinc-400">
                            {src.snippet}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/5">
                        <span className="capitalize">{src.sourceType || "Web"}</span>
                        <ExternalLink size={10} className="text-zinc-500 group-hover:text-blue-400 transition" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Render Video Results if provided */}
          {message?.videos && Array.isArray(message.videos) && message.videos.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Video Results ({message.videos.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {message.videos.map((vid: any, idx: number) => {
                  const rawThumb = vid.thumbnail || vid.img_src || vid.image;
                  const thumbUrl = typeof rawThumb === "string"
                    ? rawThumb
                    : rawThumb && typeof rawThumb === "object"
                    ? (rawThumb.src || rawThumb.url || null)
                    : null;
                  const descriptionText = vid.content || vid.snippet || vid.description || vid.summary || "";

                  return (
                    <a
                      key={idx}
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-blue-500/40 hover:bg-white/10"
                    >
                      {thumbUrl && (
                        <div className="relative mb-2.5 aspect-video w-full overflow-hidden rounded-xl bg-black/40">
                          <img
                            src={thumbUrl}
                            alt={vid.title || "Video"}
                            className="h-full w-full object-cover transition group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h5 className="line-clamp-2 text-xs font-semibold text-white group-hover:text-blue-400">
                        {vid.title || "Video"}
                      </h5>
                      {descriptionText && (
                        <p className="mt-1 line-clamp-2 text-[11px] text-zinc-400">
                          {descriptionText}
                        </p>
                      )}
                      <span className="mt-2 text-[10px] text-blue-400 truncate">
                        {vid.url}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Render Follow-up Suggestions if provided */}
          {message?.suggestions && Array.isArray(message.suggestions) && message.suggestions.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Suggested Follow-ups
              </h4>
              <div className="flex flex-wrap gap-2">
                {message.suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
                  >
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render Clickable URLs if provided */}
          {urlsList.length > 0 && (
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2">
              {urlsList.map((urlItem, idx) => (
                <a
                  key={idx}
                  href={urlItem}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs text-blue-400 hover:text-blue-300 transition border border-white/10"
                >
                  <ExternalLink size={13} />
                  <span className="max-w-xs truncate">{urlItem}</span>
                </a>
              ))}
            </div>
          )}

          {/* Render Metadata expander if present */}
          {metadata && typeof metadata === "object" && Object.keys(metadata).length > 0 && (
            <details className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-3 text-xs text-zinc-400">
              <summary className="cursor-pointer font-medium text-zinc-300 hover:text-white flex items-center gap-2 select-none">
                <Info size={14} className="text-blue-400" />
                <span>Agent Metadata Details</span>
              </summary>
              <div className="mt-2 space-y-1 overflow-x-auto font-mono text-[11px]">
                {Object.entries(metadata).map(([key, val]) => (
                  <div key={key} className="flex gap-2 py-0.5 border-b border-white/5 last:border-0">
                    <span className="text-blue-400 font-semibold">{key}:</span>
                    <span className="text-zinc-200">
                      {typeof val === "object" ? JSON.stringify(val) : String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          )}

        </div>

        {/* Footer */}

        <div className="flex items-center gap-3 mt-3 pl-2">

          <button
            onClick={handleCopy}
            className="
            p-2
            rounded-xl
            hover:bg-white/5
            transition
            "
          >
            <Copy size={17} />
          </button>

          <button
            className="
            p-2
            rounded-xl
            hover:bg-white/5
            transition
            "
          >
            <RotateCcw size={17} />
          </button>

          <button
            className="
            p-2
            rounded-xl
            hover:bg-white/5
            transition
            "
          >
            <ThumbsUp size={17} />
          </button>

          <button
            className="
            p-2
            rounded-xl
            hover:bg-white/5
            transition
            "
          >
            <ThumbsDown size={17} />
          </button>

         {displayTimestamp && (
            <span className="text-xs text-zinc-500 ml-auto">
              {displayTimestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}

          {copied && (
            <span className="text-xs text-blue-400">
              Copied
            </span>
          )}

        </div>

      </div>

    </motion.div>
  );
}