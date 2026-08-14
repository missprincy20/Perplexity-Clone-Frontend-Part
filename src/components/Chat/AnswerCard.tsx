import { motion } from "framer-motion";
import {
  Bot,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useState } from "react";
import MarkdownRenderer from "../Markdown/MarkdownRenderer";
import StreamingText from "./StreamingText";

interface AnswerCardProps {
  answer: string;
  isStreaming?: boolean;
  timestamp?: Date;
}

export default function AnswerCard({
  answer,
  isStreaming = false,
  timestamp,
}: AnswerCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(answer);

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
          "
        >

          {/* Markdown

          <MarkdownRenderer
            content={answer}
          />

          {/* Streaming Cursor */}

          {/* {isStreaming && (
            <span className="inline-block ml-1 h-5 w-[3px] animate-pulse rounded bg-blue-500" />
          )} */} 

          {
            isStreaming ? (
                <StreamingText
                text={answer}
                streaming
                />
            ) : (
                <MarkdownRenderer
                content={answer}
                />
            )
            }

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

         {timestamp && (
            <span className="text-xs text-zinc-500 ml-auto">
              {timestamp.toLocaleTimeString([], {
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