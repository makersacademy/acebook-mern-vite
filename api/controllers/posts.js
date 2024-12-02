const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");
const mongoose = require('mongoose');

async function getAllPosts(req, res) {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
}

async function createPost(req, res) {
  // console.log(req.body);
  const post = new Post(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

// NEW:
async function likePost(req, res) {
  // console.log(req);
  try {
    const postId = req.body.post_id;
    // We need to call likePost with the postId
    const user_id = req.user_id;
    // include user's id (from token)
    // console.log('Test post id'+);

    // console.log('my regular Post ID is '+ postId)
    postObjectId = new mongoose.Types.ObjectId(postId)
    // console.log('my Object Post ID is '+ postObjectId)
    const post = await Post.findById(postObjectId);

    // console.log('This is my post: '+post);
    if (!post) {
      // console.log('Not post');
      return res.status(404).json({message: "Post not found"});
    }
    // console.log('if statement passes successfully');
    const hasLiked = post.likes.includes(user_id);
    // console.log(hasLiked);

    
    if (hasLiked) {
      post.likes = post.likes.filter(id => id.toString() !== user_id);
      post.likeCount -= 1;
    } else {
      post.likes.push(user_id);
      post.likeCount += 1;
    }
    
    await post.save();

    const newToken = generateToken(user_id);
    res.status(200).json({
      message: hasLiked ? "Post Unliked" : "Post Liked",
      likeCount: post.likeCount,
      token: newToken
    });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error: error.message});
  }
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  likePost: likePost,
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