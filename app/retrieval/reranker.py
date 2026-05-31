from sentence_transformers import CrossEncoder


class Reranker:

    def __init__(self):

        self.model = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )

    def rerank(
        self,
        query: str,
        documents: list[str]
    ):

        pairs = [
            [query, doc]
            for doc in documents
        ]

        scores = self.model.predict(
            pairs
        )

        ranked = []

        for score, doc in zip(
            scores,
            documents
        ):

            ranked.append(
                (
                    score,
                    doc
                )
            )

        ranked.sort(
            reverse=True,
            key=lambda x: x[0]
        )

        return ranked