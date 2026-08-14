const API_URL =
`${import.meta.env.VITE_API_URL}/api/voice`;





// Speech To Text Response

export interface STTResponse {

text:string;

}


// Text To Speech Response

export interface TTSResponse {

audioUrl:string;

}


export async function speechToText(

audioBlob:Blob

):Promise<string>{



try{


const formData = new FormData();



formData.append(

"audio",

audioBlob,

"recording.webm"

);


const response = await fetch( `${API_URL}/stt`, {

method:"POST",

body:formData

}

);


if(!response.ok){

    throw new Error("Speech recognition failed");

}


const data:STTResponse = await response.json();



return data.text;



}

catch(error){

console.error("STT Error:", error);


return "";

}



}











// ============================
// Text To Speech
// ============================


export async function textToSpeech(

text:string

):Promise<string>{



try{


const response =
await fetch(

`${API_URL}/tts`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

text

})

}

);








if(!response.ok){

throw new Error(
"TTS generation failed"
);

}







const data:TTSResponse =
await response.json();





return data.audioUrl;



}

catch(error){


console.error(

"TTS Error:",

error

);


return "";

}



}