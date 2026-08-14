import { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";

interface VoiceRecorderProps {

  onRecordingComplete?: (
    audioBlob: Blob
  ) => void;

}


export default function VoiceRecorder({

  onRecordingComplete

}:VoiceRecorderProps){


const mediaRecorderRef =
useRef<MediaRecorder | null>(null);


const chunksRef =
useRef<Blob[]>([]);



const [recording,setRecording]
=
useState(false);



const [time,setTime]
=
useState(0);



const timerRef =
useRef<number | null>(null);





async function startRecording(){


try{


const stream =
await navigator.mediaDevices.getUserMedia({

audio:true

});



const recorder =
new MediaRecorder(stream);



mediaRecorderRef.current =
recorder;



chunksRef.current=[];



recorder.ondataavailable=(event)=>{

if(event.data.size>0){

chunksRef.current.push(event.data);

}

};





recorder.onstop=()=>{


const blob =
new Blob(
chunksRef.current,
{
type:"audio/webm"
}
);



onRecordingComplete?.(blob);



stream
.getTracks()
.forEach(track=>track.stop());


};




recorder.start();



setRecording(true);



setTime(0);



timerRef.current =
window.setInterval(()=>{

setTime(prev=>prev+1)

},1000);



}

catch(error){

console.error(
"Microphone permission denied",
error
);

}


}





function stopRecording(){


if(
mediaRecorderRef.current
){

mediaRecorderRef.current.stop();

}



setRecording(false);



if(timerRef.current){

clearInterval(
timerRef.current
);

}


}






return (

<div

className="

flex

items-center

gap-4

"

>


<button


onClick={
recording
?
stopRecording
:
startRecording
}



className={`

flex

h-12

w-12

items-center

justify-center

rounded-full


transition


${
recording

?

"bg-red-500 text-white"

:

"bg-blue-500 text-white"

}

`}


>


{

recording

?

<Square size={20}/>

:

<Mic size={20}/>

}


</button>




<div

className="

text-sm

text-zinc-400

"

>


{

recording

?

`Recording ${time}s`

:

"Click to record"

}


</div>



</div>

);

}