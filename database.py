#load pdf
#split into chunks
#create the embeddings
#store the embeddings in a chroma vectorstore
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv

load_dotenv()

loader = PyPDFLoader("D:/Gen AI-project1/document loaders/Third Year -AIML_Syllabus.pdf")
loader = PyPDFLoader("D:/Gen AI-project1/document loaders/Deep+Learning+Ian+Goodfellow.pdf")
docs = loader.load()

splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(docs)

embedding_model = HuggingFaceEmbeddings()
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embedding_model,
    persist_directory="chroma_db"
)