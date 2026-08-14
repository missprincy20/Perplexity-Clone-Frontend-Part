import {
  Sparkles,
} from "lucide-react";


// Research Components

import ResearchWorkspace 
from "../../components/Research/ResearchWorkspace";

import ResearchSidebar 
from "../../components/Research/ResearchSidebar";

import NotesPanel 
from "../../components/Research/NotesPanel";

import CitationPanel 
from "../../components/Research/CitationPanel";





export default function Research(){



return (

<div

className="

min-h-screen

bg-[#09090B]

text-white

flex

"

>


{/* Research Sidebar */}



<aside

className="

hidden

lg:block

w-72

border-r

border-white/10

p-5

"

>


<ResearchSidebar/>


</aside>


{/* Main Workspace */}



<main

className="

flex-1

p-6

space-y-6

"

>







{/* Header */}



<section

className="

rounded-3xl

border

border-white/10

bg-[#111113]

p-6

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

h-11

w-11

items-center

justify-center

rounded-2xl

bg-blue-500/10

text-blue-400

"

>


<Sparkles size={22}/>


</div>






<div>


<h1

className="

text-2xl

font-bold

"

>

Research Workspace

</h1>



<p

className="

mt-1

text-sm

text-zinc-500

"

>

Analyze documents, sources and create insights

</p>


</div>



</div>


</section>









{/* Workspace Area */}



<section

className="

grid

grid-cols-1

xl:grid-cols-3

gap-6

"

>





{/* Main Research */}



<div

className="

xl:col-span-2

"

>


<ResearchWorkspace/>


</div>








{/* Notes */}



<div>


<NotesPanel/>


</div>





</section>









{/* Citations */}



<section>


<CitationPanel citations={[]} />


</section>






</main>







</div>

);

}