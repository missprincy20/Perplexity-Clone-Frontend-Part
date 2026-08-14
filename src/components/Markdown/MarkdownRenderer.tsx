import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";

import CodeBlock from "./CodeBlock";
import MarkdownImage from "./Image";

import {
  MarkdownTable,
  MarkdownTableHead,
  MarkdownTableBody,
  MarkdownTableRow,
  MarkdownTableHeader,
  MarkdownTableCell,
} from "./Table";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: MarkdownRendererProps) {
  return (
    <div
      className="
      prose
      prose-invert
      max-w-none

      prose-headings:text-white
      prose-p:text-zinc-200
      prose-strong:text-white

      prose-a:text-blue-400
      prose-li:text-zinc-300
      prose-blockquote:border-blue-500

      prose-pre:bg-transparent
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          code: CodeBlock,

          table: MarkdownTable,
          thead: MarkdownTableHead,
          tbody: MarkdownTableBody,
          tr: MarkdownTableRow,
          th: MarkdownTableHeader,
          td: MarkdownTableCell,

          img: MarkdownImage,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}