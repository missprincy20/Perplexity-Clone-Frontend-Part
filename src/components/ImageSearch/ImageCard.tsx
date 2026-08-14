import { motion } from "framer-motion";
import {
  Heart,
  Bookmark,
  ExternalLink,
} from "lucide-react";



interface ImageCardProps {


id:string | number;


url:string;


title?:string;


source?:string;


onOpen?:()=>void;


onSave?:()=>void;


}



export default function ImageCard({

id,

url,

title="AI Image",

source="Web",

onOpen,

onSave

}:ImageCardProps){



return (

<motion.div


layout


whileHover={{

y:-5

}}



data-id={id}


className="

group

relative

overflow-hidden

rounded-3xl

border

border-white/10

bg-[#111113]

"


>



{/* Image */}


<img


src={url}


alt={title}


className="

h-full

w-full

object-cover

transition

duration-500

group-hover:scale-110

"

/>






{/* Gradient Overlay */}



<div

className="

absolute

inset-0

bg-gradient-to-t

from-black/80

via-transparent

to-transparent

opacity-0

transition

group-hover:opacity-100

"

/>






{/* Top Actions */}



<div

className="

absolute

right-3

top-3

flex

gap-2

opacity-0

transition

group-hover:opacity-100

"

>



<button


onClick={onSave}


className="

flex

h-9

w-9

items-center

justify-center

rounded-xl

bg-black/40

backdrop-blur-md

text-white

hover:bg-blue-500

transition

"

>


<Bookmark size={16}/>


</button>





<button


className="

flex

h-9

w-9

items-center

justify-center

rounded-xl

bg-black/40

backdrop-blur-md

text-white

hover:bg-red-500

transition

"


>


<Heart size={16}/>


</button>



</div>








{/* Bottom Info */}



<div

className="

absolute

bottom-0

left-0

right-0

translate-y-3

p-4

opacity-0

transition

group-hover:translate-y-0

group-hover:opacity-100

"

>


<div

className="

flex

items-center

justify-between

"

>


<div>


<h3

className="

text-sm

font-semibold

text-white

"

>

{title}

</h3>



<span

className="

mt-1

inline-block

rounded-full

bg-white/10

px-2

py-1

text-xs

text-zinc-300

"

>

{source}

</span>


</div>





<button


onClick={onOpen}


className="

flex

h-9

w-9

items-center

justify-center

rounded-xl

bg-white/10

text-white

hover:bg-blue-500

transition

"


>


<ExternalLink size={16}/>


</button>



</div>



</div>





</motion.div>

);

}