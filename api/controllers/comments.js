const Comment = require("../models/comments");
const { generateToken } = require("../lib/token");

async function createComment(req, res) {
  const post = new Comment(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "comment created", token: newToken });
}

const CommentsController = {
  createComment: createComment,
};

module.exports = CommentsController;
