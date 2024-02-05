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
    const post = new Post(req.body);
    post.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "OK", token: newToken });
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

// If user ID is not in array
//     try {
//         const alreadyLiked = await Post.likes
//             .findOne({ _id: userID })
//             .then(() => {
//                 console.log(alreadyLiked);
//             });
//     } catch (error) {
//         console.error("Error updating post:", error);
//         res.status(500).json({
//             message: "An error occurred while updating the likes.",
//         });
//         if (!userID) {
//             try {
//                 const updatedpost = await Post.findOneAndUpdate(
//                     { _id: postID },
//                     { $push: { likes: userID } },
//                     { new: true }
//                 );
//                 res.status(200).json({ message: "Post liked" });
//             } catch (error) {
//                 console.error("Error updating post:", error);
//                 res.status(500).json({
//                     message: "An error occurred while updating the likes.",
//                 });
//             }
//         }
//     }
// };

// Else remove id from array

const PostsController = {
    getAllPosts: getAllPosts,
    createPost: createPost,
    likePost: likePost,
};

module.exports = PostsController;
