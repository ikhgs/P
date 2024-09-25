# My Messenger Bot

Un bot Facebook Messenger qui répond automatiquement aux messages des utilisateurs en utilisant une API externe.

## Installation

1. Clonez le dépôt GitHub.
2. Installez les dépendances avec `npm install`.
3. Ajoutez votre `PAGE_ACCESS_TOKEN` et `VERIFY_TOKEN` dans un fichier `.env`.
4. Démarrez le bot avec `npm start`.

## Structure du projet

- `commands/chat.js`: Gère la réponse automatique via une API.
- `handles/handleMessage.js`: Gère les messages entrants de Messenger.
- `handles/handlePostback.js`: Gère les postbacks des boutons Messenger.
- `handles/sendMessage.js`: Envoie des messages via l'API Messenger.
- `index.js`: Le fichier principal qui initialise le serveur Express.
- 
