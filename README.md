# Lumina Academic AI - RAG Student System

Lumina Academic AI is a professional Retrieval-Augmented Generation (RAG) assistant designed to help students query local academic syllabus documents and textbook resources. The project features a dual-interface architecture: a terminal CLI loop and a premium React-based Web dashboard.

## 📁 Project Structure

The project is modularized into specialized directories:

```
d:\Gen AI-project1\
├── backend/                  # FastAPI web server wrapping RAG logic
│   ├── server.py             # FastAPI entrypoint exposing RAG endpoints
│   └── requirements.txt      # Backend dependencies
├── frontend/                 # React frontend client
│   ├── src/                  # App components & styles (TailwindCSS)
│   ├── package.json          # Node dependencies & scripts
│   └── ...
├── document loaders/         # PDF, web, and text document loading scripts
├── spliter/                  # Chunking and text splitting prototypes
├── vector store/             # Chroma DB initialization and retrieval prototypes
├── chroma_db/                # Local persistent vector database (Chroma)
├── database.py               # Ingestion script (PDFs -> Chroma DB)
└── main.py                   # Original Terminal CLI assistant loop
```

---

## 🚀 How to Run the Applications

Before running, make sure to add your API credentials (such as `MISTRAL_API_KEY`) to the `.env` file in the root directory.

### 1. Ingest Data (Chroma DB Setup)
If the `chroma_db/` directory does not exist or you want to rebuild it:
```powershell
.venv\Scripts\python database.py
```

### 2. Run the Web Interface (Frontend + Backend)

#### Start the FastAPI Backend
```powershell
.venv\Scripts\python backend/server.py
```
*   **Base URL**: `http://127.0.0.1:8000`
*   **API Health Status**: `http://127.0.0.1:8000/api/status`

#### Start the React Frontend
```powershell
cd frontend
npm run dev
```
*   **Vite Client URL**: `http://localhost:5173/` (or `http://localhost:5174/`)

### 3. Run the Terminal Interface
If you want to use the console CLI interface:
```powershell
.venv\Scripts\python main.py
```

---

## 🛠️ Technology Stack
- **AI Core**: LangChain, Mistral AI (`mistral-small-latest`).
- **Embeddings**: HuggingFace Sentence Transformers (`all-MiniLM-L6-v2` / default MPNet).
- **Vector DB**: Chroma DB.
- **Backend API**: FastAPI, Uvicorn, Pydantic.
- **Frontend App**: React, TailwindCSS, Vite, Lucide Icons.
