import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  icon: LucideIcon;
  shortcut?: string;
  path?: string;
}

const SidebarItem = ({
  name,
  icon: Icon,
  shortcut,
  path,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        w-full
        flex
        items-center
        justify-between
        px-3
        py-2.5
        rounded-xl
        text-sm
        transition-all
        hover:bg-white/5
        hover:text-white
        group
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <Icon
          size={18}
          className="
            text-gray-400
            group-hover:text-blue-400
          "
        />

        <span>{name}</span>
      </div>

      {shortcut && (
        <span
          className="
            text-xs
            text-gray-500
            border
            border-white/10
            px-2
            py-1
            rounded-md
          "
        >
          {shortcut}
        </span>
      )}
    </button>
  );
};

export default SidebarItem;