from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

data = PyPDFLoader("D:/Gen AI-project1/document loaders/Third Year -AIML_Syllabus.pdf")
docs = data.load()

splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(docs)


template = ChatPromptTemplate.from_messages(
    [("system", "You are a AI that summarizes the following text."),
     ("human", "{data}")]

)

model = ChatMistralAI(model = "mistral-small-2506")

prompt = template.format_messages(data = docs)
result = model.invoke(prompt)
print(result.content)