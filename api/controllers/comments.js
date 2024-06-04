const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

const getPostComments = async (req, res) => {
  const postId = req.params.post.postId;
  const comments = await Comment.find({ postID : postId });
  const token = generateToken(req.user_id);
  res.status(200).json({ comments: comments, token: token });
};

const createComment = async (req, res) => {
  try {
    const postId = req.params.postId; // Ensure postId is extracted correctly
    const comment = new Comment({
      userName: req.body.userName,
      message: req.body.message,
      postID: postId // Correct usage of postId
    });
    await comment.save();
    res.status(201).json({ message: 'Comment created' });
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ error: 'Failed to save comment' });
  }
};

const CommentController = {
  getPostComments: getPostComments,
  createComment: createComment,
};

module.exports = CommentController;