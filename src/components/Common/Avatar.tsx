interface AvatarProps{

src?:string;
name?:string;
size?:number;

}


const Avatar=({
src,
name="User",
size=40
}:AvatarProps)=>{


return (

<div

style={{
width:size,
height:size
}}

className="
rounded-full
overflow-hidden
bg-[#4F8CFF]
flex
items-center
justify-center
text-white
font-semibold
"

>


{
src ?

<img
src={src}
className="w-full h-full object-cover"
/>

:

name.charAt(0)

}


</div>

)

}


export default Avatar;