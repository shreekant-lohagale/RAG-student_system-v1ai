import os
import sys
import shutil
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Ensure workspace root is in path so we can resolve chroma_db or dotenv if needed
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
from langchain_mistralai import MistralAIEmbeddings
from langchain_chroma import Chroma
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

app = FastAPI(title="Lumina Academic AI Backend")

# Enable CORS for React frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Components exactly as in main.py
embedding_model = MistralAIEmbeddings()

# Locate chroma_db path relative to the root directory
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
persist_dir = os.path.join(base_dir, "chroma_db")

if not os.path.exists(persist_dir):
    print(f"Warning: chroma_db directory not found at {persist_dir}. Please run database.py to populate it first.")

vectorstore = Chroma(
    persist_directory=persist_dir,
    embedding_function=embedding_model
)

retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 10}
)

llm = ChatMistralAI(
    model="mistral-small-latest",
    temperature=0.7
)

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a helpful AI assistant.

Use only the provided context to answer the question.

If the answer is partially available, provide the available information.

If the answer is not present in the context, reply:
I don't know based on the provided documents.
"""
    ),
    (
        "human",
        """
Context:
{context}

Question:
{question}
"""
    )
])

class ChatRequest(BaseModel):
    query: str

class SourceDoc(BaseModel):
    content: str
    metadata: Dict[str, Any]

class ChatResponse(BaseModel):
    response: str
    sources: List[SourceDoc]

@app.get("/api/status")
def get_status():
    return {"status": "ok", "db_loaded": os.path.exists(persist_dir)}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    query = request.query
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    try:
        # Retrieve context
        docs = retriever.invoke(query)
        
        if not docs:
            return ChatResponse(
                response="I don't know based on the provided documents.",
                sources=[]
            )
        
        # Prepare context and source citations
        context = "\n\n".join([doc.page_content for doc in docs])
        sources = [
            SourceDoc(
                content=doc.page_content,
                metadata={
                    "source": os.path.basename(doc.metadata.get("source", "Unknown Source")),
                    "page": doc.metadata.get("page", 0) + 1  # 0-indexed to 1-indexed for display
                }
            ) for doc in docs
        ]
        
        # Generate response using LLM
        final_prompt = prompt.invoke({
            "context": context,
            "question": query
        })
        
        response = llm.invoke(final_prompt)
        
        return ChatResponse(
            response=response.content,
            sources=sources
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/documents")
def get_documents():
    try:
        collection_data = vectorstore.get()
        metadatas = collection_data.get("metadatas", [])
        sources = set()
        for meta in metadatas:
            if meta and "source" in meta:
                sources.add(os.path.basename(meta["source"]))
        return {"documents": list(sources)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    temp_dir = os.path.join(base_dir, "temp_uploads")
    os.makedirs(temp_dir, exist_ok=True)
    temp_file_path = os.path.join(temp_dir, file.filename)
    
    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        loader = PyPDFLoader(temp_file_path)
        docs = loader.load()
        
        if not docs:
            raise HTTPException(status_code=400, detail="No content could be parsed from the PDF")
            
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = splitter.split_documents(docs)
        
        vectorstore.add_documents(chunks)
        
        return {
            "status": "success",
            "filename": file.filename,
            "page_count": len(docs),
            "chunk_count": len(chunks)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
