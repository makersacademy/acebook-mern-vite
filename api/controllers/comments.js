const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

const getPostComments = async (req, res) => {
  try {
    const postId = req.params.postId; // Assuming postId is passed as a route parameter
    const comments = await Comment.find({ postId }).populate('userId', 'firstName lastName');
    const token = generateToken(req.userId);
    res.status(200).json({ comments, token });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const comment = new Comment({
      commentMessage: req.body.commentMessage,
      createdAt: req.body.createdAt,
      postId: req.body.postId,
      userId: req.body.userId,
    });
    await comment.save();

    const commentCreated = await Comment.findById(comment._id).populate('userId', 'firstName lastName');

    const newToken = generateToken(req.userId);

    res.status(201).json({ 
      commentMessage: commentCreated.commentMessage,
      createdAt: commentCreated.createdAt,
      postId: commentCreated.postId,
      userId: commentCreated.userId,
      _id: commentCreated._id,
      token: newToken
    });
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ error: 'Failed to save comment' });
  }
};

const CommentController = {
  getPostComments,
  createComment,
};

module.exports = CommentController;
