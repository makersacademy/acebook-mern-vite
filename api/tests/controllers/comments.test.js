const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Post = require("../../models/post");
const Comment = require("../../models/comment");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
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
};





let token;
let fullName;
describe("/comments", () => {
    beforeAll(async () => {
        const user = new User({
        email: "post-test@test.com",
        password: "12345678",
        fullName: "Andre",
        profilePicture: "picture"
        })

        await user.save();
        await Comment.deleteMany({});
        //need to delete comments to start with a clean slate
        token = createToken(user.id);
        fullName = user.fullName;
    });

    afterEach(async () => {
        await User.deleteMany({});
        // await Post.deleteMany({});
        await Comment.deleteMany({});
        //will need to add the same for comments so we clean up the database after each test
    });

    describe("POST, when a valid token is present", () => {
        test("responds with a 201", async () => {
        const response = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${token}`)
            .send({ 
              message: "Hello World!",
              fullName: "andre"
            });
        expect(response.status).toEqual(201);
    });

    test("creates a new comment", async () => {
      await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ 
          message: "Hello World!",
          fullName: "andre"
        });

      const comments = await Comment.find();
      expect(comments.length).toEqual(1);
      expect(comments[0].message).toEqual("Hello World!");
    });

    test("returns a new token", async () => {
      const testApp = request(app);
      const response = await testApp
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ 
          message: "Hello World!",
          fullName: "andre"
        });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/comments")
        .send({ 
          message: "Hello World!",
          fullName: "andre"
        });

      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      const response = await request(app)
        .post("/comments")
        .send({ 
          message: "Hello World!",
          fullName: "andre"
        });

      const posts = await Comment.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/comments")
        .send({ 
          message: "hello again world",
          fullName: "andre"
        });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const comment1 = new Comment({ 
        message: "I love all my children equally",
        fullName: "andre"
      });
      const comment2 = new Comment({ 
        message: "I hate my children",
        fullName: "andre"
      });
      await comment1.save();
      await comment2.save();

      const response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns every comment in the collection", async () => {
      const comment1 = new Comment({ message: "howdy!", fullName: "andre" });
      const comment2 = new Comment({ message: "hola!", fullName: "bob" });
      await comment1.save();
      await comment2.save();

      const response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`);

      const comments = response.body.comments;
      const firstComment = comments[0];
      const secondComment = comments[1];

      expect(firstComment.message).toEqual("howdy!");
      expect(secondComment.message).toEqual("hola!");
    });

    test("returns a new token", async () => {
      const comment1 = new Comment({ message: "First Comment!", fullName: "andre"});
      const comment2 = new Comment({ message: "Second Comment!", fullName: "bob" });
      await comment1.save();
      await comment2.save();

      const response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      const comment1 = new Comment({ message: "howdy!", fullName: "andre" });
      const comment2 = new Comment({ message: "hola!", fullName: "bob" });
      await comment1.save();
      await comment2.save();

      const response = await request(app).get("/comments");

      expect(response.status).toEqual(401);
    });

    test("returns no comments", async () => {
      const comment1 = new Comment({ message: "howdy!", fullName: "andre" });
      const comment2 = new Comment({ message: "hola!", fullName: "bob" });
      await comment1.save();
      await comment2.save();

      const response = await request(app).get("/comments");

      expect(response.body.comments).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const comment1 = new Comment({ message: "howdy!", fullName: "andre" });
      const comment2 = new Comment({ message: "hola!", fullName: "bob" });
      await comment1.save();
      await comment2.save();

      const response = await request(app).get("/comments");

      expect(response.body.token).toEqual(undefined);
    });
  });
});
