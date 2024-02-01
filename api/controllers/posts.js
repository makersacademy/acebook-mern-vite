const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const cloudinary = require('cloudinary').v2;

const getAllPosts = async (req, res) => {
  try {
    // Populate 'createdBy' with user details, specifically 'username'
    const posts = await Post.find().populate("createdBy", "username");
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    // Ensure 'message' field is present
    if (!req.body.message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Check if an image file was uploaded in the incoming request using Multier
    let imageUrl = null;
    if (req.body.imageUrl) {
      console.log(req.file);
      // If image added, save the image URL 
      imageUrl= req.body.imageUrl;
      // imageUrl = req.file.secure_url;
    }

    const newPost = new Post({
      message: req.body.message || '',
      image: imageUrl,
      createdBy: req.user_id,
    });
    await newPost.save();

    // Generate a new token
    const newToken = generateToken(req.user_id);
    res.status(201).json({ post: newPost, token: newToken }); // Return the post object
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
