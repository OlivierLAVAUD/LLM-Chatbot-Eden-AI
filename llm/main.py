import json
import requests

import fastapi
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from config import NLP_HOST, NLP_PORT, DOC_SOURCE, EDENAI_API_KEY, CONTEXT

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


with open(DOC_SOURCE, 'r', encoding='utf-8') as file:
    info_cv = json.load(file)


@app.post("/chat/{prompt}")
async def chat(prompt):
    try:
        headers = {"Authorization": f"Bearer {EDENAI_API_KEY}"}
        url = "https://api.edenai.run/v2/text/chat"
        
        provider = "meta"
        payload = {
            "providers": provider,
       ##    "model": "gpt-3.5-turbo",
            "text": prompt,
            "chatbot_global_action": CONTEXT + json.dumps(info_cv),
            "previous_history": [],
            "temperature": 0.8,
            "max_tokens": 150,
            "fallback_providers": "openai,amazon,google"
        }

        response = requests.post(url, json=payload, headers=headers)
        
        result = response.json()
        print("result", result)
        return {"response": result[provider]['generated_text']}

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while processing the request to the chatbot API: {e}")

if __name__ == "__main__":

    import uvicorn
    uvicorn.run(app, host=NLP_HOST, port=NLP_PORT)
