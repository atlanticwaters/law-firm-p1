const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const API_URL = "https://api.anthropic.com/v1/messages";

export async function sendMessage(messages, { model = "claude-sonnet-4-20250514", maxTokens = 1024, system } = {}) {
  const body = {
    model,
    max_tokens: maxTokens,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  };

  if (system) {
    body.system = system;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

export async function streamMessage(messages, onChunk, { model = "claude-sonnet-4-20250514", maxTokens = 1024, system } = {}) {
  const body = {
    model,
    max_tokens: maxTokens,
    stream: true,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  };

  if (system) {
    body.system = system;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data);
          if (parsed.type === "content_block_delta" && parsed.delta?.text) {
            fullText += parsed.delta.text;
            onChunk(parsed.delta.text, fullText);
          }
        } catch {
          // skip unparseable chunks
        }
      }
    }
  }

  return fullText;
}
