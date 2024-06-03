// const Comment = require("../models/comment");
// const { generateToken } = require("../lib/token");

// const getPostComments = async (req, res) => {
//   const postId = req.params.post._id;
//   const comments = await Comment.find({ postID : postId }); //attributed to Post_ID ${post_ID}?
//   const token = generateToken(req.user_id);
//   res.status(200).json({ comments: comments, token: token });
// };

// const createComment = async (req, res) => {
//   const postId = req.params.post._id;
//   const comment = new Comment({
//     userName: req.body.userName,
//     message: req.body.message,
//     postID: post._id});
//   await comment.save();

//   const newToken = generateToken(req.user_id);
//   res.status(201).json({ message: "Comment created", token: newToken });
// };

// const CommentController = {
//   getPostComments: getPostComments,
//   createComment: createComment,
// };

// module.exports = CommentController;