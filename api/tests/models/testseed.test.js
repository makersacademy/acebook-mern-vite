const User = require("../../models/user");
const Post = require("../../models/post");
const Comment = require("../../models/comment");
const Relationship = require("../../models/relationship");
require("../mongodb_helper");

describe("Testing that the seed data is actually put into the acebook_test database" , () => {
    beforeEach(async () => {
     
        const { exec } = require('child_process');

// Replace 'otherfile.js' with the name of the file you want to run
const fileToRun = './models/testseed';

// Execute the file using Node.js
exec(`node ${fileToRun}`, (error, stdout, stderr) => {

    if (error) {
        console.error(`Error executing ${fileToRun}: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    // console.log(`stdout: ${stdout}`);
});
    })
afterEach(async () => {
        // Delete all documents from collections
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});
        await Relationship.deleteMany({});
    });

it("check user information appears in database", async () => {
// select data from database
const users = await User.find();
const posts = await Post.find();
const comments = await Comment.find();
const relationships = await Relationship.find();
expect(users[0].forename).toEqual('John');
expect(users.length).toEqual(5);
expect(users[4].username).toEqual('william_jones');
expect(posts.length).toEqual(4);
expect(posts[1].likes).toEqual(3);
expect(comments.length).toEqual(4);
expect(comments[1].likes).toEqual(5);
expect(relationships.length).toEqual(6);
expect(relationships[1].status).toEqual('confirmed');
}
    );
})

// it("check post information appears in database", async () => {
//     // select data from database
//     const comments = await Comment.find();
//     console.log(comments);
//     expect(comments.length).toEqual(4);
//     expect(comments[1].likes).toEqual(5)}
//     );




