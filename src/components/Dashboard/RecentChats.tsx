import { motion } from "framer-motion";
import {
  MessageSquare,
  Clock,
  ArrowRight,
} from "lucide-react";



interface ChatItem {


id:string | number;


title:string;


preview:string;


time:string;


type?:string;


}




interface RecentChatsProps {


chats?:ChatItem[];


onOpen?:(chat:ChatItem)=>void;


}




const defaultChats=[

{

id:1,

title:"Explain RAG Architecture",

preview:"How retrieval augmented generation works with LLMs...",

time:"10 min ago",

type:"Research"

},


{

id:2,

title:"Create AI Agent Workflow",

preview:"Building autonomous AI assistants using tools...",

time:"1 hour ago",

type:"AI"

},


{

id:3,

title:"Machine Learning Notes",

preview:"Explain gradient descent algorithm...",

time:"Yesterday",

type:"Learning"

}

];







export default function RecentChats({

chats=defaultChats,

onOpen

}:RecentChatsProps){



return (

<div

className="

rounded-3xl

border

border-white/10

bg-[#111113]

p-5

"

>





{/* Header */}



<div

className="

mb-5

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


<MessageSquare size={20}/>


</div>




<div>


<h3

className="

font-semibold

text-white

"

>

Recent Chats

</h3>


<p

className="

text-xs

text-zinc-500

"

>

Your latest conversations

</p>


</div>


</div>









{/* Chat List */}



<div

className="

space-y-3

"

>


{

chats.map((chat)=>(



<motion.div


key={chat.id}


whileHover={{

x:5

}}



className="

group

flex

items-center

justify-between

rounded-2xl

border

border-white/10

bg-[#09090B]

p-4

transition

"


>



<div

className="

flex

gap-3

"

>



<div

className="

mt-1

text-blue-400

"

>


<MessageSquare size={17}/>


</div>







<div>


<h4

className="

text-sm

font-medium

text-white

"

>

{chat.title}

</h4>





<p

className="

mt-1

line-clamp-1

text-xs

text-zinc-500

"

>

{chat.preview}

</p>







<div

className="

mt-2

flex

items-center

gap-3

"

>



<span

className="

rounded-full

bg-blue-500/10

px-2

py-1

text-[11px]

text-blue-400

"

>

{chat.type}

</span>




<span

className="

flex

items-center

gap-1

text-[11px]

text-zinc-500

"

>


<Clock size={11}/>

{chat.time}


</span>



</div>




</div>



</div>







<button


onClick={()=>onOpen?.(chat)}


className="

flex

h-9

w-9

items-center

justify-center

rounded-xl

bg-white/5

text-zinc-400

opacity-0

transition

group-hover:opacity-100

hover:bg-blue-500

hover:text-white

"


>


<ArrowRight size={16}/>


</button>





</motion.div>


))


}



</div>





</div>

);

}