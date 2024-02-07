const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe("POST, when username, email and password are provided", () => {
        test("the response code is 201", async () => {
            const response = await request(app).post("/users").send({
                username: "name123",
                email: "poppy@email.com",
                password: "Password1!",
            });

            expect(response.statusCode).toBe(201);
        });

        test("a user is created", async () => {
            await request(app).post("/users").send({
                username: "name123",
                email: "scarconstt@email.com",
                password: "Password1!",
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
                .send({ username: "user123", email: "skye@email.com" });

            expect(response.statusCode).toBe(400);
        });

        test("does not create a user", async () => {
            await request(app)
                .post("/users")
                .send({ username: "user123", email: "skye@email.com" });

            const users = await User.find();
            expect(users.length).toEqual(0);
        });
    });

    describe("POST, when username is missing", () => {
        test("response code is 400", async () => {
            const response = await request(app)
                .post("/users")
                .send({ email: "skye@email.com", password: "Password1!" });

            expect(response.statusCode).toBe(400);
        });

        test("does not create a user", async () => {
            await request(app)
                .post("/users")
                .send({ email: "skye@email.com", password: "Password1!" });

            const users = await User.find();
            expect(users.length).toEqual(0);
        });
    });

    describe("POST, when email is missing", () => {
        test("response code is 400", async () => {
            const response = await request(app)
                .post("/users")
                .send({ username: "user123", password: "Password1!" });

            expect(response.statusCode).toBe(400);
        });

        test("does not create a user", async () => {
            await request(app)
                .post("/users")
                .send({ username: "user123", password: "Password1!" });

            const users = await User.find();
            expect(users.length).toEqual(0);
        });
    });

    describe("POST, when email already exists", () => {
        test("response code is 409", async () => {
            await request(app).post("/users").send({
                username: "123",
                email: "123@email.com",
                password: "Password1!",
            });

            const response = await request(app).post("/users").send({
                username: "user123",
                email: "123@email.com",
                password: "Password1!",
            });

            expect(response.statusCode).toBe(409);
            expect(response.body.message).toBe("Email already exists");
        });

        test("does not create a user", async () => {
            await request(app).post("/users").send({
                username: "123",
                email: "123@email.com",
                password: "Password1!",
            });

            await request(app).post("/users").send({
                username: "user123",
                email: "123@email.com",
                password: "1234",
            });

            const users = await User.find({ username: "user123" });
            expect(users.length).toEqual(0);
        });
    });

    describe("POST, when username already exists", () => {
        test("response code is 409", async () => {
            await request(app).post("/users").send({
                username: "user123",
                email: "user@email.com",
                password: "Password1!",
            });

            const response = await request(app).post("/users").send({
                username: "user123",
                email: "123@email.com",
                password: "Password1!",
            });

            expect(response.statusCode).toBe(409);
            expect(response.body.message).toBe("Username already exists");
        });

        test("does not create a user", async () => {
            await request(app).post("/users").send({
                username: "user123",
                email: "user@email.com",
                password: "Password1!",
            });

            await request(app).post("/users").send({
                username: "user123",
                email: "123@email.com",
                password: "Password1!",
            });

            const users = await User.find({ email: "123@email.com" });
            expect(users.length).toEqual(0);
        });

        describe("POST, when username and email already exists", () => {
            test("response code is 409", async () => {
                await request(app).post("/users").send({
                    username: "user123",
                    email: "123@email.com",
                    password: "Password1!",
                });

                const response = await request(app).post("/users").send({
                    username: "user123",
                    email: "123@email.com",
                    password: "Password1!",
                });

                expect(response.statusCode).toBe(409);
                expect(response.body.message).toBe(
                    "Username and Email already exist"
                );
            });

            test("does not create a user", async () => {
                await request(app).post("/users").send({
                    username: "user123",
                    email: "123@email.com",
                    password: "Password1!",
                });

                await request(app).post("/users").send({
                    username: "user123",
                    email: "123@email.com",
                    password: "Password1!",
                });

                const users = await User.find({ email: "123@email.com" });
                expect(users.length).toEqual(1);
            });
        });
    });

    describe("POST, when email is not valid", () => {
        test("response code is 400", async () => {
            response = await request(app).post("/users").send({
                username: "user123",
                email: "123",
                password: "Password1!",
            });

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Invalid Email");
        });

        test("does not create a user", async () => {
            await request(app).post("/users").send({
                username: "user123",
                email: "123",
                password: "Password1!",
            });

            const users = await User.find({ email: "123@email.com" });
            expect(users.length).toEqual(0);
        });
    });

    describe("POST, when email already exists, but case is different", () => {
        test("When email is the same but a different case", async () => {
            await request(app).post("/users").send({
                username: "123",
                email: "abc@email.com",
                password: "Password1!",
            });

            const response = await request(app).post("/users").send({
                username: "user123",
                email: "ABC@email.com",
                password: "Password1!",
            });

            const users = await User.find({ email: "abc@email.com" });
            expect(users.length).toEqual(1);
            expect(response.statusCode).toBe(409);
            expect(response.body.message).toBe("Email already exists");
        });

        test("When username is the same but a different case", async () => {
            await request(app).post("/users").send({
                username: "USER123",
                email: "test@email.com",
                password: "Password1!",
            });

            const response = await request(app).post("/users").send({
                username: "user123",
                email: "testing@email.com",
                password: "1234",
            });

            const users = await User.find({ username: "USER123" });
            expect(response.statusCode).toBe(409);
            expect(response.body.message).toBe("Username already exists");
            expect(users.length).toEqual(1);
        });
    });
});
