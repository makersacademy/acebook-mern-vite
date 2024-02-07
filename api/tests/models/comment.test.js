require("../mongodb_helper");
const Comment = require("../../models/comment");

describe("Comment model", () => {
    beforeEach(async () => {
        await Comment.deleteMany({});
    });

    it("has a message, username and post_id", () => {
        const comment = new Comment({
            post_id: 1,
            message: "test comment",
            username: "testUsername",
        });
        expect(comment.message).toEqual("test comment");;
        expect(comment.post_id).toEqual("1");
    });

    it("can list all comments", async () => {
        const comments = await Comment.find();
        expect(comments).toEqual([]);
    });

    it("can save a comment", async () => {
        const comment = new Comment({
            post_id: 1,
            message: "test comment",
            username: "testUsername",
        });

        await comment.save();
        const comments = await Comment.find();
        expect(comments[0].message).toEqual("test comment");
    });
});
