const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
    const posts = await Post.find();
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
    if (req.body.message !== "") {
        req.body.userID = req.user_id;
        const post = new Post(req.body);
        console.log(req.body)
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

const PostsController = {
    getAllPosts: getAllPosts,
    createPost: createPost,
};

module.exports = PostsController;
