from langchain_community.document_loaders import PyPDFLoader

data = PyPDFLoader("D:/Gen AI-project1/document loaders/Third Year -AIML_Syllabus.pdf")

docs = data.load()

print(len(docs))