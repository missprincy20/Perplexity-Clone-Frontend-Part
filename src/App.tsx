

import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

import { ThemeProvider } from "./context/ThemeContext";

import { AuthProvider } from "./context/AuthContext";

import { ChatProvider } from "./context/ChatContext";

import { VoiceProvider } from "./context/VoiceContext";

export default function App(){

return (

  <AuthProvider>

  <ThemeProvider>

  <ChatProvider>

  <VoiceProvider>

  <RouterProvider router={router}/>

  </VoiceProvider>

  </ChatProvider>

  </ThemeProvider>

  </AuthProvider>

);


}