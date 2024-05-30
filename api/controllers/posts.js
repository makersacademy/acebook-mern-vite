const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const updateLikes = async (req, res) => {
  const id = req.body.id;
  const like_val = req.body.num;
  await Post.findByIdAndUpdate(id, { $inc: { likes: like_val }});
  res.status(200).json({ message: "Post created" });
}

const createPost = async (req, res) => {
  const post = new Post(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updateLikes: updateLikes
};

module.exports = PostsController;
