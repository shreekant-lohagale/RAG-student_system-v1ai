# Vector Store Folder

This directory contains utility scripts to benchmark local vector storage, similarity queries, and document embeddings.

## 📁 Folder Contents

- **[DB.py](file:///d:/Gen%20AI-project1/vector%20store/DB.py)**:
  - Generates small sample `Document` objects inline.
  - Initializes HuggingFace embeddings (`sentence-transformers/all-MiniLM-L6-v2`).
  - Stores matching vectors in a local Chroma DB instance.
  - Benchmarks similarity searches (`similarity_search`) and executes retriever queries (`as_retriever() -> invoke()`).
