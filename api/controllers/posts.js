const Post = require("../models/post");

const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  //const user = await User.findById(req.user._id)

    const message = req.body.message
    const date = req.body.date
    const numOfLikes = req.body.numOfLikes
    const user_id = req.user_id//////////////////////////////
console.log(user_id);/////////
    
    const post = new Post({message, date, numOfLikes, user_id});///////////////////////
    post.save();
    const newToken = generateToken(req.user_id);
    res.status(201).json(
      { 
        message: message, 
        date: date, 
        numOfLikes: numOfLikes, 
        user_id: user_id, ////////////////////////////////////////
        token: newToken 
      }
    );
    console.log(post)
  }



const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;