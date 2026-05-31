from app.retrieval.retriever import Retriever


retriever = Retriever()

results = retriever.retrieve(
    query="What is adoption leave policy?",
    source_file="sample.txt"
)

print("\nRESULTS:\n")

for i in range(len(results["documents"][0])):

    print("=" * 60)

    print("DOCUMENT:")
    print(results["documents"][0][i])

    print("\nMETADATA:")
    print(results["metadatas"][0][i])