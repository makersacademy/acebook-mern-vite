const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const RelationshipSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'blocked_to', 'blocked_from', 'blocked_both'],
    required: true
},
fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
},
toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
}});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Relationship = mongoose.model("Relationship", RelationshipSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
module.exports = Relationship;


