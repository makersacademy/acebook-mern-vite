const Post = require("../models/post");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const posts = await Post.find();
  posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const token = generateToken(req.user_id, req.username);
  console.log(req.body)
  res.status(200).json({ posts: posts, token: token });
}

async function createPost(req, res) {
  req.body.user = req.username
  const post = new Post(req.body);

  await post.save();

  const newToken = generateToken(req.user_id, req.username);
  res.status(201).json({ message: "Post created", token: newToken });
}

async function deletePostId(req, res) {
  const postId = req.params.post_id
  await Post.findByIdAndDelete(postId);
  

  const newToken = generateToken(req.user_id, req.username);
  res.status(200).json({ message: "Post created", token: newToken });
}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  deletePostId: deletePostId,
};

module.exports = PostsController;
