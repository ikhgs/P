const express = require('express');
const bodyParser = require('body-parser');
const handleMessage = require('./handles/handleMessage');
const handlePostback = require('./handles/handlePostback');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Le bot est en cours d\'exécution');
});

// Webhook pour les requêtes Facebook Messenger
app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(async (entry) => {
            const webhookEvent = entry.messaging[0];
            if (webhookEvent.message) {
                await handleMessage(webhookEvent);
            } else if (webhookEvent.postback) {
                await handlePostback(webhookEvent);
            }
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// Route pour la validation du Webhook
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
