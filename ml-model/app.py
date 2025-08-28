from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# --- Load the trained machine learning model ---
# The model is loaded once when the application starts.
try:
    model = joblib.load("model.pkl")
except FileNotFoundError:
    # Handle the case where the model file is not found
    model = None
    print("Error: `model.pkl` not found. Make sure the model file is in the same directory.")


# --- Define the expected feature names in the correct order ---
# This is crucial for the model to correctly interpret the input data.
FEATURE_NAMES = [
    'Pregnancies',
    'Glucose',
    'BloodPressure',
    'SkinThickness',
    'Insulin',
    'BMI',
    'DiabetesPedigreeFunction',
    'Age'
]

@app.route("/")
def home():
    """A simple route to confirm the API is running."""
    return {"message": "Diabetes Prediction API is running 🚀"}

@app.route("/predict", methods=["POST"])
def predict():
    """
    Receives patient data, makes a prediction using the loaded model,
    and returns the result.
    """
    if model is None:
        return jsonify({"error": "Model is not loaded. Cannot make predictions."}), 500

    try:
        data = request.get_json()
        features = data.get("features")

        # --- Input Validation ---
        if not features or len(features) != len(FEATURE_NAMES):
            error_message = f"You must provide exactly {len(FEATURE_NAMES)} features: {', '.join(FEATURE_NAMES)}"
            return jsonify({"error": error_message}), 400

        # --- Prepare data for the model ---
        # Convert the incoming list of features into a pandas DataFrame.
        # Naming the columns explicitly resolves the "X does not have valid feature names" warning
        # from scikit-learn, as the model was trained on a DataFrame with these names.
        input_df = pd.DataFrame([features], columns=FEATURE_NAMES)
        
        # --- Make Prediction ---
        # Use predict_proba to get the probability of the positive class (diabetes)
        probability = model.predict_proba(input_df)[0][1]
        percentage = round(probability * 100, 2)
        
        # Use predict to get the final binary outcome (0 or 1)
        prediction_result = int(model.predict(input_df)[0])

        # --- Return JSON response ---
        return jsonify({
            "prediction": prediction_result,
            "probability_percent": percentage
        })

    except Exception as e:
        # Generic error handler for any other issues
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    # This block is for running the app in development mode.
    # Gunicorn will be used for production.
    app.run(port=5000, debug=True)
