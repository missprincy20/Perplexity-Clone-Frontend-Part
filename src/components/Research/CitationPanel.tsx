import { useState } from "react";
import {
  Copy,
  Check,
  Quote,
  ExternalLink,
} from "lucide-react";



interface Citation {

  id:number;

  title:string;

  author?:string;

  year?:string;

  url:string;

}



interface CitationPanelProps {

  citations:Citation[];

}




export default function CitationPanel({

  citations

}:CitationPanelProps){



const [style,setStyle]
=
useState("APA");



const [copied,setCopied]
=
useState<number | null>(null);





function generateCitation(item:Citation){


if(style==="MLA"){

return `${item.title}. ${item.author || "Unknown"}, ${item.year || ""}. ${item.url}`;

}


return `${item.author || "Unknown"} (${item.year || "n.d."}). ${item.title}. ${item.url}`;

}





async function copyCitation(

item:Citation

){


await navigator.clipboard.writeText(

generateCitation(item)

);


setCopied(item.id);



setTimeout(()=>{

setCopied(null);

},1500);


}





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

<Quote size={20}/>

</div>



<div>

<h3

className="

font-semibold

text-white

"

>

Citations

</h3>


<p

className="

text-xs

text-zinc-500

"

>

References

</p>


</div>


</div>






<select


value={style}


onChange={(e)=>

setStyle(e.target.value)

}


className="

rounded-xl

border

border-white/10

bg-white/5

px-3

py-2

text-sm

text-white

outline-none

"


>


<option>

APA

</option>


<option>

MLA

</option>


<option>

Chicago

</option>


</select>



</div>








{/* Citation List */}



<div

className="

flex-1

space-y-3

overflow-y-auto

p-5

"

>



{

citations.map((item,index)=>(



<div

key={item.id}

className="

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

gap-3

"

>


<div>


<span

className="

text-xs

text-blue-400

"

>

[{index+1}]

</span>



<h4

className="

mt-1

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

{item.url}

</p>



</div>






<div

className="

flex

gap-2

"

>


<button

onClick={()=>

copyCitation(item)

}

className="

rounded-lg

p-2

text-zinc-400

hover:bg-white/5

hover:text-white

"


>

{

copied===item.id

?

<Check size={15}/>

:

<Copy size={15}/>

}


</button>



<a

href={item.url}

target="_blank"

className="

rounded-lg

p-2

text-zinc-400

hover:bg-white/5

hover:text-blue-400

"


>

<ExternalLink size={15}/>

</a>



</div>



</div>





<p

className="

mt-3

text-xs

leading-5

text-zinc-400

"

>

{generateCitation(item)}

</p>



</div>



))


}



</div>




</div>

);

}