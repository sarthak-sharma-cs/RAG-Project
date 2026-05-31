# Advanced RAG System

A production-oriented Retrieval Augmented Generation (RAG) system built from scratch using Python, ChromaDB, Sentence Transformers, BM25 retrieval, and Google's Gemini API.

## Features

### Phase 1 - Core RAG Pipeline

* Document ingestion
* Text chunking
* Embedding generation
* ChromaDB vector storage
* Semantic retrieval
* Gemini-powered answer generation

### Phase 2 - Advanced Retrieval

* Metadata storage
* Metadata filtering
* Query expansion using Gemini
* BM25-based hybrid retrieval
* Multi-document support

## Project Structure

```text
app/
├── ingestion/
├── embeddings/
├── retrieval/
├── vectorstorage/
├── llm/

tests/

data/
├── uploads/
```

## Tech Stack

* Python
* ChromaDB
* Sentence Transformers
* Gemini API
* BM25 (rank-bm25)

## Current Status

### Completed

* Phase 1: Core RAG Pipeline
* Phase 2: Advanced Retrieval

### In Progress

* Cross Encoder Reranking
* Citations
* Contextual Memory

### Planned

* FastAPI Backend
* Document Upload API
* Frontend Interface
* Cloud Deployment

## Retrieval Pipeline

```text
User Query
    ↓
Query Expansion
    ↓
Vector Search
    ↓
BM25 Hybrid Retrieval
    ↓
Relevant Chunks
    ↓
Gemini
    ↓
Final Answer
```

## Future Improvements

* Cross Encoder Reranking
* Source Citations
* Conversation Memory
* PDF/DOCX Upload Support
* Production Deployment
