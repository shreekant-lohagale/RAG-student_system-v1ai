from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import TokenTextSplitter

data = PyPDFLoader("D:/Gen AI-project1/document loaders/Third Year -AIML_Syllabus.pdf")

docs = data.load()

splitter = TokenTextSplitter(
    chunk_size=10000,
    chunk_overlap=10
)
chunks = splitter.split_documents(docs)

print(chunks[0].page_content)