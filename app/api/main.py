from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
from fastapi.middleware.cors import CORSMiddleware

from app.memory.memory_manager import (
    MemoryManager
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.api.schemas import (
    QuestionRequest
)

from app.retrieval.retriever import Retriever
from app.llm.gemini_client import GeminiClient

from app.ingestion.ingestion_service import (
    IngestionService
)

from app.vectorstorage.chroma_store import (
    ChromaStore
)


app = FastAPI(
    title="RAG Knowledge Assistant",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

retriever = Retriever()

gemini = GeminiClient()

ingestion_service = (
    IngestionService()
)

db = ChromaStore()

memory_manager = (
    MemoryManager()
)

conversation_history = []


@app.get("/")
def home():

    return {
        "message": "RAG API Running"
    }


@app.post("/ask")
def ask_question(
    request: QuestionRequest
):

    processed_query = (
        memory_manager.process_query(
            request.question,
            conversation_history
        )
    )

    results = retriever.retrieve(
        processed_query
    )

    context = "\n\n".join(
        results["documents"][0]
    )

    answer = gemini.generate_answer(
        processed_query,
        context
    )

    conversation_history.append(
        {
            "user": request.question,
            "assistant": answer
        }
    )

    sources = []

    for metadata in results["metadatas"][0]:

        sources.append(
            {
                "source": metadata["source"],
                "chunk_id": metadata["chunk_id"]
            }
        )

    return {
        "question": request.question,
        "processed_query": processed_query,
        "answer": answer,
        "sources": sources
    }


@app.post("/upload")
async def upload_document(
    file: UploadFile = File(...)
):

    file_path = (
        f"data/uploads/{file.filename}"
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        content = await file.read()

        buffer.write(
            content
        )

    ingestion_service.ingest_document(
        file_path
    )

    return {
        "message": (
            "File uploaded successfully"
        ),
        "filename": file.filename
    }


@app.get("/documents")
def get_documents():

    results = (
        db.get_all_documents()
    )

    document_names = set()

    for metadata in results["metadatas"]:

        document_names.add(
            metadata["source"]
        )

    return {
        "documents": sorted(
            list(document_names)
        )
    }