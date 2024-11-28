const request = require("supertest");
const JWT = require("jsonwebtoken");
const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      user_id: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
}

let token;


describe("/users", () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "poppy@email.com", password: "1234", firstName: "BOB", lastName: "MAN" });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({ email: "scarconstt@email.com", password: "1234", firstName: "BOB", lastName: "MAN"  });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarconstt@email.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com", firstName: "BOB", lastName: "MAN" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com", firstName: "BOB", lastName: "MAN" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "1234", firstName: "BOB", lastName: "MAN" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234", firstName: "BOB", lastName: "MAN" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when first name is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "1234", lastName: "MAN", email: "skye@email.com" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234", lastName: "MAN", email: "skye@email.com" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when last name is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "1234", firstName: "BOB", email: "skye@email.com" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234", firstName: "BOB", email: "skye@email.com" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});

describe("test GET /user", () => {
  
  beforeAll(async () => {
    let user = new User({ firstName: "JIM", lastName: "BOB", email: "jimbob@gmail.com", password: "jimbo" });
    await user.save()
    token = createToken(user.id); // maybe _id?
  });

  describe("GET, user details", () => {
    test("the response code is 200", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });


    test("Returns correct user data", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.body.userData).toEqual({ firstName: "JIM", lastName: "BOB"});
    });

    test("Returns a new token", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

        const newToken = response.body.token;
        const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
        const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

        expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });

    test("the response code is 401 when token is missing, no data or token returned", async () => {
      const response = await request(app)
        .get("/users");
      expect(response.statusCode).toBe(401);
      expect(response.body.userData).toEqual(undefined);
      expect(response.body.token).toEqual(undefined);
    });
  });
});