const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");
const { tokenChecker } = require('../middleware/tokenChecker')

async function getAllPosts(req, res) {
    try {
      const token = generateToken(req.user_id); 
      let query = {}; 
      if (req.query.user) {
        const user = await User.findById(req.query.user);
        // If the user is found, add the user filter to the query
        if (user) {
          query.user = user._id;
        }
      }
      // Find posts (filtered by user if applicable, or all posts if no user or user not found)
      const posts = await Post.find(query).populate('user', 'username');
      res.status(200).json({ posts: posts, token: token });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
  }

async function createPost(req, res) {
  const postObject = req.body
  postObject.user = req.user_id
  const post = new Post(postObject);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
