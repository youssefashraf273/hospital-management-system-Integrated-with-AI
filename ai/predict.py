import joblib
import pandas as pd

model = joblib.load("model/doctor_model.pkl")
label_encoder = joblib.load("model/label_encoder.pkl")
SYMPTOMS = pd.read_excel("data/Specialist.xlsx").columns[:-1].tolist()

def predict_specialty(symptom_vector):
    input_vector = pd.DataFrame([symptom_vector])[SYMPTOMS]
    prediction = model.predict(input_vector)
    specialty = label_encoder.inverse_transform(prediction)[0]
    return specialty
