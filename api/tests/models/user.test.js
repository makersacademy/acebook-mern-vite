require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("has an email address", () => {
    const user = new User({
      username: "test_user10",
      email: "test10@test.com",
      password: "1234567",
      bio: "test bio1",
      posts: [],
      friends: ["65b8e7e82c3b14ab340c6754"]
    })

    expect(user.email).toEqual("test10@test.com");
    expect(user.password).toEqual("1234567")
  });

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    const user = new User({
      username: "test_user1",
      email: "test1@test.com",
      password: "1234567",
      bio: "test bio1",
      posts: [],
      friends: ["65b8e7e82c3b14ab340c6754"]
    });

    await user.save();
    const users = await User.find();

    expect(users[0].email).toEqual("test1@test.com");
    expect(users[0].password).toEqual("1234567");
  });
});
