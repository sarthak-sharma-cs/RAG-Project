from app.retrieval.retriever import Retriever
from app.llm.gemini_client import GeminiClient

from app.memory.conversation_memory import (
    ConversationMemory
)

from app.memory.memory_manager import (
    MemoryManager
)


question = input(
    "\nAsk a question: "
)
retriever = Retriever()

memory = ConversationMemory()

manager = MemoryManager()



processed_query = (
    manager.process_query(
        question,
        memory.get_messages()
    )
)

results = retriever.retrieve(
    processed_query
)

context = "\n\n".join(
    results["documents"][0]
)

gemini = GeminiClient()

answer = gemini.generate_answer(
    question,
    context
)

memory.add_message(
    "user",
    question
)

memory.add_message(
    "assistant",
    answer
)

citations = []

for metadata in results["metadatas"][0]:

    citation = (
        f"{metadata['source']} "
        f"(Chunk {metadata['chunk_id']})"
    )

    citations.append(
        citation
    )

print("\nQUESTION:\n")
print(question)

print("\nANSWER:\n")
print(answer)

print("\nSOURCES:\n")

for citation in citations:

    print(
        f"- {citation}"
    )