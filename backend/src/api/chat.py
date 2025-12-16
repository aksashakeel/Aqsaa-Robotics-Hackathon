from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from src.services.vector_store import search_documents
from typing import List, Optional

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    context_text: Optional[str] = None # For selected text from frontend

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]

@router.post("/ask", response_model=ChatResponse)
async def ask_chatbot(request: ChatRequest):
    """
    RAG Endpoint: 
    1. Searches Qdrant for relevant book context.
    2. Combines with optional selected text.
    3. Generates answer (simulation for now, would use LLM chain).
    """
    
    # 1. Retrieve context from Vector DB
    docs = search_documents(request.message)
    context_str = "\n\n".join([doc.page_content for doc in docs])
    
    # 2. Add selected text if provided
    if request.context_text:
        context_str = f"Selected User Text:\n{request.context_text}\n\nBook Context:\n{context_str}"
    
    # 3. Generate Answer (Placeholder for actual LLM call)
    # In a real implementation, we would pass `context_str` and `request.message` to GPT-4/Claude.
    
    # Simulating an answer based on retrieval
    simulated_answer = f"Based on the textbook content, here is the answer to '{request.message}': [AI Answer would go here using retrieved context]"
    
    sources = [doc.metadata.get('source', 'unknown') for doc in docs]
    
    return ChatResponse(
        answer=simulated_answer,
        sources=sources
    )
