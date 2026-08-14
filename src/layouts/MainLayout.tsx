// import Sidebar from "../components/Sidebar/Sidebar";
// import Header from "../components/Header/Header";

// interface Props {
//   children: React.ReactNode;
// }

// const MainLayout = ({ children }: Props) => {
//   return (
//     <div className="flex h-screen bg-[#09090B]">

//       <Sidebar />

//       <div className="flex flex-1 flex-col">

//         <Header />

//         <main className="flex-1 overflow-y-auto">
//           {children}
//         </main>

//       </div>

//     </div>
//   );
// };

// export default MainLayout;


import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#09090B]">
          <Outlet />
        </main>

      </div>
    </div>
  );
}