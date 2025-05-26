from fastapi import APIRouter, HTTPException, Depends
from passlib.hash import bcrypt
from jose import jwt
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models import User
from fastapi.security import OAuth2PasswordRequestForm
import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"

auth_router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@auth_router.post("/register")
def register(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = bcrypt.hash(form_data.password)
    new_user = User(email=form_data.username, password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = jwt.encode({"user_id": new_user.id}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

@auth_router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not bcrypt.verify(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = jwt.encode({"user_id": user.id}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}