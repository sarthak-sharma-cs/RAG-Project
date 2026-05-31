import chromadb

from app.retrieval.query_expander import QueryExpander
from app.embeddings.embedder import EmbeddingModel
from app.retrieval.bm25_search import BM25Search

class Retriever:
    """
    Retrieve relevant chunks from ChromaDB.
    """

    def __init__(self):
        self.embedding_model = EmbeddingModel()
        

        client = chromadb.PersistentClient(
            path="data/chroma_db"
        )

        self.collection = client.get_collection(
            name="documents"
        )

        self.query_expander = QueryExpander()
        self.bm25_search = BM25Search()

    def retrieve(
         self,
         query: str,
         n_results: int = 3,
         source_file: str | None = None,
         expand_query: bool = True
):
        """
        Retrieve relevant chunks.
        """


        if expand_query:

            query = self.query_expander.expand(
            query
            )

            print("\nExpanded Query:\n")
            print(query)


        query_embedding = self.embedding_model.embed_text(
            query
        )

        query_params = {
            "query_embeddings": [
                query_embedding.tolist()
            ],
            "n_results": n_results
        }

        if source_file:

            query_params["where"] = {
                "source": source_file
            }

        results = self.collection.query(
            **query_params
        )

        documents = results["documents"][0]
        metadatas = results["metadatas"][0]

        bm25_scores = self.bm25_search.search(
            query,
            documents
)

        combined = []

        for doc, metadata, score in zip(
        documents,
        metadatas,
        bm25_scores
):

             combined.append(
            (
                score,
                doc,
                metadata
        )
    )

        combined.sort(
        reverse=True,
        key=lambda x: x[0]
    )

        results["documents"][0] = [
        item[1]
        for item in combined
    ]

        results["metadatas"][0] = [
        item[2]
        for item in combined
    ]
        
        return results