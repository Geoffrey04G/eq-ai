def split_text(text, max_tokens=300):
    lines = text.split("\n")
    chunks = []
    current = ""
    for line in lines:
        if len((current + line).split()) > max_tokens:
            chunks.append({"text": current.strip()})
            current = ""
        current += line + "\n"
    if current:
        chunks.append({"text": current.strip()})
    return chunks