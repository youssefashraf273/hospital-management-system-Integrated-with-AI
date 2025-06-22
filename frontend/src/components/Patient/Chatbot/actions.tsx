export async function sendMessage(message: string): Promise<string> {
  // This is a simple mock response function
  // In a real application, you would integrate with an AI service

  const doctors = [
    { "Doctor id": "D01", Name: "Dr. Mina Refaat", availability: "3:00PM - 8:00PM" },
    { "Doctor id": "D02", Name: "Dr. Amir Rashad", availability: "10:00AM - 2:00PM" },
  ];

  const lowerMessage = message.toLowerCase();

  // Simple keyword matching for demo purposes
  if (lowerMessage.includes("covid") || lowerMessage.includes("coronavirus")) {
    return "Common symptoms of COVID-19 include fever, cough, fatigue, loss of taste or smell, sore throat, headache, and body aches. If you're experiencing these symptoms, please consider getting tested and consult with your doctor.";
  }

  if (lowerMessage.includes("diabetes")) {
    return "Managing diabetes involves regular monitoring of blood sugar levels, taking prescribed medications, maintaining a healthy diet, regular exercise, and attending scheduled check-ups with your healthcare provider. Would you like more specific information about diabetes management?";
  }

  if (lowerMessage.includes("headache")) {
    return "For headaches, you can try over-the-counter pain relievers like acetaminophen or ibuprofen, rest in a quiet, dark room, apply a cold pack to your forehead, and stay hydrated. If headaches are severe, persistent, or accompanied by other symptoms, please consult your doctor.";
  }

  if (lowerMessage.includes("fever")) {
    return "You may need to see a Pulmonologist. Do you want to book an appointment?";
  }

  if (
    lowerMessage.includes("appointment") ||
    lowerMessage.includes("schedule") ||
    lowerMessage.includes("book")
  ) {
    const message = `here are the available doctors:\n`;
    return (
      message +
      doctors
        .map(
          (doctor) =>
            `[${doctor["Doctor id"]}]: ${doctor["Name"]} | ${doctor["availability"]} `
        )
        .join("\n") +
      "\n Please select a doctor by ID."
    );
  }

  if (lowerMessage.includes("1")) {
    return `You've selected ${doctors[0]["Name"]}. Please confirm the appointment (yes/no).`;
  }

  if (lowerMessage.includes("yes")) {
    return `please enter a time for your appointment`;
  }
  if (lowerMessage.includes("5/25")) {
    return `Appointmented Reserved successfully. Your number is 5.`;
  }
  if (
    lowerMessage.includes("medicine") ||
    lowerMessage.includes("prescription") ||
    lowerMessage.includes("refill")
  ) {
    return "For prescription refills, please contact your pharmacy directly or use the Medications section in your patient portal. Make sure to request refills at least 3-5 days before you run out of medication.";
  }

  if (lowerMessage.includes("emergency")) {
    return "If you're experiencing a medical emergency, please call emergency services (911) immediately or go to your nearest emergency room. Do not wait for online responses in emergency situations.";
  }

  // Default response
  return "Thank you for your question. While I can provide general health information, for personalized medical advice, please consult with your healthcare provider. Is there something specific about your health you'd like to know?";
}
