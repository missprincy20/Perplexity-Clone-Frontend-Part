import { ChevronDown } from "lucide-react";

const ProfileMenu = () => {
  return (
    <button
      className="
      flex
      items-center
      gap-3
      rounded-xl
      border
      border-white/10
      bg-[#111113]
      px-3
      py-2
      hover:border-blue-500/40
      transition
      "
    >
      <img
        src="https://i.pravatar.cc/150?img=5"
        alt="profile"
        className="
        h-10
        w-10
        rounded-full
        object-cover
        "
      />

      <ChevronDown
        size={18}
        className="text-gray-400"
      />
    </button>
  );
};

export default ProfileMenu;