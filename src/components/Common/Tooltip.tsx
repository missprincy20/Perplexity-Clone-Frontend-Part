import React from "react";


interface TooltipProps{

text:string;
children:React.ReactNode;

}


const Tooltip=({
text,
children
}:TooltipProps)=>{


return (

<div
className="
relative
group
"
>


{children}


<div

className="
absolute
bottom-full
mb-2
hidden
group-hover:block
bg-black
text-white
text-xs
px-3
py-1
rounded-lg
whitespace-nowrap
"

>

{text}

</div>


</div>

)

}


export default Tooltip;