interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
}

export default function SuggestedQuestions({
  onSelectQuestion,
}: SuggestedQuestionsProps) {
  const questions = [
    "What are the symptoms of COVID-19?",
    "How can I manage my diabetes?",
    "What should I do for a headache?",
    "When should I see a doctor for fever?",
  ];

  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500 mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question)}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
