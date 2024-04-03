
const app = require("../../app");
const supertest = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const bcrypt = require('bcrypt');

describe("/tokens", () => {
  beforeAll(async () => {
    const secret = "Awe5some$!";
    const hashedPassword = await bcrypt.hash("Abcde1234!" + secret, 10);
    const user = new User({
      firstName : "auth-test-name",
      lastName : "test-lastname",
      bio : "test-bio",
      email: "auth-test@test.com",
      password: hashedPassword,
    });

    await user.save();
    console.log(user)
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  test("returns a token when credentials are valid", async () => {
    const testApp = supertest(app);
    const response = await testApp
      .post("/tokens")
      .send({email: "auth-test@test.com", password: "Abcde1234!"});

    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("OK");
  });

  test("doesn't return a token when the user doesn't exist", async () => {
    const testApp = supertest(app);
    const response = await testApp
      .post("/tokens")
      .send({ email: "non-existent@test.com", password: "Abcde1234!" });

    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("User not found");
  });

  test("doesn't return a token when the wrong password is given", async () => {
    let testApp = supertest(app);
    const response = await testApp
      .post("/tokens")
      .send({ email: "auth-test@test.com", password: "1234" });

    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("Password incorrect");
  });
});


 

