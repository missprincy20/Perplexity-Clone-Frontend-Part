import {
  Settings as SettingsIcon,
  User,
  Bot,
  Mic,
  Palette,
  Bell,
  KeyRound,
} from "lucide-react";






interface SettingCardProps {


icon:React.ReactNode;


title:string;


description:string;


children?:React.ReactNode;


}







function SettingCard({

icon,

title,

description,

children

}:SettingCardProps){



return (

<div

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

items-start

gap-4

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


{icon}


</div>





<div

className="flex-1"

>


<h3

className="

font-semibold

text-white

"

>

{title}

</h3>


<p

className="

mt-1

text-sm

text-zinc-500

"

>

{description}

</p>



</div>



</div>





{

children && (

<div

className="

mt-5

"

>

{children}

</div>

)

}



</div>

);

}









export default function Settings(){



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

mb-6

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


<SettingsIcon size={25}/>


</div>




<div>


<h1

className="

text-2xl

font-bold

"

>

Settings

</h1>


<p

className="

text-sm

text-zinc-500

"

>

Manage your AI assistant preferences

</p>


</div>



</div>


</section>









{/* Settings Grid */}



<div

className="

grid

grid-cols-1

lg:grid-cols-2

gap-6

"

>







<SettingCard


icon={<User size={20}/>}


title="Profile"


description="Manage your account information"


>


<div

className="space-y-3"

>


<input

placeholder="Name"

className="

w-full

rounded-xl

border

border-white/10

bg-[#09090B]

px-4

py-3

text-sm

outline-none

"

/>



<input

placeholder="Email"

className="

w-full

rounded-xl

border

border-white/10

bg-[#09090B]

px-4

py-3

text-sm

outline-none

"

/>


</div>


</SettingCard>









<SettingCard


icon={<Bot size={20}/>}


title="AI Preferences"


description="Customize AI behavior"


>


<select

className="

w-full

rounded-xl

border

border-white/10

bg-[#09090B]

px-4

py-3

text-sm

"

>


<option>

Balanced AI

</option>


<option>

Creative AI

</option>


<option>

Research Mode

</option>


</select>


</SettingCard>









<SettingCard


icon={<Mic size={20}/>}


title="Voice Settings"


description="Configure voice assistant"


>


<button

className="

rounded-xl

bg-blue-500

px-5

py-2

text-sm

"

>

Enable Voice

</button>


</SettingCard>









<SettingCard


icon={<Palette size={20}/>}


title="Appearance"


description="Theme customization"


>


<select

className="

w-full

rounded-xl

border

border-white/10

bg-[#09090B]

px-4

py-3

"

>


<option>

Dark

</option>


<option>

Light

</option>


</select>


</SettingCard>









<SettingCard


icon={<Bell size={20}/>}


title="Notifications"


description="Control alerts"


>


<label

className="

flex

items-center

gap-3

text-sm

"

>


<input

type="checkbox"

/>


Enable notifications


</label>


</SettingCard>









<SettingCard


icon={<KeyRound size={20}/>}


title="API Configuration"


description="Manage external services"


>


<input

placeholder="API Key"

className="

w-full

rounded-xl

border

border-white/10

bg-[#09090B]

px-4

py-3

"

>


</input>


</SettingCard>






</div>

</div>

);

}