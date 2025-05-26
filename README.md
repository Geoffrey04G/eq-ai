# EQ AI – Local ChatGPT-style Assistant

**EQ AI** is a full-stack chatbot app built with FastAPI + React that uses local models via Ollama and FAISS vector search.

---

## 🧠 Features
- Local LLM (via Ollama)
- JWT Auth (login/register)
- Chat with voice input
- File uploads (PDF/DOCX)
- Demographics onboarding
- Persistent history
- Full-text vector search (FAISS)

---

## 🧱 Stack
| Layer     | Tech                        |
|----------|-----------------------------|
| Frontend | React + Tailwind + Zustand  |
| Backend  | FastAPI, SQLAlchemy         |
| LLM      | Ollama (Mistral, LLaMA)     |
| Vector   | FAISS + MiniLM Embeddings   |
| Storage  | SQLite (or PostgreSQL)      |

---

## 🚀 Quick Start
```bash
# Clone & Setup
git clone your-repo
cd eq-ai

# Start everything
docker-compose up --build
```

---

You're now ready to run and develop EQ AI locally or in Dockerized environments!
