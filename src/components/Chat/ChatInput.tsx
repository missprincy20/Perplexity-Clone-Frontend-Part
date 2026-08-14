import { useRef, useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import {
  ArrowUp,
  Paperclip,
  Mic,
  Plus,
} from "lucide-react";
import type { Provider } from "../../types/chat";

interface ChatInputProps {
  onSend: (message: string, focusMode: string, provider: Provider) => void;
  loading?: boolean;
  activeFocusMode?: string;
  onFocusModeChange?: (mode: string) => void;
}

export default function ChatInput({
  onSend,
  loading = false,
  activeFocusMode = "academic",
  onFocusModeChange,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [focusMode, setFocusMode] = useState(activeFocusMode);
  const [provider, setProvider] = useState<Provider>("groq");

  useEffect(() => {
    if (activeFocusMode) {
      setFocusMode(activeFocusMode);
    }
  }, [activeFocusMode]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function autoResize() {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }

  function sendMessage() {
    if (!message.trim() || loading) return;

    onSend(message.trim(), focusMode, provider);

    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
    }
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="w-full">
      <div
        className="
        w-full
        rounded-3xl
        border
        border-white/10
        bg-[#111113]
        shadow-2xl
        shadow-blue-500/10
        overflow-hidden
        "
      >
        {/* Text Area */}

        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          placeholder="Ask anything..."
          onChange={(e) => {
            setMessage(e.target.value);
            autoResize();
          }}
          onKeyDown={handleKeyDown}
          className="
          w-full
          resize-none
          bg-transparent
          px-6
          pt-5
          text-white
          outline-none
          min-h-[55px]
          max-h-[220px]
          overflow-y-auto
          placeholder:text-zinc-500
          "
        />

        {/* Bottom */}

        <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">

          {/* Left */}

          <div className="flex items-center gap-2">

            <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition">
              <Plus size={18} />
            </button>

            <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition">
              <Paperclip size={18} />
            </button>
            
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as Provider)}
              className="bg-zinc-800 text-sm text-zinc-300 outline-none border border-white/10 rounded-xl px-3 py-2 cursor-pointer transition hover:bg-zinc-700"
            >
              <option value="groq">Groq</option>
              <option value="gemini">Gemini</option>
            </select>

            <select
              value={focusMode}
              onChange={(e) => {
                const newMode = e.target.value;
                setFocusMode(newMode);
                onFocusModeChange?.(newMode);
              }}
              className="bg-zinc-800 text-sm text-zinc-300 outline-none border border-white/10 rounded-xl px-3 py-2 cursor-pointer transition hover:bg-zinc-700"
            >
              <option value="academic">Academic</option>
              <option value="web">Web</option>
              <option value="reddit">Reddit</option>
              <option value="youtube">YouTube</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="writing">Writing</option>
            </select>

          </div>

          {/* Right */}

          <div className="flex items-center gap-2">

            <button
              className="
              p-2
              rounded-xl
              hover:bg-white/5
              text-zinc-400
              hover:text-white
              transition
              "
            >
              <Mic size={18} />
            </button>

            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="
              h-11
              w-11
              rounded-full
              bg-blue-500
              text-white
              flex
              items-center
              justify-center
              transition
              disabled:opacity-40
              hover:scale-105
              "
            >
              <ArrowUp size={18} />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}