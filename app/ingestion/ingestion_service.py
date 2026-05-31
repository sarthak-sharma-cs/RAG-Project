from pathlib import Path

from app.ingestion.loader import load_document
from app.ingestion.chunker import split_text
from app.embeddings.embedder import EmbeddingModel
from app.vectorstorage.chroma_store import ChromaStore


class IngestionService:
    """
    Handles document ingestion pipeline.
    """

    def __init__(self):

        self.embedding_model = EmbeddingModel()

        self.db = ChromaStore()

    def ingest_document(
        self,
        file_path: str
    ):
        """
        Ingest a single document.
        """

        text = load_document(
            file_path
        )

        chunks = split_text(
            text
        )

        embeddings = (
            self.embedding_model.embed_documents(
                chunks
            )
        )

        source_file = Path(
            file_path
        ).name

        self.db.add_documents(
            chunks=chunks,
            embeddings=embeddings,
            source_file=source_file
        )

        print(
            f"Ingested: {source_file}"
        )

    def ingest_folder(
        self,
        folder_path: str
    ):
        """
        Ingest all supported documents in a folder.
        """

        folder = Path(
            folder_path
        )

        for file_path in folder.iterdir():

            if not file_path.is_file():

                continue

            try:

                self.ingest_document(
                    str(file_path)
                )

            except Exception as e:

                print(
                    f"Failed: {file_path.name}"
                )

                print(e)

    def count_documents(
        self
    ):

        return self.db.count()