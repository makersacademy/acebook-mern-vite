require("../mongodb_helper");

const Post = require("../../models/post");

describe("Post model", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it("has a message", () => {
    const post = new Post({ message: "some message"});
    expect(post.message).toEqual("some message");
  });

  it("has a owner_id", () => {
    const post = new Post({ message: "", owner_id: "testid1234"});
    expect(post.owner_id).toEqual("testid1234");
  });

  it("can list all posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save a post", async () => {
    const post = new Post({ message: "some message", owner_id: "testid1234" });

    await post.save();
    const posts = await Post.find();
    expect(posts[0].message).toEqual("some message");
    expect(posts[0].owner_id).toEqual("testid1234");
  });
});
