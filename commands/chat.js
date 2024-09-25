const fetch = require('node-fetch');  // Assurez-vous que node-fetch est installé

module.exports = {
    name: 'chat',
    description: 'Répond automatiquement aux messages en utilisant une API externe',
    async execute(message) {
        const prompt = encodeURIComponent(message.text); // Encoder le message utilisateur

        try {
            // Appel à l'API avec le message utilisateur
            const response = await fetch(`https://nash-rest-api-production.up.railway.app/nashbot?prompt=${prompt}`);
            const data = await response.json();

            if (data && data.response) {
                return data.response;  // Renvoie la réponse de l'API
            } else {
                return "Désolé, je ne peux pas répondre pour le moment.";
            }
        } catch (error) {
            console.error('Erreur API:', error);
            return "Erreur lors de la communication avec l'API.";
        }
    }
};
