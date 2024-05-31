const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const message  = req.body.message;
  const userId = req.user_id;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = new Post({
      user: userId,
      message: message,
      forename: user.forename,
      surname: user.surname,
      username: user.username
    });
    await post.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Post created", token: newToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  // likePost: likePost,
  // unlikePost: unlikePost,
};

module.exports = PostsController;
