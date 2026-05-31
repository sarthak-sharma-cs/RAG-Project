import re

class AmbiguityDetector:

    def __init__(self):

        self.ambiguous_words = {

                "it",
                "they",
                "them",
                "their",
                "this",
                "that",
                "these",
                "those",
                "he",
                "she",
                "his",
                "her",
                "its"
        }

    def is_ambiguous(
        self,
        query: str
    ) -> bool:

        query_words = set(
            re.findall(
                r"\b\w+\b",
                query.lower()
    )
)

        return bool(
            query_words.intersection(
                self.ambiguous_words
            )
        )