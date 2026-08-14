import { motion } from "framer-motion";


interface VoiceWaveProps {

  active?: boolean;

  bars?: number;

}


export default function VoiceWave({

  active = false,

  bars = 12,

}: VoiceWaveProps) {


return (

<div

className="

flex

items-center

justify-center

gap-1

h-16

"

>

{

Array.from({
  length: bars
}).map((_,index)=>(


<motion.div

key={index}


animate={

active

?

{

height:[
12,
35,
18,
45,
15,
12
]

}

:

{

height:12

}

}



transition={

active

?

{

duration:0.8,

repeat:Infinity,

delay:index*0.05,

ease:"easeInOut"

}

:

{

duration:0.2

}

}



className={`

w-1.5

rounded-full

transition


${

active

?

"bg-blue-400 shadow-lg shadow-blue-500/50"

:

"bg-zinc-600"

}

`}

/>


))

}


</div>

);

}