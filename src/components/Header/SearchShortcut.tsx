import { Search, Command } from "lucide-react";

const SearchShortcut = () => {
  return (
    <button
      className="
      w-[460px]
      h-12
      rounded-xl
      border
      border-white/10
      bg-[#111113]
      px-5
      flex
      items-center
      justify-between
      hover:border-blue-500/40
      transition
      "
    >
      <div className="flex items-center gap-3">

        <Search
          size={18}
          className="text-gray-500"
        />

        <span className="text-gray-400">
          Search anything...
        </span>

      </div>

      <div
        className="
        flex
        items-center
        gap-1
        text-xs
        text-gray-400
        border
        border-white/10
        rounded-md
        px-2
        py-1
        "
      >
        <Command size={13} />
        K
      </div>
    </button>
  );
};

export default SearchShortcut;