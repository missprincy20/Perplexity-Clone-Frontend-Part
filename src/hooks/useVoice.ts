import { useState } from "react";

import { useVoice } from "../context/VoiceContext";

import {
  speechToText,
  textToSpeech,
} from "../services/voiceService";


export default function useVoiceHook() {

  const {
    isRecording,
    isMicEnabled,
    startRecording,
    stopRecording,
    toggleRecording,
    
  } = useVoice();


  const [transcript, setTranscript] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  async function convertSpeech(audio: Blob) {

    try {

      setIsProcessing(true);

      const text = await speechToText(audio);

      setTranscript(text);

      return text;

    } catch (error) {

      console.error("Speech To Text Error:", error);

      return "";

    } finally {

      setIsProcessing(false);

    }

  }

  async function speak(text: string) {

    try {

      const audioUrl = await textToSpeech(text);

      if (!audioUrl) return;

      const audio = new Audio(audioUrl);

      await audio.play();

    } catch (error) {

      console.error("Text To Speech Error:", error);

    }

  }


  return {

    isRecording,

    isMicEnabled,

    isProcessing,

    transcript,

    startRecording,

    stopRecording,

    toggleRecording,

    convertSpeech,

    speak,

  };

}