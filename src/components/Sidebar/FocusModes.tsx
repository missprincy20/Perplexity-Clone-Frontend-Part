import {
  GraduationCap,
  Globe,
  CirclePlay,
  Image,
  Video,
  PenLine,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const modes = [
  {
    name: "Academic",
    mode: "academic",
    icon: GraduationCap,
    path: "/chat?mode=academic",
  },
  {
    name: "Web",
    mode: "web",
    icon: Globe,
    path: "/chat?mode=web",
  },
  {
    name: "Reddit",
    mode: "reddit",
    icon: CirclePlay,
    path: "/chat?mode=reddit",
  },
  {
    name: "YouTube",
    mode: "youtube",
    icon: CirclePlay,
    path: "/chat?mode=youtube",
  },
  {
    name: "Videos",
    mode: "video",
    icon: Video,
    path: "/chat?mode=video",
  },
  {
    name: "Images",
    mode: "image",
    icon: Image,
    path: "/chat?mode=image",
  },
  {
    name: "Writing",
    mode: "writing",
    icon: PenLine,
    path: "/chat?mode=writing",
  },
];

const FocusModes = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentMode = searchParams.get("mode") || "academic";

  return (
    <div className="space-y-1">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.mode;

        return (
          <button
            key={mode.name}
            onClick={() => navigate(mode.path)}
            className={`
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2
            rounded-lg
            text-sm
            transition
            ${
              isActive
                ? "bg-blue-500/10 text-blue-400 font-medium"
                : "hover:bg-white/5 text-gray-400"
            }
            `}
          >
            <Icon size={17} />
            <span>{mode.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FocusModes;