import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import ThinkingAnimation from "./ThinkingAnimation";
import type { ChatMessage } from "../../types/chat";

interface ChatWindowProps {
  messages: ChatMessage[];
  loading?: boolean;
  streaming?: boolean;
}

export default function ChatWindow({
  messages,
  loading = false,
  streaming = false,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div
            className="
            h-24
            w-24
            mx-auto
            rounded-full
            bg-gradient-to-br
            from-blue-500
            to-cyan-400
            blur-2xl
            opacity-40
            "
          />

          <h2 className="mt-8 text-3xl font-semibold text-white">
            Ask anything
          </h2>

          <p className="mt-3 text-zinc-400 max-w-md">
            Search the web, summarize documents,
            generate ideas and get AI powered answers.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="
      flex-1
      overflow-y-auto
      px-6
      py-8
      scrollbar-thin
      "
    >
      <div className="mx-auto max-w-5xl space-y-8">

        <AnimatePresence>

          {messages.map((message) => (

            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >

              {message.role === "user" ? (

                <QuestionCard
                  question={message.content}
                  timestamp={message.createdAt}
                />

              ) : (

                <AnswerCard
                  answer={message.content}
                  timestamp={message.createdAt}
                  isStreaming={streaming}
                />

              )}

            </motion.div>

          ))}

        </AnimatePresence>

        {loading && (
          <ThinkingAnimation />
        )}

        <div ref={bottomRef} />

      </div>
    </div>
  );
}