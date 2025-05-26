from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models import User
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
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
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

class ProfileUpdate(BaseModel):
    name: str
    location: str
    age: int
    job_role: str

@router.post("/profile")
def update_profile(profile: ProfileUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user.name = profile.name
    user.location = profile.location
    user.age = profile.age
    user.job_role = profile.job_role
    db.commit()
    db.refresh(user)
    return {"message": "Profile updated successfully"}
