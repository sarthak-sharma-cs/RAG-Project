

from app.memory.memory_manager import (
    MemoryManager
)

history = [

    {
        "role": "user",
        "content": "What is the maternity leave policy?"
    },

    {
        "role": "assistant",
        "content": "Employees are entitled..."
    }
]

manager = MemoryManager()

query = "How long is it?"

processed_query = (
    manager.process_query(
        query,
        history
    )
)

print(processed_query)