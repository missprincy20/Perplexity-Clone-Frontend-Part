import {
Sparkles
} from "lucide-react";


const LabsButton=()=>{


return (

<button

className="
w-full
flex
items-center
justify-between
px-4
py-3
rounded-xl
border
border-purple-500/30
bg-purple-500/10
hover:bg-purple-500/20
transition
"


>


<div
className="
flex
items-center
gap-3
"
>

<Sparkles
size={18}
className="
text-purple-400
"
/>


<span
className="
text-white
"
>
Labs
</span>


</div>


<span
className="
text-[10px]
px-2
py-1
rounded-full
bg-purple-500
text-white
"
>
NEW
</span>


</button>

)

}


export default LabsButton;