import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode} from "react";

interface VoiceContextType {

isRecording:boolean;

isMicEnabled:boolean;

audioStream:MediaStream | null;

startRecording:()=>Promise<void>;

stopRecording:()=>void;

toggleRecording:()=>Promise<void>;


}


const VoiceContext =
createContext<
VoiceContextType | undefined
>(undefined);


interface VoiceProviderProps {

children:ReactNode;

}


export function VoiceProvider({

children

}:VoiceProviderProps){





const [isRecording,setIsRecording]
=
useState(false);



const [isMicEnabled,setIsMicEnabled]
=
useState(false);



const [audioStream,setAudioStream]
=
useState<MediaStream | null>(null);









// Start microphone


async function startRecording(){


try{


const stream =
await navigator.mediaDevices.getUserMedia({

audio:true

});




setAudioStream(stream);


setIsMicEnabled(true);


setIsRecording(true);



}

catch(error){


console.error(
"Microphone permission denied",
error
);


setIsMicEnabled(false);


}



}









// Stop microphone


function stopRecording(){



if(audioStream){


audioStream
.getTracks()
.forEach(track=>track.stop());


}



setAudioStream(null);


setIsRecording(false);


}









// Toggle mic


async function toggleRecording(){



if(isRecording){


stopRecording();


}

else{


await startRecording();


}



}









return (

<VoiceContext.Provider


value={{

isRecording,

isMicEnabled,

audioStream,

startRecording,

stopRecording,

toggleRecording

}}


>


{children}


</VoiceContext.Provider>


);



}









export function useVoice(){



const context =
useContext(VoiceContext);



if(!context){


throw new Error(

"useVoice must be used inside VoiceProvider"

);


}



return context;


}