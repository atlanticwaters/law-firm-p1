import { useState, useCallback } from "react";
import { sendMessage, streamMessage } from "../services/claude";

export function useClaude({ system, model, maxTokens } = {}) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streamingText, setStreamingText] = useState("");

  const send = useCallback(
    async (userMessage) => {
      setIsLoading(true);
      setError(null);

      const newMessages = [...messages, { role: "user", content: userMessage }];
      setMessages(newMessages);

      try {
        const reply = await sendMessage(newMessages, { system, model, maxTokens });
        const updatedMessages = [...newMessages, { role: "assistant", content: reply }];
        setMessages(updatedMessages);
        return reply;
      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [messages, system, model, maxTokens]
  );

  const sendStreaming = useCallback(
    async (userMessage) => {
      setIsLoading(true);
      setError(null);
      setStreamingText("");

      const newMessages = [...messages, { role: "user", content: userMessage }];
      setMessages(newMessages);

      try {
        const reply = await streamMessage(
          newMessages,
          (_chunk, fullText) => setStreamingText(fullText),
          { system, model, maxTokens }
        );
        const updatedMessages = [...newMessages, { role: "assistant", content: reply }];
        setMessages(updatedMessages);
        setStreamingText("");
        return reply;
      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [messages, system, model, maxTokens]
  );

  const reset = useCallback(() => {
    setMessages([]);
    setError(null);
    setStreamingText("");
  }, []);

  return { messages, isLoading, error, streamingText, send, sendStreaming, reset };
}
