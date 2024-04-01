const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  try {
    // Fetch the user ID from the request
    const userId = req.user_id;

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    // Create a new post object
    const post = new Post({
      ...req.body,
      user: userId, // Associate the post with the user ID
    });

    // Save the post
    await post.save();


    // Send the response
    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Post created successfully", token: newToken, post: savedPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
