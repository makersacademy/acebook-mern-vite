const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const { getAllComments, createComment } = require("./comment");



const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfilePosts = async (req, res) => {
  const posts = await Post.find({ owner_id: req.user_id });
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
    const { message } = req.body;
    const { image } = req.body;
    console.log(image)
    const owner_id = req.user_id; // Assuming req.user_id holds the ID of the user creating the post
    if (message != "" && image != "") {  
      const post = new Post({ message, owner_id, image });
      await post.save();
      const newToken = generateToken(req.user_id);
      res.status(201).json({ message: `Post created for id:${owner_id}`, token: newToken });
    }
    else if (message != "") {  
      const post = new Post({ message, owner_id });
      await post.save();
      const newToken = generateToken(req.user_id);
      res.status(201).json({ message: `Post created for id:${owner_id}`, token: newToken });
    }
    else {
      res.status(400).json({message: 'No message included'});
    }

    const post = new Post({ message, owner_id });
    await post.save();
    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: `Post created for id:${owner_id}`, token: newToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,

  getProfilePosts: getProfilePosts
};

module.exports = PostsController;
