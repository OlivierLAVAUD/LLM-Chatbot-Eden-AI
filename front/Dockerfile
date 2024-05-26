# Utilisation de l'image Python 3.9
FROM python:3.11-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

COPY . .

# Port front
EXPOSE 8000

# Commande pour démarrer le serveur HTTP
CMD ["python", "-m", "http.server", "8000"]

