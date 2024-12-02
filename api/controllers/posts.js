const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");
const mongoose = require("mongoose");


async function getAllPosts(req, res) {
  const posts = await Post.find();
  console.log("posts:", posts)


  const postsWithUserDetails = await Promise.all( 
    posts.map(async (post) => {
    user_id = post.user_id;
    user_data = await User.find({ _id: user_id });
    post.firstName = user_data[0].firstName;
    const enrichedPost = {
      ...post._doc,
      firstName: user_data[0].firstName,
      lastName: user_data[0].lastName
    };
    return enrichedPost;
  })
);
  const filteredPosts = postsWithUserDetails.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: filteredPosts, token: token });
}

async function createPost(req, res) {
  const newPostData = {
    message: req.body.message,
    user_id: new mongoose.Types.ObjectId(req.user_id)
  }
  const post = new Post(newPostData);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;




//CODE FOR GETTING OWN POST
// async function getAllPosts(req, res) {
//   const posts = await Post.find({ userId: req.user_id });
//   const token = generateToken(req.user_id);
//   // console.log(req.user_id)
//   res.status(200).json({ posts: posts, token: token });
// }
