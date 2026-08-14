import {
  Folder,
  Plus,
  FileText,
  Image,
  Video,
} from "lucide-react";

import Card from "../../components/Common/Card";





interface CollectionItem {


id:number;


title:string;


description:string;


items:number;


type:string;


}




const collections:CollectionItem[]=[


{

id:1,

title:"AI Research",

description:"AI papers, articles and experiments",

items:24,

type:"Research"

},



{

id:2,

title:"Machine Learning",

description:"ML notes and model resources",

items:18,

type:"Notes"

},



{

id:3,

title:"Image Collection",

description:"Saved AI generated images",

items:36,

type:"Images"

},



{

id:4,

title:"Video Learning",

description:"AI tutorials and courses",

items:12,

type:"Videos"

}



];









export default function Collections(){





function getIcon(type:string){


if(type==="Images")

return <Image size={20}/>;


if(type==="Videos")

return <Video size={20}/>;


return <FileText size={20}/>;


}







return (

<div

className="

min-h-screen

bg-[#09090B]

text-white

p-6

"

>







{/* Header */}



<section

className="

flex

items-center

justify-between

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

h-12

w-12

items-center

justify-center

rounded-2xl

bg-blue-500/10

text-blue-400

"

>


<Folder size={25}/>


</div>




<div>


<h1

className="

text-2xl

font-bold

"

>

Collections

</h1>



<p

className="

text-sm

text-zinc-500

"

>

Organize your AI workspace

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

px-5

py-3

text-sm

font-medium

hover:bg-blue-600

transition

"

>

<Plus size={18}/>


New Collection


</button>



</section>









{/* Collections Grid */}



<section

className="

mt-6

grid

grid-cols-1

md:grid-cols-2

xl:grid-cols-3

gap-6

"

>





{

collections.map((collection)=>(



<Card

key={collection.id}


className="

group

cursor-pointer

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

h-11

w-11

items-center

justify-center

rounded-xl

bg-blue-500/10

text-blue-400

"

>

{getIcon(collection.type)}


</div>



<span

className="

rounded-full

bg-white/5

px-3

py-1

text-xs

text-zinc-400

"

>

{collection.items}

</span>



</div>







<h3

className="

mt-5

font-semibold

text-white

"

>

{collection.title}

</h3>






<p

className="

mt-2

text-sm

text-zinc-500

"

>

{collection.description}

</p>







<span

className="

mt-4

inline-block

text-xs

text-blue-400

"

>

{collection.type}

</span>





</Card>



))


}



</section>








</div>

);

}