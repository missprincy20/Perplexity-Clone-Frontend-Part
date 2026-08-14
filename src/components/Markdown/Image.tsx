import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MarkdownImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function MarkdownImage({
  src,
  alt,
}: MarkdownImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [preview, setPreview] = useState(false);

  if (!src) return null;

  return (
    <>
      {/* Image */}

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative my-6 overflow-hidden rounded-2xl border border-white/10"
      >
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-zinc-800" />
        )}

        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onClick={() => setPreview(true)}
          className={`
            w-full
            cursor-zoom-in
            transition-opacity
            duration-300
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />
      </motion.div>

      {/* Fullscreen Preview */}

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/80
              backdrop-blur-md
              p-8
            "
          >
            <button
              onClick={() => setPreview(false)}
              className="
                absolute
                top-6
                right-6
                rounded-full
                bg-white/10
                p-2
                hover:bg-white/20
              "
            >
              <X size={22} />
            </button>

            <motion.img
              initial={{ scale: .9 }}
              animate={{ scale: 1 }}
              exit={{ scale: .9 }}
              src={src}
              alt={alt}
              className="
                max-h-[90vh]
                max-w-[90vw]
                rounded-2xl
                shadow-2xl
              "
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}