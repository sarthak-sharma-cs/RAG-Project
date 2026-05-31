# # # # # from app.ingestion.loader import load_document
# # # # # from app.ingestion.chunker import split_text
# # # # # from app.embeddings.embedder import EmbeddingModel
# # # # # from app.vectorstorage.chroma_store import ChromaStore


# # # # # text = load_document(
# # # # #     "data/uploads/sample.txt"
# # # # # )

# # # # # chunks = split_text(text)

# # # # # embedding_model = EmbeddingModel()

# # # # # embeddings = embedding_model.embed_documents(
# # # # #     chunks
# # # # # )

# # # # # db = ChromaStore()

# # # # # db.add_documents(
# # # # #     chunks,
# # # # #     embeddings
# # # # # )

# # # # # print(
# # # # #     f"Stored Chunks: {db.count()}"
# # # # # )



# # # # # from app.retrieval.retriever import Retriever


# # # # # retriever = Retriever()

# # # # # results = retriever.retrieve(
# # # # #     "When and where was first solar cell as developed and waht was its name ?"
# # # # # )

# # # # # print("\nRetrieved Chunks:\n")

# # # # # for doc in results["documents"][0]:
# # # # #     print("=" * 60)
# # # # #     print(doc)


# # # # from app.retrieval.retriever import Retriever
# # # # from app.llm.gemini_client import GeminiClient


# # # # question = (
# # # #     "Why are energy storage technologies becoming increasingly important as solar and wind power expand?"
# # # # )

# # # # retriever = Retriever()

# # # # results = retriever.retrieve(
# # # #     question
# # # # )

# # # # context = "\n\n".join(
# # # #     results["documents"][0]
# # # # )

# # # # gemini = GeminiClient()

# # # # answer = gemini.generate_answer(
# # # #     question,
# # # #     context
# # # # )

# # # # print("\nQUESTION:\n")
# # # # print(question)

# # # # print("\nANSWER:\n")
# # # # print(answer)



# # # from app.ingestion.loader import load_document
# # # from app.ingestion.chunker import split_text
# # # from app.embeddings.embedder import EmbeddingModel
# # # from app.vectorstorage.chroma_store import ChromaStore


# # # text = load_document(
# # #     "data/uploads/sample.txt"
# # # )

# # # chunks = split_text(text)

# # # embedding_model = EmbeddingModel()

# # # embeddings = embedding_model.embed_documents(
# # #     chunks
# # # )

# # # db = ChromaStore()

# # # db.add_documents(
# # #     chunks=chunks,
# # #     embeddings=embeddings,
# # #     source_file="sample.txt"
# # # )

# # # print(
# # #     f"Stored Chunks: {db.count()}"
# # # )

# # from app.retrieval.retriever import Retriever


# # retriever = Retriever()

# # results = retriever.retrieve(
# #     "What is the maternity leave policy?"
# # )

# # print("\nRESULTS:\n")

# # for i in range(len(results["documents"][0])):

# #     print("=" * 60)

# #     print("DOCUMENT:")
# #     print(results["documents"][0][i])

# #     print("\nMETADATA:")
# #     print(results["metadatas"][0][i])


# from app.ingestion.loader import load_document
# from app.ingestion.chunker import split_text
# from app.embeddings.embedder import EmbeddingModel
# from app.vectorstorage.chroma_store import ChromaStore


# # Load document
# text = load_document(
#     "data/uploads/sample.txt"
# )

# # Create chunks
# chunks = split_text(text)

# # Generate embeddings
# embedding_model = EmbeddingModel()

# embeddings = embedding_model.embed_documents(
#     chunks
# )

# # Store in ChromaDB
# db = ChromaStore()

# db.add_documents(
#     chunks=chunks,
#     embeddings=embeddings,
#     source_file="sample.txt"
# )

# print(
#     f"Stored Chunks: {db.count()}"
# )

from app.retrieval.retriever import Retriever


retriever = Retriever()

results = retriever.retrieve(
    "What is the maternity leave policy?"
)

print("\nRESULTS:\n")

for i in range(len(results["documents"][0])):

    print("=" * 60)

    print("DOCUMENT:")
    print(results["documents"][0][i])

    print("\nMETADATA:")
    print(results["metadatas"][0][i])