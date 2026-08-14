import { LoaderCircle } from "lucide-react";


const Loader=()=>{


return (

<div className="
flex
items-center
gap-2
text-[#6EE7FF]
">


<LoaderCircle
className="
animate-spin
"
/>


<span>
Thinking...
</span>


</div>

)

}


export default Loader;