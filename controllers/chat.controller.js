const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { twiml } = require('twilio');
const {intent_classifier} =  require('../ML_models/intent_recognition')



const whatsappBot = async (req, res) => {
  try {
    const twiml = new MessagingResponse();
    const PhoneNumber = req.body.From;
    
    const incomingMessage = req.body.Body.toLowerCase();
    const intent = intent_classifier.classify(incomingMessage);
    if(intent === "misc") {
      const reply =  `
Hello, I am Doctor Pal! Your *virtual Doctor*.
I help people to find best Doctor's & hospitals nearby them using my DISEASE_PREDICTION & INTENT_RECOGNITION models. Right now, I'm under development phase so it's better not to take my word seriously (It's all random info buddy)!

I am developed by ARCICK GROUP, a team of young developers who want to make our futures brighter. ;-)
            `;
      twiml.message(reply);

    } else if(intent === "appointment"){
      if(incomingMessage.includes('menu')) {
        // return doctors nearby
      }

  
    } else if(intent === "quick listing"){
  
    } else {
      try {
        const addr = incomingMessage.split(',');
        if(addr[0] === "lat" && addr[2] === "long"){

        }
      } catch(err){
        console.log("NO ADDR");
      }
      const reply =  `
  I didn\'t understand your message. Please ask something else.
      `;
      twiml.message(reply);

    }
  
  
  
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } catch (error) {
    console.error('Error handling WhatsApp message:', error);
    res.status(500).send('Internal Server Error');
  }

}

module.exports = {whatsappBot}