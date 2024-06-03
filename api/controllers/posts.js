const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const getComments = async (req, res) => {
  const parent = req.params.parent_id
  const posts = await Post.find({parent: parent});
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const updateLikes = async (req, res) => {
  const id = req.body.id;
  const user_id = req.body.user;
  const user_liked = req.body.liked;
  if (user_liked) {
    await Post.findByIdAndUpdate(id, { $push: { like_array: user_id }});
    res.status(200).json({ message: "Added Like" });
  } else {
    await Post.findByIdAndUpdate(id, { $pull: { like_array: user_id }});
    res.status(200).json({ message: "Removed Like" });
  }
};

const createPost = async (req, res) => {
  const post = new Post(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updateLikes: updateLikes,
  getComments: getComments
};

module.exports = PostsController;
