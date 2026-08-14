interface StreamingTextProps {
  text: string;
  speed?: number;
  streaming?: boolean;
  onComplete?: () => void;
}

export default function StreamingText({
  text,
  streaming = true,
}: StreamingTextProps) {
  return (
    <div className="relative">
      <span className="whitespace-pre-wrap leading-8">
        {text}
      </span>

      {streaming && (
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