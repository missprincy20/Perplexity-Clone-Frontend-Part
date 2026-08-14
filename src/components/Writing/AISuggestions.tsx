import { motion } from "framer-motion";
import {
  Sparkles,
  Check,
  X,
  Wand2,
} from "lucide-react";


interface Suggestion {

  id:number;

  type:string;

  original:string;

  improved:string;

}



interface AISuggestionsProps {

  suggestions:Suggestion[];

  onAccept?:(suggestion:Suggestion)=>void;

  onReject?:(id:number)=>void;

}





export default function AISuggestions({

  suggestions,

  onAccept,

  onReject

}:AISuggestionsProps){



return (

<div

className="

flex

h-full

flex-col

rounded-3xl

border

border-white/10

bg-[#111113]

overflow-hidden

"


>



{/* Header */}



<div

className="

flex

items-center

gap-3

border-b

border-white/10

px-5

py-4

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

bg-purple-500/10

text-purple-400

"

>


<Sparkles size={20}/>


</div>




<div>


<h3

className="

font-semibold

text-white

"

>

AI Suggestions

</h3>


<p

className="

text-xs

text-zinc-500

"

>

Improve your writing

</p>


</div>



</div>








{/* Suggestions List */}



<div

className="

flex-1

space-y-4

overflow-y-auto

p-5

"

>


{

suggestions.length===0

?

(

<div

className="

flex

h-full

items-center

justify-center

text-center

text-sm

text-zinc-500

"

>

<Wand2 size={28}/>

<br/>

No suggestions yet

</div>

)


:

suggestions.map((item)=>(


<motion.div


key={item.id}


initial={{

opacity:0,

y:10

}}


animate={{

opacity:1,

y:0

}}



className="

rounded-2xl

border

border-white/10

bg-[#09090B]

p-4

"

>



{/* Type */}



<span

className="

rounded-full

bg-blue-500/10

px-3

py-1

text-xs

text-blue-400

"

>

{item.type}

</span>






{/* Original */}



<div

className="

mt-4

"

>


<p

className="

text-xs

text-zinc-500

"

>

Original

</p>


<p

className="

mt-1

text-sm

text-zinc-300

line-through

"

>

{item.original}

</p>



</div>








{/* Improved */}



<div

className="

mt-3

"

>


<p

className="

text-xs

text-zinc-500

"

>

Suggested

</p>


<p

className="

mt-1

text-sm

leading-6

text-white

"

>

{item.improved}

</p>



</div>







{/* Actions */}



<div

className="

mt-4

flex

gap-2

"

>



<button


onClick={()=>onAccept?.(item)}


className="

flex

items-center

gap-2

rounded-xl

bg-green-500/10

px-3

py-2

text-xs

text-green-400

transition

hover:bg-green-500/20

"

>

<Check size={14}/>

Accept

</button>







<button


onClick={()=>onReject?.(item.id)}


className="

flex

items-center

gap-2

rounded-xl

bg-red-500/10

px-3

py-2

text-xs

text-red-400

transition

hover:bg-red-500/20

"

>

<X size={14}/>

Reject

</button>




</div>





</motion.div>


))


}



</div>





</div>

);

}