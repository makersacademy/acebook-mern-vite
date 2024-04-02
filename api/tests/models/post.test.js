require("../mongodb_helper");

const Post = require("../../models/post");

const mongoose = require("mongoose");

describe("Post model", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it("has a message", () => {
    const userObjectId = new mongoose.Types.ObjectId();
    const post = new Post({
      message: "update model post",
      liked: true,
      likeCounter: 1,
      user: userObjectId,
    });
    expect(post.message).toEqual("update model post");
    expect(post.liked).toEqual(true);
    expect(post.likeCounter).toEqual(1);
    expect(post.user).toEqual(userObjectId);
  });

  //it("can list all posts", async () => {
  //const posts = await Post.find();
  //expect(posts).toEqual([]);
  //});

  it("can save a post", async () => {
    const userObjectId = new mongoose.Types.ObjectId();
    const post = new Post({
      message: "update model post",
      liked: true,
      likeCounter: 1,
      user: userObjectId,
    });

    await post.save();
    const posts = await Post.find();
    expect(posts.length).toEqual(1);
    expect(posts[0].message).toEqual(post.message);
    expect(posts[0].user).toEqual(userObjectId);
  });
});
