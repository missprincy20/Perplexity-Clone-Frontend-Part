interface Props{

title:string;

children:React.ReactNode;

}



const SidebarSection = ({
title,
children

}:Props)=>{


return (

<div>


<p
className="
text-xs
tracking-wider
text-gray-500
mb-3
px-2
"
>

{title}

</p>


{children}


</div>

)

}


export default SidebarSection;