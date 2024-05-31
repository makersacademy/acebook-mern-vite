const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  // const posts = await Post.find().populate("author", "email");
  const posts = await Post.find().populate({
    path: "author",
    select: "username -_id", // Only fetch the username field and exclude the MongoDB default '_id' field
  });
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const post = new Post({
    message: req.body.message,
    author: req.user_id, // Assuming `user_id` is attached to `req` by authentication middleware
  });
  // const post = new Post({ message: req.body, author: req.user_id });
  post.save();

  // const user = await User.findById(req.user_id, "username -_id");
  // if (!user) {
  //   return res.status(404).json({ message: "User not found" });
  // }

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
