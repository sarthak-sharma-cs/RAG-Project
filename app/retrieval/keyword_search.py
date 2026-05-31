import re


class KeywordSearch:

    def score(
        self,
        query: str,
        document: str
    ) -> int:

        query_words = set(
            re.findall(
                r"\w+",
                query.lower()
            )
        )

        document_words = set(
            re.findall(
                r"\w+",
                document.lower()
            )
        )

        return len(
            query_words.intersection(
                document_words
            )
        )