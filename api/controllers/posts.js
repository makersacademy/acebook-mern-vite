const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");

async function getAllPosts(req, res) {
  const posts = await Post.find().populate('user', 'username');
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
}

async function getPostByUser(req, res) {
  const user = await User.findOne().populate('post', 'username', 'user_id')
  const token = generateToken(req.user_id);
  res.status(200).json({ user: user, token: token})
  
}


async function createPost(req, res) {
  const post = new Post(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getPostByUser: getPostByUser,
};

module.exports = PostsController;
