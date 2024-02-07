const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {

    const posts = await Post.aggregate([
        {$addFields: {
            convertedId: {$toObjectId: "$user_id"}
            
        }},
        { $lookup: {
            from: "users",
            localField: "convertedId",
            foreignField: "_id",
            as: "user"
        }},
        { $lookup: {
            from: "users",
            localField: "likes",
            foreignField: "_id",
            as: "likeUser"

        }}
    ]).sort({_id: -1})

    

    //const posts = await Post.find().sort({ _id: -1 });

    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
};

const getSinglePost = async (req, res) => {

    const postID = req.params.id
    const post2 = await Post.find({ _id: req.params.id});
    const post = await Post.aggregate([
        {$addFields: {
            convertedId: {$toObjectId: "$user_id"},
            convertedPostId: {$toString: "$_id"}
        }},
        {$match: {
            convertedPostId: postID
        }},
        { $lookup: {
            from: "users",
            localField: "convertedId",
            foreignField: "_id",
            as: "user"
        }},
        { $lookup: {
            from: "users",
            localField: "likes",
            foreignField: "_id",
            as: "likeUser"

        }}
    ])

    const user = await User.findOne({ _id: req.user_id });
    //const post = await Post.find({ _id: req.params.id });

    const token = generateToken(req.user_id);
    //console.log("post:")
    //console.log(post[0])
    //console.log(post[0].user)
    // console.log("user.username: " + user.username)
    // console.log("post.username: " + post[0].username)
    // console.log(user.username)
    if (user.username != post[0].user[0].username) {
        res.status(200).json({ post: post, token: token, userMatch: false});
    } else {
        res.status(200).json({ post: post, token: token, userMatch: true});
    }
    
};

const createPost = async (req, res) => {
    if (req.body.message !== "") {
        const user = await User.findOne({_id: req.user_id})
        //console.log(req.user_id)
        //console.log(user)
        //console.log(req.body)

        req.body.user_id = req.user_id

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

const updatePost = async (req, res) => {
    if (req.body.message !== "") {
        const newMessage = req.body.message;
        const post = await Post.findOne({ _id: req.params.id });
        const newToken = generateToken(req.user_id);
        if (!post) {
            return res.status(400).json({ message: "Post does not exist" });
        }
        post.message = newMessage;
        post.save();
        res.status(200).json({
            message: "OK",
            token: newToken,
        });
    } else {
        const newToken = generateToken(req.user_id);
        res.status(400).json({
            message: "Posts must not be blank",
            token: newToken,
        });
    }
};

const deletePost = async (req, res) => {
    await Post.deleteOne({ _id: req.params.id });
    const newToken = generateToken(req.user_id);
    res.status(200).json({ message: "Post was deleted", token: newToken });
};

const likePost = async (req, res) => {
    const user = await User.findOne({_id: req.user_id})
    console.log(user)
    await Post.findOneAndUpdate({_id: req.params.id},{$addToSet:{likes: req.user_id}});
    const newToken = generateToken(req.user_id);
    res.status(200).json({message: "Post was liked", token: newToken})

}


const PostsController = {
    getAllPosts: getAllPosts,
    createPost: createPost,
    getSinglePost: getSinglePost,
    deletePost: deletePost,
    updatePost: updatePost,
    likePost: likePost
};

module.exports = PostsController;
