import {
MoreVertical
} from "lucide-react";


const ProfileCard=()=>{


return (

<div

className="
flex
items-center
justify-between
p-3
rounded-xl
hover:bg-white/5
cursor-pointer
"

>


<div
className="
flex
items-center
gap-3
"
>


<img

src="https://i.pravatar.cc/100"

className="
h-10
w-10
rounded-full
border
border-white/20
"

/>


<div>

<h3
className="
text-sm
text-white
"
>
Aarohi
</h3>


<p
className="
text-xs
text-gray-500
"
>
Pro Plan
</p>


</div>


</div>


<MoreVertical
size={18}
className="
text-gray-500
"
/>


</div>


)

}



export default ProfileCard;