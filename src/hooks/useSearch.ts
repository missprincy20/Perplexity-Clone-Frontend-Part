import { useState } from "react";

import {
  searchWeb,
} from "../services/searchService";

import type {
  SearchType,
  SearchResult,
} from "../services/searchService";


export default function useSearch(){


const [results,setResults]=useState<SearchResult[]>([]);

const [loading,setLoading]=useState(false);

const [query,setQuery]=useState("");

async function search(

type:SearchType = "web"

){


if(!query.trim())
return;

try{
    setLoading(true);
    const data=await searchWeb({
    query,
    type

    });

    setResults(data);

}

catch(error){
    console.error("Search failed",error);
    setResults([]);
}

finally{

setLoading(false);

}

}


function clearSearch(){

setQuery("");
setResults([]);

}


return {

query,
setQuery,
results,
loading,
search,
clearSearch


};

}