import re
import pandas as pd
from sentence_transformers import SentenceTransformer, util
from fuzzywuzzy import process
from nltk.corpus import stopwords
import nltk
nltk.download('stopwords')

df = pd.read_excel("data/Specialist.xlsx")

dataset_symptoms = df.columns[:-1].tolist()

# Make them readable
readable_symptoms = [symptom.replace('_', ' ') for symptom in dataset_symptoms]

model = SentenceTransformer('all-MiniLM-L6-v2')
symptom_embeddings = model.encode(readable_symptoms, convert_to_tensor=True)

def extract_symptoms(user_input, threshold=0.6):

    phrases = re.split(r'[.,;, ]| and | then ', user_input.lower())

    matched_symptoms = set()

    for phrase in phrases:
        phrase = phrase.strip()
        if not phrase:
            continue
        phrase_embedding = model.encode(phrase, convert_to_tensor=True)
        cosine_scores = util.pytorch_cos_sim(phrase_embedding, symptom_embeddings)[0]

        for idx, score in enumerate(cosine_scores):
            if score >= threshold:
                matched_symptoms.add(dataset_symptoms[idx])

    symptom_vector = {symptom: 1 if symptom in matched_symptoms else 0 for symptom in dataset_symptoms}
    return list(matched_symptoms), symptom_vector


def needs_more_info(extracted_symptoms):
    return len(extracted_symptoms) < 2

#defining Specialties to correct mistakes
allSpecialties = ["Dermatologist", "Allergist", "Gastroenterologist", "Hepatologist","Osteopathic","Endocrinologist",
               "Pulmonologist", "Cardiologist", "Neurologist", "Internal Medcine", "Pediatrician", "Common Cold",
               "Phlebologist", "Osteoarthristis", "Rheumatologists", "Otolaryngologist", "Dermatologists", "Gynecologist"]

def preprocess_input(user_input):
    
    user_input = user_input.lower()
    
    user_input = re.sub(r'[^\w\s]', '', user_input)
    user_input = re.sub(r'\s+', ' ', user_input).strip()
    
    stop_words = set(stopwords.words('english'))
    filtered_words = [word for word in user_input.split() if word not in stop_words]
    
    return ' '.join(filtered_words)

def extract_specialty(cleaned_input, specialties):
    best_match, score = process.extractOne(cleaned_input, specialties)
    if score > 80:
        return best_match
    return None