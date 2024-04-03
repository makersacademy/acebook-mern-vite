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

const likeComment = async (req, res) => {

try {
  // Fetch the user ID from the request
  const userId = req.user_id;

  // Check if the user ID is provided
  if (!userId) {
    return res.status(400).json({ message: "User ID not provided" });
  }

  const commentId = req.body.commentId;

  // Check if postId is provided
  if (!commentId) {
    return res.status(400).json({ message: "comment ID not provided" });
  }

  // Find the post by postId
  const comment = await Comment.findById(commentId);

  // Check if the post exists
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }

  // Check if userId is already in likedBy array
  const userIndex = comment.likedBy.indexOf(userId);
  if (userIndex !== -1) {
    // If user is already in likedBy array, remove them
    comment.likedBy.splice(userIndex, 1);
  } else {
    // If userId is not in likedBy array, add it
    comment.likedBy.push(userId);
  }

  // Save the updated post
  await comment.save();

  console.log(comment.likedBy);

  // Return success response
  res.status(200).json({ message: "comment liked/unliked successfully" });
} catch (error) {
  console.error("Error liking comment:", error);
  res.status(500).json({ message: "Internal server error" });
}
};



const CommentsController = {
  getAllComments: getAllComments,
  createComment: createComment,
  likeComment: likeComment,
};



module.exports = CommentsController;
