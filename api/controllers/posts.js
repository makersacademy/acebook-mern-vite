const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('image');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user_id', 'firstName lastName profilePicture');
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    try {
      const user = await User.findById(req.user_id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const message = req.body.message;
      const date = req.body.date;
      const numOfLikes = req.body.numOfLikes;
      const user_id = req.user_id;
      const image = req.file ? `/uploads/${req.file.filename}` : '';

      const post = new Post({ message, date, numOfLikes, user_id, image });
      await post.save();

      const postCreated = await Post.findById(post._id).populate('user_id', 'firstName lastName profilePicture');

      const newToken = generateToken(req.user_id);
      res.status(201).json({
        message: postCreated.message,
        date: postCreated.date,
        numOfLikes: postCreated.numOfLikes,
        user_id: postCreated.user_id,
        image: postCreated.image,
        _id: postCreated._id,
        token: newToken
      });

    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: error.message });
    }
  });
};

const likePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.numOfLikes += 1;
    post.likedBy.push(req.user_id);
    await post.save();

    post = await Post.populate(post, { path: 'user_id', select: 'firstName lastName profilePicture' });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: error.message });
  }
};

const unlikePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.numOfLikes = Math.max(post.numOfLikes - 1, 0);
    post.likedBy = post.likedBy.filter(id => id.toString() !== req.user_id.toString());
    await post.save();

    post = await Post.populate(post, { path: 'user_id', select: 'firstName lastName profilePicture' });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ message: error.message });
  }
};

const PostsController = {
  getAllPosts,
  createPost,
  likePost,
  unlikePost,
};

module.exports = PostsController;
