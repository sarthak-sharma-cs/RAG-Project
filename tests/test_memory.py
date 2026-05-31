from app.memory.conversation_memory import (
    ConversationMemory
)


memory = ConversationMemory()

memory.add_message(
    "user",
    "What is maternity leave?"
)

memory.add_message(
    "assistant",
    "Employees are entitled..."
)

print(
    memory.get_messages()
)