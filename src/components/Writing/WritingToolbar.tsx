import {
  Bold,
  Italic,
  Underline,
  Heading,
  List,
  ListOrdered,
  Code2,
  Sparkles,
  Download,
} from "lucide-react";


interface WritingToolbarProps {

  onAction?:(action:string)=>void;

  onRewrite?:()=>void;

}



const tools = [

{
 id:"bold",
 icon:<Bold size={17}/>,
 label:"Bold"
},

{
 id:"italic",
 icon:<Italic size={17}/>,
 label:"Italic"
},

{
 id:"underline",
 icon:<Underline size={17}/>,
 label:"Underline"
},

{
 id:"heading",
 icon:<Heading size={17}/>,
 label:"Heading"
},

{
 id:"bullet",
 icon:<List size={17}/>,
 label:"Bullet List"
},

{
 id:"number",
 icon:<ListOrdered size={17}/>,
 label:"Number List"
},

{
 id:"code",
 icon:<Code2 size={17}/>,
 label:"Code"
}

];





export default function WritingToolbar({

onAction,

onRewrite

}:WritingToolbarProps){



return (

<div

className="

flex

flex-wrap

items-center

gap-2

rounded-2xl

border

border-white/10

bg-[#111113]

p-3

"


>



{/* Formatting Tools */}



{

tools.map((tool)=>(


<button


key={tool.id}


title={tool.label}


onClick={()=>{

onAction?.(tool.id)

}}


className="

flex

h-9

w-9

items-center

justify-center

rounded-xl

text-zinc-400

transition

hover:bg-white/10

hover:text-white

"

>


{tool.icon}


</button>


))

}





<div

className="

mx-2

h-6

w-px

bg-white/10

"

/>





{/* AI Rewrite */}



<button


onClick={onRewrite}


className="

flex

items-center

gap-2

rounded-xl

bg-blue-500

px-4

py-2

text-sm

font-medium

text-white

transition

hover:bg-blue-600

"

>


<Sparkles size={16}/>


AI Rewrite


</button>







{/* Tone Selector */}



<select


className="

rounded-xl

border

border-white/10

bg-white/5

px-3

py-2

text-sm

text-zinc-300

outline-none

"

>


<option>

Professional

</option>


<option>

Friendly

</option>


<option>

Creative

</option>


<option>

Simple

</option>


<option>

Academic

</option>


</select>








{/* Export */}



<button


className="

flex

items-center

gap-2

rounded-xl

border

border-white/10

px-3

py-2

text-sm

text-zinc-300

transition

hover:bg-white/5

"

>


<Download size={15}/>

Export


</button>






</div>

);

}