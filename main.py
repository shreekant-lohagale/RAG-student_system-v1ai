
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

embedding_model = HuggingFaceEmbeddings()

vectorstore = Chroma(
    persist_directory="chroma_db",
    embedding_function=embedding_model
)

retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 10}
)

llm = ChatMistralAI(
    model="mistral-small-latest",
    temperature=0.7
)

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a helpful AI assistant.

Use only the provided context to answer the question.

If the answer is partially available, provide the available information.

If the answer is not present in the context, reply:
I don't know based on the provided documents.
"""
    ),
    (
        "human",
        """
Context:
{context}

Question:
{question}
"""
    )
])

print("RAG System Created Successfully!")
print("Press 0 to Exit")

while True:
    query = input("You : ")

    if query == "0":
        print("Exiting...")
        break

    docs = retriever.invoke(query)

    if not docs:
        print("AI : No relevant information found.")
        continue

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    final_prompt = prompt.invoke(
        {
            "context": context,
            "question": query
        }
    )

    response = llm.invoke(final_prompt)

    print("\nAI :", response.content)


