const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

const getPostComments = async (req, res) => {
  const comments = await Comment.find(); //attributed to Post_ID
  const token = generateToken(req.user_id);
  res.status(200).json({ comments: comments, token: token });
};

const createComment = async (req, res) => {
  const comment = new Comment(req.body);
  comment.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Comment created", token: newToken });
};

const CommentController = {
  getPostComments: getPostComments,
  createComment: createComment,
};

module.exports = CommentController;