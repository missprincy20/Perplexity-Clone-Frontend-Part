import {
  Search,
  MessageSquare,
  FileText,
  Bookmark,
} from "lucide-react";


// Dashboard Components

import StatsCard from "../../components/Dashboard/StatsCard";
import ActivityChart from "../../components/Dashboard/ActivityChart";
import RecentChats from "../../components/Dashboard/RecentChats";
import Bookmarks from "../../components/Dashboard/Bookmarks";


// Suggestion

import SuggestionGrid from "../../components/Cards/SuggestionGrid";





export default function Home(){


return (

   

<div

className="
min-h-screen
bg-[#09090B]
text-white
p-6
space-y-8
"

>



{/* Hero Section */}


<section

className="
flex
flex-col
items-center
pt-20
"

>


<h1

className="
text-6xl
font-bold
text-white
text-center
"

>

Good Evening,

<span className="text-blue-500">
 Princy 👋
</span>

</h1>



<p

className="
mt-4
text-gray-400
text-xl
"

>

What do you want to know today?

</p>





<div

className="
mt-10
w-full
max-w-3xl
flex
items-center
gap-3
rounded-2xl
border
border-white/10
bg-[#111113]
px-6
py-4
"

>


<Search

size={22}

className="text-gray-400"

/>



<input

placeholder="Ask anything..."

className="
flex-1
bg-transparent
outline-none
text-white
placeholder:text-gray-500
"

/>



<button

className="
rounded-xl
bg-blue-500
px-5
py-2
hover:bg-blue-600
"

>

Search

</button>



</div>



</section>









{/* Stats */}



<section

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-5
"

>



<StatsCard

title="Total Searches"

value="1,248"

change="+12%"

description="This month"

icon={<Search size={22}/>}

/>





<StatsCard

title="AI Conversations"

value="356"

change="+8%"

description="Active chats"

icon={<MessageSquare size={22}/>}

/>







<StatsCard

title="Research"

value="42"

change="+15%"

description="Projects created"

icon={<FileText size={22}/>}

/>







<StatsCard

title="Bookmarks"

value="128"

change="+5%"

description="Saved resources"

icon={<Bookmark size={22}/>}

/>



</section>









{/* Suggestions */}



<section>


<SuggestionGrid/>


</section>









{/* Activity */}



<section>


<ActivityChart/>


</section>









{/* Recent + Bookmarks */}



<section

className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
"

>


<RecentChats/>


<Bookmarks/>


</section>







</div>


);


}