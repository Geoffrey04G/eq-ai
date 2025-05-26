import fitz  # PyMuPDF
import docx
import io

def parse_file(filename, content):
    if filename.endswith(".pdf"):
        doc = fitz.open(stream=content, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    elif filename.endswith(".docx"):
        doc = docx.Document(io.BytesIO(content))
        return "\n".join([para.text for para in doc.paragraphs])
    elif filename.endswith(".txt"):
        return content.decode("utf-8")
    else:
        return ""