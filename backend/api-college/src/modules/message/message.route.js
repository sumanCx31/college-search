const msgcltr = require('./message.controller');
const messageRouter = require('express').Router();

messageRouter.post('/',msgcltr.createMessage);
messageRouter.get('/',msgcltr.getAllMessages);
messageRouter.delete('/:id',msgcltr.deleteMessage);
module.exports = messageRouter;