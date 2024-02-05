const Comment = require("../models/comment")
const { generateToken } = require("../lib/token")


const getAllComment = async (req, res) => {
    const comments = await Comment.find(req.comment_ids);
    const token = generateToken(req.user_id);
    res.status(200).json({ comments: comments, token: token });
};

const createComment = async (req, res) => {
    const commentObject = {
        message: req.body.message,
        user_id: req.user_id,
        time_of_comment: req.body.datetime,
        post_id: req.body.post_id
    };
    const comment = new Comment(commentObject);
    comment.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({message: "OK", token: newToken});
};

const clearTestComments = async (req, res) => {
    console.log("here")
    await Comment.deleteMany({})
}



const CommentController = {
    createComment: createComment,
    getAllComment: getAllComment,
    clearTestComments: clearTestComments
};


module.exports = CommentController;