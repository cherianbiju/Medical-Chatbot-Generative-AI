# Medical Chatbot — Generative AI

An end-to-end AI-powered medical chatbot built using Retrieval Augmented Generation (RAG), deployed on AWS with a full CI/CD pipeline.

---

## Demo

### 📸 Screenshot
![Chatbot Screenshot](screenshots/demo.png)

### 🎥 Video Demo
[![Medical Chatbot Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

---

## Architecture

```
User → Flask Web App → LangChain RAG Pipeline → Google Gemini LLM
                              ↓
                     Pinecone Vector DB
                     (HuggingFace Embeddings)
```

---

## Tech Stack

| Category | Technology |
|---|---|
| Language | Python 3.11 |
| Framework | Flask |
| LLM | Google Gemini (`gemini-flash`) |
| Embeddings | HuggingFace `all-MiniLM-L6-v2` |
| Vector Database | Pinecone |
| RAG Framework | LangChain |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Cloud | AWS EC2 + AWS ECR |

---

## Features

- Ask any medical question and get concise, accurate answers
- RAG pipeline retrieves relevant context from a medical book (PDF)
- Google Gemini LLM generates responses based on retrieved context
- Real-time typing indicator in the chat UI
- Fully automated CI/CD pipeline — push code and deploy automatically
- Dockerized for consistent runs across any environment

---

## Project Structure

```
Medical-Chatbot-Generative-AI/
├── src/
│   ├── __init__.py
│   ├── helper.py           # PDF loader, text splitter, embeddings
│   └── prompt.py           # Prompt templates
├── templates/
│   └── chat.html           # Chat UI
├── static/
│   ├── style.css           # Styling
│   └── script.js           # Frontend logic
├── Data/
│   └── Medical_book.pdf    # Knowledge base
├── research/
│   └── trials.ipynb        # Experimentation notebook
├── app.py                  # Flask app
├── store_index.py          # Pinecone index creation
├── setup.py                # Package setup
├── template.py             # Project template generator
├── Dockerfile              # Docker configuration
├── requirements.txt        # Python dependencies
├── .github/
│   └── workflows/
│       └── cicd.yaml       # GitHub Actions CI/CD pipeline
└── .env                    # Environment variables (not committed)
```

---

## Getting Started

### Prerequisites

- Python 3.11
- Docker
- AWS Account
- Pinecone Account
- Google Gemini API Key

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/cherianbiju/Medical-Chatbot-Generative-AI.git
cd Medical-Chatbot-Generative-AI
```

**2. Create a virtual environment:**
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac
```

**3. Install dependencies:**
```bash
pip install -r requirements.txt
```

**4. Set up environment variables — create a `.env` file:**
```
PINECONE_API_KEY=your_pinecone_api_key
GOOGLE_API_KEY=your_google_api_key
```

**5. Create Pinecone index and store embeddings:**
```bash
python store_index.py
```

**6. Run the app:**
```bash
python app.py
```

Open `http://localhost:8080` in your browser.

---

## CI/CD Pipeline

Every push to the `main` branch automatically:

1. Builds a Docker image
2. Pushes the image to AWS ECR
3. Pulls the new image on AWS EC2
4. Stops the old container and starts the new one

### GitHub Secrets Required

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION
ECR_REPO
PINECONE_API_KEY
GOOGLE_API_KEY
```

---

## Deployment

The app is deployed on **AWS EC2** and accessible at:
```
http://<ec2-public-ip>:8080
```

Docker image is stored in **AWS ECR** (Elastic Container Registry).

---

## How It Works

1. Medical PDF is loaded and split into chunks
2. Chunks are embedded using HuggingFace `all-MiniLM-L6-v2` (384 dimensions)
3. Embeddings are stored in Pinecone vector database
4. User asks a question via the chat UI
5. Question is embedded and similar chunks are retrieved from Pinecone
6. Retrieved context + question is passed to Google Gemini
7. Gemini generates a concise medical answer
8. Answer is displayed in the chat UI

---

## Dependencies

Key packages used:

```
langchain==0.2.16
langchain-google-genai==1.0.10
langchain-huggingface==0.0.3
langchain-pinecone==0.1.3
sentence-transformers==3.0.0
transformers==4.44.0
flask==3.1.3
pinecone-client==5.0.1
google-generativeai==0.7.2
```

---
