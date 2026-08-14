import { motion } from "framer-motion";
import {
  Bookmark,
  ExternalLink,
  Trash2,
  FileText,
  Image,
  Globe,
} from "lucide-react";



interface BookmarkItem {


id:string | number;


title:string;


description:string;


type:"Article" | "Image" | "Answer";


date:string;


url?:string;


}





interface BookmarksProps {


items?:BookmarkItem[];


onOpen?:(item:BookmarkItem)=>void;


onRemove?:(id:string | number)=>void;


}





const defaultBookmarks=[

{

id:1,

title:"RAG Architecture Explained",

description:"Complete guide about retrieval augmented generation",

type:"Article" as const,

date:"Today",

url:"#"

},


{

id:2,

title:"AI Agent Workflow Diagram",

description:"Saved research image",

type:"Image" as const,

date:"Yesterday",

url:"#"

},


{

id:3,

title:"Machine Learning Notes",

description:"Important AI learning notes",

type:"Answer" as const,

date:"2 days ago",

url:"#"

}

];







export default function Bookmarks({

items=defaultBookmarks,

onOpen,

onRemove

}:BookmarksProps){



function getIcon(type:BookmarkItem["type"]){


switch(type){


case "Image":

return <Image size={17}/>;


case "Answer":

return <FileText size={17}/>;


default:

return <Globe size={17}/>;


}


}





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


<Bookmark size={20}/>


</div>



<div>


<h3

className="

font-semibold

text-white

"

>

Bookmarks

</h3>



<p

className="

text-xs

text-zinc-500

"

>

Saved resources

</p>


</div>



</div>









{/* Bookmark List */}



<div

className="

space-y-3

"

>


{

items.map((item)=>(



<motion.div


key={item.id}


whileHover={{

y:-3

}}



className="

group

rounded-2xl

border

border-white/10

bg-[#09090B]

p-4

"

>


<div

className="

flex

items-start

justify-between

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

{getIcon(item.type)}

</div>




<div>


<h4

className="

text-sm

font-medium

text-white

"

>

{item.title}

</h4>



<p

className="

mt-1

text-xs

text-zinc-500

"

>

{item.description}

</p>





<div

className="

mt-3

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

{item.type}

</span>



<span

className="

text-[11px]

text-zinc-500

"

>

{item.date}

</span>



</div>


</div>



</div>







<div

className="

flex

gap-2

opacity-0

transition

group-hover:opacity-100

"

>


<button


onClick={()=>onOpen?.(item)}


className="

rounded-xl

bg-white/5

p-2

text-zinc-400

hover:bg-blue-500

hover:text-white

"

>


<ExternalLink size={15}/>


</button>





<button


onClick={()=>onRemove?.(item.id)}


className="

rounded-xl

bg-white/5

p-2

text-zinc-400

hover:bg-red-500

hover:text-white

"

>


<Trash2 size={15}/>


</button>



</div>



</div>



</motion.div>


))


}



</div>





</div>

);

}