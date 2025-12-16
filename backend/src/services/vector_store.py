from langchain_community.vectorstores import Qdrant
from langchain_openai import OpenAIEmbeddings
from qdrant_client import QdrantClient
from src.core.config import settings

def get_vector_store():
    """
    Returns a configured Qdrant vector store instance.
    """
    embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
    
    client = QdrantClient(
        url=settings.QDRANT_URL,
        api_key=settings.QDRANT_API_KEY
    )

    vector_store = Qdrant(
        client=client,
        collection_name=settings.COLLECTION_NAME,
        embeddings=embeddings,
    )
    
    return vector_store

def search_documents(query: str, limit: int = 4):
    """
    Search the vector store for relevant documents.
    """
    vector_store = get_vector_store()
    results = vector_store.similarity_search(query, k=limit)
    return results
