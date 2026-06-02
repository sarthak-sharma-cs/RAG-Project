import chromadb


class ChromaStore:
    """
    Handles ChromaDB operations.
    """

    def __init__(self):
        self.client = chromadb.PersistentClient(
            path="data/chroma_db"
        )

        self.collection = self.client.get_or_create_collection(
            name="documents"
        )
    
    
    def add_documents(
        self,
        chunks: list[str],
        embeddings,
        source_file: str
    ):
        """
        Store chunks, embeddings and metadata.
        """

        ids = [
            f"{source_file}_chunk_{i}"
            for i in range(len(chunks))
        ]

        metadatas = [
            {
                "source": source_file,
                "chunk_id": i
            }
            for i in range(len(chunks))
        ]

        self.collection.add(
            ids=ids,
            documents=chunks,
            embeddings=embeddings.tolist(),
            metadatas=metadatas
        )

    def count(self):
        """
        Number of stored chunks.
        """
        return self.collection.count()

    def get_all_documents(
        self
    ):
        """
        Get all stored metadata.
        """

        return self.collection.get(
            include=["metadatas"]
        )

        
    def delete_document(
        self,
        source_file: str
    ):
        """
        Delete all chunks belonging to a document.
        """

        self.collection.delete(
            where={
                "source": source_file
            }
        )