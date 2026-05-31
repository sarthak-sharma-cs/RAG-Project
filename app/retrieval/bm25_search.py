from rank_bm25 import BM25Okapi


class BM25Search:

    def search(
        self,
        query: str,
        documents: list[str]
    ) -> list[float]:

        tokenized_docs = [
            doc.lower().split()
            for doc in documents
        ]

        bm25 = BM25Okapi(
            tokenized_docs
        )

        tokenized_query = (
            query.lower().split()
        )

        scores = bm25.get_scores(
            tokenized_query
        )

        return scores.tolist()