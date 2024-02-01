// api/controllers/posts.js

const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          message: 1,
          full_name: "$userDetails.full_name",
          profile_pic: "$userDetails.profile_pic",
        },
      },
    ]);
    const token = generateToken(req.user_id);
    res.status(200).json({ posts, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createPost = async (req, res) => {
  console.log(req.body.message, req.body.user_id, req.file.filename);
  let image = "";
  if (req.file) {
    image = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename
  }
  const post = new Post(req.body, req.body.user_id, image);
  post.save();
  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "OK", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
