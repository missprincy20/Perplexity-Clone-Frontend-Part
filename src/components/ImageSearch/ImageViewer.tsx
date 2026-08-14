import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ZoomIn,
  ZoomOut,
  Bookmark,
  ExternalLink,
} from "lucide-react";



interface ImageViewerProps {


open:boolean;


image?:{

url:string;

title?:string;

source?:string;

};


onClose:()=>void;


onSave?:()=>void;


}





export default function ImageViewer({

open,

image,

onClose,

onSave

}:ImageViewerProps){



const [zoom,setZoom]
=
useState(1);





if(!image)
return null;





return (

<AnimatePresence>


{

open && (

<motion.div


initial={{

opacity:0

}}


animate={{

opacity:1

}}


exit={{

opacity:0

}}



className="

fixed

inset-0

z-50

flex

items-center

justify-center

bg-black/80

backdrop-blur-xl

p-5

"





>


{/* Close */}


<button


onClick={onClose}


className="

absolute

right-6

top-6

flex

h-10

w-10

items-center

justify-center

rounded-xl

bg-white/10

text-white

hover:bg-white/20

transition

"

>

<X size={20}/>

</button>






{/* Viewer Container */}



<motion.div


initial={{

scale:0.9

}}


animate={{

scale:1

}}



className="

relative

max-h-[90vh]

max-w-5xl

overflow-hidden

rounded-3xl

border

border-white/10

bg-[#111113]

shadow-2xl

"

>



{/* Image */}



<motion.img


src={image.url}


alt={image.title}


style={{

scale:zoom

}}



transition={{

duration:0.3

}}



className="

max-h-[75vh]

w-auto

object-contain

"



/>







{/* Bottom Panel */}



<div

className="

flex

items-center

justify-between

border-t

border-white/10

bg-[#111113]

p-4

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

{image.title || "Image Preview"}

</h3>


<p

className="

mt-1

text-xs

text-zinc-500

"

>

{image.source}

</p>


</div>






<div

className="

flex

items-center

gap-2

"

>





<button


onClick={()=>{

setZoom(

Math.max(

0.5,

zoom-0.2

)

)

}}



className="

rounded-xl

bg-white/10

p-2

text-white

hover:bg-white/20

"

>

<ZoomOut size={17}/>

</button>







<button


onClick={()=>{

setZoom(

Math.min(

2,

zoom+0.2

)

)

}}



className="

rounded-xl

bg-white/10

p-2

text-white

hover:bg-white/20

"

>

<ZoomIn size={17}/>

</button>









<button


onClick={onSave}


className="

rounded-xl

bg-blue-500

p-2

text-white

hover:bg-blue-600

"

>

<Bookmark size={17}/>

</button>







<a


href={image.url}


target="_blank"


className="

rounded-xl

bg-white/10

p-2

text-white

hover:bg-white/20

"

>

<ExternalLink size={17}/>

</a>





</div>



</div>



</motion.div>



</motion.div>

)

}


</AnimatePresence>

);

}