const Post = require("../models/post");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const posts = await Post.find();
  // console.log(`POSTS req.user_id ${req.user_id}`)
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
}

async function createPost(req, res) {
  const post = new Post(req.body);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

// async function createComment(req, res) {
//   const comment = new Comment(req.body);
//   comment.save();

//   const newToken = generateToken(req.user_id);
//   res.status(201).json({ message: "comment created", token: newToken });
// }

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
