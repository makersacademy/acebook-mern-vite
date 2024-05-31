require("../mongodb_helper");

const Comment = require("../../models/comment");

describe("Comment model", () => {

  it("has a message", () => {
    const comment = new Comment({ userName: "Adrian Oakley", message: "test message" });
    expect(comment).toEqual("Adrian Oakley test message");
  });

  // Add mocks here because we don't have Post code yet?



});