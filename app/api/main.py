from fastapi import FastAPI

from app.api.schemas import (
    QuestionRequest
)

from app.retrieval.retriever import Retriever
from app.llm.gemini_client import GeminiClient


app = FastAPI(
    title="RAG Knowledge Assistant",
    version="1.0.0"
)


retriever = Retriever()

gemini = GeminiClient()


@app.get("/")
def home():

    return {
        "message": "RAG API Running"
    }


@app.post("/ask")
def ask_question(
    request: QuestionRequest
):

    results = retriever.retrieve(
        request.question
    )

    context = "\n\n".join(
        results["documents"][0]
    )

    answer = gemini.generate_answer(
        request.question,
        context
    )

    return {
        "question": request.question,
        "answer": answer
    }