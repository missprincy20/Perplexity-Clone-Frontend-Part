import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  Volume2,
  Maximize,
} from "lucide-react";



interface VideoPlayerProps {


open:boolean;


video?:{

url:string;

title?:string;

channel?:string;

};



onClose:()=>void;


}





export default function VideoPlayer({

open,

video,

onClose

}:VideoPlayerProps){



const videoRef =
useRef<HTMLVideoElement | null>(null);



const [playing,setPlaying]
=
useState(false);



const [progress,setProgress]
=
useState(0);





if(!video)
return null;





function togglePlay(){


if(!videoRef.current)
return;



if(playing){

videoRef.current.pause();

}

else{

videoRef.current.play();

}


setPlaying(!playing);


}





function updateProgress(){


if(!videoRef.current)
return;


const value =
(videoRef.current.currentTime /
videoRef.current.duration)
*100;


setProgress(value || 0);


}





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

bg-black/90

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

"

>


<X size={20}/>


</button>








{/* Player */}



<div

className="

w-full

max-w-5xl

overflow-hidden

rounded-3xl

border

border-white/10

bg-[#111113]

"

>





<div

className="

relative

aspect-video

bg-black

"

>


<video


ref={videoRef}


src={video.url}


onTimeUpdate={updateProgress}


className="

h-full

w-full

object-contain

"

/>







{/* Center Play */}



<button


onClick={togglePlay}


className="

absolute

left-1/2

top-1/2

-translate-x-1/2

-translate-y-1/2

flex

h-16

w-16

items-center

justify-center

rounded-full

bg-blue-500

text-white

shadow-xl

"

>


{

playing

?

<Pause size={28}/>

:

<Play

size={28}

fill="white"

/>

}


</button>





</div>









{/* Controls */}



<div

className="

space-y-3

p-5

"

>





{/* Progress */}



<div

className="

h-1.5

overflow-hidden

rounded-full

bg-white/10

"

>


<div

style={{

width:`${progress}%`

}}


className="

h-full

bg-blue-500

"

/>


</div>








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

{video.title}

</h3>



<p

className="

mt-1

text-xs

text-zinc-500

"

>

{video.channel}

</p>


</div>







<div

className="

flex

gap-2

"

>


<button

className="

rounded-xl

bg-white/10

p-2

text-white

"

>

<Volume2 size={17}/>

</button>



<button

className="

rounded-xl

bg-white/10

p-2

text-white

"

>

<Maximize size={17}/>

</button>



</div>




</div>




</div>




</div>






</motion.div>


)

}


</AnimatePresence>

);

}