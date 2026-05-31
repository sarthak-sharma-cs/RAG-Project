from app.retrieval.query_expander import QueryExpander


query = (
    "How much leave do I get after childbirth?"
)

expander = QueryExpander()

expanded_query = expander.expand(
    query
)

print("\nORIGINAL QUERY:\n")
print(query)

print("\nEXPANDED QUERY:\n")
print(expanded_query)