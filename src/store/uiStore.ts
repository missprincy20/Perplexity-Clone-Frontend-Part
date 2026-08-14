import { create } from "zustand";


interface UIStore {

sidebarOpen:boolean;
sourcePanelOpen:boolean;
labsOpen:boolean;
toggleSidebar:()=>void;
toggleSources:()=>void;
toggleLabs:()=>void;


}


export const useUIStore =
create<UIStore>((set)=>({

sidebarOpen:true,
sourcePanelOpen:true,

labsOpen:false,

toggleSidebar:()=>


set((state)=>({

sidebarOpen:
!state.sidebarOpen

})),

toggleSources:()=>


set((state)=>({

sourcePanelOpen:
!state.sourcePanelOpen

})),

toggleLabs:()=>


set((state)=>({

labsOpen:
!state.labsOpen

}))


}));