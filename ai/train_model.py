# train_model.py

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

df = pd.read_excel("data/Specialist.xlsx", index_col= 0)

X = df.drop(columns=["Disease"])
y = df["Disease"]

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

model = RandomForestClassifier(
    n_estimators=150,
    max_depth=10,
    random_state=42,
    class_weight="balanced")

model.fit(X, y_encoded)

# Save model and encoder
os.makedirs("model", exist_ok=True)
joblib.dump(model, "model/doctor_model.pkl")
joblib.dump(label_encoder, "model/label_encoder.pkl")

print("✅ Model and label encoder saved in /model")

"""
Training Accuracy: 99.85%
Test Accuracy: 98.37%

"""