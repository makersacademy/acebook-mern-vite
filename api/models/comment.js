const mongoose = require("mongoose");
//test number to show in console as page not being picked up by mongoDB (Or server)

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema({
    userName: {
        type: String,
        //required: true
        //type: mongoose.Schema.Types.userName, can database info be formatted to show this?
        //ref: 'users', 
    //required: true is this needed if it's tied to a database?
        //edge case: Empty Name
    },
    message: {
        type: String,
        //required: true
        //edge case: Empty comment
    },

    postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    //required: true 
},

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// We use the Schema to create the Comment model. Models are classes which we can
// use to construct entries in our Database.
const Comment = mongoose.model("Comment", CommentSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
// const dateTimeString = new Date().toLocaleString("en-GB");
// const comment = new Comment({userName: 'Adrian', message: `Test post MeSsAgE, created at ${dateTimeString}`});
// console.log(comment)
// console.log(CommentSchema)
// console.log(2+2)
// const comment = new Comment //({userName: user, 'at {$dateTimeString commented`, message: {post}});
// comment.save()

module.exports = Comment;