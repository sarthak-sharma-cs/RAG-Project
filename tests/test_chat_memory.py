from app.memory.conversation_memory import (
    ConversationMemory
)

from app.memory.memory_manager import (
    MemoryManager
)

memory = ConversationMemory()

manager = MemoryManager()


while True:

    query = input("\nYou: ")

    if query.lower() == "exit":
        break

    processed_query = (
        manager.process_query(
            query,
            memory.get_messages()
        )
    )

    print(
        "\nProcessed Query:"
    )

    print(
        processed_query
    )

    memory.add_message(
        "user",
        query
    )