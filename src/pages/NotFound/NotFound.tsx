import { motion } from "framer-motion";
import {
  Home,
  Search,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";






export default function NotFound(){



const navigate = useNavigate();





return (

<div

className="

min-h-screen

flex

items-center

justify-center

bg-[#09090B]

text-white

p-6

"

>






<motion.div


initial={{

opacity:0,

scale:0.9

}}


animate={{

opacity:1,

scale:1

}}


className="

max-w-md

w-full

rounded-3xl

border

border-white/10

bg-[#111113]

p-10

text-center

shadow-2xl

"


>







{/* Icon */}



<div

className="

mx-auto

flex

h-16

w-16

items-center

justify-center

rounded-2xl

bg-blue-500/10

text-blue-400

"

>


<Sparkles size={32}/>


</div>







{/* 404 */}



<h1

className="

mt-6

text-7xl

font-bold

text-white

"

>

404

</h1>







<h2

className="

mt-4

text-xl

font-semibold

"

>

Page Not Found

</h2>






<p

className="

mt-3

text-sm

leading-6

text-zinc-500

"

>

The page you are looking for does not exist or has been moved.

</p>








{/* Actions */}



<div

className="

mt-8

flex

justify-center

gap-3

"

>





<button


onClick={()=>navigate("/")}


className="

flex

items-center

gap-2

rounded-xl

bg-blue-500

px-5

py-3

text-sm

font-medium

transition

hover:bg-blue-600

"


>


<Home size={17}/>


Home


</button>









<button


onClick={()=>navigate("/search")}


className="

flex

items-center

gap-2

rounded-xl

bg-white/10

px-5

py-3

text-sm

font-medium

text-white

transition

hover:bg-white/20

"


>


<Search size={17}/>


Search


</button>





</div>







</motion.div>






</div>

);

}