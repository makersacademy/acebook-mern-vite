require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      fullName: "bob vance",
      profilePicture: "path to image",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      fullName: "bob vance",
      profilePicture: "path to image",
    });
    expect(user.password).toEqual("password");
  });

  it("has a full name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      fullName: "bob vance",
      profilePicture: "path to image",
    });
    expect(user.fullName).toEqual("bob vance");
  });

  it("has an image", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      fullName: "bob vance",
      profilePicture: "path to image",
    });
    expect(user.profilePicture).toEqual("path to image");
  });

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      fullName: "bob vance",
      profilePicture: "path to image",
    });

    await user.save();
    const users = await User.find();

    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("password");
    expect(users[0].fullName).toEqual("bob vance");
    expect(users[0].profilePicture).toEqual("path to image");
  });
});
