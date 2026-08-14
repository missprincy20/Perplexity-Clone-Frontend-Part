import { create } from "zustand";


interface SearchStore {

query:string;
results:any[];
setQuery:(query:string)=>void;
setResults:(results:any[])=>void;
clearSearch:()=>void;


}

export const useSearchStore = create<SearchStore>((set)=>({

query:"",

results:[],


setQuery:(query)=> set({ query }),

setResults:(results)=> set({ results}),

clearSearch:()=>

set({

query:"",

results:[]

})



}));