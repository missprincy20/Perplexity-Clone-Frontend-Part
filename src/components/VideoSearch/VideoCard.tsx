import { motion } from "framer-motion";
import {
  Play,
  Bookmark,
  Eye,
} from "lucide-react";



interface VideoCardProps {


thumbnail:string;


title:string;


channel?:string;


duration?:string;


views?:string;


onPlay?:()=>void;


onSave?:()=>void;


}



export default function VideoCard({

thumbnail,

title,

channel="Unknown",

duration,

views,

onPlay,

onSave

}:VideoCardProps){



return (

<motion.div


whileHover={{

y:-6

}}


className="

group

overflow-hidden

rounded-3xl

border

border-white/10

bg-[#111113]

"


>



{/* Thumbnail */}



<div

className="

relative

aspect-video

overflow-hidden

"

>


<img


src={thumbnail}


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







{/* Dark Overlay */}


<div

className="

absolute

inset-0

flex

items-center

justify-center

bg-black/40

opacity-0

transition

group-hover:opacity-100

"

>



<button


onClick={onPlay}


className="

flex

h-14

w-14

items-center

justify-center

rounded-full

bg-blue-500

text-white

shadow-lg

shadow-blue-500/40

hover:scale-110

transition

"

>


<Play

size={24}

fill="white"

/>


</button>


</div>







{/* Duration */}



{

duration && (

<span

className="

absolute

bottom-3

right-3

rounded-lg

bg-black/80

px-2

py-1

text-xs

font-medium

text-white

"

>

{duration}

</span>

)

}





{/* Save Button */}



<button


onClick={onSave}


className="

absolute

right-3

top-3

flex

h-9

w-9

items-center

justify-center

rounded-xl

bg-black/50

text-white

opacity-0

backdrop-blur-md

transition

group-hover:opacity-100

hover:bg-blue-500

"


>


<Bookmark size={16}/>


</button>






</div>








{/* Video Info */}



<div

className="

p-4

"

>


<h3

className="

line-clamp-2

text-sm

font-semibold

leading-6

text-white

"

>

{title}

</h3>







<div

className="

mt-3

flex

items-center

justify-between

text-xs

text-zinc-500

"

>



<span>

{channel}

</span>




<div

className="

flex

items-center

gap-1

"

>


<Eye size={13}/>


{views || "0 views"}


</div>



</div>





</div>




</motion.div>

);

}