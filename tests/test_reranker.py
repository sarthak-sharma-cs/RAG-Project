from app.retrieval.reranker import Reranker


query = (
    "What is adoption leave policy?"
)

documents = [

    "Employees legally adopting a child may receive 12 weeks of paid adoption leave.",

    "Employees are entitled to annual leave after probation.",

    "Medical certificates must be submitted to HR."
]

reranker = Reranker()

results = reranker.rerank(
    query,
    documents
)

print("\nRERANKED RESULTS:\n")

for score, doc in results:

    print("=" * 50)

    print("Score:", score)

    print(doc)