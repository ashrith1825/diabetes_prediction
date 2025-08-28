🩺 Diabetes Risk Predictor
This is a full-stack web application designed to predict the likelihood of diabetes in a patient based on several key health metrics. The project uses a machine learning model served via a Python Flask API and a modern, responsive frontend built with React.

✨ Features
Interactive & User-Friendly Interface: A clean and modern UI for easy input of patient data.

Real-Time Prediction: Get instant predictions and probability scores from the machine learning model.

Dynamic Results Display: The UI dynamically updates to show the prediction outcome (High Risk / Low Risk) with a visual probability bar.

Health & Prevention Tips: The interface includes actionable health tips and information about potential diabetes-related complications.

Responsive Design: The application is fully responsive and works seamlessly on desktops, tablets, and mobile devices.

RESTful API: A robust backend API to handle prediction requests.

🛠️ Technology Stack
This project is divided into two main parts: the frontend client and the backend server.

Frontend (Client-Side)
React: A JavaScript library for building user interfaces.

Axios: A promise-based HTTP client for making requests to the backend API.

CSS: Custom CSS for modern styling and a responsive layout.

Backend (Server-Side)
Python: The core programming language for the backend.

Flask: A lightweight web framework for building the API.

Gunicorn: A WSGI HTTP server for running the Flask application in production.

Scikit-learn: The machine learning library used to train and run the prediction model.

Pandas & NumPy: Libraries for data manipulation and numerical operations.

Joblib: For saving and loading the trained machine learning model (model.pkl).

📁 Project Structure
The project is organized into a frontend directory (e.g., frontend/) and a backend directory (e.g., backend/).

diabetes-predictor/
├── backend/
│   ├── app.py             # Flask application logic
│   ├── model.pkl          # Pre-trained machine learning model
│   ├── requirements.txt   # Python dependencies
│   └── ...
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.css        # Styles for the application
    │   ├── App.jsx        # Main React component
    │   └── index.js       # Entry point for the React app
    ├── package.json       # Frontend dependencies and scripts
    └── ...

🚀 Setup and Installation
To run this project locally, you will need to set up both the backend and the frontend.

Backend Setup
Navigate to the backend directory:

cd backend

Create a virtual environment (recommended):

python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

Install the required Python packages:

pip install -r requirements.txt

Run the Flask development server:

python app.py

The backend API will now be running on http://127.0.0.1:5000.

Frontend Setup
Navigate to the frontend directory in a new terminal:

cd frontend

Install the required npm packages:

npm install

Start the React development server:

npm start

The frontend application will open in your browser at http://localhost:3000.

📝 API Endpoint
The backend provides one primary endpoint for making predictions.

POST /predict
This endpoint accepts a JSON object containing the patient's health features and returns a prediction.

URL: /predict

Method: POST

Request Body:

{
  "features": [6, 148, 72, 35, 0, 33.6, 0.627, 50]
}

(The features must be in this order: Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age)

Success Response (200):

{
  "prediction": 1,
  "probability_percent": 77.12
}

prediction: 1 for Diabetic (High Risk), 0 for Non-Diabetic (Low Risk).

probability_percent: The model's confidence in the prediction as a percentage.

Error Response (400):
{
  "error": "You must provide exactly 8 features: [Pregnancies, ...]"
}

⚠️ Disclaimer
This application is an educational tool and is not a substitute for professional medical advice, diagnosis, or treatment. The predictions are based on a machine learning model and should be used for informational purposes only. Always consult with a qualified healthcare provider for any health concerns.
