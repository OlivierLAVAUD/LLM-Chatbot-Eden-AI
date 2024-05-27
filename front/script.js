var nlp_port = "8010"
var chatUrl = `http://localhost:${nlp_port}/chat/`;


var chatbox = document.getElementById('chatbox');
var offsetX, offsetY;
var isDragging = false;

chatbox.addEventListener('mousedown', function(event) {
    isDragging = true;
    offsetX = event.clientX - chatbox.getBoundingClientRect().left;
    offsetY = event.clientY - chatbox.getBoundingClientRect().top;
});

document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        var x = event.clientX - offsetX;
        var y = event.clientY - offsetY;
        chatbox.style.left = x + 'px';
        chatbox.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

function showLoadingIndicator() {
    var messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += '<div class="message bot-message loading-text"><div class="loader"></div> Loading...</div>';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function hideLoadingIndicator() {
    var loadingMessage = document.querySelector('.loading-text');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var message = document.getElementById('messageInput').value;
    document.getElementById('messageInput').value = '';

    showLoadingIndicator(); // Afficher l'indicateur de chargement


    fetch(chatUrl + message, {method: 'POST'}
        // body: JSON.stringify({message: message}),
    )
    .then(response => response.json())
    .then(data => {
        hideLoadingIndicator(); // Cacher l'indicateur de chargement une fois que la réponse est reçue

        var messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML += '<div class="message user-message">You: ' + message + '</div>';
        messagesDiv.innerHTML += '<div class="message bot-message">Chatbot: ' + data.response + ' <button class="playButton">Play</button></div>';
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    })
    .catch((error) => {
        hideLoadingIndicator(); // Cacher l'indicateur de chargement en cas d'erreur

        console.error('Error:', error);
    });
});

// Positionnement initial de la fenêtre de chat en bas à droite
chatbox.style.bottom = '20px';
chatbox.style.right = '20px';

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('playButton')) {
        var messageText = event.target.parentNode.textContent.trim();
        var messageTextBeforePlay = messageText.split('Play')[0].trim(); // Extraire le texte avant "Play"

        // Envoyer une requête POST à l'endpoint /synthesize
        fetch('http://localhost:8222/synthesize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: messageTextBeforePlay}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Speech synthesized successfully:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});

// Fonctionnalité de l'enregistrement vocal (à implémenter)
document.getElementById('recordButton').addEventListener('click', function() {
    // Votre code pour l'enregistrement vocal ici
    console.log('Record button clicked');
});
