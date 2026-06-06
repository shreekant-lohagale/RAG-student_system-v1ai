# Document Loaders Folder

This directory is designated for loaders that ingest raw data files and convert them into structured LangChain `Document` objects. It also includes playground scripts for testing PDF, text, and web page loading.

## 📁 Folder Contents

- **`Deep+Learning+Ian+Goodfellow.pdf`**: The core textbook containing deep learning fundamentals.
- **`Third Year -AIML_Syllabus.pdf`**: Academic curriculum requirements.
- **`txt.txt`**: Sample raw text document used in loading and splitting tests.
- **`__pycache__/`**: Python bytecode files.

---

## 🛠️ Loading Scripts

- **[pdf.py](file:///d:/Gen%20AI-project1/document%20loaders/pdf.py)**: Loads local PDF files using `PyPDFLoader` and measures the total pages.
- **[page.py](file:///d:/Gen%20AI-project1/document%20loaders/page.py)**: Crawls and loads a public web page's text contents using `WebBaseLoader`.
- **[test.py](file:///d:/Gen%20AI-project1/document%20loaders/test.py)**: Parses local text files using `TextLoader`.
- **[recursive_textsplitter.py](file:///d:/Gen%20AI-project1/document%20loaders/recursive_textsplitter.py)**: Evaluates `RecursiveCharacterTextSplitter` behavior on local PDFs.
- **[token_splitter.py](file:///d:/Gen%20AI-project1/document%20loaders/token_splitter.py)**: Splits documents based on tokens instead of character count, utilizing `TokenTextSplitter`.
