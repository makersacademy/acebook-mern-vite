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
				username: "poppy",
				email: "poppy@email.com",
				password: "Hasd1234@",
			});

			expect(response.statusCode).toBe(201);
		});

		test("a user is created", async () => {
			await request(app).post("/users").send({
				username: "scarc",
				email: "scarconstt@email.com",
				password: "Hh@a1234",
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
				.send({ username: "scarc", email: "skye@email.com" });

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
	describe("POST, when username is missing", () => {
		test("response code is 400", async () => {
			const response = await request(app)
				.post("/users")
				.send({ username: "1234" });

			expect(response.statusCode).toBe(400);
		});

		test("does not create a user", async () => {
			await request(app).post("/users").send({ username: "1234" });

			const users = await User.find();
			expect(users.length).toEqual(0);
		});
	});
	describe("POST, with invalid email and password ", () => {
		test("invalid email,the response code is 400", async () => {
			const response = await request(app).post("/users").send({
				username: "poppy",
				email: "poppymail.com",
				password: "Hasd1234@",
			});

			expect(response.statusCode).toBe(400);
		});
		test("invalid password, the response code is 400", async () => {
			const response = await request(app).post("/users").send({
				username: "poppy",
				email: "poppy@mail.com",
				password: "1",
			});

			expect(response.statusCode).toBe(400);
		});
	});
});
