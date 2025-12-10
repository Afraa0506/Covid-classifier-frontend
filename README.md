# COVID-19 X-Ray Classification API

**Description**
This project provides a FastAPI backend for classifying chest X-ray images into **Covid**, **Normal**, or **Viral Pneumonia**. Built using TensorFlow, the API is deployment-ready and can be integrated with any frontend application.

---

## Features

* Classifies chest X-ray images into 3 categories: Covid, Normal, Viral Pneumonia
* Preprocessing pipeline for uploaded images
* FastAPI endpoint for seamless integration
* Deployment-ready code
* Easily extendable for new datasets or additional classes

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/YourUsername/Covid-classifier-backend.git
cd Covid-classifier-backend/backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the environment:

* **Windows:**

```bash
venv\Scripts\activate
```

* **Linux / Mac:**

```bash
source venv/bin/activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Usage

1. Start the FastAPI backend:

```bash
uvicorn main:app --reload
```

2. Open your browser or API client (e.g., Postman) and navigate to:

```
http://127.0.0.1:8000/docs
```

Here you can test the `/predict` endpoint by uploading a chest X-ray image.

---

## API Endpoint

**POST** `/predict`

* **Request:** Upload a file (chest X-ray image)
* **Response:**

```json
{
  "prediction": "Covid",
  "confidence": 98.56,
  "all_probs": {
    "Covid": 98.56,
    "Normal": 1.23,
    "Viral Pneumonia": 0.21
  }
}
```

---

## Notes

* The model (`covid_model.h5`) is automatically loaded on startup.
* For large models, consider hosting the `.h5` file externally (e.g., Google Drive) and downloading during startup.
* The code is ready to integrate with any frontend (React, Vue, etc.).

