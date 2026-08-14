import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function ThinkingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
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
        <Bot size={18} className="text-white" />
      </div>

      {/* Thinking Card */}
      <div
        className="
          rounded-3xl
          border
          border-white/5
          bg-[#111113]
          backdrop-blur-xl
          px-6
          py-5
          shadow-xl
          min-w-[240px]
        "
      >
        <div className="flex items-center gap-3">
          <span className="text-zinc-300 font-medium">
            Thinking
          </span>

          {/* Animated Dots */}
          <div className="flex gap-1">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: dot * 0.15,
                }}
              />
            ))}
          </div>
        </div>

        <p className="text-sm text-zinc-500 mt-3">
          Generating the best possible answer...
        </p>
      </div>
    </motion.div>
  );
}