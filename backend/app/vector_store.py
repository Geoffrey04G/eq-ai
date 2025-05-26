import faiss
import os
import pickle
import numpy as np

DIM = 384
INDEX_PATH = "vector_store/faiss_index.bin"
META_PATH = "vector_store/meta.pkl"

if os.path.exists(INDEX_PATH):
    index = faiss.read_index(INDEX_PATH)
    with open(META_PATH, "rb") as f:
        chunk_meta = pickle.load(f)
else:
    index = faiss.IndexFlatL2(DIM)
    chunk_meta = []

def save_embeddings_to_faiss(vectors, chunks):
    global chunk_meta
    index.add(np.array(vectors).astype("float32"))
    chunk_meta.extend(chunks)
    faiss.write_index(index, INDEX_PATH)
    with open(META_PATH, "wb") as f:
        pickle.dump(chunk_meta, f)

def search_similar_chunks(query):
    from app.embeddings import model
    q_vec = model.encode([query])
    D, I = index.search(q_vec, k=5)
    return [chunk_meta[i] for i in I[0]]