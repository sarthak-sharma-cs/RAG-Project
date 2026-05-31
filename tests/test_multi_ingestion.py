from app.ingestion.ingestion_service import (
    IngestionService
)

service = IngestionService()

service.ingest_folder(
    "data/uploads"
)

print(
    f"Stored Chunks: {service.count_documents()}"
)