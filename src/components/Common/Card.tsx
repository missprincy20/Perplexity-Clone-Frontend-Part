import React from "react";


interface CardProps {
 children:React.ReactNode;
 className?:string;
}


const Card = ({
children,
className=""
}:CardProps)=>{


return (

<div
className={`
bg-[#111113]/80
border
border-white/10
rounded-2xl
backdrop-blur-xl
shadow-lg
${className}
`}
>

{children}

</div>

)

}


export default Card;