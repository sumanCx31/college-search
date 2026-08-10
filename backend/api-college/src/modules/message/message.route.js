const msgcltr = require('./message.controller');
const messageRouter = require('express').Router();

messageRouter.post('/',msgcltr.createMessage);
messageRouter.get('/',msgcltr.getAllMessages);
module.exports = messageRouter;