import { useState } from "react";

import { useChat } from "../context/ChatContext";

import {
  streamChat,
} from "../services/chatService";

import type {
  ChatRequest
} from "../types/chat";

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

    provider: "gemini" | "groq" = "gemini",

    focusMode = "general"

  ) {

    const userMessage = {

      id: Date.now().toString(),

      role: "user" as const,

      content: message,

      createdAt: new Date(),

    };



    addMessage(userMessage);

    setLoading(true);

    setStreaming(true);



    let aiResponse = "";



    const request: ChatRequest = {

      message,

      provider,

      focusMode,

      history: messages,

    };



    await streamChat(

      request,



      (chunk) => {

        aiResponse += chunk;

      },



      () => {

        addMessage({

          id: (Date.now() + 1).toString(),

          role: "assistant",

          content: aiResponse,

          createdAt: new Date(),

        });



        setStreaming(false);

        setLoading(false);

      },



      (error) => {

        console.error(error);

        setStreaming(false);

        setLoading(false);

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