from sentence_transformers import SentenceTransformer


class EmbeddingModel:
    """
    Handles text embeddings.
    """

    def __init__(self):
        self.model = SentenceTransformer(
            "BAAI/bge-small-en-v1.5"
        )

    def embed_text(self, text: str):
        """
        Convert text into embedding vector.
        """
        return self.model.encode(text)

    def embed_documents(self, documents: list[str]):
        """
        Convert multiple chunks into embeddings.
        """
        return self.model.encode(documents)