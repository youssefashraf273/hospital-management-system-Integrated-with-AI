def classify_intent(message: str) -> str:
    message = message.lower()

    if any(kw in message for kw in ["feel", "have", "suffering", "symptom", "pain", "sick"]):
        return "specialty_prediction"

    if "appointment" in message or any(kw in message for kw in ["appointment", "book", "schedule", "make appointment", "see a doctor", "Create an appointment"]):
        return "appointment"

    return "faq"
