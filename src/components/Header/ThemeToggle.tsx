import { Sun } from "lucide-react";

const ThemeToggle = () => {
  return (
    <button
      className="
      h-11
      w-11
      rounded-xl
      border
      border-white/10
      bg-[#111113]
      flex
      items-center
      justify-center
      hover:border-blue-500/40
      hover:text-blue-400
      transition
      "
    >
      <Sun size={19} />
    </button>
  );
};

export default ThemeToggle;