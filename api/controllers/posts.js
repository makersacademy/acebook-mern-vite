const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
    const posts = await Post.find()
        .populate({
            path: "comments",
            populate: { path: "user" },
        })
        .populate("postedBy");
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
    const postMessage = req.body.postMessage;
    let filename;

    if (req.file) {
        filename = req.file.filename;
    }
    const userId = req.body.userId;

    try {
        const post = new Post({
            message: postMessage,
            media: filename ? filename : null,
            postedBy: userId,
        });

        await post.save();
        res.status(200).json({ message: "create post successful" });
    } catch (error) {
        res.status(500).json({
            message: "create post error",
            error: error.message,
        });
    }
};

const postComment = async (req, res) => {
    const commentText = req.body.commentText;
    const userId = req.body.userId;
    const postId = req.params.postId;
    // console.log("back-end userid", userId)

    try {
        const post = await Post.findOneAndUpdate(
            { _id: postId },
            {
                $push: {
                    comments: {
                        message: commentText,
                        user: userId,
                    },
                },
            },
            { new: true }
        );
        res.status(200).json({ message: "post comment successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const likePost = async (req, res) => {
    const postID = req.body.postID;
    const userID = req.user_id;

    const alreadyLiked = await Post.findOne({
        _id: postID,
        likes: userID,
    });

    if (alreadyLiked) {
        // User has already liked the post, remove the like
        try {
            const updatedPost = await Post.findOneAndUpdate(
                { _id: postID },
                { $pull: { likes: userID } },
                { new: true }
            );
            res.status(200).json({ message: "Post unliked" });
        } catch (error) {
            console.error("Error updating post:", error);
            res.status(500).json({
                message: "An error occurred while updating the likes.",
            });
        }
    } else {
        // User has not liked the post, add the like
        try {
            const updatedPost = await Post.findOneAndUpdate(
                { _id: postID },
                { $push: { likes: userID } },
                { new: true }
            );
            res.status(200).json({ message: "Post liked" });
        } catch (error) {
            console.error("Error updating post:", error);
            res.status(500).json({
                message: "An error occurred while updating the likes.",
            });
        }
    }
};

const deletePost = async (req, res) => {
    const postID = req.body.postID;
    const userID = req.user_id;
    try {
        const post = await Post.findOne({ _id: postID, postedBy: userID });
        if (!post) {
            return res
                .status(404)
                .json({ message: "You are not this post's owner" });
        }
        await Post.deleteOne({ _id: postID });
        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
};

const editPost = "SOMETHING";

const PostsController = {
    getAllPosts: getAllPosts,
    createPost: createPost,
    likePost: likePost,
    postComment: postComment,
    deletePost: deletePost,
};

module.exports = PostsController;
