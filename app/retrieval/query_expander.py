from app.llm.gemini_client import GeminiClient


class QueryExpander:

    def __init__(self):

        self.gemini = GeminiClient()

    def expand(
        self,
        query: str
    ) -> str:

        return self.gemini.expand_query(
            query
        )