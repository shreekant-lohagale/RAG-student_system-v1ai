from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

docs = [
    Document(
        page_content="Python is widely used for data science.",
        metadata={"source": "doc1"}
    ),
    Document(
        page_content="JavaScript is popular for web development.",
        metadata={"source": "doc2"}
    )
]

vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=embedding_model,
    persist_directory="./chroma_db"
)

results = vectorstore.similarity_search(
    "What programming language is used for data science?",
    k=2
)

for r in results:
    print(r.page_content)
    print(r.metadata)

retriever = vectorstore.as_retriever()
docs = retriever.invoke("Explain deep learning.")

for d in docs:
    print(d.page_content)
    print(d.metadata)