import requests

def query_llm(context: str, question: str) -> str:
    prompt = f"""Context: {context}
    Question: {question}
    Answer:"""
    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    })
    return response.json()["response"]