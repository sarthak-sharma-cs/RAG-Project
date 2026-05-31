from app.memory.query_rewriter import QueryRewriter


history = [

    {
        "role": "user",
        "content": "What is the maternity leave policy?"
    },

    {
        "role": "assistant",
        "content": "Employees are entitled to maternity leave."
    }

]

query = "How long is it?"


rewriter = QueryRewriter()

new_query = rewriter.rewrite(
    query,
    history
)

print("\nORIGINAL QUERY:\n")
print(query)

print("\nREWRITTEN QUERY:\n")
print(new_query)