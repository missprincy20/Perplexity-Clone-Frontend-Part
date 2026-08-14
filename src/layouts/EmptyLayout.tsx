import { Outlet } from "react-router-dom";


export default function EmptyLayout() {


  return (

    <div

      className="
      min-h-screen
      w-full
      bg-[#09090B]
      text-white
      "

    >

      <Outlet />

    </div>

  );

}