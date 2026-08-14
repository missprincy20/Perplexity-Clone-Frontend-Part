import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";

interface SuggestionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function SuggestionCard({
  title,
  description,
  icon,
  onClick,
}: SuggestionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      group
      relative
      w-full
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-[#111113]
      p-5
      text-left
      shadow-xl
      backdrop-blur-xl
      hover:border-blue-500/40
      "
    >

      {/* Glow Background */}

      <div
        className="
        absolute
        inset-0
        opacity-0
        transition
        duration-300
        group-hover:opacity-100
        bg-gradient-to-br
        from-blue-500/10
        via-transparent
        to-cyan-500/10
        "
      />


      {/* Content */}

      <div className="relative z-10">

        {/* Top */}

        <div
          className="
          flex
          items-start
          justify-between
          "
        >

          {/* Icon */}

          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-blue-500/10
            text-blue-400
            transition
            group-hover:bg-blue-500/20
            "
          >
            {icon}
          </div>


          {/* Arrow */}

          <ArrowUpRight
            size={18}
            className="
            text-zinc-500
            transition
            group-hover:text-blue-400
            group-hover:translate-x-1
            group-hover:-translate-y-1
            "
          />

        </div>


        {/* Text */}

        <h3
          className="
          mt-5
          text-base
          font-semibold
          text-white
          "
        >
          {title}
        </h3>


        {description && (
          <p
            className="
            mt-2
            text-sm
            leading-6
            text-zinc-400
            "
          >
            {description}
          </p>
        )}

      </div>


      {/* Bottom Glow */}

      <div
        className="
        absolute
        -bottom-10
        left-1/2
        h-20
        w-20
        -translate-x-1/2
        rounded-full
        bg-blue-500/20
        blur-3xl
        opacity-0
        transition
        group-hover:opacity-100
        "
      />

    </motion.button>
  );
}