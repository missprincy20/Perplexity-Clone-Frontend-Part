import { useState } from "react";
import {
  Search as SearchIcon,
  Globe,
  Image,
  Video,
  Sparkles,
} from "lucide-react";


// Components

import ImageGrid from "../../components/ImageSearch/ImageGrid";
import VideoGrid from "../../components/VideoSearch/VideoGrid";
import SourceList from "../../components/Sources/SourceList";
import useSearch from "../../hooks/useSearch";

type Tab ="web" | "images" | "videos";


export default function Search(){

const {
  query,
  setQuery,
  results,
  loading,
  search

}=useSearch();


const [activeTab,setActiveTab]=useState<Tab>("web");

const images=[

{

id:1,

url:"https://images.unsplash.com/photo-1518770660439-4636190af475",

title:"AI Technology",
source:"Unsplash"

},

{

id:2,

url:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e",

title:"Robot AI",
source:"Unsplash"

}

];


const videos=[

{

id:1,
thumbnail:"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",

title:"Building AI Agents",
channel:"AI Research",
duration:"12:20",
views:"20K"

},

{

id:2,

thumbnail:"https://images.unsplash.com/photo-1535378917042-10a22c95931a",

title:"Future of AI",
channel:"Tech",
duration:"08:45",
views:"15K"

}

];



return (

<div

className="min-h-screen bg-[#09090B] text-white p-6">

<input
value={query}
onChange={(e)=>setQuery(e.target.value)}
/>

<button onClick={()=>search("web")}>
Search
</button>

{/* Search Header */}

<section
className="
rounded-3xl
border
border-white/10
bg-[#111113]
p-6
">


<div

className="
flex
items-center
gap-3
rounded-2xl
border
border-white/10
bg-[#09090B]
px-5
py-4">


<SearchIcon
size={20}
className="text-zinc-500"
/>


<input

value={query}
onChange={(e)=>
setQuery(e.target.value)

}


placeholder="Search anything..."

className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-600"/>
 
<button

className="

rounded-xl

bg-blue-500

px-5

py-2

text-sm

font-medium

hover:bg-blue-600

"

>

Search

</button>


</div>









{/* Tabs */}



<div

className="

mt-5

flex

gap-3

"

>


{

[

{

id:"web",

name:"Web",

icon:<Globe size={16}/>

},

{

id:"images",

name:"Images",

icon:<Image size={16}/>

},

{

id:"videos",

name:"Videos",

icon:<Video size={16}/>

}

].map((tab)=>(



<button


key={tab.id}


onClick={()=>setActiveTab(tab.id as Tab)}



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

activeTab===tab.id

?

"bg-blue-500 text-white"

:

"bg-white/5 text-zinc-400"

}

`}


>


{tab.icon}

{tab.name}


</button>



))


}



</div>


</section>









{/* AI Summary */}



<section

className="

mt-6

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

gap-2

mb-4

"

>


<Sparkles

size={18}

className="text-blue-400"

/>


<h2

className="font-semibold"

>

AI Summary

</h2>


</div>




<p

className="

leading-7

text-zinc-300

"

>

AI generated search summary will appear here based on your query.

</p>



</section>









{/* Results */}



<div

className="

mt-6

"

>



{

activeTab==="images"

&&

<ImageGrid

images={images}

/>

}







{

activeTab==="videos"

&&

<VideoGrid

videos={videos}

/>

}







{

activeTab==="web"

&&

<div

className="

rounded-3xl

border

border-white/10

bg-[#111113]

p-5

"

>

<SourceList sources={results} />

</div>

}



</div>


</div>

);

}