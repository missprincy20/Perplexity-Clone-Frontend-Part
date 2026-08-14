const API_URL = `${import.meta.env.VITE_API_URL}/api/search`;

export type SearchType = "web" | "reddit" | "youtube";

export interface SearchRequest {

    query:string;
    type:SearchType;
    limit?:number;

}

export interface SearchResult {

    title:string;
    url:string;
    snippet?:string;
    source?:string;
    image?:string;


}


export async function searchWeb(

body:SearchRequest

):Promise<SearchResult[]>{

try{

const response = await fetch(

API_URL,

{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(body)

}

);

if(!response.ok){

    throw new Error("Search request failed");

}

const data = await response.json();

return data.results || [];


}

catch(error){

console.error(

"Search Error:",

error

);


return [];

}

}


export async function webSearch(

query:string

){

return searchWeb({

query,

type:"web"

});


}


export async function redditSearch(

query:string

){


return searchWeb({

query,

type:"reddit"

});


}


export async function youtubeSearch(

query:string

){

return searchWeb({

query,

type:"youtube"

});


}