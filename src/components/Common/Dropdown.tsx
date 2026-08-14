//import React from "react";


interface DropdownProps{

options:string[];
value:string;
onChange:(value:string)=>void;

}


const Dropdown=({
options,
value,
onChange
}:DropdownProps)=>{


return (

<select

value={value}

onChange={(e)=>onChange(e.target.value)}

className="
bg-[#111113]
border
border-white/10
rounded-xl
px-4
py-2
text-white
outline-none
"

>


{
options.map((item)=>(

<option
key={item}
value={item}
className="bg-[#111113]"
>

{item}

</option>

))

}


</select>

)

}


export default Dropdown;