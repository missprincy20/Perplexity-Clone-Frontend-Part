import { useState } from "react";

import { useChat } from "../context/ChatContext";

import {
  streamChat,
} from "../services/chatService";

import type {
  ChatRequest,
  Provider,
} from "../types/chat";
import { normalizeChatMessage, normalizeSource } from "../types/chat";

export default function useChatHook() {

  const {

    messages,

    addMessage,

    loading,

    setLoading,

    clearChat,

  } = useChat();

  const [streaming, setStreaming] = useState(false);


  async function send(

    message: string,

    provider: Provider = "groq",

    focusMode = "general"

  ) {

    const userMessage = normalizeChatMessage({

      id: Date.now().toString(),

      role: "user",

      content: message,

      createdAt: new Date(),

    });



    addMessage(userMessage);

    setLoading(true);

    setStreaming(true);



    let aiResponse = "";
    let capturedDocs: any[] = [];



    const request: ChatRequest = {

      message,

      provider,

      focusMode,

      history: messages,

    };



    await streamChat(

      request,

      {

        onToken: (chunk: string) => {

          aiResponse += chunk;

        },

        onDocuments: (docs: any) => {
          if (Array.isArray(docs)) {
            capturedDocs = docs.map(normalizeSource);
          }
        },

        onCompleted: () => {

          addMessage(normalizeChatMessage({

            id: (Date.now() + 1).toString(),

            role: "assistant",

            content: aiResponse,

            createdAt: new Date(),

            sources: capturedDocs,

          }));



          setStreaming(false);

          setLoading(false);

        },

        onError: (error: any) => {

          console.error(error);

          setStreaming(false);

          setLoading(false);

        }

      }

    );

  }

  return {

    messages,

    loading,

    streaming,

    send,

    clearChat,

  };

}