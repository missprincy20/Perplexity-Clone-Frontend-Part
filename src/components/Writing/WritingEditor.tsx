import { useState } from "react";
import {
  FileText,
  Sparkles,
} from "lucide-react";


interface WritingEditorProps {

  initialTitle?:string;

  initialContent?:string;

  onChange?:(content:string)=>void;

}



export default function WritingEditor({

  initialTitle="Untitled Document",

  initialContent="",

  onChange,

}:WritingEditorProps){



const [title,setTitle]
=
useState(initialTitle);



const [content,setContent]
=
useState(initialContent);





function updateContent(
value:string
){

setContent(value);

onChange?.(value);

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

px-6

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

<FileText size={20}/>

</div>




<div>


<input


value={title}


onChange={(e)=>

setTitle(e.target.value)

}


className="

bg-transparent

text-lg

font-semibold

text-white

outline-none

"




/>



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

<Sparkles size={12}/>

AI Writing Mode

</div>


</div>


</div>




</div>







{/* Editor */}


<div

className="

flex-1

p-6

"

>


<textarea


value={content}


onChange={(e)=>

updateContent(e.target.value)

}


placeholder="Start writing your content..."

className="

h-full

min-h-[500px]

w-full

resize-none

bg-transparent

text-base

leading-8

text-zinc-200

outline-none

placeholder:text-zinc-600

"




/>


</div>








{/* Footer */}


<div

className="

border-t

border-white/10

px-6

py-3

text-xs

text-zinc-500

"

>


Words:
{" "}

{
content.trim()

?

content.trim().split(/\s+/).length

:

0

}


&nbsp; | &nbsp;


Characters:
{" "}

{content.length}



</div>





</div>

);

}