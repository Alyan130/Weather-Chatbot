// useCustomChat.ts
import { useState, ChangeEvent, FormEvent, useCallback } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type UseCustomChatReturn = {
  messages: Message[];
  input: string;
  isLoading: boolean;
  error: string | null;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  clearMessages: () => void;
};

export function useCustomChat(): UseCustomChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null); // Clear error on new input
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    const userMessage = input.trim();
    if (!userMessage) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      // Handle both string and object responses
      const assistantContent = typeof data.content === "string" 
        ? data.content 
        : JSON.parse(data.content);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantContent },
      ]);
    } catch (err) {
      console.error("Error communicating with FastAPI backend:", err);
      setError("Error: Unable to fetch response from server.");
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "Sorry, I encountered an error. Please try again." 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    input,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    clearMessages,
  };
}