from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter

loader = TextLoader(
    r"D:\Gen AI-project1\document loaders\txt.txt"
)

docs = loader.load()

splitter = CharacterTextSplitter(
    chunk_size=10,
    chunk_overlap=1
)

chunks = splitter.split_documents(docs)

print(chunks)

for i in chunks:
    print(i.page_content)
    print()
    print()
