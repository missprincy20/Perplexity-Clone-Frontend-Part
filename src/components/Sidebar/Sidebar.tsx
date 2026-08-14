import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import FocusModes from "./FocusModes";
import LabsButton from "./LabsButton";
import ProfileCard from "./ProfileCard";

import {
  MessageSquare,
  History,
  Folder,
  Search,
  Bookmark,
  Settings,
} from "lucide-react";


const Sidebar = () => {
  
  const menuItems = [
    {
      name: "New Chat",
      icon: MessageSquare,
      shortcut: "⌘ N",
      path: "/chat",
    },
    {
      name: "Search History",
      icon: History,
      path: "/chat",
    },
    {
      name: "Collections",
      icon: Folder,
      path: "/collections",
    },
    {
      name: "Research",
      icon: Search,
      path: "/research",
    },
    {
      name: "Bookmarks",
      icon: Bookmark,
      path: "/bookmarks",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];


  return (
    <aside
      className="
      h-screen
      w-[260px]
      bg-[#09090B]
      border-r
      border-white/10
      flex
      flex-col
      px-4
      py-5
      text-gray-300
      "
    >


      {/* Logo */}

      <div
        className="
        flex
        items-center
        gap-3
        mb-8
        px-2
        "
      >

        <div
          className="
          h-9
          w-9
          rounded-xl
          bg-gradient-to-br
          from-blue-500
          to-purple-600
          flex
          items-center
          justify-center
          text-white
          font-bold
          "
        >
          ✦
        </div>


        <h1
          className="
          text-xl
          font-semibold
          tracking-wide
          text-white
          "
        >
          NEXUS AI
        </h1>


      </div>



      {/* Navigation */}

      <nav className="space-y-2">

        {
          menuItems.map((item,index)=>(
            <SidebarItem
              key={index}
              {...item}
            />
          ))
        }


      </nav>



      {/* Divider */}

      <div
        className="
        my-6
        border-t
        border-white/10
        "
      />



      {/* Focus Modes */}

      <SidebarSection title="FOCUS MODES">

          <FocusModes/>

      </SidebarSection>



      <div className="mt-auto">


        <LabsButton/>


        <div
          className="
          my-5
          border-t
          border-white/10
          "
        />


        <ProfileCard/>


      </div>


    </aside>
  );
};


export default Sidebar;