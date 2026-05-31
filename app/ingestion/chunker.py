from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_text(text: str) -> list[str]:
    """
    Split document text into chunks.
    """

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
        length_function=len
    )

    chunks = text_splitter.split_text(text)

    return chunks