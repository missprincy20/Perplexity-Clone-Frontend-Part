import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function CodeBlock({
  inline,
  className,
  children,
  ...props
}: CodeBlockProps &
  React.HTMLAttributes<HTMLElement>) {
  const [copied, setCopied] = useState(false);

  const language = className?.replace("language-", "") || "text";

  const code = String(children).replace(/\n$/, "");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  }

  // Inline Code

  if (inline) {
    return (
      <code
        className="
        rounded-md
        bg-zinc-800
        px-1.5
        py-1
        text-cyan-300
        text-sm
        "
        {...props}
      >
        {children}
      </code>
    );
  }

  // Block Code

  return (
    <div
      className="
      my-6
      overflow-hidden
      rounded-2xl
      border
      border-white/10
      bg-[#0D1117]
      "
    >
      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-white/10
        px-4
        py-3
        "
      >
        <span
          className="
          rounded-lg
          bg-zinc-800
          px-3
          py-1
          text-xs
          uppercase
          tracking-wider
          text-zinc-300
          "
        >
          {language}
        </span>

        <button
          onClick={handleCopy}
          className="
          flex
          items-center
          gap-2
          rounded-lg
          px-3
          py-2
          text-sm
          transition
          hover:bg-white/5
          "
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: "20px",
          background: "#0D1117",
          fontSize: "14px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}