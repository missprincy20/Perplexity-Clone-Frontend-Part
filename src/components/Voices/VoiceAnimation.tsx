import { motion } from "framer-motion";


type VoiceState =
  | "idle"
  | "listening"
  | "speaking";


interface VoiceAnimationProps {

  state?: VoiceState;

  size?: number;

}



export default function VoiceAnimation({

  state = "idle",

  size = 180,

}: VoiceAnimationProps) {



const active =
state !== "idle";



return (

<div

className="

relative

flex

items-center

justify-center

"

style={{

width:size,

height:size

}}

>


{/* Outer Rings */}



<motion.div

animate={

active

?

{

scale:[1,1.35,1],

opacity:[0.3,0.1,0.3]

}

:

{

scale:[1,1.08,1],

opacity:[0.2,0.1,0.2]

}

}



transition={{

duration:

state==="speaking"

?

1

:

2,

repeat:Infinity

}}



className="

absolute

inset-0

rounded-full

bg-blue-500/20

blur-xl

"

/>






<motion.div


animate={

active

?

{

rotate:360

}

:

{

rotate:0

}

}



transition={{

duration:8,

repeat:Infinity,

ease:"linear"

}}



className="

absolute

inset-5

rounded-full

border

border-blue-400/30

"

/>







{/* Main Orb */}



<motion.div


animate={

state==="speaking"

?

{

scale:[1,1.15,1]

}

:

state==="listening"

?

{

scale:[1,1.08,1]

}

:

{

scale:[1,1.03,1]

}

}



transition={{

duration:

state==="speaking"

?

0.6

:

1.8,

repeat:Infinity

}}



className="

relative

flex

items-center

justify-center

rounded-full

bg-gradient-to-br

from-blue-500

via-cyan-400

to-purple-500

shadow-2xl

shadow-blue-500/40

"



style={{

width:size*0.45,

height:size*0.45

}}



>


{/* Inner Glow */}


<motion.div


animate={{

opacity:[0.4,0.8,0.4]

}}


transition={{

duration:1.5,

repeat:Infinity

}}



className="

absolute

inset-3

rounded-full

bg-white/20

blur-md

"

/>



</motion.div>






{/* State Text */}

<div

className="

absolute

-bottom-12

left-1/2

-translate-x-1/2

text-sm

text-zinc-400

"

>

{

state==="idle"

?

"Ready"

:

state==="listening"

?

"Listening..."

:

"Speaking..."

}



</div>



</div>

);

}