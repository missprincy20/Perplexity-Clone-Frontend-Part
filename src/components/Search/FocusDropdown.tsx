import { GraduationCap, ChevronDown } from "lucide-react";

const FocusDropdown = () => {

    return(

        <button

        className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-white/10
        bg-[#18181B]
        px-5
        py-3
        hover:border-blue-500/40
        transition
        "

        >

            <GraduationCap
            size={18}
            className="text-blue-400"
            />

            <span className="text-white">
                Academic
            </span>

            <ChevronDown
            size={18}
            className="text-gray-500"
            />

        </button>

    )

}

export default FocusDropdown;