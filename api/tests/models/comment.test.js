require("../mongodb_helper");

const Comment = require("../../models/comment");

describe("Comment model", () => {

  it("has a message", () => {
    const comment = new Comment({ userName: "Adrian Oakley", message: "test message" });
    expect(comment).toEqual("Adrian Oakley test message");
  });

//   it("can list all posts", async () => {
//     const posts = await Post.find();
//     expect(posts).toEqual([]);
//   });

//   it("can save a post", async () => {
//     const post = new Post({ message: "some message" });

//     await post.save();
//     const posts = await Post.find();
//     expect(posts[0].message).toEqual("some message");
//   });
});