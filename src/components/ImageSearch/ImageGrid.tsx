import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";


interface ImageItem {

  id:string | number;

  url:string;

  title?:string;

  source?:string;

}



interface ImageGridProps {

  images:ImageItem[];

  loading?:boolean;

  onSelect?:(image:ImageItem)=>void;

}




export default function ImageGrid({

  images,

  loading=false,

  onSelect,

}:ImageGridProps){



/*
 Loading State
*/

if(loading){

return (

<div

className="

grid

grid-cols-2

md:grid-cols-3

gap-4

"

>


{

Array.from({
length:6
}).map((_,index)=>(


<div

key={index}

className="

h-48

rounded-3xl

bg-white/5

border

border-white/10

animate-pulse

"

/>


))

}


</div>

);

}





/*
 Empty State
*/


if(!images.length){

return (

<div

className="

flex

h-72

flex-col

items-center

justify-center

rounded-3xl

border

border-white/10

bg-[#111113]

text-center

"

>


<ImageOff

size={40}

className="text-zinc-500"

/>


<h3

className="

mt-4

font-semibold

text-white

"

>

No images found

</h3>



<p

className="

mt-2

text-sm

text-zinc-500

"

>

Search results will appear here

</p>


</div>

);

}






return (

<motion.div

initial="hidden"

animate="visible"


variants={{

hidden:{},

visible:{

transition:{

staggerChildren:0.08

}

}

}}



className="

columns-1

sm:columns-2

lg:columns-3

gap-5

space-y-5

"

>


{

images.map((image)=>(



<motion.button


key={image.id}


variants={{

hidden:{

opacity:0,

y:20

},

visible:{

opacity:1,

y:0

}

}}



whileHover={{

scale:1.02

}}



onClick={()=>{

onSelect?.(image)

}}



className="

group

relative

w-full

overflow-hidden

rounded-3xl

border

border-white/10

bg-[#111113]

break-inside-avoid

"


>



<img

src={image.url}

alt={image.title || "AI Image"}

className="

w-full

object-cover

transition

duration-500

group-hover:scale-110

"

/>






{/* Overlay */}


<div

className="

absolute

inset-0

flex

items-end

bg-gradient-to-t

from-black/70

via-transparent

opacity-0

transition

group-hover:opacity-100

"

>


<div

className="

p-4

text-left

"

>


<h4

className="

text-sm

font-medium

text-white

"

>

{image.title}

</h4>



{

image.source && (

<p

className="

mt-1

text-xs

text-zinc-300

"

>

{image.source}

</p>

)

}


</div>


</div>





</motion.button>


))

}



</motion.div>

);

}