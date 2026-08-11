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

deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await messageModel.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (exception) {
      throw exception;
    }
}
}

const msgcltr = new MessageController();
module.exports = msgcltr;