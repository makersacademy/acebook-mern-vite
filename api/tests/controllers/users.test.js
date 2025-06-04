const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when name, email and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "poppy@email.com", password: "1234", name: "jeff" });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({
          email: "scarconstt@email.com",
          password: "1234",
          name: "jeff",
        });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarconstt@email.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "1234" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});

describe("GET all users", () => {
  test("returns every user in the collection", async () => {
    const user1 = new User({
      name: "eric",
      email: "email@domain.com",
      password: "password",
    });
    const user2 = new User({
      name: "erica",
      email: "nunya@business.com",
      password: "1234secure",
    });
    await user1.save();
    await user2.save();

    const response = await request(app).get("/users");

    const users = response.body.users;
    const firstUser = users[0];
    const secondUser = users[1];

    expect(firstUser.name).toEqual("eric");
    expect(secondUser.name).toEqual("erica");
  });
});

describe("GET user by id", () => {
  test("returns given user based on Objectid in MongoDB", async () => {
    const user = new User({
      name: "eric",
      email: "email@domain.com",
      password: "password",
    });
    await user.save();

    const exists = await User.findOne({ email: "email@domain.com" });
    console.log("Found user? pleaseeeee work", exists);

    const response = await request(app).get(`/users/${user._id}`);
    console.log(response);

    expect(response.body.user._id).toEqual(user._id.toString());
    expect(response.body.user.name).toBe("eric");
  });
});
