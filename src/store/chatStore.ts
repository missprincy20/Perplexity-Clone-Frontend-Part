import { create } from "zustand";


export interface StoreMessage {
id:string;
role:"user" | "assistant";
content:string;

}


interface ChatStore {
    messages:StoreMessage[];
    isStreaming:boolean;
    addMessage:(message:StoreMessage)=>void;
    setStreaming:(value:boolean)=>void;
    clearMessages:()=>void;

}

export const useChatStore = create<ChatStore>((set)=>({

messages:[

{

id:"1",
role:"assistant",
content:
"Hello 👋 I am Nexus AI. How can I help you?"

}

],

isStreaming:false,


addMessage:(message)=>


set((state)=>({

messages:[

...state.messages,

message

]


})),


setStreaming:(value)=>


set({

isStreaming:value

}),


clearMessages:()=>


set({

messages:[

{

id:"1",

role:"assistant",

content:
"Hello 👋 I am Nexus AI. How can I help you?"

}

]

})


}));