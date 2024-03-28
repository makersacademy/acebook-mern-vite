const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

const getAllComments = async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comment.find().sort({createdAt: -1});
    const token = generateToken(req.user_id);
    res.status(200).json({ comments: comments, token: token });
};

const createComment = async (req, res) => {
    const comment = new Comment(req.body);
    comment.save();

    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Comment created", token: newToken });
};

const CommentsController = {
    getAllComments: getAllComments,
    createComment: createComment,
};

module.exports = CommentsController;