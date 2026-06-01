from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

docs = [
    Document(page_content="Python is widely used for data science.", metadata={"source": "doc1"}),
    Document(page_content="JavaScript is popular for web development.", metadata={"source": "doc2"})
]

vectorstore = Chroma.from_documents(documents = docs, embedding=embedding_model, persist_directory="./chroma_db")

