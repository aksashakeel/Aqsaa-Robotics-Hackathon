import os
import sys
import glob

# Add the parent directory to sys.path to allow imports from src
sys.path.append(os.path.join(os.path.dirname(__file__), "../../"))

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from src.services.vector_store import get_vector_store
from src.core.config import settings

def ingest_docs():
    """
    Reads markdown files from frontend/docs, splits them, and indexes them in Qdrant.
    """
    print(f"Starting ingestion into Qdrant collection: {settings.COLLECTION_NAME}")
    
    # Path to docs - adjusting for where this script runs
    docs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../frontend/docs"))
    
    if not os.path.exists(docs_path):
        print(f"Error: Docs directory not found at {docs_path}")
        return

    files = glob.glob(os.path.join(docs_path, "**/*.md"), recursive=True)
    print(f"Found {len(files)} markdown files.")

    documents = []
    for file_path in files:
        try:
            loader = TextLoader(file_path, encoding='utf-8')
            documents.extend(loader.load())
            print(f"Loaded: {os.path.basename(file_path)}")
        except Exception as e:
            print(f"Failed to load {file_path}: {e}")

    if not documents:
        print("No documents loaded. Exiting.")
        return

    # Split text
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n\n", "\n", " ", ""]
    )
    
    chunks = text_splitter.split_documents(documents)
    print(f"Created {len(chunks)} text chunks.")

    # Index
    try:
        vector_store = get_vector_store()
        vector_store.add_documents(chunks)
        print("Successfully ingested documents into Qdrant!")
    except Exception as e:
        print(f"Error during ingestion: {e}")

if __name__ == "__main__":
    ingest_docs()
