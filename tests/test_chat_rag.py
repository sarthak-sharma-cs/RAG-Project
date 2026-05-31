from app.retrieval.retriever import Retriever
from app.llm.gemini_client import GeminiClient

from app.memory.conversation_memory import (
    ConversationMemory
)

from app.memory.memory_manager import (
    MemoryManager
)


retriever = Retriever()

gemini = GeminiClient()

memory = ConversationMemory()

manager = MemoryManager()


while True:

    question = input(
        "\nYou: "
    )

    if question.lower() == "exit":

        break

    processed_query = (
        manager.process_query(
            question,
            memory.get_messages()
        )
    )

    print(
        "\nProcessed Query:"
    )

    print(
        processed_query
    )

    results = retriever.retrieve(
        processed_query
    )

    context = "\n\n".join(
        results["documents"][0]
    )

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

    print("\nANSWER:\n")

    print(answer)

    print("\nSOURCES:\n")

    for citation in citations:

        print(
            f"- {citation}"
        )