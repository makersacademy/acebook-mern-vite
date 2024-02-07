const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Comment = require("../../models/comment");
const User = require("../../models/user");
const Post = require("../../models/post");

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

describe("/comments", () => {
    beforeAll(async () => {
        await Post.deleteMany({});
        await User.deleteMany({});
        await Comment.deleteMany({});
        const user = new User({
            username: "user123",
            email: "post-test@test.com",
            password: "12345678",
        });
        const post = new Post({
            message: "post with comments",
            username: "user123",
        });
        await user.save();

        token = createToken(user.id);
        user_id = user.id;
        await post.save();
    });

    afterEach(async () => {
        await Comment.deleteMany({});
    });

    const postID = "testing";
    describe("POST, when a valid token is present", () => {
        it("responds with a 201", async () => {
            const response = await request(app)
                .post(`/comments/${postID}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ message: "Hello World!" });
            expect(response.status).toEqual(201);
        });
        it("creates a new comment", async () => {
            await request(app)
                .post(`/comments/${postID}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ message: "Hello World!", post_id: postID });
            const comments = await Comment.find();
            expect(comments.length).toEqual(1);
            expect(comments[0].message).toEqual("Hello World!");
        });
        it("does not create a new comment if the message is blank", async () => {
            const testApp = await request(app);
            const response = await testApp
                .post(`/comments/${postID}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ message: "" });

            expect(response.status).toBe(200);

            const comments = await Comment.find();
            expect(comments.length).toEqual(0);

            const responseMessage = response.body.message;
            expect(responseMessage).toEqual("comments must not be blank");
        });
        it("returns a new token", async () => {
            const testApp = request(app);
            const response = await testApp
                .post(`/comments/${postID}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ message: "hello world" });

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
                .post(`/comments/${postID}`)
                .send({ message: "hello again world" });

            expect(response.status).toEqual(401);
        });

        test("a comment is not created", async () => {
            const response = await request(app)
                .post(`/comments/${postID}`)
                .send({ message: "hello again world" });

            const comments = await Comment.find();
            expect(comments.length).toEqual(0);
        });

        test("a token is not returned", async () => {
            const response = await request(app)
                .post(`/comments/${postID}`)
                .send({ message: "hello again world" });

            expect(response.body.token).toEqual(undefined);
        });
    });

    describe("GET, when token is present", () => {
        test("the response code is 200", async () => {
            const comment1 = new Comment({
                message: "I love all my children equally",
                post_id: "testing",
            });
            const comment2 = new Comment({
                message: "I've never cared for GOB",
                post_id: "testing",
            });
            await comment1.save();
            await comment2.save();

            const response = await request(app)
                .get(`/comments/${postID}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(200);
        });

        test("returns every comment in the collection", async () => {
            const comment1 = new Comment({
                message: "howdy!",
                post_id: "testing",
            });
            const comment2 = new Comment({
                message: "hola!",
                post_id: "testing",
            });
            await comment1.save();
            await comment2.save();

            const response = await request(app)
                .get(`/comments/${postID}`)
                .set("Authorization", `Bearer ${token}`);

            const comments = response.body.comments;

            const firstComments = comments[0];
            const secondComments = comments[1];

            expect(firstComments.message).toEqual("howdy!");
            expect(secondComments.message).toEqual("hola!");
        });

        test("returns a new token", async () => {
            const comment1 = new Comment({
                message: "First Comment!",
                post_id: "testing",
            });
            const comment2 = new Comment({
                message: "Second Comment!",
                post_id: "testing",
            });
            await comment1.save();
            await comment2.save();

            const response = await request(app)
                .get(`/comments/${postID}`)
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
            const comment1 = new Comment({ message: "howdy!" });
            const comment2 = new Comment({ message: "hola!" });
            await comment1.save();
            await comment2.save();

            const response = await request(app).get(`/comments/${postID}`);

            expect(response.status).toEqual(401);
        });

        test("returns no comments", async () => {
            const comment1 = new Comment({ message: "howdy!" });
            const comment2 = new Comment({ message: "hola!" });
            await comment1.save();
            await comment2.save();

            const response = await request(app).get(`/comments/${postID}`);

            expect(response.body.posts).toEqual(undefined);
        });

        test("does not return a new token", async () => {
            const comment1 = new Comment({ message: "howdy!" });
            const comment2 = new Comment({ message: "hola!" });
            await comment1.save();
            await comment2.save();

            const response = await request(app).get(`/comments/${postID}`);

            expect(response.body.token).toEqual(undefined);
        });
    });
    describe("DELETE single comment, when token is present", () => {
        test("the response code is 200", async () => {
            const comment1 = new Comment({
                message: "howdy!",
                post_id: "testing",
            });

            await comment1.save();

            const response = await request(app)
            .delete(`/comments/${comment1._id}`)
            .set("Authorization", `Bearer ${token}`)

            expect(response.status).toEqual(200)
        })

        test("returns single comment when 2 have been added and 1 deleted", async () => {
            const comment1 = new Comment({ message: "howdy!", post_id: "testing", });
            const comment2 = new Comment({ message: "hi!", post_id: "testing", });
            await comment1.save();
            await comment2.save();

            await request(app)
                .delete(`/comments/${comment1._id}`)
                .set("Authorization", `Bearer ${token}`);

            const response = await request(app)
                .get(`/comments/${postID}`)
                .set("Authorization", `Bearer ${token}`);

            const comments = response.body.comments;

            expect(comments.length).toEqual(1);
            expect(comments[0].message).toEqual("hi!");
        });

        test("returns a new token", async () => {
            const comment1 = new Comment({ message: "howdy!", post_id: "testing", });
            const comment2 = new Comment({ message: "hi!", post_id: "testing", });
            await comment1.save();
            await comment2.save();


            const response = await request(app)
            .delete(`/comments/${comment1._id}`)
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
    })
    describe("POST update a single comment, when token is present", () => {
        test("the response code is 200", async () => {
            const comment1 = new Comment({message: "howdy!", post_id: "testing"});

            await comment1.save();

            await request(app)
                .post(`/comments/update/${comment1._id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ _id: comment1.id, message: "Hello World!", post_id: postID });

            const response = await request(app)
                .get(`/comments/${comment1._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(200);
        });

        test("Updates message of comment", async () => {
            const comment1 = new Comment({
                message: "howdy!",
                post_id: "testing",
            });

            await comment1.save();

            await request(app)
                .post(`/comments/update/${comment1._id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ _id: comment1.id, message: "New Test Message"});

            const comment = await Comment.findOne({ _id: comment1.id });
            expect(comment.message).toBe("New Test Message");
        });
    });
    
});
