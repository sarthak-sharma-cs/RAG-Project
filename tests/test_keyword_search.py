from app.retrieval.keyword_search import KeywordSearch


query = (
    "adoption leave policy"
)

document = (
    "Employees are eligible for adoption leave."
)

search = KeywordSearch()

score = search.score(
    query,
    document
)

print("\nKEYWORD SCORE:\n")
print(score)