const Conversation = require("../models/conversation")
const Message = require("../models/message")
const { generateToken } = require("../lib/token");

async function getUserConversations(req, res) {
  const conversations = await Conversation.find().populate('participants').populate('lastMessage');
  const token = generateToken(req.user_id);
  res.status(200).json({ conversations: conversations, token: token });
}

const ConversationsController = {
getUserConversations: getUserConversations
};

module.exports = ConversationsController;
