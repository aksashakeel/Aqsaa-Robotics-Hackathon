from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from src.models.user import UserCreate, UserLogin, Token, UserInDB
from src.core.security import get_password_hash, verify_password, create_access_token
from typing import Dict

router = APIRouter()

# Mock Database (In a real app, use SQLAlchemy + Postgres)
fake_users_db: Dict[str, dict] = {}

@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_in_db = UserInDB(**user.model_dump(), hashed_password=hashed_password)
    fake_users_db[user.email] = user_in_db.model_dump()
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    if user.email not in fake_users_db:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    db_user = fake_users_db[user.email]
    if not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
