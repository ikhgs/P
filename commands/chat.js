const fetch = require('node-fetch');  // Assurez-vous que node-fetch est installé

module.exports = {
    name: 'chat',
    description: 'Répond automatiquement aux messages en utilisant une API externe',
    async execute(message) {
        // Vérifier si le message contient une image
        let responseMessage;
        if (message.attachments && message.attachments.length > 0) {
            // Récupérer l'URL de la première image jointe
            const imageUrl = message.attachments[0].url;
            // Préparer le prompt basé sur l'image
            const prompt = encodeURIComponent(`Analyser l'image suivante : ${imageUrl}`);

            try {
                // Appel à l'API avec le prompt basé sur l'image
                const response = await fetch(`https://gemini-ap-espa-bruno.onrender.com/api/gemini`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt, link: imageUrl })  // Envoyer l'image à l'API
                });
                const data = await response.json();

                if (data && data.message) {
                    responseMessage = data.message;  // Réponse de l'API basée sur l'image
                } else {
                    responseMessage = "Désolé, je ne peux pas répondre pour le moment.";
                }
            } catch (error) {
                console.error('Erreur API:', error);
                responseMessage = "Erreur lors de la communication avec l'API.";
            }
        } else {
            // Si le message ne contient pas d'image, traiter le texte
            const prompt = encodeURIComponent(message.text); // Encoder le message utilisateur

            try {
                // Appel à l'API avec le message utilisateur
                const response = await fetch(`https://gemini-ap-espa-bruno.onrender.com/api/gemini`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })  // Envoyer le texte à l'API
                });
                const data = await response.json();

                if (data && data.message) {
                    responseMessage = data.message;  // Renvoie la réponse de l'API
                } else {
                    responseMessage = "Désolé, je ne peux pas répondre pour le moment.";
                }
            } catch (error) {
                console.error('Erreur API:', error);
                responseMessage = "Erreur lors de la communication avec l'API.";
            }
        }

        return responseMessage;  // Renvoie la réponse finale
    }
};
                    
