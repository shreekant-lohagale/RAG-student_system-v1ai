from langchain_community.document_loaders import TextLoader

data = TextLoader("D:/Gen AI-project1/document loaders/txt.txt")

docs = data.load()

print(docs)
