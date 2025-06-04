const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when name, email and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "poppy@email.com", password: "1234", name: "jeff" });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({
          email: "scarconstt@email.com",
          password: "1234",
          name: "jeff",
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
        .send({ email: "skye@email.com" });

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
});

describe("GET all users", () => {
  test("returns every user in the collection", async () => {
    const user1 = new User({
      name: "eric",
      email: "email@domain.com",
      password: "password",
    });
    const user2 = new User({
      name: "erica",
      email: "nunya@business.com",
      password: "1234secure",
    });
    await user1.save();
    await user2.save();

    const response = await request(app).get("/users");

    const users = response.body.users;
    const firstUser = users[0];
    const secondUser = users[1];

    expect(firstUser.name).toEqual("eric");
    expect(secondUser.name).toEqual("erica");
  });
});

describe("GET user by id", () => {
  test("returns given user based on Objectid in MongoDB", async () => {
    const user = new User({
      name: "eric",
      email: "email@domain.com",
      password: "password",
    });
    await user.save();

    const response = await request(app).get(`/users/${user._id}`);
    // console.log(response);

    expect(response.body.user._id).toEqual(user._id.toString());
    expect(response.body.user.name).toBe("eric");
  });
});

describe("Put method - to update user", () => {
  test("user details are updated following a find based on ObjectId", async () => {
    const user = new User({
      name: "eric",
      email: "test@test.com",
      password: "123password"
    });
    await user.save()

    const updates = {name: "erica"}
    const response = await request(app)
      .put(`/users/${user._id}`)
      .send(updates)
      .expect(200);

    expect(response.body.updatedUser.name).toBe("erica");

  })

  test("can update fields that are currently undefined", async () => {
    const user = new User({
      name: "john",
      email: "test@test.com",
      password: "123password"
    });
    await user.save()

    const updates = {status: "I am not a robot"};
    const response = await request(app)
      .put(`/users/${user._id}`)
      .send(updates)
      .expect(200)

    expect(response.body.updatedUser.status).toBe("I am not a robot")
  })

  test("can update date of birth field", async () => {
    const user = new User({
      name: "john",
      email: "test@test.com",
      password: "123password",
      dob: "2008-06-21"
    });
    await user.save();

    const dob = new Date("2007-01-21").toISOString().slice(0, 10)
    const updates = {dob}
    const response = await request(app)
      .put(`/users/${user._id}`)
      .send(updates)
      .expect(200)

    const trimmedDate = response.body.updatedUser.dob.slice(0, 10)
    expect(trimmedDate).toBe(dob)
  })

})

describe("POST method to add friends", () => {
  test("passing in another users id, adds them to the first user's friends list *unidirectionally*", async () => {
    const user1 = new User({
      name: "Harry",
      email: "chosen@one.wiz",
      password: "voldemort"
    })
    const user2 = new User({
      name: "Ron",
      email: "side@kick.wiz",
      password: "spiders"
    })
    await user1.save();
    await user2.save();

    const token = JWT.sign({ sub: user1._id }, process.env.JWT_SECRET);
    
    const response = await request(app)
      .post(`users/${user1._id}/friends/${user2._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ friendId: user2._id })
      .expect(200)

    expect(response.body.user.friends).toContain(user2._id.toString());
    }
  )
})