import { useState } from "react";

const SearchInput = () => {

    const [value,setValue]=useState("");

    return(

        <textarea

        rows={3}

        value={value}

        onChange={(e)=>setValue(e.target.value)}

        placeholder="Ask anything..."

        className="
        w-full
        resize-none
        bg-transparent
        outline-none
        text-white
        placeholder:text-gray-500
        text-lg
        "

        />

    )

}

export default SearchInput;