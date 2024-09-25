const { sendMessage } = require('./sendMessage');

module.exports = async function handlePostback(event) {
    const senderId = event.sender.id;
    const payload = event.postback.payload;

    // Exemple de traitement de postback
    await sendMessage(senderId, `Postback reçu avec le payload : ${payload}`);
};
