from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models import Chat, User
from app.vector_store import search_similar_chunks
from app.ollama_llm import query_llm
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
import os

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = db.query(User).filter(User.id == payload.get("user_id")).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

@router.post("/")
def chat_endpoint(query: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    chunks = search_similar_chunks(query)
    context = "\n".join(chunk['text'] for chunk in chunks)
    response = query_llm(context=context, question=query)
    chat = Chat(user_id=user.id, question=query, response=response)
    db.add(chat)
    db.commit()
    return {"response": response}