require("../mongodb_helper");

const Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach(async () => {
    await Comment.deleteMany({});
  });

  it("has a message", () => {
    const comment = new Comment({ postId: "660181c8ec50e3822f1361d2", message: "some message"});
    expect(comment.message).toEqual("some message");
  });

  it("has a owner_id", () => {
    const comment = new Comment({ postId: "660181c8ec50e3822f1361d2", message: "", owner_id: "testid1234"});
    expect(comment.owner_id).toEqual("testid1234");
  });

  it("can list all comments", async () => {
    const comments = await Comment.find();
    expect(comments).toEqual([]);
  });

  it("can save a comment", async () => {
    const comment = new Comment({ postId: "660181c8ec50e3822f1361d2", message: "some message", owner_id: "testid1234" });

    await comment.save();
    const comments = await Comment.find();
    expect(comments[0].message).toEqual("some message");
    expect(comments[0].owner_id).toEqual("testid1234");
  });
});
