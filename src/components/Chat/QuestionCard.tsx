import { motion } from "framer-motion";
import { User } from "lucide-react";
import clsx from "clsx";

interface QuestionCardProps {
  question: string;
  timestamp?: Date;
  className?: string;
}

export default function QuestionCard({
  question,
  timestamp,
  className,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={clsx(
        "flex justify-end w-full",
        className
      )}
    >
      <div className="flex max-w-4xl gap-4 items-start">

        {/* Message */}

        <div
          className="
          rounded-3xl
          bg-[#18181B]
          border
          border-white/5
          px-6
          py-4
          shadow-xl
          backdrop-blur-xl
          "
        >
          <p className="text-gray-100 leading-8 text-[15px] whitespace-pre-wrap">
            {question}
          </p>

          {timestamp && (
            <span className="text-xs text-zinc-500 mt-3 block">
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        {/* Avatar */}

        <div
          className="
          h-11
          w-11
          rounded-full
          bg-gradient-to-br
          from-blue-500
          to-cyan-400
          flex
          items-center
          justify-center
          shadow-lg
          shadow-blue-500/20
          "
        >
          <User size={18} className="text-white" />
        </div>

      </div>
    </motion.div>
  );
}