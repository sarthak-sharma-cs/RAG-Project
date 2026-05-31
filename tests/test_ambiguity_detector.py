from app.memory.ambiguity_detector import (
    AmbiguityDetector
)

detector = AmbiguityDetector()

queries = [

    "How long is it?",

    "Compare them",

    "What is annual leave?",

    "Explain maternity leave policy"
]

for query in queries:

    print(
        query,
        "->",
        detector.is_ambiguous(query)
    )