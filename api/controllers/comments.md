const Comment = require("../models/comment");
const User = require("../models/user");
const { generateToken } = require("../lib/token");
const getAllComments = async (req, res) => {
  // const posts = await Post.find().populate("author", "email");
  const posts = await Post.find().populate({
    path: "author",
    select: "username -_id", // Only fetch the username field and exclude the MongoDB default '_id' field
  });
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};
const createComment = async (req, res) => {
    console.log(req.body);
  const comment = new Comment({
    message: req.body.message,
    userId: req.user_id, // Assuming `user_id` is attached to `req` by authentication middleware
    postId: req.body.post_id
  });
  // const post = new Post({ message: req.body, author: req.user_id });
  await comment.save();
  const user = await User.findById(req.user_id, "username -_id");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
const newToken = generateToken(req.user_id);
  res.status(201).json({
    message: "Comment created",
    comment: {
      _id: comment._id,
      message: comment.message,
      userId: user._id,
    //   postId: comment.postId
    },
    token: newToken,
    test: "test",
  });
};
const CommentsController = {
  getAllComments: getAllComments,
  createComment: createComment,
};
module.exports = CommentsController;