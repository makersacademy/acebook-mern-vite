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
describe("/posts", () => {
    beforeAll(async() => {
        await User.deleteMany({});
        await Post.deleteMany({});
    })
    beforeEach(async () => {
        const user = new User({
            username: "user123",
            email: "post-test@test.com",
            password: "12345678",
        });
        await user.save();
        await Post.deleteMany({});
        token = createToken(user.id)
        user_id = user.id;

    });

    afterEach(async () => {
    });

    describe("POST, when a valid token is present", () => {
        test("responds with a 201", async () => {
            const response = await request(app)
                .post("/posts")
                .set("Authorization", `Bearer ${token}`)
                .send({ message: "Hello World!" });
            expect(response.status).toEqual(201);
        });

        test("creates a new post", async () => {
            await request(app)
                .post("/posts")
                .set("Authorization", `Bearer ${token}`)
                .send({ message: "Hello World!!"});

            const posts = await Post.find();
            expect(posts.length).toEqual(1);
            expect(posts[0].message).toEqual("Hello World!!");
        });

        test("does not create a new post if the message is blank", async () => {
            const testApp = await request(app);
            const response = await testApp
                .post("/posts")
                .set("Authorization", `Bearer ${token}`)
                .send({ message: "" });

            expect(response.status).toBe(200);

            const posts = await Post.find();
            expect(posts.length).toEqual(0);

            const responseMessage = response.body.message;
            expect(responseMessage).toEqual("posts must not be blank");
        });

        test("returns a new token", async () => {
            const testApp = request(app);
            const response = await testApp
                .post("/posts")
                .set("Authorization", `Bearer ${token}`)
                .send({ message: "hello world"});

            const newToken = response.body.token;
            const newTokenDecoded = JWT.decode(
                newToken,
                process.env.JWT_SECRET
            );
            const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

            // iat stands for issued at
            expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
        });
    });

    describe("POST, when token is missing", () => {
        test("responds with a 401", async () => {
            const response = await request(app)
                .post("/posts")
                .send({ message: "hello again world" });

            expect(response.status).toEqual(401);
        });

        test("a post is not created", async () => {
            const response = await request(app)
                .post("/posts")
                .send({ message: "hello again world" });

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

    describe("GET, when token is present", () => {
        test("the response code is 200", async () => {
            const post1 = new Post({
                message: "I love all my children equally",
            });
            const post2 = new Post({ message: "I've never cared for GOB" });
            await post1.save();
            await post2.save();

            const response = await request(app)
                .get("/posts")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(200);
        });

        test("returns every post in the collection", async () => {
            const post1 = new Post({ message: "hola!" });
            const post2 = new Post({ message: "howdy!" });
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

        test("returns a new token", async () => {
            const post1 = new Post({ message: "First Post!" });
            const post2 = new Post({ message: "Second Post!" });
            await post1.save();
            await post2.save();

            const response = await request(app)
                .get("/posts")
                .set("Authorization", `Bearer ${token}`);

            const newToken = response.body.token;
            const newTokenDecoded = JWT.decode(
                newToken,
                process.env.JWT_SECRET
            );
            const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

            // iat stands for issued at
            expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
        });
    });

    describe("GET, when token is missing", () => {
        test("the response code is 401", async () => {
            const post1 = new Post({ message: "howdy!" });
            const post2 = new Post({ message: "hola!" });
            await post1.save();
            await post2.save();

            const response = await request(app).get("/posts");

            expect(response.status).toEqual(401);
        });

        test("returns no posts", async () => {
            const post1 = new Post({ message: "howdy!" });
            const post2 = new Post({ message: "hola!" });
            await post1.save();
            await post2.save();

            const response = await request(app).get("/posts");

            expect(response.body.posts).toEqual(undefined);
        });

        test("does not return a new token", async () => {
            const post1 = new Post({ message: "howdy!" });
            const post2 = new Post({ message: "hola!" });
            await post1.save();
            await post2.save();

            const response = await request(app).get("/posts");

            expect(response.body.token).toEqual(undefined);
        });
    });

    describe("GET single post, when token is present", () => {
        test("the response code is 200", async () => {
            const post1 = new Post({
                message: "Test message",
            });
            await post1.save();

            const response = await request(app)
                .get(`/posts/find/${post1._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(200);
        });

        test("returns single post in the collection", async () => {
            const post1 = new Post({ message: "howdy!" });
            const post2 = new Post({ message: "hola!" });
            await post1.save();
            await post2.save();

            const response = await request(app)
                .get(`/posts/find/${post2.id}`)
                .set("Authorization", `Bearer ${token}`);

            const post = response.body.post;

            expect(post.length).toEqual(1)
            expect(post[0].message).toEqual("hola!");
        });

        test("returns a new token", async () => {
            const post1 = new Post({ message: "First Post!" });
            const post2 = new Post({ message: "Second Post!" });
            await post1.save();
            await post2.save();

            const response = await request(app)
                .get(`/posts/find/${post2.id}`)
                .set("Authorization", `Bearer ${token}`);

            const newToken = response.body.token;
            const newTokenDecoded = JWT.decode(
                newToken,
                process.env.JWT_SECRET
            );
            const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

            // iat stands for issued at
            expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
        });
    });

    describe("GET single post, when token is missing", () => {
        test("the response code is 401", async () => {
            const post1 = new Post({ message: "howdy!" });
            await post1.save();
            const response = await request(app).get(`/posts/find/${post1.id}`);
            expect(response.status).toEqual(401);
        });

        test("returns no posts", async () => {
            const post1 = new Post({ message: "howdy!" });
            await post1.save();
            const response = await request(app).get(`/posts/find/${post1.id}`);
            expect(response.body.posts).toEqual(undefined);
        });

        test("does not return a new token", async () => {
            const post1 = new Post({ message: "howdy!" });
            await post1.save();
            const response = await request(app).get(`/posts/find/${post1.id}`);
            expect(response.body.token).toEqual(undefined);
        });
    });

    describe("DELETE single post, when token is present", () => {
        test("the response code is 200", async () => {
            const post1 = new Post({
                message: "Test message",
            });
            await post1.save();

            const response = await request(app)
                .delete(`/posts/find/${post1._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(200);
        });

        test("returns single post when 2 have been added and 1 deleted", async () => {
            const post1 = new Post({ message: "howdy!" });
            const post2 = new Post({ message: "hola!" });
            await post1.save();
            await post2.save();

            await request(app)
            .delete(`/posts/find/${post1._id}`)
            .set("Authorization", `Bearer ${token}`)

            const response = await request(app)
                .get(`/posts`)
                .set("Authorization", `Bearer ${token}`);

            const posts = response.body.posts;

            expect(posts.length).toEqual(1)
            expect(posts[0].message).toEqual("hola!");
        });

        test("returns a new token", async () => {
            const post1 = new Post({ message: "First Post!" });
            const post2 = new Post({ message: "Second Post!" });
            await post1.save();
            await post2.save();

            const response = await request(app)
            .delete(`/posts/find/${post1._id}`)
            .set("Authorization", `Bearer ${token}`)

            const newToken = response.body.token;
            const newTokenDecoded = JWT.decode(
                newToken,
                process.env.JWT_SECRET
            );
            const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

            // iat stands for issued at
            expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
        });
    });

    describe("POST update a single post, when token is present", () => {
        test("the response code is 200", async () => {
            const post1 = new Post({
                message: "Test message",
            });
            await post1.save();
            const post = await Post.findOne({_id: post1._id})
            post.message = "New Test Message"
            post.save()

            const response = await request(app)
                .get(`/posts/find/${post1._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(200);
        });

        test("Updates message of post", async () => {
            const post1 = new Post({
                message: "Test message",
            });
            await post1.save();
            const post = await Post.findOne({_id: post1._id})
            post.message = "New Test Message"
            post.save()
            
            const response = await request(app)
            .get(`/posts/find/${post1._id}`)
            .set("Authorization", `Bearer ${token}`);

            const updatedPost = response.body.post;

            expect(updatedPost[0].message).toEqual("New Test Message");
        });
    });
    describe("POST like when a valid token is present", () => {
        test("the response code is 200", async () => {
            const post1 = new Post({message: "Test message"});
            await post1.save();
            const response = await request(app)
                .post(`/posts/find/${post1._id}/like`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toEqual(200)
        });
        test("the length of the array is 1 when 1 user has likes the post", async () => {
            const post1 = new Post({message: "Test message"});
            await post1.save();
            await request(app)
                .post(`/posts/find/${post1._id}/like`)
                .set("Authorization", `Bearer ${token}`);
            response = await request(app)
                .get(`/posts`)
                .set("Authorization", `Bearer ${token}`);
            const posts = response.body.posts;
            expect(posts[0].likes.length).toEqual(1)

        })
    });
});
