/**
 * /api/chat — server-side proxy for the Anthropic Messages API.
 *
 * The Anthropic API key lives here, in the server-side ANTHROPIC_API_KEY
 * environment variable, and is never sent to the browser. The client posts
 * { messages, system, model, maxTokens, stream } to this endpoint; we forward
 * the request to Claude with the key attached and stream the reply back.
 *
 * Runs as a Vercel Function in production and via a Vite dev middleware
 * locally (see vite.config.js), so it only depends on the Node req/res API.
 */
import Anthropic from "@anthropic-ai/sdk";

// Allow-list the models the client may request so this endpoint can't be
// abused as an open, unmetered Claude proxy. Unknown values fall back to the
// default rather than erroring.
const ALLOWED_MODELS = new Set([
  "claude-sonnet-4-6",
  "claude-opus-4-8",
  "claude-haiku-4-5",
]);
const DEFAULT_MODEL = "claude-sonnet-4-6";
const MAX_TOKENS_CAP = 2048;
const DEFAULT_MAX_TOKENS = 1024;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "The assistant is not configured. Set ANTHROPIC_API_KEY.",
      })
    );
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(req);
  } catch {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Invalid JSON body." }));
    return;
  }

  const { messages, system, model, maxTokens, stream } = payload || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "A non-empty messages array is required." }));
    return;
  }

  const client = new Anthropic({ apiKey });
  const params = {
    model: ALLOWED_MODELS.has(model) ? model : DEFAULT_MODEL,
    max_tokens: clampTokens(maxTokens),
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  };
  if (typeof system === "string" && system.length > 0) {
    params.system = system;
  }

  try {
    if (stream) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");

      const claudeStream = client.messages.stream(params);
      claudeStream.on("text", (delta) => {
        res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
      });
      await claudeStream.finalMessage();
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
      return;
    }

    const message = await client.messages.create(params);
    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ text }));
  } catch (err) {
    const status =
      Number.isInteger(err?.status) && err.status >= 400 && err.status < 600
        ? err.status
        : 500;
    const message = err?.message || "Upstream request failed.";
    // If we already started streaming, headers are sent — emit an SSE error frame.
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
      res.end();
      return;
    }
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: message }));
  }
}

function clampTokens(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return DEFAULT_MAX_TOKENS;
  return Math.min(Math.max(Math.floor(n), 1), MAX_TOKENS_CAP);
}

// Vercel populates req.body; the Vite dev middleware does not, so fall back to
// reading the raw request stream.
async function readJsonBody(req) {
  if (req.body != null) {
    if (typeof req.body === "string") return JSON.parse(req.body);
    if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString("utf8"));
    return req.body;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}
