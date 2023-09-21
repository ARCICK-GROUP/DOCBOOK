const { Router } = require('express');
const {whatsappBot} = require('../../controllers/chat.controller')


const transfermsg = Router();
transfermsg.post('/webhook', whatsappBot)


module.exports = transfermsg;