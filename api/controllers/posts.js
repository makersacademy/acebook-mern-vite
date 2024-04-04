const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  
  const sorted_posts = await posts.sort((a,b) => {
    return new Date(a.createdDate).getTime() -
    new Date(b.createdDate).getTime()
  }).reverse();
  console.log(posts)
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: sorted_posts, token: token });
};
// modified original create post function to include message input from user, create a new Post and save it to the database
const createPost = async (req, res) => {
  const message = req.body.message
  const user = req.user_id
  const post = new Post({message, user});
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
};

const getUserPosts = async (req, res) => {
  const posts = await Post.find({user: req.user_id});
  const sorted_posts = await posts.sort((a,b) => {
    return new Date(a.createdDate).getTime() -
    new Date(b.createdDate).getTime()
  }).reverse();
  console.log(posts)
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: sorted_posts, token: token });
};


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getUserPosts: getUserPosts
};



module.exports = PostsController;
