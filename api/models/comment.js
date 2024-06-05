
const mongoose = require("mongoose");
//test number to show in console as page not being picked up by mongoDB (Or server)

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema({
    commentMessage: {
        type: String,
        //required: true
        //edge case: Empty comment
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        //required: true 
        },

    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        //type: String,
        //required: true
        //type: mongoose.Schema.Types.userName, can database info be formatted to show this? `${firstName} + {lastName}`?
        //ref: 'users', 
    //required: true is this needed if it's tied to a database?
        //edge case: Empty Name
    },
});


// // We use the Schema to create the Comment model. Models are classes which we can
// // use to construct entries in our Database.
 const Comment = mongoose.model("Comment", CommentSchema);

 module.exports = Comment;