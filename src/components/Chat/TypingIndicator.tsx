import { motion } from "framer-motion";

interface TypingIndicatorProps {
  text?: string;
}

export default function TypingIndicator({
  text = "AI is typing...",
}: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-3 px-2 py-1">

      {/* Animated Dots */}

      <div className="flex gap-1">

        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="h-2.5 w-2.5 rounded-full bg-blue-400"
            animate={{
              y: [0, -6, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.7,
              delay: index * 0.15,
            }}
          />
        ))}

      </div>

      {/* Text */}

      <motion.span
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.8,
        }}
        className="text-sm text-zinc-400"
      >
        {text}
      </motion.span>

    </div>
  );
}