from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

faq_data = {
    "Hello hi good morning i need help can you help me": "I'm Wishing you a good day! How can i assist you today?",
    "What are your opening hours?": "Our hospital is open from 8:00 AM to 10:00 PM every day.",
    "When can I get my medical reports?": "Medical reports are available within 24 to 48 hours after your tests.",
    "Do I need an appointment to visit?": "Yes, appointments are recommended to avoid waiting.",
    "Where is the cardiology department?": "The cardiology department is located on the 2nd floor.",
    "How can I reschedule an appointment?": "You can reschedule by calling our hotline or through the chatbot.",
    "Can the hospital provide an interpreter?": "Yes, we offer interpreter services, including sign language, upon request.",
    "Is there parking available at the hospital?": "Yes, we have ample parking space for patients and visitors.",
    "Are mobile phones allowed in the clinic?": "Mobile phones are permitted but please keep them on silent mode.",
    "Is there a pharmacy within the hospital?": "Yes, we have a 24-hour pharmacy for your convenience.",
    "Can I bring someone with me to my appointment?": "Yes, you are welcome to bring a companion.",
    "Are there facilities for disabled individuals?": "Yes, our hospital is fully equipped with facilities for disabled individuals.",
    "How do I access my patient portal?": "You can access the patient portal through our website using your login credentials.",
    "What should I do in case of an emergency?": "In case of an emergency, please call our emergency hotline or visit the emergency department directly.",
    "How can I obtain a copy of my medical records?": "You can request your medical records from the records department or through the patient portal.",
    "Are there any cafeteria services available?": "Yes, we have a cafeteria on the ground floor open from 7:00 AM to 8:00 PM.",
    "What payment methods are accepted?": "We accept cash, credit/debit cards, and have flexible payment options.",
    "Is there Wi-Fi available for patients and visitors?": "Yes, complimentary Wi-Fi is available throughout the hospital.",
    "How can I provide feedback about my experience?": "You can provide feedback through our website's feedback form or at the reception desk.",
    "Are there any support groups available?": "Yes, we offer various support groups; please inquire at the information desk for more details.",
    "What should I bring for my hospital stay?": "Please bring personal identification, insurance information, and any current medications."
}

faq_questions = list(faq_data.keys())
faq_embeddings = model.encode(faq_questions)

def answer_faq(question, threshold=0.5):
    q_embedding = model.encode(question, convert_to_tensor=True)
    scores = util.cos_sim(q_embedding, faq_embeddings)[0]

    best_idx = scores.argmax().item()
    best_score = scores[best_idx].item()

    if best_score >= threshold:
        return faq_data[faq_questions[best_idx]]
    else:
        return "I'm sorry, I couldn't find an answer to your question. Could you please rephrase or ask something else?"
