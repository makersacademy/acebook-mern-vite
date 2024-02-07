require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it("has a username", () => {
        const user = new User({
            username: "testUsername",
            email: "someone@example.com",
            password: "password",
        });
        expect(user.username).toEqual("testUsername");
    });

    it("has an email address", () => {
        const user = new User({
            username: "testUsername",
            email: "someone@example.com",
            password: "password",
        });
        expect(user.email).toEqual("someone@example.com");
    });

    it("has a password", () => {
        const user = new User({
            username: "testUsername",
            email: "someone@example.com",
            password: "password",
        });
        expect(user.password).toEqual("password");
    });

    it("can list all users", async () => {
        const users = await User.find();
        expect(users).toEqual([]);
    });

    it("can save a user, and the password in the database will be different from the input password", async () => {
        const user = new User({
            username: "testUsername",
            email: "someone@example.com",
            password: "password",
        });

        await user.save();
        const users = await User.find();
        expect(users[0].username).toEqual("testUsername");
        expect(users[0].email).toEqual("someone@example.com");
        expect(users[0].password === "password").toBe(false);
    });
});
