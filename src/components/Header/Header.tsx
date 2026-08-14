import SearchShortcut from "./SearchShortcut";
import ThemeToggle from "./ThemeToggle";
import Notification from "./Notification";
import ProfileMenu from "./ProfileMenu";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <header
      className="
      h-20
      border-b
      border-white/10
      bg-[#09090B]/80
      backdrop-blur-xl
      px-8
      flex
      items-center
      justify-between
      "
    >
      {/* Left */}

      <SearchShortcut />

      {/* Right */}

      <div className="flex items-center gap-5">

        <button
          className="
          flex
          items-center
          gap-2
          px-5
          py-3
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          hover:opacity-90
          transition
          text-white
          font-medium
          shadow-lg
          shadow-blue-500/20
          "
        >
          <Plus size={18} />
          New
        </button>

        <ThemeToggle />

        <Notification />

        <ProfileMenu />

      </div>
    </header>
  );
};

export default Header;