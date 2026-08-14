import { useState } from "react";
import {
  Bookmark,
  Search,
  Filter,
} from "lucide-react";


// Components

import BookmarkList 
from "../../components/Dashboard/Bookmarks";






type FilterType =
"All"
|
"Article"
|
"Image"
|
"Answer";







export default function Bookmarks(){



const [search,setSearch]
=
useState("");



const [filter,setFilter]
=
useState<FilterType>("All");







const filters:FilterType[]=[

"All",

"Article",

"Image",

"Answer"

];







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


<Bookmark size={25}/>


</div>





<div>


<h1

className="

text-2xl

font-bold

"

>

Bookmarks

</h1>



<p

className="

text-sm

text-zinc-500

"

>

Your saved AI knowledge

</p>


</div>


</div>








{/* Search */}



<div

className="

mt-6

flex

items-center

gap-3

rounded-2xl

border

border-white/10

bg-[#09090B]

px-5

py-4

"

>


<Search

size={18}

className="text-zinc-500"

/>



<input


value={search}


onChange={(e)=>

setSearch(e.target.value)

}


placeholder="Search bookmarks..."

className="

flex-1

bg-transparent

outline-none

text-white

placeholder:text-zinc-600

"


/>



</div>









{/* Filters */}



<div

className="

mt-5

flex

flex-wrap

gap-3

"

>


{

filters.map((item)=>(



<button


key={item}


onClick={()=>setFilter(item)}


className={`

flex

items-center

gap-2

rounded-xl

px-4

py-2

text-sm

transition

${

filter===item

?

"bg-blue-500 text-white"

:

"bg-white/5 text-zinc-400"

}

`}


>


<Filter size={15}/>


{item}


</button>



))


}


</div>



</section>









{/* Bookmark Content */}



<section

className="

mt-6

"

>


<BookmarkList


onOpen={(item)=>{

console.log("open",item)

}}


onRemove={(id)=>{

console.log("remove",id)

}}


/>


</section>







</div>

);

}