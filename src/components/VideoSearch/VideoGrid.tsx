import { motion } from "framer-motion";
import { VideoOff } from "lucide-react";



interface VideoItem {

  id:string | number;

  thumbnail:string;

  title:string;

  channel?:string;

  duration?:string;

  views?:string;

}



interface VideoGridProps {

  videos:VideoItem[];

  loading?:boolean;

  onSelect?:(video:VideoItem)=>void;

}




export default function VideoGrid({

  videos,

  loading=false,

  onSelect,

}:VideoGridProps){





/*
 Loading Skeleton
*/


if(loading){

return (

<div

className="

grid

grid-cols-1

md:grid-cols-2

gap-5

"

>


{

Array.from({

length:4

}).map((_,index)=>(


<div

key={index}

className="

h-64

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


if(!videos.length){

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

"

>


<VideoOff

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

No videos found

</h3>


<p

className="

mt-2

text-sm

text-zinc-500

"

>

Search videos to view results

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

grid

grid-cols-1

md:grid-cols-2

gap-5

"

>



{

videos.map((video)=>(


<motion.button


key={video.id}



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

y:-5

}}



onClick={()=>{

onSelect?.(video)

}}



className="

group

overflow-hidden

rounded-3xl

border

border-white/10

bg-[#111113]

text-left

transition

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


src={video.thumbnail}


alt={video.title}


className="

h-full

w-full

object-cover

transition

duration-500

group-hover:scale-110

"

/>





{/* Duration */}



{

video.duration && (

<span

className="

absolute

bottom-3

right-3

rounded-lg

bg-black/70

px-2

py-1

text-xs

text-white

"

>

{video.duration}

</span>

)

}



</div>









{/* Info */}



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

text-white

"

>

{video.title}

</h3>





<div

className="

mt-2

flex

items-center

justify-between

text-xs

text-zinc-500

"

>


<span>

{video.channel}

</span>


<span>

{video.views}

</span>


</div>



</div>





</motion.button>



))


}



</motion.div>

);

}