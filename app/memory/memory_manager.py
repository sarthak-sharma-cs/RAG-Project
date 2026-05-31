from app.memory.ambiguity_detector import (
    AmbiguityDetector
)

from app.memory.query_rewriter import (
    QueryRewriter
)


class MemoryManager:

    def __init__(self):

        self.detector = (
            AmbiguityDetector()
        )

        self.rewriter = (
            QueryRewriter()
        )

    def process_query(
        self,
        query: str,
        history: list
    ) -> str:

        is_ambiguous = self.detector.is_ambiguous(
            query
)

        print(
            f"\nAmbiguous Query: {is_ambiguous}"
)

        if is_ambiguous:

            return self.rewriter.rewrite(
                query,
                history
            )

        return query