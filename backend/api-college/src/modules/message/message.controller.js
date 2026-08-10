const messageModel = require("./message.model");

class MessageController {
  createMessage = async (req, res) => {
    try {
        const {name,email,subject,message} = req.body;
        const newMessage = new messageModel({
            name,
            email,
            subject,
            message
        });
        await newMessage.save();
        res.status(201).json({ message: "Message created successfully" });
    } catch (exception) {
      throw exception;
    }
  };


  getAllMessages = async (req, res) => {
    try {   
    const messages = await messageModel.find();
    res.status(200).json(messages);

    } catch (exception) {
      throw exception;
    }
}
}

const msgcltr = new MessageController();
module.exports = msgcltr;