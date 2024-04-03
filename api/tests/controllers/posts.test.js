const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Post = require("../../models/post");
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
let user_id;

describe("/posts", () => {
  beforeAll(async () => {
    const user = new User({
      firstName : "test-name",
      lastName : "test-lastname",
      bio : "test-bio",
      email: "post-test@test.com",
      password: "Abcd1235678!",
    });
    await user.save();
    await Post.deleteMany({});
    user_id = user.id
    console.log(user_id)
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!", owner_id: user_id });
      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!!", owner_id: user_id});

      const posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("Hello World!!");
      expect(posts[0].owner_id).toEqual(user_id);
    });

    test("creates a new post with a pic", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!!", owner_id: user_id, image: 'testimage'});

      const posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("Hello World!!");
      expect(posts[0].owner_id).toEqual(user_id);
      expect(posts[0].image).toEqual('testimage');
    });

    test("returns a new token", async () => {
      const testApp = request(app);
      const response = await testApp
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", owner_id: user_id});

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
        .post("/posts")
        .send({ message: "hello again world", owner_id: user_id});

      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world", owner_id: user_id });

      const posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("POST, when the message is blank", () => {
    test("responds with a 400 and a helpful message", async () => {
      const response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "", owner_id: user_id});

      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("No message included");
    });

    test("a post is not created", async () => {
      const response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "", owner_id: user_id });

      const posts = await Post.find();
      expect(posts.length).toEqual(0);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const post1 = new Post({ message: "I love all my children equally", owner_id: user_id });
      const post2 = new Post({ message: "I've never cared for GOB", owner_id: user_id });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns every post in the collection", async () => {
      const post1 = new Post({ message: "howdy!", owner_id: user_id });
      const post2 = new Post({ message: "hola!", owner_id: user_id });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const posts = response.body.posts;
      const firstPost = posts[0];
      const secondPost = posts[1];

      expect(firstPost.message).toEqual("howdy!");
      expect(secondPost.message).toEqual("hola!");
    });

    test("returns post belonging to specific user", async () => {
      // create new user for second post
      const user2 = new User({
        firstName : "test-name2",
        lastName : "test-lastname2",
        bio : "test-bio2",
        email: "post-test@test.com",
        password: "Abcde1234!",
      });
      await user2.save();
      user_id_2 = user2.id

      // create posts
      const post1 = new Post({ message: "howdy!", owner_id: user_id });
      const post2 = new Post({ message: "hola!", owner_id: user_id_2 });
      const post3 = new Post({ message: "present!", owner_id: user_id });
      await post1.save();
      await post2.save();
      await post3.save();

      const response = await request(app)
        .get("/posts/profile")
        .set("Authorization", `Bearer ${token}`);

      const posts = response.body.posts;
      const firstPost = posts[0];
      const secondPost = posts[1];

      expect(firstPost.message).toEqual("howdy!");
      expect(secondPost.message).toEqual("present!");
    });

    test("returns a new token", async () => {
      const post1 = new Post({ message: "First Post!", owner_id: user_id });
      const post2 = new Post({ message: "Second Post!", owner_id: user_id });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
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
      const post1 = new Post({ message: "howdy!", owner_id: user_id });
      const post2 = new Post({ message: "hola!", owner_id: user_id });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.status).toEqual(401);
    });

    test("returns no posts", async () => {
      const post1 = new Post({ message: "howdy!", owner_id: user_id });
      const post2 = new Post({ message: "hola!", owner_id: user_id });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.posts).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const post1 = new Post({ message: "howdy!", owner_id: user_id });
      const post2 = new Post({ message: "hola!", owner_id: user_id });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.token).toEqual(undefined);
    });
  });
});

