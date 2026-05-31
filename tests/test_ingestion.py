# from app.ingestion.loader import load_document
# from app.ingestion.chunker import split_text
# from app.embeddings.embedder import EmbeddingModel
# from app.vectorstorage.chroma_store import ChromaStore


# text = load_document(
#     "data/uploads/sample.txt"
# )

# chunks = split_text(text)

# embedding_model = EmbeddingModel()

# embeddings = embedding_model.embed_documents(
#     chunks
# )

# db = ChromaStore()

# db.add_documents(
#     chunks=chunks,
#     embeddings=embeddings,
#     source_file="sample.txt"
# )

# print(
#     f"Stored Chunks: {db.count()}"
# )



from app.ingestion.ingestion_service import (
    IngestionService
)


service = IngestionService()

service.ingest_document(
    "data/uploads/sample.txt"
)

print(
    f"Stored Chunks: {service.count_documents()}"
)