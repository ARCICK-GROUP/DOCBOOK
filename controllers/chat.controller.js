const MessagingResponse = require('twilio').twiml.MessagingResponse;

function getReplyForMessage(message) {
    if (message.includes('hello')) {
      return 'Hello! This is your WhatsApp chatbot.';
    } else if (message.includes('help')) {
      return 'I can assist you with basic information. Just ask!';
    } else {
      return 'I didn\'t understand your message. Please ask something else.';
    }
  }

const whatsappBot = async (req, res) => {
  try {
    const twiml = new MessagingResponse();
    const incomingMessage = req.body.Body.toLowerCase();
    const replyMessage = getReplyForMessage(incomingMessage);
  
    twiml.message(replyMessage);
  
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } catch (error) {
    console.error('Error handling WhatsApp message:', error);
    res.status(500).send('Internal Server Error');
  }

}

module.exports = {whatsappBot}