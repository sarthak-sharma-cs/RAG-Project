from app.llm.gemini_client import GeminiClient


class QueryRewriter:

    def __init__(self):

        self.gemini = GeminiClient()

    def rewrite(
        self,
        current_query: str,
        conversation_history: list
    ) -> str:

        prompt = f"""
You are a query rewriting assistant.

Conversation History:
{conversation_history}

Current User Query:
{current_query}

Task:
- If the current query is ambiguous and depends on previous conversation context,
  rewrite it into a standalone query.
- If the query is already clear, return it unchanged.
- Return ONLY the rewritten query.
"""

        try:

            response = (
                self.gemini.client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=prompt
                )
            )

            return response.text.strip()

        except Exception:

            print(
                "\nQuery Rewriting Failed. Using Original Query."
            )

            return current_query