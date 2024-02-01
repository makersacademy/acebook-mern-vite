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
        const postId = req.body.postId;
        const userId = req.user_id;

        // Find the post by postId
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Determine if the user has already liked the post
        if (post.likes.includes(userId)) {
            // User already liked the post, so remove the like
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
        } else {
            // User hasn't liked the post, so add the like
            await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });
        }

        res.status(200).json({ message: "Like status updated successfully" });
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