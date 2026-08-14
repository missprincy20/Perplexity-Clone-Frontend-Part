import { motion, AnimatePresence } from "framer-motion";
import { X, Globe2 } from "lucide-react";
import type { ChatSource } from "../../types/chat";

import SourceList from "./SourceList";

interface SourcePanelProps {
  sources: ChatSource[];
  open: boolean;
  onClose: () => void;
  loading?: boolean;
}



export default function SourcePanel({

  sources,

  open,

  onClose,

  loading=false

}:SourcePanelProps){



return (

<AnimatePresence>


{
open && (

<motion.aside


initial={{
 x:"100%"
}}


animate={{
 x:0
}}


exit={{
 x:"100%"
}}


transition={{
 duration:0.3,
 ease:"easeInOut"
}}


className="

fixed

right-0

top-0

z-40

h-screen

w-full

sm:w-[420px]

border-l

border-white/10

bg-[#09090B]/95

backdrop-blur-xl

shadow-2xl

"


>


{/* Header */}


<div

className="

flex

items-center

justify-between

border-b

border-white/10

px-5

py-4

"

>


<div

className="

flex

items-center

gap-3

"

>


<div

className="

flex

h-10

w-10

items-center

justify-center

rounded-xl

bg-blue-500/10

text-blue-400

"

>

<Globe2 size={20}/>

</div>



<div>

<h2

className="

font-semibold

text-white

"

>

Sources

</h2>


<p

className="

text-xs

text-zinc-500

"

>

{sources.length} references

</p>


</div>


</div>




<button


onClick={onClose}


className="

rounded-xl

p-2

text-zinc-400

transition

hover:bg-white/5

hover:text-white

"

>


<X size={20}/>


</button>



</div>





{/* Content */}



<div

className="

h-[calc(100vh-80px)]

overflow-y-auto

p-5

"

>


<SourceList

sources={sources}

loading={loading}

/>


</div>




</motion.aside>

)

}


</AnimatePresence>

);

}

