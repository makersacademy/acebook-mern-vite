const Comment = require("../models/comment");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllComments = async (req, res) => {
    //const comments = await Comment.find({ post_id: req.params.id });
    const comments = await Comment.aggregate([
        {$addFields: {
            convertedUserId: {$toObjectId: "$user_id"}
        }},
        {$match: {
            post_id: req.params.id
        }},
        {$lookup: {
            from: "users",
            localField: "convertedUserId",
            foreignField: "_id",
            as: "user"
        }}
    ])
    const token = generateToken(req.user_id);
    res.status(200).json({ comments: comments, token: token });
};

const createComment = async (req, res) => {
    if (req.body.message !== "") {
        const user = await User.findOne({ _id: req.user_id });
        req.body.user_id = req.user_id;
        req.body.post_id = req.params.id;
        const comment = new Comment(req.body);
        comment.save();

        const newToken = generateToken(req.user_id);
        res.status(201).json({ message: "OK", token: newToken });
    } else {
        const newToken = generateToken(req.user_id);
        res.status(200).json({
            message: "comments must not be blank",
            token: newToken,
        });
    }
};

const CommentsController = {
    getAllComments: getAllComments,
    createComment: createComment,
};

module.exports = CommentsController;
