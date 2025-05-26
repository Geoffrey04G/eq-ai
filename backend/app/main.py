from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, user, files
from app.auth import auth_router
from app.db import create_db_and_tables

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(chat.router, prefix="/chat")
app.include_router(user.router, prefix="/user")
app.include_router(files.router, prefix="/files")

@app.on_event("startup")
def startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Welcome to EQ AI backend"}