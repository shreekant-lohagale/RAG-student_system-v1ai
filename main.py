from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
vectorstore = Chroma(
    persist_directory="chroma_db",
    embedding_function=embedding_model
)

retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 3, "fetch_k": 10, "lambda_mult": 0.5}
)

docs = retriever.invoke(quer)

print("\nRetrieved Documents:\n")

for d in docs:
    print(d.page_content[:300])
    print("="*50)

llm = ChatMistralAI(model = 'mistral-small-latest', temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a helpful AI assistant.
     use ONLY the provided context to answer the question.
     if the answer cannot be found in the context,
     say: ""I don't know" if you are unsure."
     """),
     ("human","""Context: {context}
      Question: {question}
      """ )
])

print("RAG system created successfully!")

print("press 0 to exit")

while True:
    quer = input("You :")
    if quer == "0":
        print("Exiting...")
        break

    docs = retriever.invoke(quer)
    context = "\n".join([doc.page_content for doc in docs])
    final_prompt = prompt.invoke({"context": context, "question": quer})

    response = llm.invoke(final_prompt)
    print("AI :", response.content)

