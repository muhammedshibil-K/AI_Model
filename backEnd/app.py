from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy
import uvicorn
from datetime import datetime

# =========================================================
# LOAD SPACY NLP MODEL
# =========================================================
# Make sure installed:
# python -m spacy download en_core_web_sm
# =========================================================
nlp = spacy.load("en_core_web_sm")

# =========================================================
# CREATE FASTAPI APPLICATION
# =========================================================
app = FastAPI(
    title="Intelligence NLP API",
    description="End-to-End NLP Analysis System using FastAPI + SpaCy",
    version="1.0.0"
)

# =========================================================
# ENABLE CORS
# =========================================================
# Allows frontend (React/Vue/Angular) to access backend
# =========================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# REQUEST MODEL
# =========================================================
class TextRequest(BaseModel):
    text: str

# =========================================================
# ROOT ROUTE
# =========================================================
@app.get("/")
def home():
    return {
        "success": True,
        "message": "FastAPI NLP Intelligence Server Running",
        "server_time": str(datetime.now())
    }

# =========================================================
# NLP ANALYZE ROUTE
# =========================================================
@app.post("/analyze")
def analyze(data: TextRequest):

    # =====================================================
    # PROCESS USER TEXT
    # =====================================================
    doc = nlp(data.text)

    # =====================================================
    # TOKEN ANALYSIS
    # =====================================================
    tokens = []

    for token in doc:
        tokens.append({
            "word": token.text,
            "lemma": token.lemma_,
            "pos": token.pos_,
            "tag": token.tag_,
            "shape": token.shape_,
            "is_alpha": token.is_alpha,
            "is_stop": token.is_stop
        })

    # =====================================================
    # ENTITY EXTRACTION
    # =====================================================
    entities = []

    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_,
            "description": spacy.explain(ent.label_)
        })

    # =====================================================
    # SENTENCE DETECTION
    # =====================================================
    sentences = []

    for sent in doc.sents:
        sentences.append(sent.text)

    # =====================================================
    # KEYWORDS EXTRACTION
    # =====================================================
    keywords = []

    for token in doc:
        if (
            not token.is_stop
            and not token.is_punct
            and token.is_alpha
        ):
            keywords.append(token.lemma_)

    # Remove duplicate keywords
    keywords = list(set(keywords))

    # =====================================================
    # RETURN RESPONSE
    # =====================================================
    return {
        "success": True,

        "input_text": data.text,

        "summary": {
            "total_tokens": len(tokens),
            "total_entities": len(entities),
            "total_sentences": len(sentences),
            "total_keywords": len(keywords)
        },

        "tokens": tokens,

        "entities": entities,

        "sentences": sentences,

        "keywords": keywords
    }


# =========================================================
# START UVICORN SERVER
# =========================================================
if __name__ == "__main__":

    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )