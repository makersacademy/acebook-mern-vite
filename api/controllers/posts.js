const User = require('../models/user')
const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const mongoose = require('mongoose');

const getAllPosts = async (req, res) => {
    try {
      // Find all posts and populate the 'user' field with user information
      const posts = await Post.find().populate('user').exec();
      const token = generateToken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
      } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfilePosts = async (req, res) => {
  const posts = await Post.find({ owner_id: req.user_id });
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
    try{
    const { message } = req.body;
    const { image } = req.body;
    // console.log(image)
    const owner_id = req.user_id; // Assuming req.user_id holds the ID of the user creating the post
    
    const user = await User.findById(owner_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


    if (message != "" && image != "") {  
      const post = new Post({ message, owner_id, user, image});
      await post.save();
      const newToken = generateToken(req.user_id);
      return res.status(201).json({ message: `Post created for id:${owner_id}`, token: newToken });
    }
    else if (message != "") {  
      const post = new Post({ message, owner_id, user});
      await post.save();
      const newToken = generateToken(req.user_id);
      return res.status(201).json({ message: `Post created for id:${owner_id}`, token: newToken });
    }
    else {
      return res.status(400).json({message: 'No message included'});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const likeDislikePost = async (req, res) => {
  const { _id } = req.body;
  const { action } = req.body;
  
  if (action) {  
    const updatedCount = await Post.findOneAndUpdate(
      { _id: _id }, 
      { $inc: { likes: 1 } }
    )
    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: `A new token is created`, token: newToken });
  }
  else {
    const updatedCount = await Post.findOneAndUpdate(
      { _id: _id }, 
      { $inc: { likes: -1 } }
    )
    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: `A new token is created`, token: newToken });
  }
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getProfilePosts: getProfilePosts,
  likeDislikePost: likeDislikePost
};

module.exports = PostsController;
