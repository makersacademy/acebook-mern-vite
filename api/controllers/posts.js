// api/controllers/posts.js

const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const post = new Post(req.body);
  post.save();
  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};


const addLikesToPostByPostIdUserId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user_id;

    // Find the post by postId
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "User already liked the post" });
    }

    // Add the userId to the list of likes
    post.likes.push(userId);

    // Save the updated post
    await post.save();

    const token = generateToken(userId);

    res.status(200).json({ message: "Like added successfully", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  addLikesToPostByPostIdUserId: addLikesToPostByPostIdUserId,
};

module.exports = PostsController;
