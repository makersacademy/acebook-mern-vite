// api/controllers/likes.js

const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllLikesByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the post by postId
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Return the number of likes
        const numberOfLikes = post.likes.length;
        res.status(200).json({ numberOfLikes: numberOfLikes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const addLikesToPostByPostIdUserId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user_id;

        // Find the post by postId
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: "User already liked the post" });
        }

        // Add the userId to the list of likes
        post.likes.push(userId);

        // Save the updated post
        await post.save();

        const token = generateToken(userId);

        res.status(200).json({ message: "Like added successfully", token: token });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const LikesController = {
    getAllLikesByPostId: getAllLikesByPostId,
    addLikesToPostByPostIdUserId: addLikesToPostByPostIdUserId,
};

module.exports = LikesController;