// Ye file tumhare pure frontend ka navigation brain hogi.

// Isme hum:

// React Router setup
// MainLayout connection
// SidebarLayout connection
// EmptyLayout connection
// All pages routing
// 404 fallback

import {
  createBrowserRouter,
} from "react-router-dom";


// Layouts

import MainLayout from "../layouts/MainLayout";
import SidebarLayout from "../layouts/SidebarLayout";
import EmptyLayout from "../layouts/EmptyLayout";



// Pages

import Home from "../pages/Home/home";
import Chat from "../pages/Chat/Chat";
import Search from "../pages/Search/Search";
import Collections from "../pages/Collections/Collections";
import Research from "../pages/Research/Research";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";





export const router = createBrowserRouter([



  // Main App Layout

  {

    path:"/",

    element:<MainLayout/>,

    children:[


      {
        index:true,
        element:<Home/>
      },


      {
        path:"chat",
        element:<Chat/>
      },


      {
        path:"search",
        element:<Search/>
      },


      {
        path:"collections",
        element:<Collections/>
      },


      {
        path:"bookmarks",
        element:<Bookmarks/>
      },


      {
        path:"settings",
        element:<Settings/>
      },


    ]

  },









  // Sidebar Only Layout

  {


    element:<SidebarLayout/>,


    children:[


      {

        path:"research",

        element:<Research/>

      }


    ]

  },


  // Empty Layout Pages

  {


    element:<EmptyLayout/>,

    children:[


      {

        path:"*",

        element:<NotFound/>

      }


    ]

  }





]);