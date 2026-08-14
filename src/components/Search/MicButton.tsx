import { Mic } from "lucide-react";

const MicButton=()=>{

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
        hover:border-blue-500
        hover:text-blue-400
        transition
        "

        >

            <Mic size={20}/>

        </button>

    )

}

export default MicButton;