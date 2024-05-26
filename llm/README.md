# LLM Chatbot with Eden AI and context document (json)

This is a LLM Chatbot were the answers are depending on a json file context document with give.

## Prepare Python Environment

- clone the repo
- Sign in and get a Eden AI API key on website https://www.edenai.co/
- create a config.py file base on template config.sample.py
-       modify config.py: complete with the eden api key you obtain: EDENAI_API_KEY = "{eden_api_key}"
-       modify config.py: get a context json file document and specify the name in DOC_SOURCE = "{doc_name.json}

- create a conda environment  ``` conda create -n LLM-Chatbot-Eden-AI ```
- activate donda environnment ``` conda activate LLM-Chatbot-Eden-AI ```
- install the python package  ``` pip install -r requirements.txt ```

# Start LLM Chatbot API

``` cd llm ```
``` python main.py ```
``` cd .. ```

# Start http server

``` cd front ```
``` Python -m http.server 8000 ```

# Run & play
Lanch you internet browser on http://localhost:8000/

# otherwise Docker Installation 

## run Docker Desktop 
   - Launch Docker Desktop on Windows or Linux

## build and run LLM engine on Docker
    ```cd llm ```
    ```docker build -t llm-engine . ```
    ```docker run -p 8010:8010 llm-engine ```
    ```cd .. ```

## build and run frontend chatbot on Docker image  
    ```cd front ```
    ```docker build -t chatbot-front . ```
    `` docker run -d -p 8000:8000 chatbot-front```
    ```cd .. ```

# Run & play
Lanch you internet browser on http://localhost:8000/