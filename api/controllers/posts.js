const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require('../models/user');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getComments = async (req, res) => {
  const parent = req.params.parent_id;
  const posts = await Post.find({ parent: parent });
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const updateLikes = async (req, res) => {
  const id = req.body.id;
  const user_id = req.body.user;
  const user_liked = req.body.liked;
  console.log(req.body.user);
  if (user_liked) {
    await Post.findByIdAndUpdate(id, { $push: { like_array: user_id }});
    res.status(200).json({ message: "Added Like" });
  } else {
    await Post.findByIdAndUpdate(id, { $pull: { like_array: user_id }});
    res.status(200).json({ message: "Removed Like" });
  }
};

const createPost = async (req, res) => {
  const user_id = req.user_id;
  const user = await User.findById(user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const post = new Post({
    ...req.body,
    user: user._id,
    email: user.email  
  });
  await post.save();
  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", email: user.email, token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updateLikes: updateLikes,
  getComments: getComments
};

module.exports = PostsController;
