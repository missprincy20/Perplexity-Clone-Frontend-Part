import { useState } from "react";
import {
  Save,
  FileText,
  Sparkles,
} from "lucide-react";



interface NotesPanelProps {

  initialNotes?: string;

  onSave?: (notes:string)=>void;

}



export default function NotesPanel({

  initialNotes = 
`# Research Notes

Start collecting your important insights here...

`,

  onSave,

}: NotesPanelProps){



const [notes,setNotes]
=
useState(initialNotes);



function handleSave(){

  onSave?.(notes);

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

<FileText size={20}/>

</div>




<div>


<h3

className="

font-semibold

text-white

"

>

Notes

</h3>



<div

className="

flex

items-center

gap-1

text-xs

text-zinc-500

"

>

<Sparkles size={12}/>

AI Workspace

</div>


</div>


</div>






<button

onClick={handleSave}

className="

flex

items-center

gap-2

rounded-xl

bg-blue-500

px-4

py-2

text-sm

text-white

transition

hover:bg-blue-600

"

>


<Save size={15}/>

Save


</button>


</div>







{/* Editor */}


<div

className="

flex-1

p-5

"

>


<textarea


value={notes}


onChange={(e)=>

setNotes(e.target.value)

}


placeholder="Write your research notes..."

className="

h-full

min-h-[300px]

w-full

resize-none

rounded-2xl

border

border-white/10

bg-[#09090B]

p-5

text-sm

leading-7

text-zinc-200

outline-none

placeholder:text-zinc-600

focus:border-blue-500/40

"

/>


</div>







{/* Footer */}


<div

className="

border-t

border-white/10

px-5

py-3

text-xs

text-zinc-500

"

>


{notes.length} characters


</div>




</div>

);

}