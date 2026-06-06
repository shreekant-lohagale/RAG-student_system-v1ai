# FastAPI Backend API

This directory houses the backend server for **Lumina Academic AI**, which wraps your RAG pipelines and exposes them as high-performance endpoints.

## 🚀 Getting Started

### Installation
Make sure you have installed the requirements using your local virtual environment:
```powershell
# In root directory
.venv\Scripts\pip install -r backend/requirements.txt
```

### Running the API Server
Start the development server with live reload:
```powershell
# In root directory
.venv\Scripts\python backend/server.py
```
*   **Base URL**: `http://127.0.0.1:8000`
*   **OpenAPI Documentation (Swagger UI)**: `http://127.0.0.1:8000/docs`

---

## 📡 API Endpoints

### 1. `GET /api/status`
Checks if the backend is connected and whether the local Chroma database directory is present.
- **Response**:
  ```json
  {
    "status": "ok",
    "db_loaded": true
  }
  ```

### 2. `POST /api/chat`
Performs a semantic similarity retrieval from the Chroma vector store and invokes the Mistral AI chat model to compile an answer.
- **Request Body**:
  ```json
  {
    "query": "What is the syllabus of AIML?"
  }
  ```
- **Response Body**:
  ```json
  {
    "response": "The syllabus of AIML covers...",
    "sources": [
      {
        "content": "Full syllabus snippet...",
        "metadata": {
          "source": "Third Year -AIML_Syllabus.pdf",
          "page": 12
        }
      }
    ]
  }
  ```

---

## 🛠️ Code Reference
- [server.py](file:///d:/Gen%20AI-project1/backend/server.py): Defines the FastAPI routes, CORS middleware parameters, loads HuggingFace embeddings, initializes the Chroma retriever ($k=10$), and formats final output with source documents.
