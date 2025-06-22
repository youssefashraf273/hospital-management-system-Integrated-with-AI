import ChatInterface from "@/components/Patient/Chatbot/chat-interface";

export default function ChatbotPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-teal-600 mb-2">Health Assistant</h1>
        <p className="text-gray-600">
          Chat with our AI health assistant for quick answers to your health questions.
          For medical emergencies, please call emergency services immediately.
        </p>
      </div>

      <ChatInterface />

      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="font-medium text-blue-800 mb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Important Note
        </h2>
        <p className="text-blue-700 text-sm">
          This chatbot provides general health information only and is not a substitute
          for professional medical advice, diagnosis, or treatment. Always seek the advice
          of your physician or other qualified health provider with any questions you may
          have regarding a medical condition.
        </p>
      </div>
    </div>
  );
}
