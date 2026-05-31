import os

from google import genai
from dotenv import load_dotenv


load_dotenv()


class GeminiClient:

    def __init__(self):

        api_key = os.getenv(
            "GEMINI_API_KEY"
        )

        self.client = genai.Client(
            api_key=api_key
        )

    def generate_answer(
        self,
        question: str,
        context: str
    ) -> str:

        prompt = f"""
You are a helpful AI assistant.

Answer ONLY using the provided context.

Context:
{context}

Question:
{question}
"""

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text


    def expand_query(
        self,
        query: str
    ) -> str:

        prompt = f"""
    Expand the following search query for a RAG system.

    Requirements:   
    - Keep the original meaning.
    - Add related terms and concepts.
    - Return only the expanded query.
    - Do not explain anything.

    Query:
    {query}
    """

        response = self.client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

        return response.text