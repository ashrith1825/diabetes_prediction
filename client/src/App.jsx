import { useState } from "react";
import axios from "axios";
import "./App.css";

// Helper component for SVG icons
const Icon = ({ path }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="icon"
  >
    <path d={path} />
  </svg>
);

// Component for the health tips section
const HealthTips = () => (
  <div className="health-tips-container">
    <h2>Health & Prevention</h2>
    <div className="tips-grid">
      <div className="tip-card">
        <span className="tip-emoji">🥗</span>
        <h4>Balanced Diet</h4>
        <p>Focus on whole grains, lean protein, and lots of vegetables.</p>
      </div>
      <div className="tip-card">
        <span className="tip-emoji">🏃‍♀️</span>
        <h4>Stay Active</h4>
        <p>Aim for 30+ minutes of moderate exercise most days.</p>
      </div>
      <div className="tip-card">
        <span className="tip-emoji">💧</span>
        <h4>Hydrate Well</h4>
        <p>Drink plenty of water and avoid sugary drinks.</p>
      </div>
      <div className="tip-card">
        <span className="tip-emoji">👨‍⚕️</span>
        <h4>Regular Check-ups</h4>
        <p>Schedule regular visits with your doctor for monitoring.</p>
      </div>
    </div>
    <div className="complications-section">
      <h4>Potential Complications</h4>
      <p>Unmanaged diabetes can affect major organs:</p>
      <ul>
        <li>❤️ Heart & Blood Vessels</li>
        <li>👁️ Eyes (Retinopathy)</li>
        <li> Organ (Kidneys)</li>
        <li>🦶 Nerves (Neuropathy)</li>
      </ul>
    </div>
  </div>
);


function App() {
  // State for form inputs, prediction result, errors, and loading status
  const [features, setFeatures] = useState(Array(8).fill(""));
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // An array of objects to define the input fields, making the form more dynamic
  const inputFields = [
    { label: "Pregnancies", placeholder: "e.g., 1" },
    { label: "Glucose", placeholder: "e.g., 120 mg/dL" },
    { label: "Blood Pressure", placeholder: "e.g., 80 mmHg" },
    { label: "Skin Thickness", placeholder: "e.g., 30 mm" },
    { label: "Insulin", placeholder: "e.g., 90 μU/mL" },
    { label: "BMI", placeholder: "e.g., 25.0" },
    { label: "Diabetes Pedigree", placeholder: "e.g., 0.5" },
    { label: "Age", placeholder: "e.g., 35" },
  ];

  // Handles changes in the input fields
  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Handles the form submission to the prediction API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      // POST request to the Flask backend
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        features: features.map(Number), // Convert features to numbers
      });
      setResult(res.data);
    } catch (err) {
      // Detailed error handling
      if (err.response) {
        setError(`Server Error: ${err.response.data.error || "An issue occurred"}`);
      } else if (err.request) {
        setError("Network Error: No response from the server. Is it running?");
      } else {
        setError("Client Error: Could not send the request. Check your network.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <Icon path="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
          <h1>Diabetes Risk Predictor</h1>
          <p>Enter patient health data to predict the likelihood of diabetes.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="prediction-form">
            <h2>Patient Data</h2>
            <div className="input-flex-container">
              {inputFields.map((field, index) => (
                <div key={index} className="input-group">
                  <label htmlFor={`feature-${index}`}>{field.label}</label>
                  <input
                    id={`feature-${index}`}
                    type="number"
                    step="any"
                    value={features[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    placeholder={field.placeholder}
                    required
                    className="input-field"
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="predict-button" disabled={loading}>
              {loading ? "Analyzing..." : "Predict Risk"}
            </button>
          </form>
        </div>

        <div className="result-container">
          <h2>Prediction Analysis</h2>
          <div className="result-display">
            {/* Show loading spinner */}
            {loading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Calculating prediction...</p>
              </div>
            )}

            {/* Show error message */}
            {error && <div className="error-message">{error}</div>}

            {/* Show prediction result */}
            {result && !loading && (
              <div
                className={`prediction-output ${
                  result.prediction === 1 ? "diabetic" : "non-diabetic"
                }`}
              >
                <div className="result-header">
                  <span className="status-icon">
                    {result.prediction === 1 ? "⚠️" : "✅"}
                  </span>
                  <h3>
                    {result.prediction === 1 ? "High Risk" : "Low Risk"}
                  </h3>
                </div>
                <p className="probability-text">
                  The model predicts a{" "}
                  <strong>{result.probability_percent.toFixed(2)}%</strong>{" "}
                  probability of diabetes.
                </p>
                <div className="result-bar">
                  <div
                    className="result-bar-fill"
                    style={{ width: `${result.probability_percent.toFixed(2)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Initial state message */}
            {!result && !loading && !error && (
              <div className="initial-message">
                <Icon path="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                <p>Your prediction results will appear here.</p>
              </div>
            )}
          </div>
        </div>
        
        <HealthTips />

      </main>

      <footer className="app-footer">
        <p>
          Disclaimer: This is a machine learning model and not a substitute for professional medical advice.
        </p>
      </footer>
    </div>
  );
}

export default App;