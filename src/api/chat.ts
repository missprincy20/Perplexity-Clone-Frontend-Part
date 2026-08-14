// Is folder me sirf backend se baat hogi.
// POST /api/chat
// call karegi.

export interface ChatRequest {
  message: string;
  provider: string;
  focusMode: string;
  history: any[];
}

export async function sendChatMessage(
  body: ChatRequest,
  onChunk?: (chunk: string) => void
) {
  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  // Agar backend streaming nahi bhej raha
  if (!response.body) {
    return await response.json();
  }

  // Streaming response
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let fullResponse = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value, { stream: true });

    console.log("📦 Chunk:", chunk);

    fullResponse += chunk;

    if (onChunk) {
      onChunk(chunk);
    }
  }

  return fullResponse;
}