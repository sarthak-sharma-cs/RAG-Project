from app.retrieval.retriever import Retriever
from app.llm.gemini_client import GeminiClient


question = (
    "What is the maternity leave policy?"
)

retriever = Retriever()

results = retriever.retrieve(
    question
)

context = "\n\n".join(
    results["documents"][0]
)

gemini = GeminiClient()

answer = gemini.generate_answer(
    question,
    context
)

print("\nQUESTION:\n")
print(question)

print("\nANSWER:\n")
print(answer)