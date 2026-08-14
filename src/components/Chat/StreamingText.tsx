import { useEffect, useState } from "react";

interface StreamingTextProps {
  text: string;
  speed?: number;
  streaming?: boolean;
  onComplete?: () => void;
}

export default function StreamingText({
  text,
  speed = 8,
  streaming = true,
  onComplete,
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!streaming) {
      setDisplayedText(text);
      return;
    }

    let index = 0;

    setDisplayedText("");

    const interval = setInterval(() => {
      index++;

      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, streaming, onComplete]);

  return (
    <div className="relative">
      <span className="whitespace-pre-wrap leading-8">
        {displayedText}
      </span>

      {streaming && displayedText.length < text.length && (
        <span
          className="
          inline-block
          w-[3px]
          h-5
          ml-1
          rounded
          bg-blue-400
          animate-pulse
          align-middle
          "
        />
      )}
    </div>
  );
}