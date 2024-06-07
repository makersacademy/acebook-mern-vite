const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

const getPostComments = async (req, res) => {
  try {
    const postId = req.params.postId; // Assuming postId is passed as a route parameter
    const comments = await Comment.find({ postId }).populate('userId', 'firstName lastName');
    const token = generateToken(req.user_id);
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
      userId: req.user_id,
      numOfLikes: req.body.numOfLikes
    });
    await comment.save();

    const commentCreated = await Comment.findById(comment._id).populate('userId', 'firstName lastName');
    

    const newToken = generateToken(req.user_id);

    res.status(201).json({ 
      commentMessage: commentCreated.commentMessage,
      createdAt: commentCreated.createdAt,
      numOfLikes: commentCreated.numOfLikes,
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

const likeComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    
    comment.numOfLikes += 1;

    comment.likedBy.push(req.user_id);

    console.log('like : line 58', req.user_id);
    await comment.save();

    comment = await Comment.populate(comment, { path: 'userId', select: 'firstName lastName profilePicture' });
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({ message: error.message });
  }
};

const unlikeComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.numOfLikes = Math.max(comment.numOfLikes - 1, 0);
    console.log('unlike line 79' ,req.user_id);

    comment.likedBy = comment.likedBy.filter(id => id.toString() !== req.user_id);
  
    await comment.save();

    comment = await Comment.populate(comment, { path: 'userId', select: 'firstName lastName profilePicture' });
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error unliking comment:", error);
    res.status(500).json({ message: error.message });
  }
};



const CommentController = {
  getPostComments,
  createComment,
  likeComment,
  unlikeComment
};

module.exports = CommentController;
