import { ArrowRight } from "lucide-react";

const SearchButton = () => {

    return(

        <button

        className="
        flex
        items-center
        gap-3
        rounded-xl
        px-8
        py-3
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        hover:scale-[1.02]
        transition
        text-white
        font-medium
        shadow-lg
        shadow-blue-600/30
        "

        >

            Search

            <ArrowRight size={18}/>

        </button>

    )

}

export default SearchButton;