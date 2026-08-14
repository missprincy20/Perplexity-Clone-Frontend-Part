import { motion } from "framer-motion";
import {
  FileSearch,
  Sparkles,
  Plus,
} from "lucide-react";


interface ResearchWorkspaceProps {

  title?: string;

  children?: React.ReactNode;

}


export default function ResearchWorkspace({

  title = "Research Workspace",

  children,

}: ResearchWorkspaceProps) {


return (

<motion.div

initial={{
 opacity:0,
 y:20
}}

animate={{
 opacity:1,
 y:0
}}

transition={{
 duration:0.3
}}


className="

flex

h-full

min-h-screen

overflow-hidden

bg-[#09090B]

text-white

"


>


{/* Left Sidebar Placeholder */}


<aside

className="

hidden

lg:flex

w-72

flex-col

border-r

border-white/10

bg-[#111113]

p-5

"

>


<div

className="

flex

items-center

gap-3

mb-6

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

<FileSearch size={22}/>

</div>


<div>

<h2 className="font-semibold">

Research

</h2>

<p className="text-xs text-zinc-500">

Workspace

</p>

</div>


</div>



<button

className="

flex

items-center

gap-2

rounded-xl

bg-blue-500

px-4

py-3

text-sm

font-medium

hover:bg-blue-600

transition

"

>

<Plus size={16}/>

New Research

</button>


</aside>





{/* Main Research Area */}


<main

className="

flex-1

flex

flex-col

"

>


{/* Header */}


<header

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


<div>

<h1

className="

text-xl

font-semibold

"

>

{title}

</h1>


<p

className="

text-sm

text-zinc-500

mt-1

"

>

AI powered research environment

</p>

</div>




<div

className="

flex

items-center

gap-2

rounded-full

bg-blue-500/10

px-4

py-2

text-sm

text-blue-400

"

>

<Sparkles size={15}/>

AI Research Mode

</div>



</header>






{/* Canvas */}


<section

className="

flex-1

overflow-y-auto

p-6

"

>


{

children

?

children

:

<div

className="

flex

h-full

items-center

justify-center

text-center

"

>


<div>


<div

className="

mx-auto

flex

h-16

w-16

items-center

justify-center

rounded-2xl

bg-blue-500/10

text-blue-400

"

>

<FileSearch size={30}/>

</div>



<h3

className="

mt-5

text-lg

font-semibold

"

>

Start your research

</h3>


<p

className="

mt-2

max-w-md

text-sm

text-zinc-500

"

>

Upload sources, ask questions and generate insights.

</p>


</div>


</div>

}


</section>


</main>



</motion.div>

);

}