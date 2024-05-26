# Utilisation de l'image Python 3.9
FROM python:3.11-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# Port web chatbot
EXPOSE 8010

# Commande pour démarrer le serveur HTTP
CMD ["python", "main.py"]