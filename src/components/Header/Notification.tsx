import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <button
      className="
      relative
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
      transition
      "
    >
      <Bell size={19} />

      <span
        className="
        absolute
        top-2
        right-2
        h-2
        w-2
        rounded-full
        bg-blue-500
        "
      />
    </button>
  );
};

export default Notification;