const Conversation = require("../models/conversation")
const Message = require("../models/message")
const { generateToken } = require("../lib/token");

async function getMessagesByConversation(req, res) {
  try {
    const token = generateToken(req.user_id); 
    const conversation = await Conversation.findById(req.query.conversationId);
    console.log("api conversation",conversation)
    const messages = await Message.find({conversationId: conversation._id}).populate('senderId')
    console.log("api messages", messages)
    res.status(200).json({ messages: messages, token: token });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user information", error: error.message });
  };
};


const MessagesController = {
  getMessagesByConversation: getMessagesByConversation
};

module.exports = MessagesController;
