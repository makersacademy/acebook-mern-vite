const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
    const { message } = req.body;
    const owner_id = req.user_id; // Assuming req.user_id holds the ID of the user creating the post
  
    const post = new Post({ message, owner_id });
    await post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: `Post created for id:${owner_id}`, token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
