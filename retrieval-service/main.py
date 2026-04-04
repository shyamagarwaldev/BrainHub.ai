import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from qdrant_client import QdrantClient,models
from fastembed import TextEmbedding,SparseTextEmbedding
from sentence_transformers import CrossEncoder

load_dotenv()

app = FastAPI()

qdrant = QdrantClient(url=os.getenv('URL'))

COLLECTION = "brain_chunks"

dense_vector_name = "dense"
sparse_vector_name = "sparse"
dense_model_name = "sentence-transformers/all-MiniLM-L6-v2"
sparse_model_name = "prithivida/Splade_PP_en_v1"
if not qdrant.collection_exists(COLLECTION):
    qdrant.create_collection(
        collection_name=COLLECTION,
        vectors_config={
            dense_vector_name: models.VectorParams(
                size=qdrant.get_embedding_size(dense_model_name), 
                distance=models.Distance.COSINE
            )
        },  # size and distance are model dependent
        sparse_vectors_config={sparse_vector_name: models.SparseVectorParams()},
    )        
dense_model = TextEmbedding(dense_model_name)
sparse_model = SparseTextEmbedding(sparse_model_name)
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

# Request schema
class EmbedRequest(BaseModel):
    texts: list[str]
    payloads: list[dict]
    ids: list[str]
class SearchRequest(BaseModel):
    query: str
    userId: str
    limit: int = 6    


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/embed-store")
def embed_store(req:EmbedRequest):
    texts = req.texts
    dense_vectors = list(dense_model.embed(texts))
    sparse_vectors = list(sparse_model.embed(texts))
    points = []

    for i in range(len(texts)):
        points.append(
            models.PointStruct(
                id=req.ids[i],
                vector={
                    dense_vector_name: dense_vectors[i],
                    sparse_vector_name: models.SparseVector(
                        indices=sparse_vectors[i].indices.tolist(),
                        values=sparse_vectors[i].values.tolist(),
                    ),
                },
                payload=req.payloads[i],
            )
        )

    qdrant.upsert(collection_name=COLLECTION,points=points)
    return {"status": "stored", "count": len(points)}

@app.post("/search")
def hybrid_search(req: SearchRequest):
    query = req.query

    results = qdrant.query_points(
        collection_name=COLLECTION,
        query=models.FusionQuery(fusion=models.Fusion.RRF),
        prefetch=[
            models.Prefetch(
                query=models.Document(text=query, model=dense_model_name),
                using=dense_vector_name,
            ),
            models.Prefetch(
                query=models.Document(text=query, model=sparse_model_name),
                using=sparse_vector_name,
            ),
        ],
        query_filter=models.Filter(
            must=[
                models.FieldCondition(
                    key="userId",
                    match=models.MatchValue(value=req.userId),
                )
            ]
                    ),
        limit=10,
        with_payload=True
    ).points

    pairs = [
        (query, r.payload.get("text", ""))
        for r in results
    ]
    scores = reranker.predict(pairs)
    reranked = sorted(
        zip(results, scores),
        key=lambda x: x[1],
        reverse=True
    )
    top_results = reranked[:4]
    return [
        {
            "id": str(r[0].id),
            "score": float(r[1]),
            "payload": r[0].payload,
        }
        for r in top_results
    ]    