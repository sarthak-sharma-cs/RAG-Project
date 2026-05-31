from app.retrieval.bm25_search import BM25Search


documents = [
    "Employees receive adoption leave.",
    "Employees receive annual leave.",
    "Adoption adoption adoption leave benefits."
]

query = (
    "adoption leave policy"
)

bm25 = BM25Search()

scores = bm25.search(
    query,
    documents
)

print("\nBM25 SCORES:\n")

for doc, score in zip(
    documents,
    scores
):
    print(score)
    print(doc)
    print()