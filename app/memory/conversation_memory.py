class ConversationMemory:

    def __init__(
        self,
        max_messages: int = 10
    ):

        self.max_messages = max_messages

        self.messages = []

    def add_message(
        self,
        role: str,
        content: str
    ):

        self.messages.append(
            {
                "role": role,
                "content": content
            }
        )

        if len(
            self.messages
        ) > self.max_messages:

            self.messages.pop(0)

    def get_messages(
        self
    ):

        return self.messages