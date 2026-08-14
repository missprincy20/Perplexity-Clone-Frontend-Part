import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";


interface MicButtonProps {

  active?: boolean;

  disabled?: boolean;

  onClick?:()=>void;

}



export default function MicButton({

  active=false,

  disabled=false,

  onClick

}:MicButtonProps){


return (

<motion.button


onClick={onClick}

disabled={disabled}


whileTap={{
 scale:0.9
}}


animate={

active

? {

scale:[1,1.08,1]

}

:

{

scale:1

}

}


transition={

{

duration:1.2,

repeat:active ? Infinity : 0

}

}



className={`

relative

flex

h-16

w-16

items-center

justify-center

rounded-full


transition


${
active

?

"bg-blue-500 shadow-lg shadow-blue-500/50"

:

"bg-[#111113] border border-white/10"

}


${
disabled

?

"opacity-50 cursor-not-allowed"

:

"cursor-pointer"

}

`}


>


{/* Glow Ring */}


{
active && (

<motion.span


animate={{

scale:[1,1.8],

opacity:[0.5,0]

}}


transition={{

duration:1.5,

repeat:Infinity

}}


className="

absolute

inset-0

rounded-full

bg-blue-400

"

/>

)

}





{/* Icon */}


<div

className="

relative

z-10

"

>


{

active

?

<Mic

size={28}

className="text-white"

/>

:

<Mic

size={28}

className="text-blue-400"

/>

}


</div>



</motion.button>

);

}
