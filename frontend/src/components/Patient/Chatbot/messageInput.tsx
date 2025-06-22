import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
      <div className="relative flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your health question..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="rounded-full h-10 w-10 p-0 flex items-center justify-center bg-teal-600 hover:bg-teal-700"
      >
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <SendIcon className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
}
