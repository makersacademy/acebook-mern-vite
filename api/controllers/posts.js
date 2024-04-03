const Post = require("../models/post");
const User = require("../models/user");
const Like = require("../models/like");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("user").sort({ createdAt: -1 });
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  try {
    // Fetch the user ID from the request
    const userId = req.user_id;

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    // Create a new post object
    const post = new Post({
      ...req.body,
      user: userId, // Associate the post with the user ID
    });

    // Save the post
    await post.save();

    // Send the response
    const newToken = generateToken(req.user_id);
    res
      .status(201)
      .json({ message: "Post created successfully", token: newToken });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const likePost = async (req, res) => {
console.log("liked request reaching backend")
try {
  // Fetch the user ID from the request
  const userId = req.user_id;

  // Check if the user ID is provided
  if (!userId) {
    return res.status(400).json({ message: "User ID not provided" });
  }

  const postId = req.body.postId;

  // Check if postId is provided
  if (!postId) {
    return res.status(400).json({ message: "Post ID not provided" });
  }

  // Find the post by postId
  const post = await Post.findById(postId);

  // Check if the post exists
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Check if userId is already in likedBy array
  const userIndex = post.likedBy.indexOf(userId);
  if (userIndex !== -1) {
    // If user is already in likedBy array, remove them
    post.likedBy.splice(userIndex, 1);
  } else {
    // If userId is not in likedBy array, add it
    post.likedBy.push(userId);
  }

  // Save the updated post
  await post.save();

  console.log(post.likedBy);

  // Return success response
  res.status(200).json({ message: "Post liked/unliked successfully" });
} catch (error) {
  console.error("Error liking post:", error);
  res.status(500).json({ message: "Internal server error" });
}
};

  // try {
//     const { postId, userId } = req.body;

//     // Check if the user has already liked the post
//     const existingLike = await Like.findOne({ post: postId, user: userId });

//     if (existingLike) {
//       // User has already liked the post, so remove the like
//       await existingLike.remove();
//     } else {
//       // User has not liked the post yet, so create a new like
//       const newLike = new Like({ post: postId, user: userId });
//       await newLike.save();
//     }

//     // Update the like counter in the corresponding post
//     const likeCount = await Like.countDocuments({ post: postId });
//     await Post.findByIdAndUpdate(postId, { $set: { likeCounter: likeCount } });

//     // Return success response
//     res.status(200).json({ message: "Post liked/unliked successfully" });
//   } catch (error) {
//     console.error("Error liking post:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
  


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  likePost: likePost
};

module.exports = PostsController;
