require("../mongodb_helper");

const Comment = require("../../models/comment");

describe("Comment model", () => {

  it("has a message", () => {
    const post = new Comment({ userName: "Adrian Oakley", message: "some message" });
    expect(post.message).toEqual("Adrian Oakley some message");
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