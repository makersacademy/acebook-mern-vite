const Comment = require("../models/comments");
const { generateToken } = require("../lib/token");
const { get } = require("mongoose");

async function getAllComments(req, res) {
  const comments = await Comment.find();
  // console.log(`POSTS req.user_id ${req.user_id}`)
  const token = generateToken(req.user_id);
  res.status(200).json({ comments: comments, token: token });
}

async function createComment(req, res) {
  const post = new Comment(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "comment created", token: newToken });
}

const CommentsController = {
  createComment: createComment,
  getAllComments: getAllComments
};

module.exports = CommentsController;
