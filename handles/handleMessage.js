const chatCommand = require('../commands/chat');
const { sendMessage } = require('./sendMessage');

module.exports = async function handleMessage(event) {
    const senderId = event.sender.id;
    const message = event.message.text;

    if (message) {
        try {
            const reply = await chatCommand.execute({ text: message });
            await sendMessage(senderId, reply);
        } catch (error) {
            console.error('Erreur lors de la gestion du message:', error);
        }
    }
};
