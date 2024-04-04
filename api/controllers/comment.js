const Comment = require('../models/comment');
const { generateToken } = require("../lib/token");

const createComment = async (req, res) => {
    const { postId } = req.params;
    const { message } = req.body;
    const owner_id = req.user_id; 

    try {
        // Check if the message is provided
        if (!message) {
            return res.status(400).json({ message: 'No comment message included' });
        }
        // Create a new comment instance
        const comment = new Comment({ postId, message, owner_id });
        await comment.save(); // Save the comment to the database
        const newToken = generateToken(req.user_id);        // Send a success response with the created comment
        res.status(201).json({ message: comment, token: newToken});
    } catch (error) {
        // Handle errors
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
const getAllComments = async (req, res) => {
  const { postId } = req.params;  
  try {
      const comments = await Comment.find({postId: postId}).populate('user').exec();
      const token = generateToken(req.user_id);
      res.status(200).json({ comments: comments, token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
module.exports = { createComment, getAllComments };
