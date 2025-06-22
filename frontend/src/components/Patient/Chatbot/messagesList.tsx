import type { Message } from "./chat-interface";
import { formatDistanceToNow } from "date-fns";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.sender === "user"
                ? "bg-teal-600 text-white rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}
          >
            <div className="text-sm">
              <pre>{message.content}</pre>
            </div>
            <div
              className={`text-xs mt-1 ${
                message.sender === "user" ? "text-teal-100" : "text-gray-500"
              }`}
            >
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
