/**
 * Client for the firm's chat assistant.
 *
 * These functions call our own /api/chat endpoint, which holds the Anthropic
 * API key server-side and forwards requests to Claude. The key is never
 * exposed to the browser.
 */
const API_URL = "/api/chat";

const DEFAULT_MODEL = "claude-sonnet-4-6";

export async function sendMessage(messages, { model = DEFAULT_MODEL, maxTokens = 1024, system } = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, system, model, maxTokens }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.text;
}

export async function streamMessage(messages, onChunk, { model = DEFAULT_MODEL, maxTokens = 1024, system } = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, system, model, maxTokens, stream: true }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop(); // keep any partial trailing line for the next chunk

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data) continue;

      let parsed;
      try {
        parsed = JSON.parse(data);
      } catch {
        continue; // skip unparseable frames
      }

      if (parsed.error) throw new Error(parsed.error);
      if (parsed.text) {
        fullText += parsed.text;
        onChunk(parsed.text, fullText);
      }
    }
  }

  return fullText;
}
