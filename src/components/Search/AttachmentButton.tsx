import { Paperclip } from "lucide-react";

const AttachmentButton=()=>{

    return(

        <button

        className="
        h-12
        w-12
        rounded-full
        bg-[#18181B]
        border
        border-white/10
        flex
        items-center
        justify-center
        hover:border-blue-500/40
        transition
        "

        >

            <Paperclip
            size={20}
            className="text-gray-300"
            />

        </button>

    )

}

export default AttachmentButton;