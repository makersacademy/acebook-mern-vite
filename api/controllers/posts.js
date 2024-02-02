const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
    const posts = await Post.find();
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
};

const getSinglePost = async (req, res) => {
    const post = await Post.find({ _id: req.params.id});
    const token = generateToken(req.user_id);
    res.status(200).json({post: post, token: token})
}

const createPost = async (req, res) => {
    if (req.body.message !== "") {
        const post = new Post(req.body);
        post.save();

        const newToken = generateToken(req.user_id);
        res.status(201).json({ message: "OK", token: newToken });
    } else {
        const newToken = generateToken(req.user_id);
        res.status(200).json({
            message: "posts must not be blank",
            token: newToken,
        });
    }
};

const deletePost = async (req, res) => {
    await Post.deleteOne({_id: req.params.id})
    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Post was deleted", token: newToken });
}

const PostsController = {
    getAllPosts: getAllPosts,
    createPost: createPost,
    getSinglePost: getSinglePost,
    deletePost: deletePost,
};

module.exports = PostsController;
