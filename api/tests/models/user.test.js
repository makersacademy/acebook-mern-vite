const dotenv = require("dotenv")
dotenv.config({ path: "./api/.env.test" });
require("../mongodb_helper");
const User = require("../../models/user");


describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should have access to test environment variables', () => {
    // Access your environment variables as usual
    const mongodbUrl = process.env.MONGODB_URL;
    expect(mongodbUrl).toBeDefined();
  });


  it("has an firstName", () => {
    const user = new User({
      firstName: "Lana",
      lastName: "Del Rey",
      bio: "I am a singer.",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.firstName).toEqual("Lana");
  });

  it("has an lastName", () => {
    const user = new User({
      firstName: "Lana",
      lastName: "Del Rey",
      bio: "I am a singer.",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.lastName).toEqual("Del Rey");
  });

  it("has a bio", () => {
    const user = new User({
      firstName: "Lana",
      lastName: "Del Rey",
      bio: "I am a singer.",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.bio).toEqual("I am a singer.");
  });
  
  it("has an email address", () => {
    const user = new User({
      firstName: "Lana",
      lastName: "Del Rey",
      bio: "I am a singer.",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      firstName: "Lana",
      lastName: "Del Rey",
      bio: "I am a singer.",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    const user = new User({
      firstName: "Lana",
      lastName: "Del Rey",
      bio: "I am a singer.",
      email: "someone@example.com",
      password: "password",
    });

    await user.save();
    const users = await User.find();

    expect(users[0].firstName).toEqual("Lana");
    expect(users[0].lastName).toEqual("Del Rey");
    expect(users[0].bio).toEqual("I am a singer.");
    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("password");

  });
});
