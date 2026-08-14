import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



interface ActivityChartProps {


data?:{

day:string;

searches:number;

chats:number;

}[];


}



const defaultData = [

{
day:"Mon",
searches:20,
chats:12
},

{
day:"Tue",
searches:35,
chats:18
},

{
day:"Wed",
searches:28,
chats:22
},

{
day:"Thu",
searches:50,
chats:35
},

{
day:"Fri",
searches:42,
chats:30
},

{
day:"Sat",
searches:60,
chats:45
},

{
day:"Sun",
searches:55,
chats:40
}

];





export default function ActivityChart({

data=defaultData

}:ActivityChartProps){



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



{/* Header */}


<div

className="

mb-6

"

>


<h3

className="

text-lg

font-semibold

text-white

"

>

Activity Overview

</h3>


<p

className="

mt-1

text-sm

text-zinc-500

"

>

Your AI usage this week

</p>


</div>








{/* Chart */}



<div

className="

h-[320px]

w-full

"

>


<ResponsiveContainer

width="100%"

height="100%"

>


<LineChart

data={data}

margin={{

top:10,

right:10,

left:-20,

bottom:0

}}

>



<CartesianGrid

strokeDasharray="3 3"

/>



<XAxis

dataKey="day"

/>



<YAxis />





<Tooltip

contentStyle={{

background:"#111113",

border:"1px solid rgba(255,255,255,0.1)"

}}

/>





<Line


type="monotone"


dataKey="searches"


strokeWidth={3}


dot={false}


/>







<Line


type="monotone"


dataKey="chats"


strokeWidth={3}


dot={false}


/>






</LineChart>


</ResponsiveContainer>


</div>





</div>

);

}