import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib
import os

# === Load dataset ===
data_path = os.path.join("data", "diabetes.csv")
df = pd.read_csv(data_path)

# === Features and target ===
X = df.drop("Outcome", axis=1)   # assuming your dataset has 'Outcome' column as target
y = df["Outcome"]

# === Train-test split ===
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# === Train model ===
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

# === Save trained model ===
joblib.dump(model, "model.pkl")

print("✅ Model trained and saved as model.pkl")
