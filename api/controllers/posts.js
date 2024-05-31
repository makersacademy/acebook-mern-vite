const Post = require("../models/post");

const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {

  const message = req.body.message
  // const date = new Date()
  // const numOfLikes = req.body.numOfLikes
  //const user = req.body.user._id ///////////////
  
  
  // const post = new Post({message,date,numOfLikes,user});
  const post = new Post({message});
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: message, token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;



// const createPost = async (req, res) => {
//   const user_id = req.body.user._id
//   const user  = await User.findOne({_id: user_id})

//   try {
//     const post = new Post({
//       message: req.body.message,
//       date: Date.now(),
//       users: {id:user._id}  // Assuming user ID is sent in the request body
//     });
//     await post.save();
//     res.status(201).json(post);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };