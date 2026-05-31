from pathlib import Path

from pypdf import PdfReader
from docx import Document


def load_txt(file_path: str) -> str:
    """
    Load text from a TXT file.
    """
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()


def load_pdf(file_path: str) -> str:
    """
    Load text from a PDF file.
    """
    text = ""

    reader = PdfReader(file_path)

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


def load_docx(file_path: str) -> str:
    """
    Load text from a DOCX file.
    """
    doc = Document(file_path)

    text = "\n".join(
        paragraph.text
        for paragraph in doc.paragraphs
    )

    return text


def load_document(file_path: str) -> str:
    """
    Automatically load supported document types.
    """

    extension = Path(file_path).suffix.lower()

    if extension == ".txt":
        return load_txt(file_path)

    elif extension == ".pdf":
        return load_pdf(file_path)

    elif extension == ".docx":
        return load_docx(file_path)

    else:
        raise ValueError(
            f"Unsupported file type: {extension}"
        )