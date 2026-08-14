import { motion } from "framer-motion";
import {
  Plus,
  Search,
  FileText,
  FolderOpen,
  Clock,
} from "lucide-react";


interface ResearchItem {

  id:string;

  title:string;

  date?:string;

}


interface ResearchSidebarProps {

  researches?:ResearchItem[];

  activeId?:string;

  onSelect?:(id:string)=>void;

  onCreate?:()=>void;

}



const defaultResearches = [

{
 id:"1",
 title:"AI Agents Research",
 date:"Today"
},

{
 id:"2",
 title:"RAG Architecture",
 date:"Yesterday"
},

{
 id:"3",
 title:"Machine Learning Notes",
 date:"2 days ago"
}

];





export default function ResearchSidebar({

  researches=defaultResearches,

  activeId,

  onSelect,

  onCreate

}:ResearchSidebarProps){



return (

<aside

className="

flex

h-full

w-72

flex-col

border-r

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

justify-between

"

>


<h2

className="

font-semibold

text-white

"

>

Research

</h2>


<button

onClick={onCreate}

className="

rounded-xl

bg-blue-500

p-2

text-white

hover:bg-blue-600

transition

"

>

<Plus size={16}/>

</button>



</div>






{/* Search */}


<div

className="

mb-5

flex

items-center

gap-2

rounded-xl

border

border-white/10

bg-white/5

px-3

py-2

"

>

<Search

size={16}

className="text-zinc-500"

/>


<input

placeholder="Search research..."

className="

w-full

bg-transparent

text-sm

text-white

outline-none

placeholder:text-zinc-500

"

/>


</div>







{/* Sources */}


<div

className="

mb-3

flex

items-center

gap-2

text-xs

uppercase

tracking-wider

text-zinc-500

"

>

<FolderOpen size={14}/>

Projects

</div>







{/* List */}


<div

className="

flex-1

space-y-2

overflow-y-auto

"

>


{

researches.map((item)=>(


<motion.button

key={item.id}


whileHover={{
x:4
}}


onClick={()=>
onSelect?.(item.id)
}


className={`

w-full

rounded-xl

p-3

text-left

transition

${

activeId===item.id

?

"bg-blue-500/20 border border-blue-500/30"

:

"hover:bg-white/5"

}

`}


>


<div

className="

flex

gap-3

items-start

"

>


<div

className="

mt-1

text-blue-400

"

>

<FileText size={16}/>

</div>




<div>

<p

className="

text-sm

font-medium

text-white

line-clamp-1

"

>

{item.title}

</p>



<div

className="

mt-1

flex

items-center

gap-1

text-xs

text-zinc-500

"

>

<Clock size={11}/>

{item.date}

</div>


</div>



</div>


</motion.button>


))

}


</div>





</aside>

);

}