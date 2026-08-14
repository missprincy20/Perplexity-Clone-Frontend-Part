import { motion } from "framer-motion";
import React from "react";


interface ModalProps{

open:boolean;
onClose:()=>void;
children:React.ReactNode;

}


const Modal=({
open,
onClose,
children
}:ModalProps)=>{


if(!open) return null;


return (

<div
className="
fixed inset-0
bg-black/60
backdrop-blur-sm
flex
items-center
justify-center
z-50
"
onClick={onClose}
>


<motion.div

initial={{
opacity:0,
scale:0.9
}}

animate={{
opacity:1,
scale:1
}}

className="
bg-[#111113]
border border-white/10
rounded-3xl
p-6
max-w-lg
w-full
"

onClick={(e)=>e.stopPropagation()}

>


{children}


</motion.div>


</div>

)

}


export default Modal;