import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";



export default function SidebarLayout() {


  return (

    <div

      className="
      flex
      min-h-screen
      bg-[#09090B]
      text-white
      "

    >


      {/* Sidebar */}

      <aside

        className="
        w-72
        border-r
        border-white/10
        "

      >

        <Sidebar />

      </aside>





      {/* Content */}

      <main

        className="
        flex-1
        overflow-y-auto
        "

      >

        <Outlet />

      </main>



    </div>

  );

}