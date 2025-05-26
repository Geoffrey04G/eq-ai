from fastapi import APIRouter, File, UploadFile
from app.utils.pdf_parser import parse_file
from app.utils.text_splitter import split_text
from app.embeddings import embed_chunks
from app.vector_store import save_embeddings_to_faiss

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    text = parse_file(file.filename, content)
    chunks = split_text(text)
    vectors = embed_chunks(chunks)
    save_embeddings_to_faiss(vectors, chunks)
    return {"message": "File processed and indexed"}