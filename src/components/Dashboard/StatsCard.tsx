import { motion } from "framer-motion";
import {
  TrendingUp,
} from "lucide-react";


interface StatsCardProps {


title:string;


value:string | number;


change?:string;


icon:React.ReactNode;


description?:string;


}




export default function StatsCard({

title,

value,

change,

icon,

description

}:StatsCardProps){



return (

<motion.div


whileHover={{

y:-5

}}



className="

rounded-3xl

border

border-white/10

bg-[#111113]

p-5

transition

"


>





{/* Top Section */}



<div

className="

flex

items-start

justify-between

"

>


<div

className="

flex

h-11

w-11

items-center

justify-center

rounded-2xl

bg-blue-500/10

text-blue-400

"

>


{icon}


</div>





{

change && (


<div

className="

flex

items-center

gap-1

rounded-full

bg-green-500/10

px-3

py-1

text-xs

text-green-400

"

>


<TrendingUp size={12}/>


{change}


</div>


)

}



</div>







{/* Value */}



<div

className="

mt-5

"

>


<p

className="

text-sm

text-zinc-500

"

>

{title}

</p>



<h2

className="

mt-2

text-3xl

font-bold

text-white

"

>

{value}

</h2>





{

description && (

<p

className="

mt-2

text-xs

text-zinc-500

"

>

{description}

</p>

)

}



</div>





</motion.div>

);

}