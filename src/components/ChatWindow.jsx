import { useState } from "react";
import { useClaude } from "../hooks/useClaude";

export default function ChatWindow({ systemPrompt, placeholder = "How may we assist you?" }) {
  const [input, setInput] = useState("");
  const { messages, isLoading, error, streamingText, sendStreaming, reset } = useClaude({
    system: systemPrompt,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const msg = input;
    setInput("");
    await sendStreaming(msg);
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.length === 0 && !streamingText && (
          <div className="chat-message chat-message--assistant">
            <span className="chat-role">Firm Assistant</span>
            <p>
              Welcome. I can help you learn about our practice areas, our attorneys,
              and how we may be of service. What would you like to know?
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message chat-message--${msg.role}`}>
            <span className="chat-role">
              {msg.role === "user" ? "You" : "Firm Assistant"}
            </span>
            <p>{msg.content}</p>
          </div>
        ))}
        {streamingText && (
          <div className="chat-message chat-message--assistant">
            <span className="chat-role">Firm Assistant</span>
            <p>{streamingText}</p>
          </div>
        )}
        {error && <div className="chat-error">{error}</div>}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? "Sending" : "Send"}
        </button>
        <button type="button" onClick={reset} className="chat-reset">
          Clear
        </button>
      </form>
    </div>
  );
}
