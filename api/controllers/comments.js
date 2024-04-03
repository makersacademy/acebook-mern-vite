const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

const getAllComments = async (req, res) => {
  const { postId } = req.query;
  const comments = await Comment.find({ post: postId })
    .populate("user")
    .sort({ createdAt: -1 });
  const token = generateToken(req.user_id);
  res.status(200).json({ comments: comments, token: token });
};

const createComment = async (req, res) => {
  const { postId } = req.body;
  const comment = new Comment({
    ...req.body,
    post: postId,
    user: req.user_id,
  });
  await comment.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Comment created", token: newToken });
};

const CommentsController = {
  getAllComments: getAllComments,
  createComment: createComment,
};

module.exports = CommentsController;
