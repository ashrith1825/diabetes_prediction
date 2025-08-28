# 🩺 Diabetes Risk Predictor

A **full-stack web application** that predicts the likelihood of diabetes in a patient based on several key health metrics.  
The project integrates a **pre-trained machine learning model** (served via a Python Flask API) with a **modern React frontend** to provide **instant, data-driven insights** into diabetes risk along with **actionable health advice**.

---

## ✨ Features

- **Interactive & User-Friendly Interface**  
  Clean, intuitive UI for entering patient data with clear labels and placeholders.

- **Real-Time Prediction**  
  Instantly returns predictions with a probability score upon form submission.

- **Dynamic Results Display**  
  Clearly shows whether the risk is *High* or *Low*, with a color-coded probability bar for better visualization.

- **Health & Prevention Tips**  
  Practical advice on diet, exercise, regular check-ups, and awareness of diabetes-related complications.

- **Responsive Design**  
  Mobile-first layout that adapts seamlessly to desktops, tablets, and mobile devices.

- **RESTful API**  
  A scalable Flask API to handle prediction requests, decoupled from the frontend for independent development.

---

## 🛠️ Technology Stack

### Frontend (Client-Side)
- **React** → Component-based UI development  
- **Axios** → API communication  
- **CSS** → Custom styling, animations, and responsive design  

### Backend (Server-Side)
- **Python** → Core backend language  
- **Flask** → Lightweight API framework  
- **Gunicorn** → Production-ready WSGI server  
- **Scikit-learn** → Machine learning model (Logistic Regression)  
- **Pandas & NumPy** → Data manipulation and numerical operations  
- **Joblib** → Save/load trained model (`model.pkl`)  



---

## 🚀 Setup & Installation

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
⚠️ **Disclaimer**

This application is built for **educational purposes only** to demonstrate ML + web integration.  
It is **not a substitute** for professional medical advice, diagnosis, or treatment.  
Always consult a **qualified healthcare provider** for any medical concerns.


