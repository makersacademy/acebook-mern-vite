const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user_id', 'firstName lastName');
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const message = req.body.message;
    const date = req.body.date;
    const numOfLikes = req.body.numOfLikes;
    const user_id = req.user_id;

    console.log(`User ID: ${user_id}, User Name: ${user.firstName} ${user.lastName}`);

    const post = new Post({ message, date, numOfLikes, user_id });
    await post.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({
      message: message,
      date: date,
      numOfLikes: numOfLikes,
      user_id: user_id,
      firstName: user.firstName,
      lastName: user.lastName,
      token: newToken
    });

    console.log(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const PostsController = {
  getAllPosts,
  createPost,
};

module.exports = PostsController;
