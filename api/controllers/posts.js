const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");

async function getAllPosts(req, res) {
  const posts = await Post.find();
  const filteredPosts = posts.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: filteredPosts, token: token });
}

async function createPost(req, res) {
  console.log(req.body);
  const post = new Post(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;



// const mongoose = require("mongoose");
// const Post = require("../models/post");
// const { generateToken, decodeToken } = require("../lib/token");

// async function getAllPosts(req, res) {
//   const posts = await Post.find({ userId: req.user_id });
//   const token = generateToken(req.user_id);
//   // console.log(req.user_id)
//   res.status(200).json({ posts: posts, token: token });
// }

// async function createPost(req, res) {
//   // console.log(req);
//   // console.log(decodeToken(req))
//   const newPostData = {
//     message: req.body.message,
//     userId: new mongoose.Types.ObjectId(req.user_id)
//   }
//   const post = new Post(newPostData);
//   post.save();

//   const newToken = generateToken(req.user_id);
//   console.log(newToken);
//   console.log(decodeToken(newToken));
//   res.status(201).json({ message: "Post created", token: newToken });
// }

// const PostsController = {
//   getAllPosts: getAllPosts,
//   createPost: createPost,
// };

// module.exports = PostsController;