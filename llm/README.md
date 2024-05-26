# Chatbox NLP : Chat with an Avatar

Guess who you are talking to. Natural answering of the real Avatar of?

# Installation

1. clone the repo repo

2. ``` pip install -r requirements.txt ```

# EDEN API KEY Setting   

modify the name of config.sample.py with config.sample
Create an eden ai account and set your eden ai api key in the config.py file 
EDENAI_API = ""

---

# Running

	```Python main.py```
    
You can run it also on docker  
# Construire l'image Docker 
    ```docker build -t chat . ```

# Execution de l'image Docker
    ```docker run -p 8010:8010 chat ```

# Execution via Docker
      ```docker run -d -p 8000:8000 chat-front ```

# Execution de l'image du front
	```python -m http.server 8000 ```
