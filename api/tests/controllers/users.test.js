const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when all details are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app).post("/users").send({
        email: "poppy@email.com",
        password: "1234",
        fullName: "bob vance",
        profilePicture: "path to image",
      });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app).post("/users").send({
        email: "scarconstt@email.com",
        password: "1234",
        fullName: "bob vance",
        profilePicture: "path to image",
      });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarconstt@email.com");
      expect(newUser.password).toEqual("1234");
      expect(newUser.fullName).toEqual("bob vance");
      expect(newUser.profilePicture).toEqual("path to image");
    });
  });

  describe("POST, when profile picture not provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app).post("/users").send({
        email: "poppy@email.com",
        password: "1234",
        fullName: "bob vance",
      });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app).post("/users").send({
        email: "scarconstt@email.com",
        password: "1234",
        fullName: "bob vance",
      });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarconstt@email.com");
      expect(newUser.password).toEqual("1234");
      expect(newUser.fullName).toEqual("bob vance");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app).post("/users").send({
        email: "skye@email.com",
        fullName: "bob vance",
        profilePicture: "path to image",
      });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({
        email: "skye@email.com",
        fullName: "bob vance",
        profilePicture: "path to image",
      });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when full name is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com", password: "1234" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({ email: "skye@email.com", password: "1234" });

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
