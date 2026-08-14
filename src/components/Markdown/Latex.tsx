import "katex/dist/katex.min.css";

interface LatexProps {
  children: React.ReactNode;
}

export default function Latex({
  children,
}: LatexProps) {
  return (
    <div
      className="
      my-6
      overflow-x-auto
      rounded-2xl
      border
      border-white/10
      bg-[#111113]
      px-6
      py-5
      "
    >
      <div className="text-white">
        {children}
      </div>
    </div>
  );
}