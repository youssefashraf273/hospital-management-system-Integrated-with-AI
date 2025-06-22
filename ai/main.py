from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from predict import predict_specialty
from faq import answer_faq
from intent import classify_intent
from nlp_utils import *
from backend_utils import *
from multiLang_utils import *


app = FastAPI(title="AI Hospital Chatbot")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

#Store user sessions for conversation state
user_sessions = {}

class ChatInput(BaseModel):
    message: str
    session_id: str
    user_token: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Hospital Chatbot!"}

@app.post("/chat")
def handle_chat(data: ChatInput):
    message = data.message
    user_token = data.user_token

    #Translating user input to 'en'
    language_code = detect_language(message)
    if language_code != 'en':  
        message = translate_text(message, 'en')

    # Create session based on token
    if user_token not in user_sessions:
        user_sessions[user_token] = {
            "state": None,
            "appointment_data": {}
        }

    session = user_sessions[user_token]
    
    intent = classify_intent(message)

    if intent == "specialty_prediction":
        extracted, vector = extract_symptoms(message)
        if extracted:
            if needs_more_info(extracted):
                response = translate_text("Can you describe your condition with a bit more detail so I can assist better?", language_code)
                return {"response": response, "extracted_symptoms": extracted}
            
            specialty = predict_specialty(vector)
            response = translate_text(f"You may need to see a {specialty}.", language_code)
            return {"response": response, "extracted_symptoms": extracted}

        else:
            response = translate_text("Can you list any symptoms you're experiencing?", language_code)
            return {"response": response}

    elif intent == "faq":
        answer = answer_faq(message)
        if answer == "Sorry, I couldn't find an answer for your question.":
            response = translate_text("I'm sorry, I don't have enough information to answer that. Could you clarify or ask something else?", language_code)
            return {"response": response}
        response = translate_text(answer, language_code)
        return {"response": response}

    elif intent == "appointment":
        session["state"] = "select_specialty"
        response = translate_text("What specialty would you like to book an appointment for?", language_code)
        return {"response": response}
    
    # Handle appointment flow
    if session["state"] == "select_specialty":
        ppMsg = preprocess_input(message)
        ppSpecialty = extract_specialty(ppMsg,allSpecialties)
        session["appointment_data"]["specialty"] = ppSpecialty
        if ppSpecialty not in allSpecialties:
            response = translate_text("Sorry, Can you re-enter a correct speciality!", language_code)
            return {"response": response}
        # Call Laravel API to get available doctors
        headers = {
        "Authorization": f"Bearer {user_token}",
        "Content-Type": "application/json"
        }
        response = call_laravel_api( 
            "getDoctorsBySpecialty",
            method="GET",
            params={"speciality": ppSpecialty},
            headers=headers
        )
        if "error" in response:
            response = translate_text("Sorry, something went wrong while fetching available doctors.", language_code)
            return {"response": response}

        doctors = response.get("doctors", [])
        if not doctors:
            response = translate_text("No doctors are available for this specialty right now.", language_code)
            return {"response": response}

        session["state"] = "select_doctor"
        session["appointment_data"]["doctors"] = doctors
        doctor_list = "\n".join([f"{doc['Doctor id']}: {doc['Name']}" for doc in doctors])
        response = translate_text(f"Here are the available doctors:\n{doctor_list}\nPlease select a doctor by ID.", language_code)
        return {"response": response}

    if session["state"] == "select_doctor":
        selected_id = message.strip()
        doctors = session["appointment_data"]["doctors"]
        selected_doctor = next((doc for doc in doctors if str(doc["Doctor id"]) == selected_id), None)
        if not selected_doctor:
            response = translate_text("Invalid doctor ID. Please select a valid doctor ID from the list.", language_code)
            return {"response": response}

        session["appointment_data"]["doctor_id"] = selected_doctor["Doctor id"]
        session["state"] = "confirm_appointment"
        response = translate_text(f"You've selected Dr. {selected_doctor['Name']}. Please confirm the appointment (yes/no).", language_code)
        return {"response": response}

    if session.get("state") == "confirm_appointment":
        if message.lower() == "yes":
            headers = {  
                "Authorization": f"Bearer {user_token}",
            }
            appointment_data = session.get("appointment_data", {})
            doctor_id = appointment_data.get("doctor_id")
            
            if not doctor_id:
                response = translate_text("Doctor ID is missing. Please try again.", language_code)
                return {"response": response}

            response = call_laravel_api(
                f"appointments/book/{doctor_id}", 
                method="POST", 
                headers=headers
            )
            print(response)

            if response.get("error"):
                response = translate_text("Sorry, something went wrong while creating the appointment.", language_code)
                return {"response": response}
            else:
                formatted_response = f"{response['message']} Your number is {response['Your number is']}."
                response = translate_text(formatted_response, language_code)
                clear_session(user_token)
                return {"response": response}
        else:
            clear_session(user_token)
            response = translate_text("Appointment creation canceled.", language_code)
            return {"response": response}

    response = translate_text("I'm not sure how to help with that. Can you rephrase your question or try something else?", language_code)
    return {"response": response}

def clear_session(user_token):
    if user_token in user_sessions:
        user_sessions.pop(user_token)