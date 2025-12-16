from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import chat, auth

app = FastAPI(
    title="AI-Native Textbook API",
    description="Backend for Physical AI & Humanoid Robotics Textbook with RAG Chatbot",
    version="0.1.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])

@app.get("/")
async def root():
    return {"message": "Welcome to the AI-Native Textbook API. System Status: Online."}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "services": {"database": "unknown", "vector_db": "ready"}}

